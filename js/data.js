'use strict';

(function () {
  var USERS_NUMBER = 8;
  var COORDINATES = {
    X_MIN: 0,
    X_MAX: parseInt(getComputedStyle(document.body).maxWidth, 10),
    Y_MIN: 130,
    Y_MAX: 630
  };
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUESTS_DECLENSION = ['гостя', 'гостей', 'гостей'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var ADVERTISEMENTS_ARRAY = getAdvertisementsArray();

  function getAdvertisement(userId) {
    var locationX = window.util.getRandomIntInclusive(COORDINATES.X_MIN, COORDINATES.X_MAX);
    var locationY = window.util.getRandomIntInclusive(COORDINATES.Y_MIN, COORDINATES.Y_MAX);
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + userId + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: locationX + ', ' + locationY,
        price: window.util.getRandomIntInclusive(100, 1000),
        type: window.util.getRandomArrayElement(TYPES),
        rooms: window.util.getRandomIntInclusive(1, 5),
        guests: window.util.getRandomIntInclusive(1, 5),
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
    for (var i = 1; i <= USERS_NUMBER; i++) {
      arr.push(getAdvertisement(i));
    }
    return arr;
  }

  function getBuildingType(advertisement) {
    switch (advertisement.offer.type) {
      case 'bungalo':
        return 'Бунгало';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }

    return '';
  }

  function getBuildingMinPrice(buildingType) {
    switch (buildingType) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
    }

    return NaN;
  }

  window.data = {
    advertisementsArray: ADVERTISEMENTS_ARRAY,
    getBuildingType: getBuildingType,
    getBuildingMinPrice: getBuildingMinPrice,
    roomsDeclension: ROOMS_DECLENSION,
    guestsDeclension: GUESTS_DECLENSION,
    coordinates: COORDINATES
  };
})();
