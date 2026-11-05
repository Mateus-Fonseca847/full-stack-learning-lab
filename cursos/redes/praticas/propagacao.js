// Propagação (aula 01): perda no espaço livre, zona de Fresnel e refratividade.
// Uso: node propagacao.js [freq_MHz] [dist_km]
const f = Number(process.argv[2]) || 2400;
const d = Number(process.argv[3]) || 0.1;

const fspl = (dKm, fMHz) => 20 * Math.log10(dKm) + 20 * Math.log10(fMHz) + 32.44; // dB
const lambda = 300 / f;                                                              // metros
const fresnel = (n, d1, d2) => Math.sqrt((n * lambda * d1 * d2) / (d1 + d2));      // metros

console.log(`f = ${f} MHz  ->  λ = ${lambda.toFixed(3)} m`);
console.log(`FSPL a ${d} km        = ${fspl(d, f).toFixed(1)} dB`);
console.log(`FSPL a ${2 * d} km (dobro) = ${fspl(2 * d, f).toFixed(1)} dB   (+6 dB ao dobrar a distância)`);
console.log(`FSPL em ${f * 2} MHz (dobro) = ${fspl(d, f * 2).toFixed(1)} dB   (+6 dB ao dobrar a frequência)\n`);

const metade = (d * 1000) / 2;
const r1 = fresnel(1, metade, metade);
console.log(`1ª zona de Fresnel no meio de um enlace de ${d * 1000} m: raio = ${r1.toFixed(2)} m`);
console.log(`60% da 1ª zona (precisa ficar livre)               = ${(0.6 * r1).toFixed(2)} m\n`);

const Ns = 315, H = 7.35; // km (slide)
console.log("Refratividade N(h) = Ns · e^(−h/H), Ns = 315, H = 7,35 km");
for (const h of [0, 1, 3, 7.35, 11]) console.log(`  h = ${String(h).padStart(5)} km  ->  N = ${(Ns * Math.exp(-h / H)).toFixed(1)}`);
