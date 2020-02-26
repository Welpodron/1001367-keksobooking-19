'use strict';

var USERS_NUMBER = 8;
var X_MAX = parseInt(getComputedStyle(document.body).maxWidth, 10);
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('button');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PINS_MAP = document.querySelector('.map__pins');

var types = ['palace', 'flat', 'house', 'bungalo'] ;
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomLengthArray(arr) {
  var randomStart = getRandomIntInclusive(0, arr.length);
  return arr.slice(randomStart, getRandomIntInclusive(randomStart, arr.length));
}

function getAdvertisement(userId) {
  var locationX = getRandomIntInclusive(0, X_MAX);
  var locationY = getRandomIntInclusive(Y_MIN, Y_MAX);
  var advertisement = {
    author: {
      avatar: `img/avatars/user0${userId+1}.png`
    },
    offer: {
      title: 'Заголовок предложения',
      address: `${locationX}, ${locationY}`,
      price: getRandomIntInclusive(100, 1000),
      type: getRandomArrayElement(types),
      rooms: getRandomIntInclusive(1, 4),
      guests: getRandomIntInclusive(1, 4),
      checkin: getRandomArrayElement(checkins),
      checkout: getRandomArrayElement(checkouts),
      features: getRandomLengthArray(features),
      description: 'Описание предложения',
      photos: getRandomLengthArray(photos)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advertisement;
}

function getAdvertisementsArray() {
  var arr = [];
  for (var i = 0; i < USERS_NUMBER; i++) {
    arr.push(getAdvertisement(i));
  }
  return arr;
}

function toggleMap() {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

function generatePin(advertisement) {
  var pin = PIN_TEMPLATE.cloneNode(true);
  pin.style.left = `${advertisement.location.x+PIN_WIDTH/2}px`;
  pin.style.top = `${advertisement.location.y+PIN_HEIGHT}px`;
  pin.querySelector('img').src = advertisement.author.avatar;
  pin.querySelector('img').alt = advertisement.offer.title;
  return pin;
}

function insertPins(arr, target) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(generatePin(arr[i]));
  }
  target.appendChild(fragment);
}

insertPins(getAdvertisementsArray(),PINS_MAP);
