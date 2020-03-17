'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var LEFT_MOUSE_BUTTON = 0;

  function isCallBackFunction(func) {
    return typeof (func) === 'function';
  }

  function isLeftMouseButtonPressed(evt) {
    return evt.button === LEFT_MOUSE_BUTTON;
  }

  function isEnterPressed(evt) {
    return evt.keyCode === ENTER_KEYCODE;
  }

  function isEscPressed(evt) {
    return evt.keyCode === ESC_KEYCODE;
  }

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomLengthArray(arr) {
    var randomStart = getRandomIntInclusive(0, arr.length);
    return arr.slice(randomStart, getRandomIntInclusive(randomStart, arr.length));
  }

  function getDeclension(num, arr) {
    if (num % 10 === 1 && num % 100 !== 11) {
      return num + ' ' + arr[0];
    }
    if (num % 10 > 1 && num % 10 < 5 && (num % 100 < 12 || num % 100 > 14)) {
      return num + ' ' + arr[1];
    }
    return num + ' ' + arr[2];
  }

  function disableElements(arr) {
    arr.forEach(function (element) {
      element.disabled = true;
    });
  }

  function enableElements(arr) {
    arr.forEach(function (element) {
      element.disabled = false;
    });
  }

  window.util = {
    isCallBackFunction: isCallBackFunction,
    isLeftMouseButtonPressed: isLeftMouseButtonPressed,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArrayElement: getRandomArrayElement,
    getRandomLengthArray: getRandomLengthArray,
    getDeclension: getDeclension,
    disableElements: disableElements,
    enableElements: enableElements
  };
})();
