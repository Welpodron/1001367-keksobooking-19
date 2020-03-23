'use strict';

(function () {
  var map = document.querySelector('.map');

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function disableMap() {
    map.classList.add('map--faded');
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.cards.remove();
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  window.map = {
    selector: map,
    activate: activateMap,
    disable: disableMap
  };
})();
