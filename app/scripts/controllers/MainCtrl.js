/**
* Created by Steevan on 12/10/15.
*/

(function () {
    'use strict';

    var module = angular.module('ct.controllers.main', ['ct.controllers.help','ct.controllers.changePassword','ct.controllers.planBilling','ct.controllers.subscribe','ct.controllers.initialSetupOne','ct.controllers.initialSetupTwo','ct.controllers.initialSetupThree','ct.controllers.employeeSignup','ct.controllers.web','ct.controllers.settings','ct.controllers.settingsUser','ct.controllers.updateEventDetails','ct.controllers.forgotPassword','ct.controllers.forgotPasswordGetLink','ct.controllers.tripNotification','ct.controllers.trip', 'ct.controllers.initialSetup', 'ct.controllers.home', 'ct.controllers.user','ct.controllers.group','ct.controllers.event', 'ct.controllers.login', 'ct.controllers.notifications', 'ct.controllers.dashboard', 'ct.controllers.group_user', 'ct.controllers.event_user', 'ct.controllers.emailInvite' , 'ct.controllers.mobileInvite', 'ct.controllers.uploadUserData'  ]);
    
    module.controller('MainCtrl', [  '$rootScope', '$scope', '$location', '$http', '$timeout', '$cookieStore', MainCtrl ]);

    function MainCtrl($rootScope, $scope, $location, $http, $timeout, $cookieStore) {

        // alert("Main Controller is called..");
        console.log("MainCtrl is called...");

          // navbar Id to hide navigation bar in Login page..
        //document.getElementById("navBars").style.display="none";

        // document.getElementById("navBars").style.display="none";

        // $(".user").hide(); // To hide User portal list in Admin portal..
        // $(".admin").hide();



       // To store notification count and show it in navbar.. 
        // var notificationCounts = window.localStorage['notificationCount'];
        // $scope.notificationCounts = notificationCounts;



// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('notificationCount',function(newVal,oldVal){
            if(newVal){
                 $scope.notificationCounts=newVal;

            }
        })

        var notificationCounts = window.localStorage['notificationCount'];
        if(!($scope.rootScope&&$scope.rootScope.notificationCount)){
             $scope.notificationCounts=notificationCounts;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;

// ==============================================================================================


// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('companyNameTodisplay',function(newVal,oldVal){
            if(newVal){
                 $scope.companyNameTodisplayss=newVal;

            }
        })

        var companyNameTodisplays = window.localStorage['companyNameTodisplay'];
        if(!($scope.rootScope&&$scope.rootScope.companyNameTodisplay)){
             $scope.companyNameTodisplayss=companyNameTodisplays;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;

// ==============================================================================================



// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('firstNameTodisplay',function(newVal,oldVal){
            if(newVal){
                 $scope.firstNameTodisplayss=newVal;

            }
        })

        var firstNameTodisplays = window.localStorage['firstNameTodisplay'];
        if(!($scope.rootScope&&$scope.rootScope.firstNameTodisplay)){
             $scope.firstNameTodisplayss=firstNameTodisplays;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;

// ==============================================================================================

// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('lastNameTodisplay',function(newVal,oldVal){
            if(newVal){
                 $scope.lastNameTodisplayss=newVal;

            }
        })

        var lastNameTodisplays = window.localStorage['lastNameTodisplay'];
        if(!($scope.rootScope&&$scope.rootScope.lastNameTodisplay)){
             $scope.lastNameTodisplayss=lastNameTodisplays;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;

// ==============================================================================================




// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('groupAdmin',function(newVal,oldVal){
            if(newVal){
                 $scope.groupAdminss=newVal;

            }
        })

        var groupAdmins = window.localStorage['groupAdmin'];
        if(!($scope.rootScope&&$scope.rootScope.groupAdmin)){
             $scope.groupAdminss=groupAdmins;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;


        console.log("$scope.groupAdminss_____________",$scope.groupAdminss);

// ==============================================================================================

// ======================= To show Company Name dynamically in nav bar.. ========================

        $rootScope.$watch('roleAdmin',function(newVal,oldVal){
            if(newVal){
                 $scope.roleAdminss=newVal;

            }
        })

        var roleAdmins = window.localStorage['roleAdmin'];
        if(!($scope.rootScope&&$scope.rootScope.roleAdmin)){
             $scope.roleAdminss=roleAdmins;
        }
        // $scope.companyNameTodisplayss = companyNameTodisplays;


        console.log("$scope.roleAdminss_____________",$scope.roleAdminss);



        if($scope.roleAdminss=="ROLE_ADMIN" || ($scope.roleAdminss=="ROLE_USER" && $scope.groupAdminss=='Y')){
            $("#isAdmin").show();
        } else{
            $("#isAdmin").hide();
        }

// ==============================================================================================



        // var firstNameTodisplays = window.localStorage['firstNameTodisplay'];
        // $scope.firstNameTodisplayss = firstNameTodisplays;

        // var lastNameTodisplays = window.localStorage['lastNameTodisplay'];
        // $scope.lastNameTodisplayss = lastNameTodisplays;

        // console.log("MailCtrl",$scope.companyNameTodisplayss)

       

        $scope.isCollapsed = true; // To hide and show the nav bar in mobile view..

          $scope.logout = function () {
               // alert("Logout function called..");
                 var cookie={"token":$cookieStore.get('authToken')}

                $http({
                    method: 'POST',
                    url: 'api/user/authenticate/logout',
                    data:cookie
                }).success(function (data, status) {

                    $cookieStore.remove("authToken");
                    $scope.authendicated = false;
                    $scope.userName = "";
                    window.location = "./";

                     window.localStorage['userId'] = "";

                     $window.localStorage.clear();

                }).error(function (data, status) {

                    $cookieStore.remove("authToken");
                    $scope.authendicated = false;
                    $scope.userName = "";
                    window.location = "./";
            });

            //$location.path("/login");
        };


        $scope.loadBasicInfo = function () {

            // alert("Loading basic information..");
            
            var acwebUserName=$cookieStore.get("acwebUserName");
            var mgmtwebUserName=$cookieStore.get("mgmtwebUserName");
        if(acwebUserName && mgmtwebUserName) {
            $http({
            method: 'POST',
            url: "api/user/authenticate",
            data: "username=''&password=''"
            }).success(function (data, status) {
            $scope.$parent.authendicated = true;
        
            $cookieStore.put('authToken', data.token);
            $scope.isAuthendicated = true;
            }).error(function (data, status) {
            $scope.$parent.addAlert("Invalid username or password", "danger");
           });
          }
                    
            };

      
        $scope.loadBasicInfo();




       


      
    }




})();