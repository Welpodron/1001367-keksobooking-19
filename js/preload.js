'use strict';

(function () {
  function preload() {
    var MIN_TITLE_LENGTH = '30';
    var MAX_TITLE_LENGTH = '100';
    var MAX_PRICE = '1000000';

    var price = window.form.formElements.PRICE_INPUT;
    var title = window.form.formElements.TITLE_INPUT;
    var address = window.form.formElements.ADDRESS_INPUT;

    title.minLength = MIN_TITLE_LENGTH;
    title.maxLength = MAX_TITLE_LENGTH;
    title.required = true;

    price.max = MAX_PRICE;
    price.required = true;

    address.readOnly = true;

    address.defaultValue = (
      parseInt(window.pins.pinMain.SELECTOR.style.left, 10) + Math.floor(window.pins.pinMain.WIDTH / 2) +
      ', ' +
      (parseInt(window.pins.pinMain.SELECTOR.style.top, 10) + Math.floor(window.pins.pinMain.HEIGHT / 2))
    );

    window.util.disableElements(window.filter.filterFields);
    window.util.disableElements(window.form.formElements.FIELDS);
  }

  preload();
})();
