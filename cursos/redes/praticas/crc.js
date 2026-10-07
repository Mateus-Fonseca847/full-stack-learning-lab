// CRC por divisão binária (módulo 2) — igual ao exemplo da aula 9.
// Uso:  node crc.js <dados> <gerador>
// Ex.:  node crc.js 101110 1001        -> resto 011, enviado 101110011
//       node crc.js 1101011011 10011   -> resto 1110

function divide(bits, gerador, passos, verbose = false) {
  for (let i = 0; i < passos; i++) {
    if (bits[i]) {                                   // só "divide" quando o bit da frente é 1
      gerador.forEach((g, j) => { bits[i + j] ^= g; });   // XOR = subtração módulo 2
      if (verbose) console.log(`passo ${i}: ${bits.join("")}`);
    }
  }
  return bits;
}

const paraBits = (s) => [...s].map(Number);

function crcResto(dados, gerador, verbose = false) {
  const r = gerador.length - 1;
  const bits = paraBits(dados + "0".repeat(r));      // anexa r zeros aos dados
  divide(bits, paraBits(gerador), dados.length, verbose);
  return bits.slice(-r).join("");
}

// Receptor divide o quadro recebido pelo mesmo gerador: resto 0 = sem erro detectado.
function receptorOk(quadro, gerador) {
  const bits = paraBits(quadro);
  divide(bits, paraBits(gerador), quadro.length - gerador.length + 1);
  return !bits.slice(-(gerador.length - 1)).some(Boolean);
}

module.exports = { crcResto, receptorOk };

if (require.main === module) {
  const [d, g] = process.argv.length === 4 ? process.argv.slice(2) : ["101110", "1001"];
  const r = crcResto(d, g, true);
  const enviado = d + r;
  console.log(`\nresto (CRC) = ${r}\nquadro enviado = ${enviado}`);
  console.log("receptor confere (sem erro)?", receptorOk(enviado, g));
  const erro = [...enviado];
  erro[2] = erro[2] === "0" ? "1" : "0";
  console.log("com 1 bit trocado, receptor confere?", receptorOk(erro.join(""), g));
}
