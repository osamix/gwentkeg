const button = document.querySelector('button');
const cardsPlace = document.querySelector('.cards');

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
  })
  if (fifthNumber < 78) {
    leCards.push(cards[2][Math.round(Math.random() * 92)].href)
  } else if (fifthNumber < 96) {
    leCards.push(cards[3][Math.round(Math.random() * 114)].href)
  } else {
    leCards.push(cards[1][Math.round(Math.random() * 89)].href)
  }
}

function getCardData() {
  leCards.map(card => fetch(card).then(data => data.json().then(dat => {
    const cardName = dat.name.toUpperCase();
    const info = dat.info;
    const faction = dat.faction.name.split('').splice(0,2).join('');
    const rarity = dat.variations[0].rarity.name.toLowerCase();
    fetch(dat.variations[0].href).then(data => data.json().then(dat => {
      cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card ${rarity} shown" src="./src/${faction}.png"><img class="card-image hidden" src="${dat.art.mediumsizeImage}"></div><div class="cardname ${rarity}">${cardName}</div><div class="cardinfo ${rarity}">${info}</div></div></div>`;
    }));
  })));
  let cardBack = document.querySelectorAll('img');
  console.log(cardBack);
}


let cardImage;

function openkeg() {
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
  if (e.target.classList.contains('shown')) {
    e.target.classList.remove('shown');
    e.target.classList.add('hidden');
    setTimeout( () => {
      e.target.nextSibling.classList.remove('hidden');
      e.target.nextSibling.classList.add('visible');
    }, 500);
  }
});
button.addEventListener('click', openkeg);
