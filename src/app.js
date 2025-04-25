const getCardValue = (num) => {
  if (num === 11) return 'J';
  if (num === 12) return 'Q';
  if (num === 13) return 'K';
  if (num === 1) return 'A';
  return num;
};

const generateDeck = (count) => {
  const suits = [
    { pinta: '♦', color: 'red' },
    { pinta: '♥', color: 'red' },
    { pinta: '♠', color: 'black' },
    { pinta: '♣', color: 'black' }
  ];
  
  const getRandomCard = () => ({
    num: Math.floor(Math.random() * 13) + 1, // Genera un número entre 1 y 13
    suit: suits[Math.floor(Math.random() * suits.length)] // Escoge un palo aleatorio
  });

  return Array.from({ length: count }, getRandomCard);
};


// let log = [];
// let deck = [];

// const bubbleSort = (arr) => {
//   let wall = arr.length - 1; 
//   while (wall > 0) {
//     let index = 0;
//     while (index < wall) {
     
//       if (arr[index].num > arr[index + 1].num) { 
//         [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]; 
//         log.push(arr.slice()); 
//       }
//       index++;
//     }
//     wall--;
//   }
//   return arr;
// };

const selectSort = (arr) => {
  let min = 0;
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) { // <-- corregido el límite del for
      if (arr[min].num > arr[i].num) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
        log.push(arr.slice()); // <-- se guarda una copia del paso en el log
      }
    }
    min++;
  }
  return arr;
};



const renderCard = (card) => {
  if (!card || !card.suit || !card.suit.pinta) {
    console.error('Invalid card:', card);
    return '';
  }
  const suitClass = {
    '♦': 'diamond',
    '♥': 'heart',
    '♠': 'spade',
    '♣': 'club'
  }[card.suit.pinta];

  return `
    <div class="card ${suitClass}">
      <span class="corner top-left">${card.suit.pinta}</span>
      <span class="value">${getCardValue(card.num)}</span>
      <span class="corner bottom-right">${card.suit.pinta}</span>
    </div>
  `;
};

document.querySelector('#draw').addEventListener('click', () => {
  const count = parseInt(document.querySelector('#amount').value, 10);
  deck = generateDeck(count);
  console.log(deck);
  log = [];
  const generatedHTML = deck.map(renderCard).join('');
  console.log(generatedHTML); // Verifica el HTML generado
  document.querySelector('.deck.unsorted').innerHTML = generatedHTML;
  document.querySelector('.solution-log').innerHTML = '';
});

document.querySelector('#sort').addEventListener('click', () => {
  selectSort(deck);
  document.querySelector('.solution-log').innerHTML = log.map((step, i) => `
    <li>
      <i>Step ${i + 1}:</i>
      <div class="deck">${step.map(renderCard).join('')}</div>
    </li>
  `).join('');
  
});