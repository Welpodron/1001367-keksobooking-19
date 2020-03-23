'use strict';

(function () {

  var CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
  var FEATURE_TEMPLATE = CARD_TEMPLATE.querySelector('.popup__feature');
  var PHOTO_TEMPLATE = CARD_TEMPLATE.querySelector('.popup__photo');

  function generateArray(arr, target, type, template) {
    target.innerHTML = '';
    arr.forEach(function (arrItem) {
      var item = template.cloneNode(true);
      switch (type) {
        case 'feature':
          item.className = 'popup__feature popup__feature--' + arrItem;
          break;
        case 'photo':
          item.src = arrItem;
          break;
      }
      target.appendChild(item);
    });
  }

  function generateCard(offer) {
    var card = CARD_TEMPLATE.cloneNode(true);
    var cardCloseBtn = card.querySelector('.popup__close');
    card.querySelector('.popup__avatar').src = offer.author.avatar;
    card.querySelector('.popup__title').textContent = offer.offer.title;
    card.querySelector('.popup__text--address').textContent = offer.offer.address;
    card.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.getBuildingType(offer);
    card.querySelector('.popup__text--capacity').textContent = (
      window.util.getDeclension(offer.offer.rooms, window.data.roomsDeclension) + ' для ' + window.util.getDeclension(offer.offer.guests, window.data.guestsDeclension)
    );
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    generateArray(offer.offer.features, card.querySelector('.popup__features'), 'feature', FEATURE_TEMPLATE);
    card.querySelector('.popup__description').textContent = offer.offer.description;
    generateArray(offer.offer.photos, card.querySelector('.popup__photos'), 'photo', PHOTO_TEMPLATE);
    cardCloseBtn.addEventListener('click', cardButtonClickHandler);
    cardCloseBtn.addEventListener('keydown', cardButtonEnterHandler);
    document.addEventListener('keydown', cardButtonEscHandler);
    return card;
  }

  function insertCard(offer) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(generateCard(offer));
    window.map.selector.insertBefore(fragment, document.querySelector('.map__filters-container'));
  }

  function cardButtonClickHandler() {
    removeCard();
  }

  function cardButtonEnterHandler(evt) {
    if (window.util.isEnterPressed(evt)) {
      removeCard();
    }
  }

  function cardButtonEscHandler(evt) {
    if (window.util.isEscPressed(evt)) {
      removeCard();
    }
  }

  function removeCard() {
    var card = window.map.selector.querySelector('.map__card');
    var pin = window.map.selector.querySelector('.map__pin--active');
    if (card) {
      card.remove();
      if (pin) {
        window.pins.disable(pin);
      }
      card.querySelector('.popup__close').removeEventListener('click', cardButtonClickHandler);
      card.querySelector('.popup__close').removeEventListener('keydown', cardButtonEnterHandler);
      document.removeEventListener('keydown', cardButtonEscHandler);
    }
  }

  window.cards = {
    insert: insertCard,
    remove: removeCard
  };
})();
