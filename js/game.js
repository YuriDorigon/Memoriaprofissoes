// Seleciona os elementos do DOM
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Nome dos arquivos de imagem das profissões
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

  if (disabledCards.length === 20) {
    clearInterval(this.loop); // Para o cronômetro
    setTimeout(() => {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos.`);
      resetGame(); // Reinicia o jogo após o alerta ser fechado
    }, 100); // Timeout para dar tempo de todas as cartas serem desabilitadas
  }
}

// Função que verifica se as duas cartas selecionadas são iguais
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    // Se as cartas forem iguais, desativa-as
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame(); // Verifica se o jogo terminou

  } else {
    // Se as cartas não forem iguais, vira-as novamente após 500ms
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

// Função que revela a carta quando clicada
const revealCard = ({ target }) => {
  // Certifica-se de que a classe 'reveal-card' não está sendo aplicada ao grid
  if (target.parentNode.classList.contains('grid')) {
    console.log("Clique no grid ignorado");
    return;
  }

  // Se a carta já estiver virada, não faz nada
  if (target.parentNode.classList.contains('reveal-card')) {
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
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  // Adiciona evento de clique apenas às cartas
  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

// Função que carrega o jogo, criando todas as cartas e adicionando-as ao grid
const loadGame = () => {
  const duplicateProfissoes = [...Profissoes, ...Profissoes]; // Duplica o array de profissões

  // Embaralha o array de profissões duplicado
  const shuffledArray = duplicateProfissoes.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

// Função que inicia o cronômetro do jogo
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

// Função que reinicia o jogo
const resetGame = () => {
  // Limpa o grid
  grid.innerHTML = '';

  // Reinicia o cronômetro
  clearInterval(this.loop);
  timer.innerHTML = '00';

  // Reinicia as variáveis de controle
  firstCard = '';
  secondCard = '';

  // Recarrega o jogo
  startTimer();
  loadGame();
}

// Função que é executada quando a página é carregada
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
