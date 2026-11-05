// Recuo binário exponencial (aula 07): faixa de sorteio e simulação de disputa entre N estações.
// Uso: node backoff.js [N_estacoes]
const N = Number(process.argv[2]) || 5;

console.log("Após i colisões, sorteia-se um número entre 0 e 2^i − 1 (slide: teto de 1023 após 10 colisões):");
for (const i of [1, 2, 3, 4, 5, 10]) console.log(`  i = ${String(i).padStart(2)}  ->  0 a ${Math.min(2 ** i - 1, 1023)}`);

function rodadasAteSucesso(n) {
  const colisoes = Array(n).fill(0);
  let rodadas = 0, colisoesTotais = 0;
  while (true) {
    rodadas++;
    const sorteio = colisoes.map((c) => Math.floor(Math.random() * Math.min(2 ** c, 1024)));
    const min = Math.min(...sorteio);
    const vencedores = sorteio.flatMap((s, i) => (s === min ? [i] : []));
    if (vencedores.length === 1) return { rodadas, colisoesTotais };
    vencedores.forEach((i) => colisoes[i]++);          // só quem empatou no menor valor colidiu
    colisoesTotais++;
  }
}

const T = 20000;
for (const n of [2, N, 20]) {
  let r = 0, c = 0;
  for (let k = 0; k < T; k++) { const x = rodadasAteSucesso(n); r += x.rodadas; c += x.colisoesTotais; }
  console.log(`N = ${String(n).padStart(2)} estações: média de ${(c / T).toFixed(2)} colisões antes de uma transmissão bem-sucedida`);
}
