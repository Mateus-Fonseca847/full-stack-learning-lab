// Paridade bidimensional (aula 9): detecta e CORRIGE erro de 1 bit.

function codifica(linhas) {
  const comP = linhas.map((l) => l + ([...l].filter((b) => b === "1").length % 2)); // paridade par por linha
  const col = [...comP[0]]
    .map((_, i) => comP.reduce((s, l) => s + Number(l[i]), 0) % 2)
    .join("");
  return [...comP, col];                                    // + linha de paridade das colunas
}

function localizaErro(bloco) {
  const linhas = [], colunas = [];
  bloco.forEach((l, i) => { if ([...l].filter((b) => b === "1").length % 2) linhas.push(i); });
  for (let j = 0; j < bloco[0].length; j++)
    if (bloco.reduce((s, l) => s + Number(l[j]), 0) % 2) colunas.push(j);
  return [linhas, colunas];
}

module.exports = { codifica, localizaErro };

if (require.main === module) {
  const dados = ["10001001", "10101100", "10110001", "10010100"];   // exemplo da aula
  const bloco = codifica(dados);
  console.log("bloco enviado:\n" + bloco.join("\n"));

  const rec = bloco.map((l) => [...l]);
  rec[1][4] = rec[1][4] === "0" ? "1" : "0";                         // injeta erro na linha 1, coluna 4
  const recebido = rec.map((l) => l.join(""));
  const [li, co] = localizaErro(recebido);
  console.log(`\nerro detectado: linha [${li}], coluna [${co}]`);
  if (li.length === 1 && co.length === 1) {
    const r = recebido.map((l) => [...l]);
    r[li[0]][co[0]] = r[li[0]][co[0]] === "0" ? "1" : "0";
    console.log("após correção igual ao original?", r.map((l) => l.join("")).join() === bloco.join());
  }
}
