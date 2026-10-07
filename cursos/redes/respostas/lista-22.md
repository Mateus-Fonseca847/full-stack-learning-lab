# Respostas — Lista 22: PDH e SDH

Lista: [`listas/lista-22.md`](../listas/lista-22.md) · Aula: [`aulas/22-pdh-e-sdh.md`](../aulas/22-pdh-e-sdh.md)

> Respostas **resumidas**: servem para conferir seu raciocínio. Para o detalhe, volte à aula. Se a professora ensinou de outro jeito, vale o que está no seu material.

## 1. *(P2·Docx)*

> O que é PDH? Descreva o padrão E1: canais, bits por quadro, taxa, duração do quadro e enquadramento/alinhamento.

Hierarquia **plesiócrona** (relógios independentes, justificação por stuffing). **E1:** **32 canais** × 8 bits = **256 bits/quadro**, **8000 quadros/s** → **2,048 Mbps**, quadro de **125 µs**; alinhamento por **FAS** no canal 0.

## 2. *(P2·Docx)*

> Quais as funções dos canais 0 e 16 no E1?

**Canal 0:** sincronismo/alinhamento de quadro (FAS), alarmes, CRC-4. **Canal 16:** **sinalização** dos 30 canais úteis (CAS ou CCS).

## 3. *(P2·Docx)*

> Cite e explique as limitações das redes PDH.

**Sem acesso direto** (precisa demultiplexar toda a hierarquia); hierarquias **incompatíveis** (E×T×J); **pouco OAM**; taxas **baixas** e **sem interface óptica padrão**; sem proteção/sincronismo padronizados.

## 4. *(P2·Docx)*

> O que é SDH? Descreva suas principais características.

Padrão **ITU-T G.707** de transporte **síncrono**: **taxas padronizadas** (STM-1 155,52 Mbps...), **acesso direto por ponteiros**, **overhead rico (OAM)**, interfaces ópticas padrão, proteção < 50 ms, transporta PDH/ATM/IP.

## 5. *(P2·Docx)*

> Conceitue seção de regeneração, seção de multiplexação e seção de caminho. Dê exemplos de equipamentos de cada seção.

**RS:** entre elementos adjacentes (regeneradores). **MS:** entre multiplexadores, atravessando regeneradores (**TM, ADM, SDXC**). **Caminho:** fim a fim do **VC** (**TM/ADM** nas portas tributárias).

## 6. *(P2·Docx)*

> Descreva o padrão STM-1: bits por quadro (overhead e payload), taxa e duração. Por que é necessário um ponteiro?

**9 × 270 = 2430 bytes = 19.440 bits**; **SOH = 81 B** (9×9), **VC-4 = 2349 B**; **125 µs**; **155,52 Mbps**. O **ponteiro** diz onde o VC começa (o VC “flutua”), absorvendo diferenças de relógio e permitindo **acesso direto** sem demultiplexar.

## 7. *(P2·Docx)*

> O que é e por que é usada concatenação em redes SDH? Descreva mapeamento, alinhamento, multiplexação e stuffing.

**Concatenação** transporta fluxos **maiores que um VC-4** como um só pipe (contígua **VC-4-Xc** ou **virtual VCAT**). **Mapeamento:** sinal no contêiner C-n com **stuffing**; **alinhamento:** POH + ponteiro (VC → TU/AU); **multiplexação:** entrelaçamento de bytes até formar o STM-N.

## 8. *(P2·Docx)*

> Quais as funções de TM, ADM e SDXC? Quais as topologias típicas das redes SDH?

**TM:** terminal, multiplexa tributários em STM-N. **ADM:** insere/extrai tributários no meio do caminho. **SDXC:** comuta VCs entre portas (malha/provisionamento). Topologias: **ponto a ponto, linear, anel, estrela e malha**.

## 9. *(P2·Docx)*

> O que é aprovisionamento? Como é feito o sincronismo no SDH e por que é tão importante?

**Aprovisionamento:** configurar (via NMS) circuitos, VCs, cross-connects e proteção. **Sincronismo:** relógio de referência **PRC** distribuído hierarquicamente (SSM no byte S1). Importante para evitar **slips, jitter/wander** e ajustes excessivos de ponteiro.

## 10. *(P2·Docx)*

> O que é proteção? Explique as modalidades de proteção possíveis no SDH.

**Comutação automática** para recurso reserva em **< 50 ms**. **MSP 1+1** (envio duplicado), **MSP 1:1/1:N** (reserva compartilhada), **anel MS-SPRing** (reserva compartilhada; dá a volta) e **SNCP** (proteção por caminho, tráfego nos dois sentidos).

## 11.

> Mostre que a taxa do E1 é 2,048 Mbps e a do T1 é 1,544 Mbps.

**E1:** 32·8·8000 = **2.048.000 bps**. **T1:** 24 canais·8 bits + 1 bit de enquadramento = 193 bits/quadro × 8000 = **1.544.000 bps**.

## 12.

> Quantos E1 cabem em um STM-1? E em um STM-4? Qual a taxa do STM-16 e a taxa útil do VC-4?

STM-1: 3×7×3 = **63 E1**. STM-4: 4 × 63 = **252 E1**. STM-16 = 16 × 155,52 = **2,488 Gbps**. Taxa do VC-4 = 2349·8·8000 = **150,336 Mbps**.
