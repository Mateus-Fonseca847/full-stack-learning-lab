// Enlace óptico (aulas 15 e 16): atenuação em dB e dB/km, e BER a partir da OSNR.
// Uso: node enlace_optico.js [Pin_uW] [Pout_uW] [km] [OSNR_dB]
const pin = Number(process.argv[2]) || 10;
const pout = Number(process.argv[3]) || 6;
const km = Number(process.argv[4]) || 10;
const osnr = Number(process.argv[5]) || 14.5;

const perda = 10 * Math.log10(pin / pout);
console.log(`Atenuação: 10·log10(${pin}/${pout}) = ${perda.toFixed(2)} dB em ${km} km  ->  ${(perda / km).toFixed(3)} dB/km`);

const logBER = (o) => 10.7 - 1.4 * o;           // fórmula empírica do slide
console.log(`\nBER a partir da OSNR (log10 BER = 10,7 − 1,4·OSNR):`);
for (const o of [12, 13, 14, 14.5, 15, 16, 18]) console.log(`  OSNR = ${String(o).padStart(4)} dB  ->  log10 BER = ${logBER(o).toFixed(2)}  (BER ≈ 1e${logBER(o).toFixed(1)})`);
console.log(`\nOSNR pedida = ${osnr} dB  ->  log10 BER = ${logBER(osnr).toFixed(2)}`);
console.log("Obs.: o slide escreve −10,30 para 14,5 dB, mas 10,7 − 1,4·14,5 = −9,60. O valor −10,30 corresponde a 15 dB.");
console.log("Meta típica: BER < 1e-12 (1e-15 com FEC). Para 1e-12 o modelo pede OSNR =", ((10.7 + 12) / 1.4).toFixed(1), "dB.");
