'use strict';

(function () {

  var filter = document.querySelector('.map__filters');

  var filteredOffers = [];
  var filterStatus = false;

  var filterElements = {
    typesSelect: filter.querySelector('#housing-type'),
    priceSelect: filter.querySelector('#housing-price'),
    roomsSelect: filter.querySelector('#housing-rooms'),
    guestsSelect: filter.querySelector('#housing-guests'),
    featuresSelect: filter.querySelectorAll('#housing-features input'),
    fields: Array.from(filter.children)
  };

  function activateFilterForm() {
    filterStatus = true;
    window.pins.enableListening();
    updatePins();
    filter.addEventListener('change', window.debounce.delay(function () {
      updatePins();
    }));
    window.util.enableElements(filterElements.fields);
  }

  function disableFilterForm() {
    filter.removeEventListener('change', updatePins);
    filter.reset();
    window.util.disableElements(filterElements.fields);
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
    switch (filterElements.priceSelect.value) {
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
      Array.from(filterElements.featuresSelect).filter(function (feature) {
        return feature.checked;
      }).every(function (checkedFeature) {
        return offer.offer.features.includes(checkedFeature.value);
      })
    );
  }

  function filterType(offer) {
    return filterElements.typesSelect.value !== 'any' ? offer.offer.type === filterElements.typesSelect.value : true;
  }

  function filterRooms(offer) {
    return filterElements.roomsSelect.value !== 'any' ? offer.offer.rooms === parseInt(filterElements.roomsSelect.value, 10) : true;
  }

  function filterGuests(offer) {
    return filterElements.guestsSelect.value !== 'any' ? offer.offer.guests === parseInt(filterElements.guestsSelect.value, 10) : true;
  }

  function isFilterActive() {
    return filterStatus;
  }

  window.filter = {
    apply: filterElements.fields,
    isActive: isFilterActive,
    getFilteredOffers: getFilteredOffers,
    activate: activateFilterForm,
    disable: disableFilterForm
  };
})();
