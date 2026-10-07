// Calculadora do espectro (aula 6): f * λ = c  (no vácuo, c ≈ 3e8 m/s).
// Uso:  node f_lambda.js [freq_hz ...]
const C = 3e8;
const freqs = process.argv.length > 2 ? process.argv.slice(2).map(Number) : [100e6, 1e9, 2.4e9, 5e9];
for (const f of freqs) {
  const lam = C / f;
  console.log(`f = ${(f / 1e6).toFixed(1).padStart(10)} MHz  ->  λ = ${lam.toFixed(4).padStart(8)} m  (${(lam * 100).toFixed(2).padStart(8)} cm)`);
}
