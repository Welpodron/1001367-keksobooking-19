'use strict';

(function () {

  var MAX_PRICE = 1000000;
  var DEFAULT_PRICE_PLACEHOLDER = '1 000';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var guests = window.form.elements.guestsSelect;
  var types = window.form.elements.typesSelect;
  var price = window.form.elements.priceInput;
  var timeIn = window.form.elements.timeIn;
  var timeOut = window.form.elements.timeOut;
  var rooms = window.form.elements.roomsSelect;
  var submitButton = window.form.elements.submit;
  var userPicInput = window.form.elements.userPic;
  var housePicInput = window.form.elements.housePic;

  var minPrice = 0;

  function changePrice(target) {
    price.placeholder = window.data.getBuildingMinPrice(target.value).toLocaleString('ru');
    minPrice = window.data.getBuildingMinPrice(target.value);
  }

  function resetPrice() {
    price.placeholder = DEFAULT_PRICE_PLACEHOLDER;
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
        guests.setCustomValidity('Для варианта: ' + rooms.options[rooms.options.selectedIndex].text + ' доступны следующие варианты: ' + cacheString);
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

  function validateImage(target) {
    var file = target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      if (target.name === userPicInput.name) {
        reader.addEventListener('load', window.form.uploadUserPicHandler);
      } else if (target.name === housePicInput.name) {
        reader.addEventListener('load', window.form.uploadHousePicHandler);
      }

      reader.readAsDataURL(file);
    }
  }

  function userPicInputHandler(evt) {
    validateImage(evt.target);
  }

  function housePicInputHandler(evt) {
    validateImage(evt.target);
  }

  function activateValidation() {
    userPicInput.addEventListener('change', userPicInputHandler);
    housePicInput.addEventListener('change', housePicInputHandler);
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
    resetPrice();
    userPicInput.removeEventListener('change', userPicInputHandler);
    housePicInput.removeEventListener('change', housePicInputHandler);
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
    activate: activateValidation,
    disable: disableValidation
  };
})();
