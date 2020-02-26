'use strict';

(function () {
  var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('button');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_MAP = document.querySelector('.map__pins');

  function toggleMap() {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  }

  function generatePin(advertisement) {
    var pin = PIN_TEMPLATE.cloneNode(true);
    pin.style.left = advertisement.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advertisement.location.y - PIN_HEIGHT + 'px';
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

  window.pins = {
    toggleMap: toggleMap,
    insertPins: insertPins,
    pinsMap: PINS_MAP
  };
})();
