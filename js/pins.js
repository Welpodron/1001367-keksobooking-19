'use strict';

(function () {

  var Pin = {
    TEMPLATE: document.querySelector('#pin').content.querySelector('button'),
    WIDTH: 50,
    HEIGHT: 70
  };

  var PinMain = {
    SELECTOR: document.querySelector('.map__pin--main'),
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 81,
    DEFAULT_X: '570px',
    DEFAULT_Y: '375px'
  };

  var MAX_PINS = 5;

  var PINS_MAP = document.querySelector('.map__pins');

  PinMain.SELECTOR.addEventListener('mousedown', mainPinClickHandler);
  PinMain.SELECTOR.addEventListener('keydown', mainPinEnterHandler);

  var startingXCoord = 0;
  var startingYCoord = 0;

  function generatePin(advertisement, index) {
    var pin = Pin.TEMPLATE.cloneNode(true);
    pin.pinIndex = index;
    pin.style.left = advertisement.location.x - Pin.WIDTH / 2 + 'px';
    pin.style.top = advertisement.location.y - Pin.HEIGHT + 'px';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = advertisement.offer.title;
    return pin;
  }

  function activatePage() {
    if (!window.util.isPageActive()) {
      window.util.togglePage();
      window.data.download();
      window.map.activate();
      window.form.activate();
      window.validation.activate();
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
      setMainPinAddress(PinMain.SELECTOR.style.left, PinMain.SELECTOR.style.top);

      startingXCoord = evt.clientX;
      startingYCoord = evt.clientY;

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    }
  }

  function mainPinMouseMoveHandler(evt) {
    var minX = window.data.coordinates.X_MIN - PinMain.WIDTH / 2;
    var maxX = PINS_MAP.offsetWidth - Math.floor(PinMain.WIDTH / 2);
    var minY = window.data.coordinates.Y_MIN - PinMain.FULL_HEIGHT;
    var maxY = window.data.coordinates.Y_MAX - PinMain.FULL_HEIGHT;

    var offsetX = startingXCoord - evt.clientX;
    var offsetY = startingYCoord - evt.clientY;

    startingXCoord = evt.clientX;
    startingYCoord = evt.clientY;

    PinMain.SELECTOR.style.top = PinMain.SELECTOR.offsetTop - offsetY + 'px';
    PinMain.SELECTOR.style.left = PinMain.SELECTOR.offsetLeft - offsetX + 'px';

    if (PinMain.SELECTOR.offsetLeft < minX) {
      PinMain.SELECTOR.style.left = minX + 'px';
    } else if (PinMain.SELECTOR.offsetLeft > maxX) {
      PinMain.SELECTOR.style.left = maxX + 'px';
    }

    if (PinMain.SELECTOR.offsetTop < minY) {
      PinMain.SELECTOR.style.top = minY + 'px';
    } else if (PinMain.SELECTOR.offsetTop > maxY) {
      PinMain.SELECTOR.style.top = maxY + 'px';
    }

    setMainPinAddress(PinMain.SELECTOR.style.left, PinMain.SELECTOR.style.top);
  }

  function mainPinMouseUpHandler() {
    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  }

  function setMainPinAddress(left, top) {
    window.form.elements.ADDRESS_INPUT.value = (
      parseInt(left, 10) + Math.floor(PinMain.WIDTH / 2) +
      ', ' +
      (parseInt(top, 10) + PinMain.FULL_HEIGHT)
    );
  }

  function resetMainPinAddress() {
    PinMain.SELECTOR.style.top = PinMain.DEFAULT_Y;
    PinMain.SELECTOR.style.left = PinMain.DEFAULT_X;
  }

  function mainPinEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      activatePage();
      setMainPinAddress(PinMain.SELECTOR.style.left, PinMain.SELECTOR.style.top);
    }
  }

  function pinClickHandler(evt) {
    if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
      var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
      window.cards.remove();
      activatePin(activePin);
      window.cards.insert(window.filter.getFilteredOffers()[activePin.pinIndex]);
    }
  }

  function pinEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
        var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
        window.cards.remove();
        activatePin(activePin);
        window.cards.insert(window.filter.getFilteredOffers()[activePin.pinIndex]);
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
    main: PinMain,
    render: renderPins,
    reset: resetMainPinAddress,
    disable: disablePin
  };
})();
