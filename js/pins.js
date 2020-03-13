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
    FULL_HEIGHT: 81,
    DEFAULT_X: '570px',
    DEFAULT_Y: '375px'
  };

  var PINS_MAP = document.querySelector('.map__pins');

  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  PIN_MAIN.SELECTOR.addEventListener('mousedown', mainPinClickHandler);
  PIN_MAIN.SELECTOR.addEventListener('keydown', mainPinEnterHandler);

  var startingCoords = {
    y: 0,
    x: 0
  };

  function generatePin(advertisement, index) {
    var pin = PIN.TEMPLATE.cloneNode(true);
    pin.pinIndex = index;
    pin.style.left = advertisement.location.x - PIN.WIDTH / 2 + 'px';
    pin.style.top = advertisement.location.y - PIN.HEIGHT + 'px';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = advertisement.offer.title;
    return pin;
  }

  function insertPins(arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(generatePin(arr[i], i));
    }
    PINS_MAP.appendChild(fragment);
  }

  function mainPinClickHandler(evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      window.map.activateMap();
      window.form.activateForm();
      window.filter.activateFilterForm();
      window.validation.activateValidation();
      setMainPinAddress(PIN_MAIN.SELECTOR.style.left, PIN_MAIN.SELECTOR.style.top);
      PINS_MAP.addEventListener('click', pinClickHandler);
      PINS_MAP.addEventListener('keydown', pinEnterHandler);

      startingCoords = {
        y: evt.clientY,
        x: evt.clientX
      };

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    }
  }

  function mainPinMouseMoveHandler(evt) {
    var minX = window.data.coordinates.X_MIN - PIN_MAIN.WIDTH / 2;
    var maxX = PINS_MAP.offsetWidth - Math.floor(PIN_MAIN.WIDTH / 2);
    var minY = window.data.coordinates.Y_MIN - PIN_MAIN.FULL_HEIGHT;
    var maxY = window.data.coordinates.Y_MAX - PIN_MAIN.FULL_HEIGHT;

    var offset = {
      y: startingCoords.y - evt.clientY,
      x: startingCoords.x - evt.clientX
    };

    startingCoords = {
      y: evt.clientY,
      x: evt.clientX
    };

    PIN_MAIN.SELECTOR.style.top = PIN_MAIN.SELECTOR.offsetTop - offset.y + 'px';
    PIN_MAIN.SELECTOR.style.left = PIN_MAIN.SELECTOR.offsetLeft - offset.x + 'px';

    if (PIN_MAIN.SELECTOR.offsetLeft < minX) {
      PIN_MAIN.SELECTOR.style.left = minX + 'px';
    } else if (PIN_MAIN.SELECTOR.offsetLeft > maxX) {
      PIN_MAIN.SELECTOR.style.left = maxX + 'px';
    }

    if (PIN_MAIN.SELECTOR.offsetTop < minY) {
      PIN_MAIN.SELECTOR.style.top = minY + 'px';
    } else if (PIN_MAIN.SELECTOR.offsetTop > maxY) {
      PIN_MAIN.SELECTOR.style.top = maxY + 'px';
    }

    setMainPinAddress(PIN_MAIN.SELECTOR.style.left, PIN_MAIN.SELECTOR.style.top);
  }

  function mainPinMouseUpHandler() {
    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  }

  function setMainPinAddress(left, top) {
    window.form.formElements.ADDRESS_INPUT.value = (
      parseInt(left, 10) + Math.floor(PIN_MAIN.WIDTH / 2) +
      ', ' +
      (parseInt(top, 10) + PIN_MAIN.FULL_HEIGHT)
    );
  }

  function resetMainPinAddress() {
    PIN_MAIN.SELECTOR.style.top = PIN_MAIN.DEFAULT_Y;
    PIN_MAIN.SELECTOR.style.left = PIN_MAIN.DEFAULT_X;
  }

  function mainPinEnterHandler(evt) {
    if (evt.key === ENTER_KEY) {
      window.map.activateMap();
      window.form.activateForm();
      window.filter.activateFilterForm();
      window.validation.activateValidation();
      PINS_MAP.addEventListener('click', pinClickHandler);
      PINS_MAP.addEventListener('keydown', pinEnterHandler);
    }
  }

  function pinClickHandler(evt) {
    if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
      var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
      window.cards.removeCard();
      activatePin(activePin);
      window.cards.insertCard(window.data.advertisementsArray[activePin.pinIndex]);
    }
  }

  function pinEnterHandler(evt) {
    if (evt.key === ENTER_KEY) {
      if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
        var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
        window.cards.removeCard();
        activatePin(activePin);
        window.cards.insertCard(window.data.advertisementsArray[activePin.pinIndex]);
      }
    }
  }

  function disablePin(pin) {
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  }

  function activatePin(pin) {
    pin.classList.add('map__pin--active');
  }

  window.pins = {
    pinsMap: PINS_MAP,
    pinMain: PIN_MAIN,
    insertPins: insertPins,
    resetMainPinAddress: resetMainPinAddress,
    disablePin: disablePin
  };
})();
