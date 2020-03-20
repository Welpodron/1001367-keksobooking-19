'use strict';

(function () {

  var FILTER = document.querySelector('.map__filters');

  var filteredOffers = [];
  var filterStatus = false;

  var FILTER_ELEMENTS = {
    TYPES_SELECT: FILTER.querySelector('#housing-type'),
    PRICE_SELECT: FILTER.querySelector('#housing-price'),
    ROOMS_SELECT: FILTER.querySelector('#housing-rooms'),
    GUESTS_SELECT: FILTER.querySelector('#housing-guests'),
    FEATURES_SELECT: FILTER.querySelectorAll('#housing-features'),
    FIELDS: Array.from(FILTER.children)
  };

  function activateFilterForm() {
    filterStatus = true;
    updatePins();
    FILTER.addEventListener('change', window.debounce.debounce(function () {
      updatePins();
    }));
    window.util.enableElements(FILTER_ELEMENTS.FIELDS);
  }

  function disableFilterForm() {
    FILTER.removeEventListener('change', updatePins);
    FILTER.reset();
    window.util.disableElements(FILTER_FIELDS);
  }

  function updatePins() {
    filteredOffers = filterFields(window.data.getData());
    window.cards.removeCard();
    window.pins.renderPins(filteredOffers);
  }

  function getfilteredOffers() {
    return filteredOffers;
  }

  function filterFields(offers) {
    return offers.filter(function (offer) {
      return (
        filterType(offer) &&
        filterRooms(offer) &&
        filterGuests(offer)
      );
    });
  }

  function filterType(offer) {
    return FILTER_ELEMENTS.TYPES_SELECT.value !== 'any' ? offer.offer.type === FILTER_ELEMENTS.TYPES_SELECT.value : true;
  }

  function filterRooms(offer) {
    return FILTER_ELEMENTS.ROOMS_SELECT.value !== 'any' ? offer.offer.rooms === parseInt(FILTER_ELEMENTS.ROOMS_SELECT.value, 10) : true;
  }

  function filterGuests(offer) {
    return FILTER_ELEMENTS.GUESTS_SELECT.value !== 'any' ? offer.offer.guests === parseInt(FILTER_ELEMENTS.GUESTS_SELECT.value, 10) : true;
  }

  function isFilterActive() {
    return filterStatus;
  }

  window.filter = {
    filterFields: FILTER_ELEMENTS.FIELDS,
    isFilterActive: isFilterActive,
    getfilteredOffers: getfilteredOffers,
    activateFilterForm: activateFilterForm,
    disableFilterForm: disableFilterForm
  };
})();
