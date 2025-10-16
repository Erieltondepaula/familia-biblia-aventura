const bibleVersions = {
  'ACF': { code: 'ACF', name: 'ACF', fullName: 'Almeida Corrigida Fiel', baseUrl: 'https://www.bibliaonline.com.br/acf', enabled: true },
  'NVI': { code: 'NVI', name: 'NVI', fullName: 'Nova Versão Internacional', baseUrl: 'https://www.bibliaonline.com.br/nvi', enabled: true },
  'NTLH': { code: 'NTLH', name: 'NTLH', fullName: 'Nova Tradução na Linguagem de Hoje', baseUrl: 'https://www.bibliaonline.com.br/ntlh', enabled: true },
  'BKJ1611': { code: 'BKJ1611', name: 'BKJ 1611', fullName: 'King James Fiel 1611', baseUrl: 'https://bkjfiel.com.br', enabled: true },
  'NAA': { code: 'NAA', name: 'NAA', fullName: 'Nova Almeida Atualizada', baseUrl: 'https://www.bibliaonline.com.br/naa', enabled: true },
};

const bookUrlMap = {
  'Gênesis': 'gn',
  'Mateus': 'mt',
  'João': 'jo',
};

function generateBibleUrl(versionCode, book, chapter) {
  const versionInfo = bibleVersions[versionCode];
  if (!versionInfo) throw new Error(`Bible version ${versionCode} not found`);
  if (!versionInfo.enabled) throw new Error(`Bible version ${versionCode} not enabled`);
  const bookAbbr = bookUrlMap[book];
  if (!bookAbbr) throw new Error(`Book ${book} not mapped`);
  return `${versionInfo.baseUrl}/${bookAbbr}/${chapter}`;
}

const versions = Object.keys(bibleVersions);
const books = ['Gênesis', 'Mateus', 'João'];
console.log('Teste de geração de URLs de leitura para cada versão e livro:');
for (const v of versions) {
  for (const b of books) {
    try {
      const url = generateBibleUrl(v, b, 1);
      console.log(`${v} - ${b} -> ${url}`);
    } catch (err) {
      console.log(`${v} - ${b} -> ERRO: ${err.message}`);
    }
  }
}
