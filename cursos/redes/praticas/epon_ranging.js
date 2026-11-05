// EPON (aula 13): por que a OLT mede a distância (ranging) e como o GATE evita colisões.
// Uso: node epon_ranging.js
const VEL = 200;  // m/µs  (luz na fibra ≈ 2·10^8 m/s)  ->  5 µs por km
const onus = [
  { nome: "ONU A", km: 20 },   // longe
  { nome: "ONU B", km: 2 },    // perto
];
const atraso = (km) => (km * 1000) / VEL;          // µs, só ida
console.log("Ranging: distância = velocidade × RTT / 2");
for (const o of onus) {
  const rtt = 2 * atraso(o.km);
  console.log(`  ${o.nome}: RTT medido = ${rtt.toFixed(0)} µs  ->  distância = ${((VEL * rtt) / 2 / 1000).toFixed(1)} km`);
}

// A OLT concede janelas de 50 µs em sequência (no relógio da OLT): A em [0,50], B em [50,100].
const janela = 50;
function chegadas(comRanging) {
  return onus.map((o, i) => {
    const inicio = i * janela;                      // quando a OLT quer receber
    const a = atraso(o.km);
    // sem ranging a ONU transmite no instante do GATE e o sinal só atrasa; com ranging ela adianta a transmissão
    const chega = comRanging ? inicio : inicio + a;
    return { nome: o.nome, de: chega, ate: chega + janela };
  });
}
function mostra(titulo, lista) {
  console.log(`\n${titulo}`);
  lista.forEach((x) => console.log(`  ${x.nome} chega à OLT em [${x.de.toFixed(0)}, ${x.ate.toFixed(0)}] µs`));
  const [a, b] = lista;
  const colide = a.de < b.ate && b.de < a.ate;
  console.log(colide ? "  => COLISÃO: as rajadas se sobrepõem" : "  => sem sobreposição");
}
mostra("SEM ranging (cada ONU ignora seu atraso):", chegadas(false));
mostra("COM ranging (a ONU compensa o próprio atraso):", chegadas(true));
