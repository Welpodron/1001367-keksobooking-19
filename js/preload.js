'use strict';

(function () {
  function preload() {
    var MIN_TITLE_LENGTH = '30';
    var MAX_TITLE_LENGTH = '100';
    var PIC_TYPES = 'image/*';

    var price = window.form.elements.priceInput;
    var title = window.form.elements.titleInput;
    var address = window.form.elements.addressInput;
    var userPic = window.form.elements.userPic;
    var housePic = window.form.elements.housePic;

    title.minLength = MIN_TITLE_LENGTH;
    title.maxLength = MAX_TITLE_LENGTH;
    title.required = true;

    price.required = true;

    address.readOnly = true;
    address.setAttribute('tabIndex', '-1');
    address.style.cursor = 'default';
    address.defaultValue = (
      parseInt(window.pins.main.selector.style.left, 10) + Math.floor(window.pins.main.width / 2) +
      ', ' +
      (parseInt(window.pins.main.selector.style.top, 10) + Math.floor(window.pins.main.height / 2))
    );

    userPic.accept = PIC_TYPES;
    housePic.accept = PIC_TYPES;

    window.util.disableElements(window.filter.apply);
    window.util.disableElements(window.form.elements.fields);
  }

  preload();
})();
