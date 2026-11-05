// Grade DWDM (aula 15): frequência central = 193,1 + n × passo (THz); λ = c / f.
// Uso: node dwdm_grade.js [passo_GHz]
const passoGHz = Number(process.argv[2]) || 100;
const C = 299792.458;                               // nm·THz  (c em unidades convenientes)
const freq = (n, passo) => 193.1 + n * (passo / 1000);   // THz
const lambda = (f) => C / f;                        // nm

console.log(`Grade fixa com espaçamento de ${passoGHz} GHz`);
for (let n = -2; n <= 2; n++) {
  const f = freq(n, passoGHz);
  console.log(`  n = ${String(n).padStart(2)}  f = ${f.toFixed(4)} THz  ->  λ = ${lambda(f).toFixed(2)} nm`);
}
const df = freq(1, passoGHz) - freq(0, passoGHz), dl = lambda(freq(0, passoGHz)) - lambda(freq(1, passoGHz));
console.log(`\nEspaçamento de ${passoGHz} GHz ≈ ${dl.toFixed(2)} nm em torno de 1550 nm`);

for (const p of [200, 100, 50, 25]) {
  let n = 0;
  for (let k = -400; k <= 400; k++) { const l = lambda(freq(k, p)); if (l >= 1530 && l <= 1565) n++; }
  console.log(`Canais de ${String(p).padStart(3)} GHz dentro da banda C (1530–1565 nm): ${n}`);
}
