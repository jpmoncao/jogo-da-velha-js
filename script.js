const cardResultado = document.querySelector('#card-resultado');

// Variavel que vai controlar se é "X" ou "O"
let either = 'x';
const tentativas = {
    'x': [],
    'o': []
};
const condicoesVitoria = [
    // HORIZONTAL
    ['btn-1', 'btn-2', 'btn-3'],
    ['btn-4', 'btn-5', 'btn-6'],
    ['btn-7', 'btn-8', 'btn-9'],
    // VERTICAL
    ['btn-1', 'btn-4', 'btn-7'],
    ['btn-2', 'btn-5', 'btn-8'],
    ['btn-3', 'btn-6', 'btn-9'],
    // DIAGONAL
    ['btn-1', 'btn-5', 'btn-9'],
    ['btn-3', 'btn-5', 'btn-7'],
]

const trocarVez = () => {
    if (either === 'x')
        either = 'o';
    else
        either = 'x';

    cardResultado.className = "";
    cardResultado.classList.add(either)
    cardResultado.querySelector('h1').innerHTML = 'Vez do jogador:';
    cardResultado.querySelector('p').innerHTML = `${either === 'x' ? 'VERMELHO' : 'AZUL'} (${either.toUpperCase()})`;
}

const analisarVitoria = () => {
    let terminou = false;

    condicoesVitoria.forEach((condicao, index) => {
        if (condicao.every(item => tentativas[either].includes(item))) {
            terminarJogo(either, index)
            terminou = true;
        }
    })

    return terminou;
}

const terminarJogo = (vitoria, condicao) => {
    cardResultado.className = "";
    cardResultado.classList.add(vitoria)
    cardResultado.querySelector('h1').innerHTML = `Vitória: ${either.toUpperCase()}`;
    cardResultado.querySelector('p').innerHTML = 'Clique em "Reiniciar jogo" para jogar novamente!';

    document.querySelectorAll('.quadrado').forEach(btn => {
        btn.disabled = true
    });

    desenharLinhaVitoria(vitoria, condicao)
}

const terminarJogoEmVelha = () => {
    cardResultado.className = "";
    cardResultado.querySelector('h1').innerHTML = `Deu velha 👵`;
    cardResultado.querySelector('p').innerHTML = 'Clique em "Reiniciar jogo" para jogar novamente!';

    document.querySelectorAll('.quadrado').forEach(btn => {
        btn.disabled = true
    });
}

function desenharLinhaVitoria(vitoria, condicao) {
    const linha = document.getElementById("linha-vitoria");
    linha.classList.add(vitoria)
    linha.style.display = "block";

    console.log({
        condicao,
        medida: (document.querySelector('#btn-1').getBoundingClientRect().x) + 'px'
    })

    switch (condicao) {
        case 0:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y + 72) + 'px';
            linha.style.left = (document.querySelector('#btn-1').getBoundingClientRect().x) + 'px';
            linha.style.width = "396px";
            break;
        case 1:
            linha.style.top = (document.querySelector('#btn-4').getBoundingClientRect().y + 72) + 'px';
            linha.style.left = (document.querySelector('#btn-1').getBoundingClientRect().x) + 'px';
            linha.style.width = "396px";
            break;
        case 2:
            linha.style.top = (document.querySelector('#btn-7').getBoundingClientRect().y + 72) + 'px';
            linha.style.left = (document.querySelector('#btn-1').getBoundingClientRect().x) + 'px';
            linha.style.width = "396px";
            break;
        case 3:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y + 16) + 'px';
            linha.style.left = (document.querySelector('#btn-1').getBoundingClientRect().x + 68) + 'px';
            linha.style.height = "384px";
            break;
        case 4:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y + 16) + 'px';
            linha.style.left = (document.querySelector('#btn-2').getBoundingClientRect().x + 68) + 'px';
            linha.style.height = "384px";
            break;
        case 5:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y + 16) + 'px';
            linha.style.left = (document.querySelector('#btn-3').getBoundingClientRect().x + 68) + 'px';
            linha.style.height = "384px";
            break;
        case 6:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y - 70) + 'px';
            linha.style.left = (document.querySelector('#btn-2').getBoundingClientRect().x + 68) + 'px';
            linha.style.height = "540px";
            linha.style.transform = "rotate(-45deg)";
            break;
        case 7:
            linha.style.top = (document.querySelector('#btn-1').getBoundingClientRect().y - 70) + 'px';
            linha.style.left = (document.querySelector('#btn-2').getBoundingClientRect().x + 68) + 'px';
            linha.style.height = "540px";
            linha.style.transform = "rotate(45deg)";
            break;
    }
}

const marcarQuadrado = (elem) => {
    elem.innerHTML = either.toUpperCase();

    elem.className = "";
    elem.classList.add('quadrado')
    elem.classList.add(either)

    elem.disabled = true;

    tentativas[either].push(elem.id)

    if (analisarVitoria())
        return

    if (tentativas.x.length + tentativas.o.length >= 9)
        return terminarJogoEmVelha();

    trocarVez();
}