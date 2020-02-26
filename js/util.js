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

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArrayElement: getRandomArrayElement,
    getRandomLengthArray: getRandomLengthArray
  }
})();
