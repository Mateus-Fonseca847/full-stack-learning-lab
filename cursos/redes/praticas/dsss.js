// DSSS (aula 04): espalhamento com sequência de 11 chips (Barker) e desespalhamento por correlação.
// Regra do slide: bit 0 -> código, bit 1 -> código invertido. Uso: node dsss.js
const barker = [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1];
const bits = [1, 0, 1, 1, 0, 0, 1, 0];

function espalha(bits) {
  return bits.flatMap((b) => barker.map((c) => (b === 0 ? c : -c)));
}
function correla(sinal, codigo, inicio) {
  return codigo.reduce((s, c, i) => s + sinal[inicio + i] * c, 0);
}
function desespalha(sinal) {
  const out = [];
  for (let i = 0; i < sinal.length; i += barker.length) out.push(correla(sinal, barker, i) > 0 ? 0 : 1);
  return out;
}
// gerador pseudoaleatório com semente (reprodutível)
let seed = 7;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296 - 0.5);

console.log("bits enviados:   ", bits.join(""));
const tx = espalha(bits);
console.log(`chips por bit: ${barker.length}  |  total de chips: ${tx.length}  (taxa 11x maior)`);

const rx = tx.map((x, i) => x + 1.2 * Math.sin(i * 0.9) + 0.6 * rnd() * 2); // interferência de faixa estreita + ruído
console.log("bits recuperados:", desespalha(rx).join(""), "  <- mesmo com forte interferência");

console.log("\nAutocorrelação do código (pico = 11; fora do pico, |valor| <= 1):");
const out = [];
for (let s = 0; s < 11; s++) {
  let v = 0;
  for (let i = 0; i < 11; i++) v += barker[i] * barker[(i + s) % 11];
  out.push(v);
}
console.log(out.join(" "));
