// Utilização do enlace: Para-e-Espera x Janela Deslizante (aula 10).
//   BD = banda * atraso_de_propagação / tamanho_do_quadro   (em quadros)
//   w_ótimo = 2*BD + 1
//   utilização <= w / (1 + 2*BD)
// Uso:  node janela_deslizante.js [banda_bps] [atraso_s] [quadro_bits]
// Padrão (exemplo da aula): 50000 0.25 1000

function analisa(banda, atraso, quadro) {
  const tTx = quadro / banda;
  const bd = (banda * atraso) / quadro;
  console.log(`tempo de transmissão de 1 quadro = ${(tTx * 1000).toFixed(1)} ms`);
  console.log(`BD = ${bd.toFixed(2)} quadros | janela ótima = 2*BD+1 = ${(2 * bd + 1).toFixed(1)}`);
  console.log("\n  w   utilização");
  for (const w of [1, 2, 4, 8, 13, 26, 52]) {
    const u = Math.min(1, w / (1 + 2 * bd));
    console.log(`${String(w).padStart(3)}   ${(u * 100).toFixed(2).padStart(6)}%`);
  }
}

module.exports = { analisa };

if (require.main === module) {
  const a = process.argv.slice(2, 5).map(Number);
  analisa(...(a.length === 3 ? a : [50000, 0.25, 1000]));
}
