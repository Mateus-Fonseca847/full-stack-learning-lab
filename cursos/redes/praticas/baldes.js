// Leaky bucket (balde furado) x Token bucket (balde de fichas) — aula 4.
// Cada pacote chega como [instante_s, tamanho]. O leaky DESCARTA o excesso;
// o token ATRASA o excesso.

function leaky(chegadas, capacidade, taxa) {
  let nivel = 0, tAnt = 0;
  return chegadas.map(([t, tam]) => {
    nivel = Math.max(0, nivel - (t - tAnt) * taxa);
    tAnt = t;
    if (nivel + tam <= capacidade) {
      nivel += tam;
      return [t, tam, `aceito (balde=${nivel.toFixed(0)})`];
    }
    return [t, tam, "DESCARTADO (balde cheio)"];
  });
}

// Gera r fichas/s, guarda até b. Se faltar ficha o pacote ESPERA (fila FIFO).
function token(chegadas, b, r) {
  let fichas = b, relogio = 0;
  return chegadas.map(([t, tam]) => {
    const inicio = Math.max(t, relogio);                 // fila: espera o anterior sair
    fichas = Math.min(b, fichas + (inicio - relogio) * r);
    relogio = inicio;
    if (fichas < tam) {                                  // falta ficha: espera acumular
      const espera = (tam - fichas) / r;
      relogio += espera;
      fichas += espera * r;
    }
    fichas -= tam;
    return [t, tam, `sai em t=${relogio.toFixed(2)}s (atraso ${(relogio - t).toFixed(2)}s)`];
  });
}

module.exports = { leaky, token };

if (require.main === module) {
  const rajada = [[0.0, 400], [0.1, 400], [0.2, 400], [0.3, 400], [2.0, 400]];
  console.log("LEAKY  (capacidade=800 B, taxa=200 B/s)");
  leaky(rajada, 800, 200).forEach((l) => console.log("  ", l));
  console.log("\nTOKEN  (b=1000 fichas, r=200 fichas/s)");
  token(rajada, 1000, 200).forEach((l) => console.log("  ", l));
}
