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

  var MAX_PINS = 5;

  var PINS_MAP = document.querySelector('.map__pins');

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

  function activatePage() {
    if (!window.util.isPageActive()) {
      window.util.togglePage();
      window.data.downloadData();
      window.map.activateMap();
      window.form.activateForm();
      window.validation.activateValidation();
    }
  }

  function enableListening() {
    PINS_MAP.addEventListener('click', pinClickHandler);
    PINS_MAP.addEventListener('keydown', pinEnterHandler);
  }

  function disableListening() {
    PINS_MAP.removeEventListener('click', pinClickHandler);
    PINS_MAP.removeEventListener('keydown', pinEnterHandler);
  }

  function mainPinClickHandler(evt) {
    if (window.util.isLeftMouseButtonPressed(evt)) {
      activatePage();
      setMainPinAddress(PIN_MAIN.SELECTOR.style.left, PIN_MAIN.SELECTOR.style.top);
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
    if (window.util.isEnterPressed(evt)) {
      activatePage();
      setMainPinAddress(PIN_MAIN.SELECTOR.style.left, PIN_MAIN.SELECTOR.style.top);
    }
  }

  function pinClickHandler(evt) {
    if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
      var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
      window.cards.removeCard();
      activatePin(activePin);
      window.cards.insertCard(window.filter.getfilteredOffers()[activePin.pinIndex]);
    }
  }

  function pinEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
        var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
        window.cards.removeCard();
        activatePin(activePin);
        window.cards.insertCard(window.filter.getfilteredOffers()[activePin.pinIndex]);
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

  function removePins() {
    var pins = PINS_MAP.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function renderPins(data) {
    var max = data.length > MAX_PINS ? MAX_PINS : data.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < max; i++) {
      fragment.appendChild(generatePin(data[i], i));
    }

    removePins();
    PINS_MAP.appendChild(fragment);
  }

  window.pins = {
    enableListening: enableListening,
    disableListening: disableListening,
    pinsMap: PINS_MAP,
    pinMain: PIN_MAIN,
    removePins: removePins,
    renderPins: renderPins,
    insertPins: insertPins,
    resetMainPinAddress: resetMainPinAddress,
    disablePin: disablePin
  };
})();
