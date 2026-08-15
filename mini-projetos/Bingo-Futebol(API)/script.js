//const apiKey = digite sua api key aqui
const urlAPI = "https://v3.football.api-sports.io"

const fotoJogador = document.getElementById("fotoJogador")
const fotoPlaceholder = document.getElementById("fotoPlaceholder")
const nomeJogador = document.getElementById("nomeJogador")
const botaoPular = document.getElementById("botaoPular")
const mensagemApi = document.getElementById("mensagemApi")
const casasBingo = document.querySelectorAll(".casa-bingo")
const modalPontuacao = document.getElementById("modalPontuacao")
const pontuacaoFinal = document.getElementById("pontuacaoFinal")
const botaoJogarNovamente = document.getElementById("botaoJogarNovamente")
const timerJogador = document.getElementById("timerJogador")
const tituloModal = document.getElementById("tituloModal")
const mensagemModal = document.getElementById("mensagemModal")

let timesDaCartela = []
let jogadoresDoJogo = []
let jogadorAtual = null
let jogadas = []
let quantidadeJogadoresExibidos = 0
let quantidadePulos = 0
let segundosRestantes = 10
let intervaloTimer = null
let rodadaAtiva = false
let jogoEncerrado = false
const tempoPorJogador = 10
const limiteJogadores = 12
const limitePulos = 3

const jogadoresSorteados = new Set()


async function buscarJogadores() {

    const resposta = await fetch(
        `${urlAPI}/players/topscorers?league=71&season=2024`,
        {
            headers: {
                "x-apisports-key": apiKey
            }
        }
    )

    if (!resposta.ok) {
        throw new Error("Erro ao buscar jogadores")
    }

    const dados = await resposta.json()

    return dados.response
}

function organizarJogadores(jogadoresRecebidos) {

    return jogadoresRecebidos.map((item) => {

        const estatisticas = item.statistics[0]

        return {
            id: item.player.id,
            nome: item.player.name,
            foto: item.player.photo,

            timeId: estatisticas.team.id,
            timeNome: estatisticas.team.name,
            timeLogo: estatisticas.team.logo
        }
    })
}

function buscarTimesDosJogadores(jogadores) {

    const timesEncontrados = new Map()

    jogadores.forEach((jogador) => {

        if (!timesEncontrados.has(jogador.timeId)) {

            timesEncontrados.set(
                jogador.timeId,
                {
                    id: jogador.timeId,
                    nome: jogador.timeNome,
                    logo: jogador.timeLogo
                }
            )
        }
    })

    return Array.from(timesEncontrados.values())
}

function embaralhar(lista) {

    const listaEmbaralhada = [...lista]

    for (let i = listaEmbaralhada.length - 1; i > 0; i--) {

        const indiceAleatorio =
            Math.floor(Math.random() * (i + 1))

        const itemTemporario = listaEmbaralhada[i]

        listaEmbaralhada[i] =
            listaEmbaralhada[indiceAleatorio]

        listaEmbaralhada[indiceAleatorio] =
            itemTemporario
    }

    return listaEmbaralhada
}

function montarCartela() {

    casasBingo.forEach((casa, indice) => {

        const time = timesDaCartela[indice]

        casa.dataset.timeId = time.id

        const imagem = casa.querySelector(".logo-casa")

        console.log("TIME:", time)
        console.log("URL DO ESCUDO:", time.logo)
        imagem.src = time.logo
        imagem.alt = `Escudo do ${time.nome}`

        casa.disabled = false

        casa.classList.remove(
            "selecionada",
            "correta",
            "errada"
        )
    })
}

function sortearJogador() {

    cancelarTemporizador()


    if (jogoEncerrado) {
        return
    }


    if (
        quantidadeJogadoresExibidos >= limiteJogadores
    ) {

        finalizarGameOver()

        return
    }


    const jogadoresDisponiveis =
        jogadoresDoJogo.filter(
            (jogador) =>
                !jogadoresSorteados.has(jogador.id)
        )


    if (jogadoresDisponiveis.length === 0) {

        finalizarGameOver()

        return
    }


    const indiceAleatorio =
        Math.floor(
            Math.random() *
            jogadoresDisponiveis.length
        )


    jogadorAtual =
        jogadoresDisponiveis[indiceAleatorio]


    jogadoresSorteados.add(
        jogadorAtual.id
    )


    quantidadeJogadoresExibidos++


    mostrarJogador()


    rodadaAtiva = true


    iniciarTemporizador()
}
function mostrarJogador() {

    fotoJogador.src = jogadorAtual.foto

    fotoJogador.alt =
        `${jogadorAtual.nome}`

    nomeJogador.textContent =
        jogadorAtual.nome

    fotoPlaceholder.style.display = "none"

    fotoJogador.style.display = "block"
}

