'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = {
    delay: debounce,
  };
})();
