'use strict';

(function () {

  var COORDINATES = {
    X_MIN: 0,
    X_MAX: parseInt(getComputedStyle(document.body).maxWidth, 10),
    Y_MIN: 130,
    Y_MAX: 630
  };

  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUESTS_DECLENSION = ['гостя', 'гостей', 'гостей'];

  var advertisementsArray = [];

  function checkData(data) {
    data.forEach(function (element) {
      if (!(typeof element.offer === 'undefined' || element.offer === '')) {
        advertisementsArray.push(element);
      }
    });
  }

  function setData(data) {
    checkData(data);
  }

  function getData() {
    return advertisementsArray;
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
    setData: setData,
    getData: getData,
    getBuildingType: getBuildingType,
    getBuildingMinPrice: getBuildingMinPrice,
    roomsDeclension: ROOMS_DECLENSION,
    guestsDeclension: GUESTS_DECLENSION,
    coordinates: COORDINATES
  };
})();
