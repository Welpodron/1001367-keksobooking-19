'use strict';

(function () {
  var CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
  var FEATURE_TEMPLATE = CARD_TEMPLATE.querySelector('.popup__feature');
  var PHOTO_TEMPLATE = CARD_TEMPLATE.querySelector('.popup__photo');

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

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

  function generateCard(advertisement) {
    var card = CARD_TEMPLATE.cloneNode(true);
    var cardCloseBtn = card.querySelector('.popup__close');
    card.querySelector('.popup__avatar').src = advertisement.author.avatar;
    card.querySelector('.popup__title').textContent = advertisement.offer.title;
    card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    card.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.data.getBuildingType(advertisement);
    card.querySelector('.popup__text--capacity').textContent = (
      window.util.getDeclension(advertisement.offer.rooms, window.data.roomsDeclension) + ' для ' + window.util.getDeclension(advertisement.offer.guests, window.data.guestsDeclension)
    );
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    generateArray(advertisement.offer.features, card.querySelector('.popup__features'), 'feature', FEATURE_TEMPLATE);
    card.querySelector('.popup__description').textContent = advertisement.offer.description;
    generateArray(advertisement.offer.photos, card.querySelector('.popup__photos'), 'photo', PHOTO_TEMPLATE);
    cardCloseBtn.addEventListener('click', cardButtonClickHandler);
    cardCloseBtn.addEventListener('keydown', cardButtonEnterHandler);
    document.addEventListener('keydown', cardButtonEscHandler);
    return card;
  }

  function insertCard(advertisement) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(generateCard(advertisement));
    window.map.map.insertBefore(fragment, document.querySelector('.map__filters-container'));
  }

  function cardButtonClickHandler() {
    removeCard();
  }

  function cardButtonEnterHandler(evt) {
    if (evt.key === ENTER_KEY) {
      removeCard();
    }
  }

  function cardButtonEscHandler(evt) {
    if (evt.key === ESC_KEY) {
      removeCard();
    }
  }

  function removeCard() {
    var card = window.map.map.querySelector('.map__card');
    var pin = window.map.map.querySelector('.map__pin--active');
    if (card) {
      card.remove();
      if (pin) {
        window.pins.disablePin(pin);
      }
      card.querySelector('.popup__close').removeEventListener('click', cardButtonClickHandler);
      card.querySelector('.popup__close').removeEventListener('keydown', cardButtonEnterHandler);
      document.removeEventListener('keydown', cardButtonEscHandler);
    }
  }

  window.cards = {
    insertCard: insertCard,
    removeCard: removeCard
  };
})();
