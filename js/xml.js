'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };

  var Urls = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var Methods = {
    GET: 'GET',
    POST: 'POST'
  };

  var TIMEOUT_IN_MS = 10000;

  function load(url, method, onSuccess, onError, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        if (window.util.isCallBackFunction(callback)) {
          onSuccess(xhr.response, callback);
        } else {
          onSuccess(xhr.response);
        }
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    return xhr;
  }

  function download(successHandler, errorHandler, callback) {
    var xhr = load(Urls.DOWNLOAD, Methods.GET, successHandler, errorHandler, callback);
    xhr.send();
  }

  function upload(data, successHandler, errorHandler) {
    var xhr = load(Urls.UPLOAD, Methods.POST, successHandler, errorHandler, NaN);
    xhr.send(data);
  }

  window.xml = {
    download: download,
    upload: upload
  };
})();
