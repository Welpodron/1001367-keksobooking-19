'use strict';

(function () {

  var MAX_PRICE = 1000000;

  var guests = window.form.formElements.GUESTS_SELECT;
  var types = window.form.formElements.TYPES_SELECT;
  var price = window.form.formElements.PRICE_INPUT;
  var timeIn = window.form.formElements.TIME_IN;
  var timeOut = window.form.formElements.TIME_OUT;
  var rooms = window.form.formElements.ROOMS_SELECT;
  var submitButton = window.form.formElements.SUBMIT;

  var minPrice = 0;

  function changePrice(target) {
    price.placeholder = window.data.getBuildingMinPrice(target.value).toLocaleString('ru');
    minPrice = window.data.getBuildingMinPrice(target.value);
  }

  function priceValidationHandler() {
    minPrice = window.data.getBuildingMinPrice(types.value);
    if (price.value < minPrice) {
      if (price.validity.valueMissing) {
        price.setCustomValidity('Обязательное поле');
      } else {
        price.setCustomValidity('Минимальная стоимость данного типа жилья: ' + minPrice);
      }
    } else if (price.value > MAX_PRICE) {
      price.setCustomValidity('Максимальная стоимость жилья: ' + MAX_PRICE);
    } else {
      price.setCustomValidity('');
    }
  }

  // Исправить склонения, при необходимости переработать функцию
  function validateRooms() {
    if (!(rooms.value >= guests.value && rooms.value < 100 && guests.value > 0)) {
      if (rooms.value >= 100 && guests.value <= 0) {
        guests.setCustomValidity('');
      } else {
        var cacheString = '';
        for (var i = 0; i < guests.options.length; i++) {
          if (rooms.value >= guests.options[i].value && rooms.value < 100 && guests.options[i].value > 0) {
            cacheString += guests.options[i].text + ' ';
          } else if (rooms.value >= 100 && guests.options[i].value <= 0) {
            cacheString += guests.options[i].text + ' ';
          }
        }
        guests.setCustomValidity('Для ' + rooms.options[rooms.options.selectedIndex].text + ' доступны следующие варианты: ' + cacheString);
      }
    } else {
      guests.setCustomValidity('');
    }
  }

  function roomsChangeHandler() {
    validateRooms();
  }

  function guestsChangeHandler() {
    validateRooms();
  }

  function typesChangeHandler(evt) {
    changePrice(evt.target);
  }

  function timeInChangeHandler(evt) {
    timeOut.value = evt.target.value;
  }

  function timeOutChangeHandler(evt) {
    timeIn.value = evt.target.value;
  }

  function submitButtonClickHandler() {
    priceValidationHandler();
    validateRooms();
  }

  function submitButtonEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      priceValidationHandler();
      validateRooms();
    }
  }

  function activateValidation() {
    types.addEventListener('change', typesChangeHandler);
    timeIn.addEventListener('change', timeInChangeHandler);
    timeOut.addEventListener('change', timeOutChangeHandler);
    submitButton.addEventListener('click', submitButtonClickHandler);
    submitButton.addEventListener('keydown', submitButtonEnterHandler);
    price.addEventListener('input', priceValidationHandler);
    guests.addEventListener('change', guestsChangeHandler);
    rooms.addEventListener('change', roomsChangeHandler);
  }

  function disableValidation() {
    changePrice(types);
    types.removeEventListener('change', typesChangeHandler);
    timeIn.removeEventListener('change', timeInChangeHandler);
    timeOut.removeEventListener('change', timeOutChangeHandler);
    submitButton.removeEventListener('click', submitButtonClickHandler);
    submitButton.removeEventListener('keydown', submitButtonEnterHandler);
    price.removeEventListener('input', priceValidationHandler);
    guests.removeEventListener('change', guestsChangeHandler);
    rooms.removeEventListener('change', roomsChangeHandler);
  }

  changePrice(types);

  window.validation = {
    activateValidation: activateValidation,
    disableValidation: disableValidation
  };
})();
