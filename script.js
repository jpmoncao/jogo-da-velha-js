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

    condicoesVitoria.forEach(condicao => {
        if (condicao.every(item => tentativas[either].includes(item))) {
            terminarJogo(either, condicao)
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
}

const terminarJogoEmVelha = () => {
    cardResultado.className = "";
    cardResultado.querySelector('h1').innerHTML = `Deu velha 👵`;
    cardResultado.querySelector('p').innerHTML = 'Clique em "Reiniciar jogo" para jogar novamente!';

    document.querySelectorAll('.quadrado').forEach(btn => {
        btn.disabled = true
    });
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