# Lista 01 — Fundamentos de redes

Aula: [`aulas/01-fundamentos.md`](../aulas/01-fundamentos.md) · Respostas: [`respostas/lista-01.md`](../respostas/lista-01.md)

[Índice](../README.md) · [Lista 02 →](lista-02.md)

> Tente resolver **no papel** antes de abrir o gabarito.

## Questões das listas da professora

1. *(P1·L2 q.1)* Faça um esquema ilustrando um modelo de um sistema de comunicação.

R= Componentes: Mensagem, Emisssor, Receptor, Meio, Protocolo
A mensagem percorre o seguinte caminho:
Emissor -> Meio -> Receptor
O Protocolo valida esse processo e garante o entendimento entre as partes durante o processo

2. *(P1·L2 q.2)* Quais são as funções de uma rede de comunicação de dados?

R = 
1- Identificar todos os elementos e estabelecer endereços diferentes para cada um
2- especificar um formato de interoperação entre eles, garantir que a comunicação entre elementos exista (falem a mesma lingua)
3- Definir uma arquitetura para todo o processo, decide qual peça faz o que.

3. *(P1·L2 q.3)* Quais são os principais indicadores de eficácia de uma rede de dados?

R= 
Entrega: Define SE o dado chegou ao destino certo
Precisão: Verifica se o dado sofreu mudanças indevidas durante o processo de entrega 
Sincronização: Garante a eficiencia no TEMPO de entrega, se a informação chegou a tempo de ser útil.

4. *(P1·L2 q.4)* Como as redes podem ser classificadas? Dê exemplos.

R= 
Modo de comunicação{
Simplex: Quando ocorre uma comunicação unilateral (mouse, teclado)
Half-Duplex: Quando ocorre comunicação bilateral, mas não simultanea (walkie-talkie)
Full-Duplex: Quando ocorre comunicação bilateral simultanea (Ligações de celular)
}
Modo de conexão{
Ponto a ponto: estabelece comunicação apenas entre dois elementos
Multiponto: estabelece comunicação entre varios elementos
}
Topologia{
Malha: Correlaciona todos os elementos com caminhos alternativos; Não divide o meio
Estrela: Possui um centro que intermedia a comunicação entre os elementos; Não divide o meio em caso de switch (o mais moderno)
Anel: Um ciclo que interliga todos os elementos; Divide o meio
Barramento: Um único fio que liga todos os elementos; Divide o meio
}
Abrangencia geográfica{
PAN: Personal Area Network (bluetooth, celular -> fone)
LAN: Local Area Network (Wifi, Casa)
MAN: Metropolitan Area Network (TV a cabo, cidade)
WAN: Wide Area Network (Internet, país ou continente)
SAN: Storage Area Network (Fibre Channel, Área limitada)
}

5. *(P1·L2 q.5)* Qual a diferença entre conexão ponto a ponto e conexão multiponto?

R= 
Conexão ponto a ponto estabelece comunicação APENAS entre dois elementos.
A conexão multipontos estabelece comunicação entre diversos elementos de duas formas:
Multicast: Conexão entre o emissor e alguns receptores escolhidos.
Broadcast: Conexão entre o emissor e todos os receptores presentes na rede.

6. *(P1·L2 q.6)* Qual é a diferença entre topologia física e topologia lógica?

R= 
Topologia física: o desenho da rede toda, ou seja, como cabos, enlaces e dispositivos estão dispostos fisicamente.
Topologia lógica: como os dados circulam pela rede, independente de como está o cabeamento.

7. *(P1·L2 q.7)* Explique detalhadamente a topologia em barramento, citando vantagens e desvantagens.

R= 
Vantagens:Fácil de instalar; Usa apenas um cabo; Barato para redes pequenas.
Desvantagens: Sinal perde a força com a distância; Pode ocorrer problemas se acontecer uma transmissão de duas fontes ao mesmo tempo; Depende muito de um só cabo.

8. *(P1·L2 q.8)* Por que se usa o compartilhamento do meio físico? Quais suas vantagens e desvantagens? Dê exemplos de topologias onde o compartilhamento ocorre.

R= 
Onde ocorre: Anel e Barramento
Vantagens: Custos reduzidos
Desvantagens: Divide a velocidade, causa colisões, expõe a rede a riscos.

## Exercícios extras de fixação

10. Uma rede em **malha completa** tem 8 estações. Quantos enlaces são necessários? E quantas portas em cada estação? Repita para 12 estações.

R= 
8*7/2 = 28
São necessarios 28 enlaces em caso de 8 estações e 7 portas por estação (Todos os elementos menos o próprio).
12*11/2 = 66
São necessarios 66 enlaces em caso de 12 estações e 11 portas por estação (Todos os elementos menos o próprio).

11. Classifique cada exemplo quanto ao modo de comunicação (simplex, half ou full-duplex) e quanto à abrangência (PAN, LAN, MAN, WAN): (a) fone Bluetooth ligado ao celular, (b) rede Wi-Fi de uma casa, (c) TV a cabo de uma cidade, (d) rádio comunicador usado pela segurança do prédio, (e) ligação telefônica.

R = 
a- simplex (celular -> fone) & PAN
b- half-duplex & LAN
c - simplex (cabo -> TV) & MAN
d - half-duplex & LAN
e - full-duplex & WAN
---

**Legenda das fontes:** `P1·L1`…`P1·L5` = listas da P1 (partes 1 a 5) · `extra` = exercício de fixação criado para o curso
