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

// Book abbreviation mapping for URLs (ACF, NVI, NTLH, NAA)
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

// Book name mapping for BKJ 1611 (uses full names in lowercase with hyphens)
export const bookUrlMapBKJ: Record<string, string> = {
  'Gênesis': 'genesis',
  'Êxodo': 'exodo',
  'Levítico': 'levitico',
  'Números': 'numeros',
  'Deuteronômio': 'deuteronomio',
  'Josué': 'josue',
  'Juízes': 'juizes',
  'Rute': 'rute',
  '1 Samuel': '1-samuel',
  '2 Samuel': '2-samuel',
  '1 Reis': '1-reis',
  '2 Reis': '2-reis',
  '1 Crônicas': '1-cronicas',
  '2 Crônicas': '2-cronicas',
  'Esdras': 'esdras',
  'Neemias': 'neemias',
  'Ester': 'ester',
  'Jó': 'jo',
  'Salmos': 'salmos',
  'Provérbios': 'proverbios',
  'Eclesiastes': 'eclesiastes',
  'Cantares': 'cantares',
  'Isaías': 'isaias',
  'Jeremias': 'jeremias',
  'Lamentações': 'lamentacoes',
  'Ezequiel': 'ezequiel',
  'Daniel': 'daniel',
  'Oseias': 'oseias',
  'Joel': 'joel',
  'Amós': 'amos',
  'Obadias': 'obadias',
  'Jonas': 'jonas',
  'Miqueias': 'miqueias',
  'Naum': 'naum',
  'Habacuque': 'habacuque',
  'Sofonias': 'sofonias',
  'Ageu': 'ageu',
  'Zacarias': 'zacarias',
  'Malaquias': 'malaquias',
  'Mateus': 'mateus',
  'Marcos': 'marcos',
  'Lucas': 'lucas',
  'João': 'joao',
  'Atos': 'atos',
  'Romanos': 'romanos',
  '1 Coríntios': '1-corintios',
  '2 Coríntios': '2-corintios',
  'Gálatas': 'galatas',
  'Efésios': 'efesios',
  'Filipenses': 'filipenses',
  'Colossenses': 'colossenses',
  '1 Tessalonicenses': '1-tessalonicenses',
  '2 Tessalonicenses': '2-tessalonicenses',
  '1 Timóteo': '1-timoteo',
  '2 Timóteo': '2-timoteo',
  'Tito': 'tito',
  'Filemon': 'filemom',
  'Hebreus': 'hebreus',
  'Tiago': 'tiago',
  '1 Pedro': '1-pedro',
  '2 Pedro': '2-pedro',
  '1 João': '1-joao',
  '2 João': '2-joao',
  '3 João': '3-joao',
  'Judas': 'judas',
  'Apocalipse': 'apocalipse'
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

  // BKJ 1611 uses different URL pattern: full book name with hyphens
  if (version === 'BKJ1611') {
    const bookName = bookUrlMapBKJ[book];
    if (!bookName) {
      throw new Error(`Book ${book} not found in BKJ mapping`);
    }
    return `${versionInfo.baseUrl}/${bookName}-${chapter}`;
  }

  // Other versions use abbreviated book names
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
