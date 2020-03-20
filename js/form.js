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

  var NODE_TEMPLATE_TARGET = document.querySelector('main');
  var SUCCESS_SUBMIT_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  var ERROR_SUBMIT_TEMPLATE = document.querySelector('#error').content.querySelector('.error');

  function activateForm() {
    FORM.addEventListener('submit', submitFormHandler);
    FORM.addEventListener('reset', resetFormHandler);
    FORM.classList.remove('ad-form--disabled');
    window.util.enableElements(FORM_ELEMENTS.FIELDS);
  }

  function disableForm() {
    FORM.classList.add('ad-form--disabled');
    window.util.disableElements(FORM_ELEMENTS.FIELDS);
  }

  function submitFormHandler(evt) {
    evt.preventDefault();
    window.xml.upload(new FormData(evt.target), successSubmitHandler, errorSubmitHandler);
  }

  function resetFormHandler() {
    disableForm();
    window.validation.disableValidation();
    window.util.togglePage();
    window.map.disableMap();
    window.pins.resetMainPinAddress();

    if (window.filter.isFilterActive()) {
      window.filter.disableFilterForm();
    }
  }

  function successSubmitHandler() {
    FORM.reset();
    var node = SUCCESS_SUBMIT_TEMPLATE.cloneNode(true);
    document.addEventListener('keydown', successPopUpEscHandler);
    document.addEventListener('click', successPopUpClickHandler);
    NODE_TEMPLATE_TARGET.insertAdjacentElement('afterbegin', node);
  }

  function errorSubmitHandler() {
    var node = ERROR_SUBMIT_TEMPLATE.cloneNode(true);
    var nodeCloseBtn = node.querySelector('.error__button');
    nodeCloseBtn.addEventListener('keydown', errorPopUpButtonEnterHandler);
    nodeCloseBtn.addEventListener('click', errorPopUpButtonClickHandler);
    document.addEventListener('keydown', errorPopUpEscHandler);
    document.addEventListener('click', errorPopUpClickHandler);
    NODE_TEMPLATE_TARGET.insertAdjacentElement('afterbegin', node);
  }

  function successPopUpEscHandler(evt) {
    if (window.util.isEscPressed(evt)) {
      var node = document.querySelector('.success');
      removeNode(node, 'success');
    }
  }

  function successPopUpClickHandler() {
    var node = document.querySelector('.success');
    removeNode(node, 'success');
  }

  function errorPopUpEscHandler(evt) {
    if (window.util.isEscPressed(evt)) {
      var node = document.querySelector('.error');
      removeNode(node, 'error');
    }
  }

  function errorPopUpClickHandler() {
    var node = document.querySelector('.error');
    removeNode(node, 'error');
  }

  function errorPopUpButtonClickHandler() {
    var node = document.querySelector('.error');
    removeNode(node, 'error');
  }

  function errorPopUpButtonEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      var node = document.querySelector('.error');
      removeNode(node, 'error');
    }
  }

  function removeNode(node, type) {
    switch (type) {
      case 'success':
        document.removeEventListener('keydown', successPopUpEscHandler);
        document.removeEventListener('click', successPopUpClickHandler);
        break;
      case 'error':
        var nodeCloseBtn = node.querySelector('.error__button');
        nodeCloseBtn.removeEventListener('keydown', errorPopUpButtonEnterHandler);
        nodeCloseBtn.removeEventListener('click', errorPopUpButtonClickHandler);
        document.removeEventListener('keydown', errorPopUpEscHandler);
        document.removeEventListener('click', errorPopUpClickHandler);
        break;
    }
    node.remove();
  }

  window.form = {
    form: FORM,
    formElements: FORM_ELEMENTS,
    activateForm: activateForm,
    disableForm: disableForm
  };
})();
