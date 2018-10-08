/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.home',
        []
    );

    module.controller('HomeCtrl',
        [ '$scope', '$location', '$http', '$timeout', '$cookieStore',
        

    function HomeCtrl($scope, $location, $http, $timeout, $cookieStore) {

        document.getElementById("navBars").style.display="block";

        $(".hideInInitial").show(); // To hide the navigation bar list only in initialSetup.html page..

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('HomeCtrl module is called..');

        $scope.inviteInEmail = function(){
            window.location='#/emailInvite';
        };

        $scope.uploadData = function(){
            window.location='#/uploadUserData';
        };

        $scope.inviteInMobile = function(){
            window.location='#/mobileInvite';
        };

    }

    ]);

})();