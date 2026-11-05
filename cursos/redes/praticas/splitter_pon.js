// Splitters e orçamento de potência de uma PON (aula 13).
// Uso: node splitter_pon.js [razao_N] [km_de_fibra] [dB_por_km]
const N = Number(process.argv[2]) || 32;
const km = Number(process.argv[3]) || 10;
const alfa = Number(process.argv[4]) || 0.35;      // dB/km (valor típico, a 1310 nm)

const perdaBalanceado = (n) => 10 * Math.log10(n);
console.log("Splitter balanceado 1:N  ->  perda ideal = 10·log10(N)");
for (const n of [2, 4, 8, 16, 32, 64, 128]) console.log(`  1:${String(n).padEnd(3)}  ${perdaBalanceado(n).toFixed(1)} dB`);

console.log("\nSplitter NÃO balanceado 1:2 (percentual da potência em cada saída):");
for (const [a, b] of [[90, 10], [80, 20], [70, 30], [60, 40], [50, 50]])
  console.log(`  ${a}/${b}  ->  ${(-10 * Math.log10(a / 100)).toFixed(2)} dB  e  ${(-10 * Math.log10(b / 100)).toFixed(2)} dB`);

const conectores = 2.0; // dB (conectores e emendas, estimativa)
const total = perdaBalanceado(N) + km * alfa + conectores;
console.log(`\nOrçamento de uma PON com split 1:${N}, ${km} km de fibra (${alfa} dB/km) e ~${conectores} dB de conectores/emendas:`);
console.log(`  perda total ≈ ${total.toFixed(1)} dB`);
for (const budget of [29]) console.log(`  folga em relação a um link budget de ${budget} dB (ex.: 10G-EPON, slide) = ${(budget - total).toFixed(1)} dB`);
