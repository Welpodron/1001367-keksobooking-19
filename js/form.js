'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var formElements = {
    titleInput: form.querySelector('#title'),
    priceInput: form.querySelector('#price'),
    addressInput: form.querySelector('#address'),
    typesSelect: form.querySelector('#type'),
    roomsSelect: form.querySelector('#room_number'),
    guestsSelect: form.querySelector('#capacity'),
    timeIn: form.querySelector('#timein'),
    timeOut: form.querySelector('#timeout'),
    reset: form.querySelector('.ad-form__reset'),
    submit: form.querySelector('.ad-form__submit'),
    userPic: form.querySelector('#avatar'),
    userPicPreview: form.querySelector('.ad-form-header__preview img'),
    housePic: form.querySelector('#images'),
    housePicPreview: form.querySelector('.ad-form__photo'),
    fields: Array.from(form.children)
  };

  var DEFAULT_USER_PIC_SRC = 'img/muffin-grey.svg';

  var nodeTemplateTarget = document.querySelector('main');
  var successSubmitTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorSubmitTemplate = document.querySelector('#error').content.querySelector('.error');

  function activateForm() {
    form.addEventListener('submit', submitFormHandler);
    form.addEventListener('reset', resetFormHandler);
    form.classList.remove('ad-form--disabled');
    window.util.enableElements(formElements.fields);
  }

  function disableForm() {
    form.classList.add('ad-form--disabled');
    window.util.disableElements(formElements.fields);
  }

  function submitFormHandler(evt) {
    evt.preventDefault();
    window.xml.upload(new FormData(evt.target), successSubmitHandler, errorSubmitHandler);
  }

  function resetFormHandler() {
    disableForm();
    resetUserPic();
    resetHousePic();
    window.validation.disable();
    window.util.togglePage();
    window.map.disable();
    window.pins.reset();

    if (window.filter.isActive()) {
      window.filter.disable();
      window.pins.disableListening();
    }

    form.removeEventListener('submit', submitFormHandler);
    form.removeEventListener('reset', resetFormHandler);
  }

  function successSubmitHandler() {
    form.reset();
    var node = successSubmitTemplate.cloneNode(true);
    document.addEventListener('keydown', successPopUpEscHandler);
    document.addEventListener('click', successPopUpClickHandler);
    nodeTemplateTarget.insertAdjacentElement('afterbegin', node);
  }

  function errorSubmitHandler() {
    var node = errorSubmitTemplate.cloneNode(true);
    var nodeCloseBtn = node.querySelector('.error__button');
    nodeCloseBtn.addEventListener('keydown', errorPopUpButtonEnterHandler);
    nodeCloseBtn.addEventListener('click', errorPopUpButtonClickHandler);
    document.addEventListener('keydown', errorPopUpEscHandler);
    document.addEventListener('click', errorPopUpClickHandler);
    nodeTemplateTarget.insertAdjacentElement('afterbegin', node);
  }

  function uploadUserPicHandler(evt) {
    formElements.userPicPreview.src = evt.target.result;
  }

  function uploadHousePicHandler(evt) {
    resetHousePic();
    var node = document.createElement('img');
    node.src = evt.target.result;
    node.alt = 'Фотография жилья';
    node.width = (parseInt(getComputedStyle(formElements.housePicPreview).width, 10)).toString();
    node.height = (parseInt(getComputedStyle(formElements.housePicPreview).height, 10)).toString();
    formElements.housePicPreview.insertAdjacentElement('afterbegin', node);
  }

  function resetHousePic() {
    formElements.housePicPreview.innerHTML = '';
  }

  function resetUserPic() {
    formElements.userPicPreview.src = DEFAULT_USER_PIC_SRC;
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
    uploadHousePicHandler: uploadHousePicHandler,
    uploadUserPicHandler: uploadUserPicHandler,
    elements: formElements,
    activate: activateForm,
  };
})();
