'use strict';

(function () {
  var USERS_NUMBER = 8;
  var X_MAX = parseInt(getComputedStyle(document.body).maxWidth, 10);
  var Y_MIN = 130;
  var Y_MAX = 630;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];

  function getAdvertisement(userId) {
    var locationX = window.util.getRandomIntInclusive(0, X_MAX);
    var locationY = window.util.getRandomIntInclusive(Y_MIN, Y_MAX);
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + (userId + 1) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: locationX + ', ' + locationY,
        price: window.util.getRandomIntInclusive(100, 1000),
        type: window.util.getRandomArrayElement(TYPES),
        rooms: window.util.getRandomIntInclusive(1, 4),
        guests: window.util.getRandomIntInclusive(1, 4),
        checkin: window.util.getRandomArrayElement(CHECKINS),
        checkout: window.util.getRandomArrayElement(CHECKOUTS),
        features: window.util.getRandomLengthArray(FEATURES),
        description: 'Описание предложения',
        photos: window.util.getRandomLengthArray(PHOTOS)
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

  window.data = {
    getAdvertisementsArray: getAdvertisementsArray
  }
})();
