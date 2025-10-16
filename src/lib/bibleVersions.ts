// Bible Versions Configuration
export type BibleVersionCode = 'ACF' | 'NVI' | 'NTLH' | 'BKJ1611' | 'NAA';

export interface BibleVersionInfo {
  code: BibleVersionCode;
  name: string;
  fullName: string;
  description: string;
  baseUrl: string;
  enabled: boolean;
}

export const bibleVersions: Record<BibleVersionCode, BibleVersionInfo> = {
  'ACF': {
    code: 'ACF',
    name: 'ACF',
    fullName: 'Almeida Corrigida Fiel',
    description: 'Versão clássica em português',
    baseUrl: 'https://www.bibliaonline.com.br/acf',
    enabled: true
  },
  'NVI': {
    code: 'NVI',
    name: 'NVI',
    fullName: 'Nova Versão Internacional',
    description: 'Tradução moderna e fluente',
    baseUrl: 'https://www.bibliaonline.com.br/nvi',
    enabled: true
  },
  'NTLH': {
    code: 'NTLH',
    name: 'NTLH',
    fullName: 'Nova Tradução na Linguagem de Hoje',
    description: 'Linguagem simples e acessível',
    baseUrl: 'https://www.bibliaonline.com.br/ntlh',
    enabled: true
  },
  'BKJ1611': {
    code: 'BKJ1611',
    name: 'BKJ 1611',
    fullName: 'King James Fiel 1611',
    description: 'Tradução fiel ao original King James',
    baseUrl: 'https://bkjfiel.com.br',
    enabled: true
  },
  'NAA': {
    code: 'NAA',
    name: 'NAA',
    fullName: 'Nova Almeida Atualizada',
    description: 'Revisão moderna da Almeida',
    baseUrl: 'https://www.bibliaonline.com.br/naa',
    enabled: true
  }
};

// Book abbreviation mapping for URLs
export const bookUrlMap: Record<string, string> = {
  'Gênesis': 'gn',
  'Êxodo': 'ex',
  'Levítico': 'lv',
  'Números': 'nm',
  'Deuteronômio': 'dt',
  'Josué': 'js',
  'Juízes': 'jz',
  'Rute': 'rt',
  '1 Samuel': '1sm',
  '2 Samuel': '2sm',
  '1 Reis': '1rs',
  '2 Reis': '2rs',
  '1 Crônicas': '1cr',
  '2 Crônicas': '2cr',
  'Esdras': 'ed',
  'Neemias': 'ne',
  'Ester': 'et',
  'Jó': 'job',
  'Salmos': 'sl',
  'Provérbios': 'pv',
  'Eclesiastes': 'ec',
  'Cantares': 'ct',
  'Isaías': 'is',
  'Jeremias': 'jr',
  'Lamentações': 'lm',
  'Ezequiel': 'ez',
  'Daniel': 'dn',
  'Oseias': 'os',
  'Joel': 'jl',
  'Amós': 'am',
  'Obadias': 'ob',
  'Jonas': 'jn',
  'Miqueias': 'mq',
  'Naum': 'na',
  'Habacuque': 'hc',
  'Sofonias': 'sf',
  'Ageu': 'ag',
  'Zacarias': 'zc',
  'Malaquias': 'ml',
  'Mateus': 'mt',
  'Marcos': 'mc',
  'Lucas': 'lc',
  'João': 'jo',
  'Atos': 'at',
  'Romanos': 'rm',
  '1 Coríntios': '1co',
  '2 Coríntios': '2co',
  'Gálatas': 'gl',
  'Efésios': 'ef',
  'Filipenses': 'fp',
  'Colossenses': 'cl',
  '1 Tessalonicenses': '1ts',
  '2 Tessalonicenses': '2ts',
  '1 Timóteo': '1tm',
  '2 Timóteo': '2tm',
  'Tito': 'tt',
  'Filemon': 'fm',
  'Hebreus': 'hb',
  'Tiago': 'tg',
  '1 Pedro': '1pe',
  '2 Pedro': '2pe',
  '1 João': '1jo',
  '2 João': '2jo',
  '3 João': '3jo',
  'Judas': 'jd',
  'Apocalipse': 'ap'
};

/**
 * Generate Bible reading URL for a specific version
 */
export const generateBibleUrl = (
  version: BibleVersionCode,
  book: string,
  chapter: number
): string => {
  const versionInfo = bibleVersions[version];
  if (!versionInfo || !versionInfo.enabled) {
    throw new Error(`Bible version ${version} not available`);
  }

  const bookAbbr = bookUrlMap[book];
  if (!bookAbbr) {
    throw new Error(`Book ${book} not found in mapping`);
  }

  return `${versionInfo.baseUrl}/${bookAbbr}/${chapter}`;
};

/**
 * Get available Bible versions
 */
export const getAvailableBibleVersions = (): BibleVersionInfo[] => {
  return Object.values(bibleVersions).filter(v => v.enabled);
};

/**
 * Get Bible version info by code
 */
export const getBibleVersionInfo = (code: BibleVersionCode): BibleVersionInfo | null => {
  return bibleVersions[code] || null;
};
