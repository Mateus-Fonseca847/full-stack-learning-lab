// Campo Duração / NAV (aula 08): quanto tempo os vizinhos devem ficar calados.
// Uso: node nav_duracao.js [bytes_dados] [taxa_dados_Mbps]
const bytes = Number(process.argv[2]) || 1500;
const taxa = Number(process.argv[3]) || 54;       // Mbps
const SIFS = 16;                                  // µs (802.11a)
const tx = (b, mbps) => (b * 8) / mbps;           // µs (sem contar o preâmbulo do PHY)

const tPkt = tx(bytes, taxa), tCTS = tx(14, 6), tACK = tx(14, 6);
const durRTS = tPkt + tCTS + tACK + 3 * SIFS;     // slide: T(pkt)+T(CTS)+T(ACK)+3·SIFS
const durCTS = tPkt + tACK + 2 * SIFS;            // slide: T(pkt)+T(ACK)+2·SIFS
console.log(`quadro de ${bytes} B a ${taxa} Mbps: T(pkt) = ${tPkt.toFixed(1)} µs | T(CTS)=T(ACK) = ${tCTS.toFixed(1)} µs | SIFS = ${SIFS} µs`);
console.log(`Duração no RTS = ${durRTS.toFixed(1)} µs   (NAV de quem ouve o RTS)`);
console.log(`Duração no CTS = ${durCTS.toFixed(1)} µs   (NAV de quem ouve só o CTS, a estação escondida)`);
console.log("\nIFS: PIFS = SIFS + slot; DIFS = SIFS + 2·slot; EIFS = SIFS + T(ACK) + DIFS");
const slot = 9, PIFS = SIFS + slot, DIFS = SIFS + 2 * slot, EIFS = SIFS + tACK + DIFS;
console.log(`(slot = ${slot} µs)  SIFS=${SIFS}  PIFS=${PIFS}  DIFS=${DIFS}  EIFS=${EIFS.toFixed(1)}  µs`);
