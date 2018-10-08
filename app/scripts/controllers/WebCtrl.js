/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.web',
        []
    );

    module.controller('WebCtrl',
        [ '$rootScope', '$scope', '$filter', '$location', '$http','$routeParams',
        

    function WebCtrl($rootScope, $scope, $filter, $location, $http, $routeParams) {

        document.getElementById("navBars").style.display="none";
    
        //alert("help");
        console.log('WebCtrl module is called..');

        $scope.keyValue = $location.search();

        console.log("$location.search()",$location.search());

        $scope.navbarCollapsed = true;

    }

    ]);

})();