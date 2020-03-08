'use strict';

(function () {
  var PINS_MAP = document.querySelector('.map__pins');
  var MAP = document.querySelector('.map');

  function activateMap() {
    MAP.classList.remove('map--faded');
  }

  function disableMap() {
    MAP.classList.add('map--faded');
  }

  window.map = {
    pinsMap: PINS_MAP,
    activateMap: activateMap,
    disableMap: disableMap
  };
})();
