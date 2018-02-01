const button = document.querySelector('.ok');
const cardsPlace = document.querySelector('.cards');
const continueButton = document.querySelector('.pickthree');

const commonURL = 'https://api.gwentapi.com/v0/cards/rarities/gGlnI525WLailI_mBFFiSw?limit=62';
const rareURL = 'https://api.gwentapi.com/v0/cards/rarities/-naHV1zlVuCFll-j-7T1ow?limit=92';
const epicURL = 'https://api.gwentapi.com/v0/cards/rarities/V_ImiYfTVhG_WaAOof9Rxg?limit=114';
const legendaryURL = 'https://api.gwentapi.com/v0/cards/rarities/u0zNKy4EULa_VU4JD5r4EA?limit=89';
const urls = [commonURL, rareURL, epicURL, legendaryURL];

let pickedthird = false;
let cardImageUrl = '';
const brokenImages = ['https://api.gwentapi.com/media/ronvid-of-small-marsh-1-medium.png', 'https://api.gwentapi.com/media/dol-blathanna-swordmaster-1-medium.png', 'https://api.gwentapi.com/media/heymaey-battle-maiden-1-medium.png', 'https://api.gwentapi.com/media/expired-ale-1-medium.png', 'https://api.gwentapi.com/media/catapult-1-medium.png', 'https://api.gwentapi.com/media/mahakam-ale-1-medium.png', 'https://api.gwentapi.com/media/crow-s-eye-1-medium.png', 'https://api.gwentapi.com/media/slyzard-1-medium.png', 'https://api.gwentapi.com/media/she-troll-of-vergen-1-medium.png', 'https://api.gwentapi.com/media/hattori-1-medium.png'];
const cards = [];
urls.map(url => fetch(url).then(data => data.json().then(dat => cards.push(dat.results))));
let number = 0;
let fifthNumber = 0;
let numbers = [];
let allCardImages = [];

function countProb() {
  for (let i = 0; i < 4; i++) {
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
    }
    return cards[1][Math.round(Math.random() * 89)].href;
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
    const faction = dat.faction.name.split('').splice(0, 2).join('');
    const rarity = dat.variations[0].rarity.name.toLowerCase();
    fetch(dat.variations[0].href).then(data => data.json().then(dat => {
      if (!brokenImages.includes(dat.art.mediumsizeImage)) {
        cardImageUrl = dat.art.mediumsizeImage;
      } else {
        cardImageUrl = 'src/acard.png';
      }
      allCardImages.push(cardImageUrl);
      cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card ${rarity} shown" src="./src/${faction}.png"><img class="card-image hidden ${rarity}" src="${cardImageUrl}"></div><div class="cardname ${rarity} rolledin">${cardName}</div><div class="cardinfo ${rarity} rolledin">${info}</div></div></div>`;
    }));
  })));
  const cardBack = document.querySelectorAll('img');
  console.log(cardBack);
}

let cardCount = 0;

function openkeg() {
  allCardImages = [];
  button.classList.remove('show');
  cardsPlace.innerHTML = '';
  cardsPlace.classList.remove('cardsfive');
  cardsPlace.classList.add('cardsfour');
  cards.sort();
  countProb();
  makeCards();
  getCardData();
  leCards = [];
  numbers = [];
}

function clickCards(e) {
  console.log(cardCount);
  if (e.target.classList.contains('card')) {
    const cardB = e.target;
    const cardI = cardB.nextSibling;
    const cardN = cardI.parentNode.nextSibling;
    const cardO = cardN.nextSibling;
    if (cardB.classList.contains('shown')) {
      cardB.classList.remove('shown');
      cardB.classList.add('hidden');
      setTimeout(() => {
        cardI.classList.remove('hidden');
        cardI.classList.add('visible');
      }, 200);
      setTimeout(() => {
        cardN.classList.remove('rolledin');
        cardN.classList.add('rolledout');
      }, 400);
      setTimeout(() => {
        cardO.classList.remove('rolledin');
        cardO.classList.add('rolledout');
        cardCount++;
        if (cardCount === 4) {
          continueButton.classList.add('show');
          cardCount = 0;
        }
      }, 700);
    }
  } else if (cardsPlace.classList.contains('cardsthree') && pickedthird === false) {
    pickedthird = true;
    e.target.classList.add('highlighted');
    setTimeout(() => {
      allCardImages.push(e.target.src);
      console.log(allCardImages);
      cardsPlace.innerHTML = '';
      cardsPlace.classList.remove('cardsthree');
      cardsPlace.classList.add('cardsfive');
      allCardImages.map(url => {
        cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card-image visible final" src='${url}'></div></div>`;
        return cardsPlace.innerHTML;
      });
      button.innerText = 'open next keg';
      button.classList.add('show');
      fifthCard = [];
      pickedthird = false;
    }, 800);
  }
}

function pickFromThree() {
  cardsPlace.innerHTML = '';
  cardsPlace.classList.remove('cardsfour');
  cardsPlace.classList.add('cardsthree');
  continueButton.classList.remove('show');
  fifthCard.map(card => fetch(card).then(data => data.json().then(dat => {
    const cardName = dat.name.toUpperCase();
    const info = dat.info;
    const rarity = dat.variations[0].rarity.name.toLowerCase();
    fetch(dat.variations[0].href).then(data => data.json().then(dat => {
      if (!brokenImages.includes(dat.art.mediumsizeImage)) {
        cardImageUrl = dat.art.mediumsizeImage;
      } else {
        cardImageUrl = 'src/acard.png';
      }
      cardsPlace.innerHTML += `<div class="carddata"><div class="cardimages"><img class="card-image visible" style="cursor:pointer" src="${cardImageUrl}"></div><div class="cardname ${rarity} rolledout">${cardName}</div><div class="cardinfo ${rarity} rolledout">${info}</div></div></div>`;
    }));
  })));
}

continueButton.addEventListener('click', pickFromThree);
button.addEventListener('click', openkeg);
cardsPlace.addEventListener('click', clickCards);
