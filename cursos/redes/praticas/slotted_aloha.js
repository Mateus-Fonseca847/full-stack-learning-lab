// Simulação do Slotted Aloha (aula 11).
// N nós; em cada intervalo, cada nó com quadro pronto transmite com prob. p.
// Sucesso = exatamente 1 transmissor. Teoria (N grande): slotted ≈ 1/e ≈ 0.368,
// Aloha puro ≈ 1/(2e) ≈ 0.184.

// gerador pseudoaleatório com semente (mulberry32), para o resultado ser reproduzível
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function eficiencia(n, p, slots = 200000, seed = 1) {
  const rnd = rng(seed);
  let ok = 0;
  for (let s = 0; s < slots; s++) {
    let tx = 0;
    for (let i = 0; i < n; i++) if (rnd() < p) tx++;
    if (tx === 1) ok++;
  }
  return ok / slots;
}

module.exports = { eficiencia };

if (require.main === module) {
  const n = 20;
  console.log(`N=${n} nós — fração de intervalos com sucesso (Slotted Aloha)`);
  for (const p of [0.02, 0.05, 0.1, 0.2, 0.4]) {
    const marca = Math.abs(p - 1 / n) < 1e-9 ? "  <- p = 1/N (ótimo)" : "";
    console.log(`  p=${p.toFixed(2)}  eficiência=${eficiencia(n, p).toFixed(3)}${marca}`);
  }
  console.log("\nlimite teórico (N→∞): slotted = 0.368 | aloha puro = 0.184");
}
