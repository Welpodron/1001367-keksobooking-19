'use strict';

(function () {
  function preload() {
    var MIN_TITLE_LENGTH = '30';
    var MAX_TITLE_LENGTH = '100';
    var PIC_TYPES = 'image/*';

    var price = window.form.elements.PRICE_INPUT;
    var title = window.form.elements.TITLE_INPUT;
    var address = window.form.elements.ADDRESS_INPUT;
    var userPic = window.form.elements.USER_PIC;
    var housePic = window.form.elements.HOUSE_PIC;

    title.minLength = MIN_TITLE_LENGTH;
    title.maxLength = MAX_TITLE_LENGTH;
    title.required = true;

    price.required = true;

    address.readOnly = true;
    address.setAttribute('tabIndex', '-1');
    address.style.cursor = 'default';
    address.defaultValue = (
      parseInt(window.pins.main.SELECTOR.style.left, 10) + Math.floor(window.pins.main.WIDTH / 2) +
      ', ' +
      (parseInt(window.pins.main.SELECTOR.style.top, 10) + Math.floor(window.pins.main.HEIGHT / 2))
    );

    userPic.accept = PIC_TYPES;
    housePic.accept = PIC_TYPES;

    window.util.disableElements(window.filter.apply);
    window.util.disableElements(window.form.elements.FIELDS);
  }

  preload();
})();
