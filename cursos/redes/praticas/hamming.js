// Distância de Hamming e capacidade de detectar/corrigir erros (aula 9).
// Uso:  node hamming.js            (roda os exemplos da aula)

const dist = (a, b) => [...a].filter((x, i) => x !== b[i]).length;

function analisa(codigo) {
  let d = Infinity;
  for (let i = 0; i < codigo.length; i++)
    for (let j = i + 1; j < codigo.length; j++) d = Math.min(d, dist(codigo[i], codigo[j]));
  console.log(`código ${JSON.stringify(codigo)}`);
  console.log(`  distância do código = ${d}`);
  console.log(`  detecta até ${d - 1} erros | corrige até ${Math.floor((d - 1) / 2)} erros\n`);
}

module.exports = { dist, analisa };

if (require.main === module) {
  console.log("dist(10001001, 10110001) =", dist("10001001", "10110001"), "\n");
  analisa(["0000000000", "0000011111", "1111100000", "1111111111"]);
  analisa(["000", "111"]);            // repetição 3x: d=3 -> detecta 2, corrige 1
  analisa(["00", "01", "10", "11"]);  // sem redundância: d=1 -> não detecta nada
}
