'use strict';

(function () {
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
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArrayElement: getRandomArrayElement,
    getRandomLengthArray: getRandomLengthArray,
    getDeclension: getDeclension,
    disableElements: disableElements,
    enableElements: enableElements
  };
})();
