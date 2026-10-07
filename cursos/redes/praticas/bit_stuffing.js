// Inserção de bits (bit stuffing) com flag 01111110 — aula 8.
// Transmissor: após cinco 1s seguidos nos dados, insere um 0.
// Receptor: após cinco 1s seguidos, remove o 0 seguinte.
const FLAG = "01111110";

function enche(dados) {
  let saida = "", uns = 0;
  for (const b of dados) {
    saida += b;
    uns = b === "1" ? uns + 1 : 0;
    if (uns === 5) { saida += "0"; uns = 0; }
  }
  return saida;
}

function esvazia(quadro) {
  let saida = "", uns = 0;
  for (let i = 0; i < quadro.length; i++) {
    const b = quadro[i];
    saida += b;
    uns = b === "1" ? uns + 1 : 0;
    if (uns === 5) { i++; uns = 0; }   // pula o 0 inserido
  }
  return saida;
}

module.exports = { enche, esvazia, FLAG };

if (require.main === module) {
  const assert = require("assert");
  for (const d of ["01111110", "0110111111111111110010", "1111100000"]) {
    const e = enche(d);
    console.log(`dados:    ${d}\nenchido:  ${e}\nquadro:   ${FLAG}${e}${FLAG}`);
    assert.strictEqual(esvazia(e), d);
    console.log("recuperado = original ✔\n");
  }
}
