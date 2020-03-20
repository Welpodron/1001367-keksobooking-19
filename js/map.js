'use strict';

(function () {
  var MAP = document.querySelector('.map');

  function activateMap() {
    MAP.classList.remove('map--faded');
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
