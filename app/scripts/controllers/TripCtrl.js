/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.trip',
        []
    );

    module.controller('TripCtrl',
        [ '$scope',
        

    function TripCtrl($scope) {

        document.getElementById("navBars").style.display="block";

        $(".admin").hide();// To hide User portal list in Admin portal..


        // ==================== To avoide Admin to access user pages.. ===============

                var userRoleDatass = window.localStorage['userRoleData'];
                    $scope.userRoleDatas = userRoleDatass;

                    if($scope.userRoleDatas!='ROLE_USER'){

                       window.location = '#/login';

                    }

        // ============================================================================



        
        //alert("help");
        console.log('TripCtrl module is called..');

        $scope.showTripDetailSection = function(){
            $scope.showTripList = true;
            $scope.showTripDetails = true;
            $scope.showAddNewTrip = false;
        };

        $scope.backToTripList = function(){
            $scope.showTripList = false;
            $scope.showTripDetails = false;
            $scope.showAddNewTrip = false;
        };

        $scope.showAddNewTripSection = function(){
            $scope.showTripList = false;
            $scope.showTripDetails = false;
            $scope.showAddNewTrip = true;
        };

        $scope.showaddNewAddressSection = function(){
            $scope.hideaddNewAddressBtn = true;
            $scope.showAddNewAddress = true;
        };

        $scope.hideAddnewTripSection = function(){
            $scope.hideaddNewAddressBtn = false;
            $scope.showAddNewAddress = false;
        };


        // To enable and disable input based on checkbox selection..

            $scope.isCheckboxSelected = function(index) {
                return index === $scope.checkboxSelection;
            };



    }

    ]);

})();