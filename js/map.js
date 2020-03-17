'use strict';

(function () {
  var MAP = document.querySelector('.map');

  function activateMap() {
    if (MAP.classList.contains('map--faded')) {
      MAP.classList.remove('map--faded');
      window.xml.download(successHandler, errorHandler, setPins);
    }
  }

  function successHandler(data, callback) {
    window.data.setData(data);
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

  function setPins() {
    window.pins.insertPins(window.data.getData());
  }

  function disableMap() {
    MAP.classList.add('map--faded');
    var pins = MAP.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.cards.removeCard();
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  window.map = {
    map: MAP,
    activateMap: activateMap,
    disableMap: disableMap
  };
})();
