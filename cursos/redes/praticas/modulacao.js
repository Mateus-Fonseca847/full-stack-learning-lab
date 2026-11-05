// Modulação (aula 03): bits por símbolo e o mínimo de SNR teórico (limite de Shannon).
// Uso: node modulacao.js [taxa_de_simbolos_Msym_por_s]
const rs = Number(process.argv[2]) || 20;   // Msímbolos/s (ex.: ~20 MHz de banda)
const tipos = [
  ["BPSK / OOK", 2], ["QPSK", 4], ["16-QAM", 16], ["64-QAM", 64],
  ["256-QAM", 256], ["1024-QAM", 1024], ["4096-QAM", 4096],
];
console.log(`Taxa de símbolos = ${rs} Msím/s\n`);
console.log("modulação    pontos  bits/símbolo  taxa bruta (Mbps)  SNR mínima teórica (dB)");
for (const [nome, m] of tipos) {
  const b = Math.log2(m);
  const snr = 10 * Math.log10(2 ** b - 1);          // Shannon: C/B = log2(1+SNR) >= b
  console.log(`${nome.padEnd(11)}  ${String(m).padStart(6)}  ${String(b).padStart(12)}  ${(b * rs).toFixed(0).padStart(17)}  ${snr.toFixed(1).padStart(23)}`);
}
console.log("\nMais bits por símbolo = mais taxa, porém exige SNR maior (pontos da constelação mais juntos).");
console.log("Valores de SNR são o LIMITE teórico; na prática, a exigência é maior.");
