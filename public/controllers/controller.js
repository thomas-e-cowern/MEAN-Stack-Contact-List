var MyApp = angular.module('myApp', []);

MyApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello world from controller");

    var refresh = function () {
        $http.get('/contactlist').then(function (response) {  //Replace contactlist with name of database

            console.log("I got the data I requested");

            $scope.contactlist = response.data;
            $scope.contact = null;

        });
    }

    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        if ($scope.contact === null) {
            console.log("It's empty");
            document.getElementById('warning').hidden = false
            return;
        } else {

            document.getElementById('warning').hidden = true
            $http.post('/contactlist', $scope.contact).then(function (response) {
                console.log(response);
                refresh();
            });
        }
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactlist/' + id).then(function (response) {
            console.log(response);
            refresh();
        });
    };

    $scope.edit = function (id) {
        document.getElementById('add').disabled = true;
        document.getElementById('update').disabled = false;
        console.log(id);
        $http.get('/contactlist/' + id).then(function (response) {
            console.log("edit resonse ", response);
            $scope.contact = response.data;
            //            refresh();
        });
        
    };

    $scope.update = function () {
        $scope.restoreAdd();
        document.getElementById('update').disabled = true;
        console.log("update id", $scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function (respons) {
            refresh();
        })
        
    };

    $scope.deselect = function () {
        $scope.restoreAdd();
        $scope.contact = null;
    }

    $scope.restoreAdd = function () {
        document.getElementById('add').disabled = false;
    }

}]);
