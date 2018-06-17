(function (window) {
    'use strict';
    var $ = window.jQuery;

    var SERVER_URL = 'http://localhost:3001/';
    var App = window.App;
    var RemoteDataStore = App.RemoteDataStore;

    var remoteDS = new RemoteDataStore(SERVER_URL);

    remoteDS.get();

    setTimeout(function () {
        remoteDS.append();
    }, 10);

    remoteDS.addDeleteHandler();
    remoteDS.addCheckHandler();
    remoteDS.addPlusHandler();
})(window);
