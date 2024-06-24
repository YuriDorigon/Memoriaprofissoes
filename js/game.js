// Aqui é a parte do jogo, onde vai ter tudo


// Abaixo são as constantes de organização da página:
// GRID = Grade do jogo que vai conter todas as cartas
// Player = Nome do participante que será exibido na tela
// Timer = Cronômetro que marca o tempo do jogo
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


// Aqui temos o nome de cada arquivo de imagem, representando as profissões que aparecerão nas cartas do jogo
const Profissoes = [
  'barman',
  'cantor',
  'cientista',
  'empresario',
  'medico',
  'policial',
  'presidente',
  'professor',
  'psicologa',
  'reporter',
];

// Função para criar um novo elemento
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = ''; // Armazena a primeira carta selecionada pelo jogador
let secondCard = ''; // Armazena a segunda carta selecionada pelo jogador

// Função que verifica se todas as cartas foram combinadas e encerra o jogo
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  // Se todas as 20 cartas estiverem desabilitadas, o jogo termina
  if (disabledCards.length === 20) {
    clearInterval(this.loop); // Para o cronômetro
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`); // Exibe uma mensagem de parabéns
  }
}

// Função que verifica se as duas cartas selecionadas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    // Se as cartas forem iguais, adiciona a classe 'disabled-card' para manter a carta virada e deixar cinza 
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = ''; // Reseta a variável da primeira carta
    secondCard = ''; // Reseta a variável da segunda carta

    checkEndGame(); // Verifica se o jogo terminou

  } else {
    // Se as cartas não forem iguais, vira-as novamente após 500ms
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = ''; // Reseta a variável da primeira carta
      secondCard = ''; // Reseta a variável da segunda carta
    }, 500);
  }
}

// Função que revela a carta quando clicada
const revealCard = ({ target }) => {

  // Se a carta já estiver virada, não faz nada
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  // Se é a primeira carta a ser selecionada
  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  // Se é a segunda carta a ser selecionada
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards(); // Verifica se as cartas são iguais
  }
}

// Função que cria uma nova carta com a imagem da profissão especificada
const createCard = (character) => {
  const card = createElement('div', 'card'); // Cria o elemento da carta
  const front = createElement('div', 'face front'); // Cria a face frontal da carta
  const back = createElement('div', 'face back'); // Cria a face traseira da carta

  // Define a imagem de fundo da face frontal da carta
  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front); // Adiciona a face frontal à carta
  card.appendChild(back); // Adiciona a face traseira à carta

  card.addEventListener('click', revealCard); // Adiciona o evento de clique à carta
  card.setAttribute('data-character', character); // Define um atributo 'data-character' com o nome da profissão

  return card;
}

// Função que carrega o jogo, criando todas as cartas e adicionando-as ao grid
const loadGame = () => {
  const duplicateProfissoes = [...Profissoes, ...Profissoes]; // Duplica o array de profissões para criar pares

  // Embaralha o array de profissões duplicado
  const shuffledArray = duplicateProfissoes.sort(() => Math.random() - 0.5);

  // Para cada profissão no array embaralhado, cria uma carta e adiciona ao grid
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

// Função que inicia o cronômetro do jogo
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML; // Converte o tempo atual para um número
    timer.innerHTML = currentTime + 1; // Incrementa o tempo a cada segundo
  }, 1000);
}

// Função que é executada quando a página é carregada
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player'); // Define o nome do jogador a partir do localStorage
  startTimer(); // Inicia o cronômetro
  loadGame(); // Carrega o jogo com as cartas
}
