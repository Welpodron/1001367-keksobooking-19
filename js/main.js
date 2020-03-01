'use strict';

window.pins.toggleMap();
window.pins.insertPins(window.data.getAdvertisementsArray(), window.pins.pinsMap);
window.cards.insertCard(window.data.getAdvertisementsArray(), window.cards.cardsTarget);
