'use strict';

(function () {

  var pin = {
    template: document.querySelector('#pin').content.querySelector('button'),
    width: 50,
    height: 70
  };

  var pinMain = {
    selector: document.querySelector('.map__pin--main'),
    width: 65,
    height: 65,
    fullHeight: 81,
    defaultX: '570px',
    defaultY: '375px'
  };

  var MAX_PINS = 5;

  var pinsMap = document.querySelector('.map__pins');

  pinMain.selector.addEventListener('mousedown', mainPinClickHandler);
  pinMain.selector.addEventListener('keydown', mainPinEnterHandler);

  var startingXCoord = 0;
  var startingYCoord = 0;

  function generatePin(advertisement, index) {
    var pinTemplate = pin.template.cloneNode(true);
    pinTemplate.pinIndex = index;
    pinTemplate.style.left = advertisement.location.x - pin.width / 2 + 'px';
    pinTemplate.style.top = advertisement.location.y - pin.height + 'px';
    pinTemplate.querySelector('img').src = advertisement.author.avatar;
    pinTemplate.querySelector('img').alt = advertisement.offer.title;
    return pinTemplate;
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
    pinsMap.addEventListener('click', pinClickHandler);
    pinsMap.addEventListener('keydown', pinEnterHandler);
  }

  function disableListening() {
    pinsMap.removeEventListener('click', pinClickHandler);
    pinsMap.removeEventListener('keydown', pinEnterHandler);
  }

  function mainPinClickHandler(evt) {
    if (window.util.isLeftMouseButtonPressed(evt)) {
      activatePage();
      setMainPinAddress(pinMain.selector.style.left, pinMain.selector.style.top);

      startingXCoord = evt.clientX;
      startingYCoord = evt.clientY;

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    }
  }

  function mainPinMouseMoveHandler(evt) {
    var minX = window.data.coordinates.xMin - pinMain.width / 2;
    var maxX = pinsMap.offsetWidth - Math.floor(pinMain.width / 2);
    var minY = window.data.coordinates.yMin - pinMain.fullHeight;
    var maxY = window.data.coordinates.yMax - pinMain.fullHeight;

    var offsetX = startingXCoord - evt.clientX;
    var offsetY = startingYCoord - evt.clientY;

    startingXCoord = evt.clientX;
    startingYCoord = evt.clientY;

    pinMain.selector.style.top = pinMain.selector.offsetTop - offsetY + 'px';
    pinMain.selector.style.left = pinMain.selector.offsetLeft - offsetX + 'px';

    if (pinMain.selector.offsetLeft < minX) {
      pinMain.selector.style.left = minX + 'px';
    } else if (pinMain.selector.offsetLeft > maxX) {
      pinMain.selector.style.left = maxX + 'px';
    }

    if (pinMain.selector.offsetTop < minY) {
      pinMain.selector.style.top = minY + 'px';
    } else if (pinMain.selector.offsetTop > maxY) {
      pinMain.selector.style.top = maxY + 'px';
    }

    setMainPinAddress(pinMain.selector.style.left, pinMain.selector.style.top);
  }

  function mainPinMouseUpHandler() {
    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  }

  function setMainPinAddress(left, top) {
    window.form.elements.addressInput.value = (
      parseInt(left, 10) + Math.floor(pinMain.width / 2) +
      ', ' +
      (parseInt(top, 10) + pinMain.fullHeight)
    );
  }

  function resetMainPinAddress() {
    pinMain.selector.style.top = pinMain.defaultY;
    pinMain.selector.style.left = pinMain.defaultX;
  }

  function mainPinEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      activatePage();
      setMainPinAddress(pinMain.selector.style.left, pinMain.selector.style.top);
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
    var pins = pinsMap.querySelectorAll('.map__pin:not(.map__pin--main)');
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
    pinsMap.appendChild(fragment);
  }

  window.pins = {
    enableListening: enableListening,
    disableListening: disableListening,
    main: pinMain,
    render: renderPins,
    reset: resetMainPinAddress,
    disable: disablePin
  };
})();
