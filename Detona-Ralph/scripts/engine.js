// Definindo um objeto chamado "state"
const state = {
    // Propriedade "view" que armazena referências a elementos HTML
    view: {
        // Seleciona todos(All) os elementos com a classe "square"
        squares: document.querySelectorAll(".square"),
        // Seleciona o elemento com a classe "enemy"
        enemy: document.querySelector(".enemy"),
        // Seleciona o elemento com o ID "time-left"
        timeLeft: document.querySelector("#time-left"),
        // Seleciona o elemento com o ID "score"
        score: document.querySelector("#score"),
    },
    // Valores do jogo
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    // Ações do jogo
    actions: {
        // Definindo intervalos para as ações de movimento e contagem regressiva
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

// Função para diminuir o tempo restante e verificar se o jogo acabou
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    // Verifica se o tempo acabou
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

// Função para selecionar um quadrado aleatório e adicionar a classe "enemy" a ele
function randomSquare() {
    // Remove a classe "enemy" de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gera um número aleatório entre 0 e 8 (assumindo que há 9 quadrados)
    let randomNumber = Math.floor(Math.random() * 9);
    // Seleciona o quadrado correspondente ao número aleatório
    let randomSquare = state.view.squares[randomNumber];
    // Adiciona a classe "enemy" ao quadrado selecionado
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// Função para adicionar listeners de eventos aos quadrados
function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Verifica se o quadrado clicado é o mesmo da posição "hit"
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

// Função de inicialização que chama a função addListenerHitbox
function init() {
    addListenerHitbox();
}

// Chama a função init para iniciar o programa
init();
