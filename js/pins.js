'use strict';

(function () {
  var PIN = {
    TEMPLATE: document.querySelector('#pin').content.querySelector('button'),
    WIDTH: 50,
    HEIGHT: 70
  };
  var PIN_MAIN = {
    SELECTOR: document.querySelector('.map__pin--main'),
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 81
  };

  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  PIN_MAIN.SELECTOR.addEventListener('mousedown', mainPinClick);
  PIN_MAIN.SELECTOR.addEventListener('keydown', mainPinEnter);

  function generatePin(advertisement) {
    var pin = PIN.TEMPLATE.cloneNode(true);
    pin.style.left = advertisement.location.x - PIN.WIDTH / 2 + 'px';
    pin.style.top = advertisement.location.y - PIN.HEIGHT + 'px';
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

  function mainPinClick(e) {
    if (e.button === LEFT_MOUSE_BUTTON) {
      window.map.activateMap();
      window.form.activateForm();
      window.filter.activateFilterForm();
      window.validation.activateValidation();
    }
  }

  function mainPinEnter(e) {
    if (e.key === ENTER_KEY) {
      window.map.activateMap();
      window.form.activateForm();
      window.filter.activateFilterForm();
      window.validation.activateValidation();
    }
  }

  window.pins = {
    pinMain: PIN_MAIN,
    insertPins: insertPins
  };
})();
