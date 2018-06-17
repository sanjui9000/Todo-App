(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var data = [];

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.get = function () {
        $.ajax({
            url: this.serverUrl + 'todos',
            dataType: 'json',
            success: function (data) {
                data = data.slice(0, 10); // Stripping out to 10 elements
                this.data = data;
            }.bind(this),
            error: function (error) {
                Error(error);
            }
        });
    };

    RemoteDataStore.prototype.getLocalItems = function () {
        return this.data;
    };

    RemoteDataStore.prototype.append = function () {
        var data = this.getLocalItems();
        $('.dropdown').empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].completed === false) {
                $('.dropdown').append('<li><input type="checkbox" class=' + data[i].id + '><label id=' + data[i].id + ' class="listElement" for=' + data[i].id + '>' + data[i].title + '<span class="delete"><img data-id=' + data[i].id + ' src="img/delete.png"></span></label></li>');
            } else {
                $('.dropdown').append('<li><input type="checkbox" checked class=' + data[i].id + '><label id=' + data[i].id + ' class="listElement" for=' + data[i].id + '>' + data[i].title + '<span class="delete"><img data-id=' + data[i].id + ' src="img/delete.png"></span></label></li>');
            }
        }
    };

    RemoteDataStore.prototype.addDeleteHandler = function () {
        $(document).on('click', '.delete', function (e) {
            $.ajax({
                url: 'http://localhost:3001/' + 'todos/' + e.target.dataset.id,
                type: 'DELETE',
                success: function () {
                    this.get();
                    setTimeout(function () {
                        this.append();
                    }.bind(this), 10);
                }.bind(this),
                error: function (error) {
                    Error(error);
                }
            });

        }.bind(this));
    };

    RemoteDataStore.prototype.addCheckHandler = function () {
        $(document).on('click', '.listElement', function (e) {
            var data = this.getLocalItems();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == e.target.id) {
                    data[i].completed = !data[i].completed;
                    $.ajax({
                        url: 'http://localhost:3001/' + 'todos/' + data[i].id,
                        type: 'PUT',
                        data: {"completed": data[i].completed},
                        success: function () {
                            this.get();
                            setTimeout(function () {
                                this.append();
                            }.bind(this), 10);
                        }.bind(this),
                        error: function (error) {
                            Error(error);
                        }
                    });
                }
            }
        }.bind(this));
    };

    RemoteDataStore.prototype.addPlusHandler = function () {
        $(document).on('click', '.fa-plus', function () {
            var title = prompt("Task's Title:");
            if (title) {
                var items = this.getLocalItems();
                var max = this.getMax(items,"id");
                var reqNum = max.id + 1;
                $.ajax({
                    url: 'http://localhost:3001/' + 'todos',
                    type: 'POST',
                    data: {"userId": 1, "id": reqNum, "title": title, "completed": false},
                    success: function () {
                        this.get();
                        setTimeout(function () {
                            this.append();
                        }.bind(this), 10);
                    }.bind(this),
                    error: function (error) {
                        Error(error);
                    }
                });
            }
        }.bind(this));
    };

    RemoteDataStore.prototype.getMax = function (arr, prop) {
        var max;
        for (var i = 0; i < arr.length; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
