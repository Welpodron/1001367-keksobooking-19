'use strict';

(function () {
  var FILTER_FIELDS = Array.from(document.querySelector('.map__filters').children);

  function activateFilterForm() {
    window.util.enableElements(FILTER_FIELDS);
  }

  function disableFilterForm() {
    window.util.disableElements(FILTER_FIELDS);
  }

  window.filter = {
    filterFields: FILTER_FIELDS,
    activateFilterForm: activateFilterForm,
    disableFilterForm: disableFilterForm
  };
})();