function marcarCasa(evento) {

    if (
        !jogadorAtual ||
        !rodadaAtiva ||
        jogoEncerrado
    ) {
        return
    }


    rodadaAtiva = false

    cancelarTemporizador()


    const casaClicada =
        evento.currentTarget


    const idTimeClicado =
        Number(
            casaClicada.dataset.timeId
        )


    const acertou =
        idTimeClicado ===
        jogadorAtual.timeId


    jogadas.push({

        jogadorId:
            jogadorAtual.id,

        jogadorNome:
            jogadorAtual.nome,

        timeId:
            idTimeClicado,

        correto:
            acertou,

        casa:
            casaClicada
    })


    casaClicada.classList.add(
        "selecionada"
    )

    casaClicada.disabled = true


    if (jogadas.length === 9) {

        finalizarJogo()

        return
    }


    sortearJogador()
}

function revelarResultados() {

    jogadas.forEach((jogada) => {

        const casa = jogada.casa

        casa.classList.remove("selecionada")

        if (jogada.correto) {
            casa.classList.add("correta")
        } else {
            casa.classList.add("errada")
        }
    })
}

function calcularPontuacao() {

    const acertos = jogadas.filter(
        (jogada) => jogada.correto
    )

    return acertos.length
}

function finalizarJogo() {

    if (jogoEncerrado) {
        return
    }


    jogoEncerrado = true

    rodadaAtiva = false

    jogadorAtual = null


    cancelarTemporizador()


    botaoPular.hidden = true


    revelarResultados()


    const pontuacao =
        calcularPontuacao()


    tituloModal.textContent =
        "Fim de jogo"


    mensagemModal.textContent =
        "Sua pontuação foi:"


    pontuacaoFinal.textContent =
        `${pontuacao}/9`


    setTimeout(() => {

        modalPontuacao.classList.add(
            "aberto"
        )

    }, 800)
}

botaoPular.addEventListener(
    "click",
    () => {

        if (
            !rodadaAtiva ||
            jogoEncerrado
        ) {
            return
        }


        rodadaAtiva = false

        cancelarTemporizador()


        const conseguiuPular =
            consumirPulo()


        if (!conseguiuPular) {

            finalizarGameOver()

            return
        }


        sortearJogador()
    }
)

casasBingo.forEach((casa) => {

    casa.addEventListener("click", marcarCasa)

})

botaoJogarNovamente.addEventListener("click", () => {location.reload()})

async function iniciarJogo() {

    try {

        mensagemApi.textContent =
            "Carregando jogadores..."


        const jogadoresRecebidos =
            await buscarJogadores()


        jogadoresDoJogo =
            organizarJogadores(jogadoresRecebidos)


        const timesDisponiveis =
            buscarTimesDosJogadores(jogadoresDoJogo)


        if (timesDisponiveis.length < 9) {
            throw new Error(
                "Não existem times suficientes."
            )
        }


        timesDaCartela =
            embaralhar(timesDisponiveis).slice(0, 9)


        const idsTimesDaCartela =
            timesDaCartela.map(
                (time) => time.id
            )


        jogadoresDoJogo =
            jogadoresDoJogo.filter(
                (jogador) =>
                    idsTimesDaCartela.includes(
                        jogador.timeId
                    )
            )


        montarCartela()

        sortearJogador()

        mensagemApi.textContent = ""

    } catch (erro) {

        console.error(erro)

        mensagemApi.textContent =
            "Não foi possível iniciar o jogo."
    }
}

function atualizarTimer() {

    timerJogador.textContent =
        `${segundosRestantes}s`

    if (segundosRestantes <= 3) {

        timerJogador.classList.add("urgente")

    } else {

        timerJogador.classList.remove("urgente")
    }
}

function cancelarTemporizador() {

    if (intervaloTimer !== null) {

        clearInterval(intervaloTimer)

        intervaloTimer = null
    }
}

function iniciarTemporizador() {

    cancelarTemporizador()

    segundosRestantes = tempoPorJogador

    atualizarTimer()


    intervaloTimer = setInterval(() => {

        segundosRestantes--

        atualizarTimer()


        if (segundosRestantes <= 0) {

            cancelarTemporizador()

            tempoEsgotado()
        }

    }, 1000)
}

function consumirPulo() {

    if (quantidadePulos >= limitePulos) {
        return false
    }

    quantidadePulos++

    if (quantidadePulos >= limitePulos) {
        botaoPular.hidden = true
    }

    return true
}

function tempoEsgotado() {

    if (!rodadaAtiva || jogoEncerrado) {
        return
    }

    rodadaAtiva = false


    const conseguiuPular =
        consumirPulo()


    if (!conseguiuPular) {

        finalizarGameOver()

        return
    }


    sortearJogador()
}

function finalizarGameOver() {

    if (jogoEncerrado) {
        return
    }


    jogoEncerrado = true

    rodadaAtiva = false

    jogadorAtual = null


    cancelarTemporizador()


    botaoPular.hidden = true


    revelarResultados()


    const pontuacao =
        calcularPontuacao()


    tituloModal.textContent =
        "Game Over"


    mensagemModal.textContent =
        "O tempo acabou e você não tinha mais pulos."


    pontuacaoFinal.textContent =
        `${pontuacao}/9`


    setTimeout(() => {

        modalPontuacao.classList.add(
            "aberto"
        )

    }, 800)
}

iniciarJogo()