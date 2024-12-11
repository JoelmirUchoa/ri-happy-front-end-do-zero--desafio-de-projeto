// Array de emojis duplicados para o jogo de memória
const emojis = [
    "🤑",
    "🤑",
    "🐶",
    "🐶",
    "🐱",
    "🐱",
    "🦝",
    "🦝",
    "😍",
    "😍",
    "👾",
    "👾",
    "😀",
    "😀",
    "🐵",
    "🐵",
];

// Array para armazenar as cartas abertas
let openCards = [];

// Embaralha os emojis aleatoriamente
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Cria os elementos das cartas e os adiciona ao HTML
for(let i = 0; i < emojis.length; i++){
    let box = document.createElement("div"); // Cria uma nova div para cada carta
    box.className = "item"; // Adiciona a classe "item" à div
    box.innerHTML = shuffleEmojis[i]; // Define o emoji embaralhado como conteúdo da div
    box.onclick = handleClick; // Define a função de clique para a div
    document.querySelector(".game").appendChild(box); // Adiciona a div à div principal com a classe "game"
}

// Função que é chamada quando uma carta é clicada
function handleClick(){
    if (openCards.length < 2){
        this.classList.add("boxOpen"); // Adiciona a classe "boxOpen" à carta clicada
        openCards.push(this); // Adiciona a carta ao array de cartas abertas
    }

    // Verifica se duas cartas foram abertas
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500); // Aguarda 500ms antes de verificar se as cartas são iguais
    }
}

// Função para verificar se as duas cartas abertas são iguais
function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch"); // Adiciona a classe "boxMatch" às cartas iguais
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen"); // Remove a classe "boxOpen" das cartas diferentes
        openCards[1].classList.remove("boxOpen");
    }

    // Limpa o array de cartas abertas para a próxima jogada
    openCards = [];

    // Verifica se todas as cartas foram combinadas
    if (document.querySelectorAll(".boxMatch").length === emojis.length){
        alert("Você venceu !"); // Exibe uma mensagem de vitória
    }
}
