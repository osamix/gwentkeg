const button = document.querySelector('.ok');
const cardsPlace = document.querySelector('.cards');
const continueButton = document.querySelector('.pickthree');

const commonURL = 'https://api.gwentapi.com/v0/cards/rarities/gGlnI525WLailI_mBFFiSw?limit=62';
const rareURL = 'https://api.gwentapi.com/v0/cards/rarities/-naHV1zlVuCFll-j-7T1ow?limit=92';
const epicURL = 'https://api.gwentapi.com/v0/cards/rarities/V_ImiYfTVhG_WaAOof9Rxg?limit=114';
const legendaryURL = 'https://api.gwentapi.com/v0/cards/rarities/u0zNKy4EULa_VU4JD5r4EA?limit=89';
const urls = [commonURL, rareURL, epicURL, legendaryURL];

const cards = [];
const promises = urls.map(url => fetch(url).then(data => data.json().then(dat => cards.push(dat.results))));
let number = 0;
let fifthNumber = 0;
let numbers = [];
function countProb() {
  for(let i = 0; i < 4; i++) {
    number = parseFloat((Math.random() * 100).toFixed(2));
    numbers.push(number);
  }
  fifthNumber = parseFloat((Math.random() * 100).toFixed(2));
  console.log(numbers, fifthNumber);
}
let leCards = [];
let fifthCard = [];

function makeCards() {
  leCards = numbers.map(numb => {
    if (numb < 72.41) {
      return cards[0][Math.round(Math.random() * 62)].href;
    } else if (numb < 93.88) {
      return cards[2][Math.round(Math.random() * 92)].href;
    } else if (numb < 98.93) {
      return cards[3][Math.round(Math.random() * 114)].href;
    } else {
      return cards[1][Math.round(Math.random() * 89)].href;
    }
  });
  if (fifthNumber < 78) {
    for (let i = 0; i < 3; i++) {
      fifthCard.push(cards[2][Math.round(Math.random() * 92)].href);
    }
  } else if (fifthNumber < 96) {
    for (let i = 0; i < 3; i++) {
      fifthCard.push(cards[3][Math.round(Math.random() * 114)].href);
    }    
  } else {
    for (let i = 0; i < 3; i++) {
      fifthCard.push(cards[1][Math.round(Math.random() * 89)].href);
    }     
  }
}

function getCardData() {
  cardsPlace.classList.add('cardsfour');
  leCards.map(card => fetch(card).then(data => data.json().then(dat => {
    const cardName = dat.name.toUpperCase();
    const info = dat.info;
    const faction = dat.faction.name.split('').splice(0,2).join('');
    const rarity = dat.variations[0].rarity.name.toLowerCase();
    fetch(dat.variations[0].href).then(data => data.json().then(dat => {
      cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card ${rarity} shown" src="./src/${faction}.png"><img class="card-image hidden" src="${dat.art.mediumsizeImage}"></div><div class="cardname ${rarity} rolledin">${cardName}</div><div class="cardinfo ${rarity} rolledin">${info}</div></div></div>`;
    }));
  })));
  let cardBack = document.querySelectorAll('img');
  console.log(cardBack);
}


let cardImage;
let cardCount = 0;

function openkeg() {
  button.classList.remove('show');
  cardsPlace.innerHTML = '';
  cards.sort();
  countProb();
  makeCards();
  getCardData();

  cardImage = document.querySelectorAll('.card-image');
  console.log(cards);
  console.log(leCards);
  leCards = [];
  numbers = [];
}

cardsPlace.addEventListener('click', function (e) {
  console.log(cardCount);
  const cardB = e.target;
  const cardI = cardB.nextSibling;
  const cardN = cardI.parentNode.nextSibling;
  const cardO = cardN.nextSibling;
  if (cardB.classList.contains('shown')) {
    cardB.classList.remove('shown');
    cardB.classList.add('hidden');
    setTimeout( () => {
      cardI.classList.remove('hidden');
      cardI.classList.add('visible');
    }, 500);
    setTimeout( () => {
      cardN.classList.remove('rolledin');
      cardN.classList.add('rolledout');
    }, 1000);
    setTimeout( () => {
      cardO.classList.remove('rolledin');
      cardO.classList.add('rolledout');
      cardCount++;
      if (cardCount === 4) {
        continueButton.classList.add('show');
        cardCount = 0;
      }
    }, 1500);
  }
});

function pickFromThree() {
  cardsPlace.innerHTML = "";
  cardsPlace.classList.remove('cardsfour');
  cardsPlace.classList.add('cardsthree');
  continueButton.classList.remove('show');
  button.classList.add('show');
  fifthCard.map(card => fetch(card).then(data => data.json().then(dat => {
    const cardName = dat.name.toUpperCase();
    const info = dat.info;
    const faction = dat.faction.name.split('').splice(0,2).join('');
    const rarity = dat.variations[0].rarity.name.toLowerCase();
    fetch(dat.variations[0].href).then(data => data.json().then(dat => {
      cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card-image visible" src="${dat.art.mediumsizeImage}"></div><div class="cardname ${rarity} rolledout">${cardName}</div><div class="cardinfo ${rarity} rolledout">${info}</div></div></div>`;
    }));
  })));
}

continueButton.addEventListener('click', pickFromThree);
button.addEventListener('click', openkeg);
