'use strict';

(function () {
  var MAP = document.querySelector('.map');

  function activateMap() {
    if (MAP.classList.contains('map--faded')) {
      MAP.classList.remove('map--faded');
      window.pins.insertPins(window.data.advertisementsArray);
    }
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
