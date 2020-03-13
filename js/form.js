'use strict';

(function () {
  var FORM = document.querySelector('.ad-form');

  var FORM_ELEMENTS = {
    TITLE_INPUT: FORM.querySelector('#title'),
    PRICE_INPUT: FORM.querySelector('#price'),
    ADDRESS_INPUT: FORM.querySelector('#address'),
    TYPES_SELECT: FORM.querySelector('#type'),
    ROOMS_SELECT: FORM.querySelector('#room_number'),
    GUESTS_SELECT: FORM.querySelector('#capacity'),
    TIME_IN: FORM.querySelector('#timein'),
    TIME_OUT: FORM.querySelector('#timeout'),
    RESET: FORM.querySelector('.ad-form__reset'),
    SUBMIT: FORM.querySelector('.ad-form__submit'),
    USER_PIC: FORM.querySelector('#avatar'),
    HOUSE_PIC: FORM.querySelector('#images'),
    FIELDS: Array.from(FORM.children)
  };

  function activateForm() {
    FORM.classList.remove('ad-form--disabled');
    window.util.enableElements(FORM_ELEMENTS.FIELDS);
  }

  function disableForm() {
    FORM.classList.add('ad-form--disabled');
    window.util.disableElements(FORM_ELEMENTS.FIELDS);
  }

  window.form = {
    form: FORM,
    formElements: FORM_ELEMENTS,
    activateForm: activateForm,
    disableForm: disableForm
  };
})();
