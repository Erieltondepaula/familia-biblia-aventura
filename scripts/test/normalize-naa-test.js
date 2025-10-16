const bibleVersions = [
  { code: 'ACF', name: 'ACF', fullName: 'Almeida Corrigida Fiel' },
  { code: 'NVI', name: 'NVI', fullName: 'Nova Versão Internacional' },
  { code: 'NTLH', name: 'NTLH', fullName: 'Nova Tradução na Linguagem de Hoje' },
  { code: 'BKJ1611', name: 'BKJ 1611', fullName: 'King James Fiel 1611' },
  { code: 'NAA', name: 'NAA', fullName: 'Nova Almeida Atualizada' },
];

const isBibleCode = (v) => bibleVersions.some(b => b.code === v);

function normalizeBibleVersion(value) {
  if (!value) return undefined;
  const v = String(value).trim();
  if (isBibleCode(v)) return v;
  const removedSpaces = v.replace(/\s+/g, '');
  if (isBibleCode(removedSpaces)) return removedSpaces;
  const byName = bibleVersions.find(b =>
    b.name.toLowerCase() === v.toLowerCase() || b.fullName.toLowerCase() === v.toLowerCase()
  );
  if (byName) return byName.code;
  const relaxed = bibleVersions.find(b =>
    b.name.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase() ||
    b.fullName.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase()
  );
  return relaxed ? relaxed.code : undefined;
}

const inputs = [
  'NAA',
  'N A A',
  'naa',
  'Nova Almeida Atualizada',
  'NovaAlmeidaAtualizada',
  'N a a ',
  'N A A  ',
  'NAA '
];

console.log('Teste de normalização para NAA:');
for (const input of inputs) {
  console.log(`input: ${JSON.stringify(input)} -> normalized: ${normalizeBibleVersion(input)}`);
}
