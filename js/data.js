'use strict';

(function () {

  var coordinates = {
    xMin: 0,
    xMax: parseInt(getComputedStyle(document.body).maxWidth, 10),
    yMin: 130,
    yMax: 630
  };

  var ROOMS_DECLENSION = ['комната', 'комнаты', 'комнат'];
  var GUESTS_DECLENSION = ['гостя', 'гостей', 'гостей'];

  var offers = [];

  function downloadData() {
    window.xml.download(successHandler, errorHandler, window.filter.activate);
  }

  function successHandler(data, callback) {
    data.forEach(function (element) {
      if (!(typeof element.offer === 'undefined' || element.offer === '')) {
        offers.push(element);
      }
    });
    callback();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function getData() {
    return offers;
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
    download: downloadData,
    getInfo: getData,
    getBuildingType: getBuildingType,
    getBuildingMinPrice: getBuildingMinPrice,
    roomsDeclension: ROOMS_DECLENSION,
    guestsDeclension: GUESTS_DECLENSION,
    coordinates: coordinates
  };
})();
