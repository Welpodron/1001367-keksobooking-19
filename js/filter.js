'use strict';

(function () {

  var FILTER = document.querySelector('.map__filters');

  var filteredOffers = [];
  var filterStatus = false;

  var FilterElements = {
    TYPES_SELECT: FILTER.querySelector('#housing-type'),
    PRICE_SELECT: FILTER.querySelector('#housing-price'),
    ROOMS_SELECT: FILTER.querySelector('#housing-rooms'),
    GUESTS_SELECT: FILTER.querySelector('#housing-guests'),
    FEATURES_SELECT: FILTER.querySelectorAll('#housing-features input'),
    FIELDS: Array.from(FILTER.children)
  };

  function activateFilterForm() {
    filterStatus = true;
    window.pins.enableListening();
    updatePins();
    FILTER.addEventListener('change', window.debounce.delay(function () {
      updatePins();
    }));
    window.util.enableElements(FilterElements.FIELDS);
  }

  function disableFilterForm() {
    FILTER.removeEventListener('change', updatePins);
    FILTER.reset();
    window.util.disableElements(FilterElements.FIELDS);
  }

  function updatePins() {
    filteredOffers = filterFields(window.data.getInfo());
    window.cards.remove();
    window.pins.render(filteredOffers);
  }

  function getFilteredOffers() {
    return filteredOffers;
  }

  function filterFields(offers) {
    return offers.filter(function (offer) {
      return (
        filterType(offer) &&
        filterRooms(offer) &&
        filterGuests(offer) &&
        filterPrice(offer) &&
        filterFeatures(offer)
      );
    });
  }

  function filterPrice(offer) {
    switch (FilterElements.PRICE_SELECT.value) {
      case 'any':
        return true;
      case 'middle':
        return offer.offer.price >= 10000 && offer.offer.price <= 50000;
      case 'low':
        return offer.offer.price < 10000;
      case 'high':
        return offer.offer.price > 50000;
    }

    return true;
  }

  function filterFeatures(offer) {
    return (
      Array.from(FilterElements.FEATURES_SELECT).filter(function (feature) {
        return feature.checked;
      }).every(function (checkedFeature) {
        return offer.offer.features.includes(checkedFeature.value);
      })
    );
  }

  function filterType(offer) {
    return FilterElements.TYPES_SELECT.value !== 'any' ? offer.offer.type === FilterElements.TYPES_SELECT.value : true;
  }

  function filterRooms(offer) {
    return FilterElements.ROOMS_SELECT.value !== 'any' ? offer.offer.rooms === parseInt(FilterElements.ROOMS_SELECT.value, 10) : true;
  }

  function filterGuests(offer) {
    return FilterElements.GUESTS_SELECT.value !== 'any' ? offer.offer.guests === parseInt(FilterElements.GUESTS_SELECT.value, 10) : true;
  }

  function isFilterActive() {
    return filterStatus;
  }

  window.filter = {
    apply: FilterElements.FIELDS,
    isActive: isFilterActive,
    getFilteredOffers: getFilteredOffers,
    activate: activateFilterForm,
    disable: disableFilterForm
  };
})();
