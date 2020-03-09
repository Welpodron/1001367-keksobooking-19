'use strict';

(function () {

  var ROOMS_FOR_GUESTS = {
    0: ['1'],
    1: ['1', '2'],
    2: ['1', '2', '3'],
    3: ['0']
  };

  var guests = window.form.formElements.GUESTS_SELECT;
  var guestsOptions = guests.querySelectorAll('option');
  var types = window.form.formElements.TYPES_SELECT;
  var price = window.form.formElements.PRICE_INPUT;
  var timeIn = window.form.formElements.TIME_IN;
  var timeOut = window.form.formElements.TIME_OUT;
  var rooms = window.form.formElements.ROOMS_SELECT;
  var form = window.form.form;

  function validatePrice(target) {
    var minPrice = window.data.getBuildingMinPrice(target.value);
    price.min = minPrice;
    price.placeholder = minPrice.toLocaleString('ru');
  }

  function validateRooms(target) {
    guestsOptions.forEach(function (option) {
      option.disabled = ROOMS_FOR_GUESTS[target.selectedIndex].indexOf(option.value) === -1 ? true : false;
      option.selected = ROOMS_FOR_GUESTS[target.selectedIndex][0] === option.value;
    });
  }

  function typesChangeHandler(evt) {
    validatePrice(evt.target);
  }

  function timeInChangeHandler(evt) {
    timeOut.value = evt.target.value;
  }

  function timeOutChangeHandler(evt) {
    timeIn.value = evt.target.value;
  }

  function roomsChangeHandler(evt) {
    validateRooms(evt.target);
  }

  function formResetHandler() {
    window.form.disableForm();
    window.map.disableMap();
    window.filter.disableFilterForm();
    window.pins.resetMainPinAddress();
    setTimeout(function () {
      validatePrice(types);
      validateRooms(rooms);
      disableValidation();
    }, 0);
  }

  function activateValidation() {
    form.addEventListener('reset', formResetHandler);
    rooms.addEventListener('change', roomsChangeHandler);
    types.addEventListener('change', typesChangeHandler);
    timeIn.addEventListener('change', timeInChangeHandler);
    timeOut.addEventListener('change', timeOutChangeHandler);
  }

  function disableValidation() {
    form.removeEventListener('reset', formResetHandler);
    rooms.removeEventListener('change', roomsChangeHandler);
    types.removeEventListener('change', typesChangeHandler);
    timeIn.removeEventListener('change', timeInChangeHandler);
    timeOut.removeEventListener('change', timeOutChangeHandler);
  }

  validatePrice(types);
  validateRooms(rooms);

  window.validation = {
    activateValidation: activateValidation,
  };
})();
