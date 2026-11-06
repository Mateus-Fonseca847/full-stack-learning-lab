// Conversões de representação numérica (Software Básico, aulas 01-02).
// Node.js puro, sem dependências.
// Uso:
//   node representacao.js c2 <decimal> <bits>        -> complemento a dois
//   node representacao.js fromc2 <binario>            -> decimal a partir de complemento a dois
//   node representacao.js ponto-fixo <decimal> <bitsFrac>
//   node representacao.js ieee754 <decimal>           -> IEEE 754 single precision (32 bits)

function complementoADois(n, bits) {
  if (n >= 0) return n.toString(2).padStart(bits, "0");
  return ((1 << bits) + n).toString(2).padStart(bits, "0");
}

function deComplementoADois(bin) {
  const bits = bin.length;
  let v = parseInt(bin, 2);
  if (bin[0] === "1") v -= 1 << bits;
  return v;
}

function pontoFixo(x, bitsFrac) {
  const sinal = x < 0 ? "-" : "";
  x = Math.abs(x);
  const inteira = Math.floor(x);
  let fracao = x - inteira;
  let bits = "";
  for (let i = 0; i < bitsFrac; i++) {
    fracao *= 2;
    const b = Math.floor(fracao);
    bits += b;
    fracao -= b;
  }
  return `${sinal}${inteira.toString(2)},${bits}`;
}

function ieee754(x) {
  const buf = Buffer.alloc(4);
  buf.writeFloatBE(x);
  const bits = [...buf].map((b) => b.toString(2).padStart(8, "0")).join("");
  return `${bits[0]} | ${bits.slice(1, 9)} | ${bits.slice(9)}`;
}

const [, , cmd, a, b] = process.argv;

if (cmd === "c2") console.log(complementoADois(Number(a), Number(b)));
else if (cmd === "fromc2") console.log(deComplementoADois(a));
else if (cmd === "ponto-fixo") console.log(pontoFixo(Number(a), Number(b)));
else if (cmd === "ieee754") console.log(ieee754(Number(a)));
else {
  console.log("Uso: node representacao.js <c2|fromc2|ponto-fixo|ieee754> <args>");
  console.log("Exemplos:");
  console.log("  node representacao.js c2 -28 6        ->", complementoADois(-28, 6));
  console.log("  node representacao.js fromc2 101101   ->", deComplementoADois("101101"));
  console.log("  node representacao.js ponto-fixo 0.3 8 ->", pontoFixo(0.3, 8));
  console.log("  node representacao.js ieee754 -13.625 ->", ieee754(-13.625));
}
