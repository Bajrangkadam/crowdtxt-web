/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.login',
        []
    );

    module.controller('LoginCtrl',
        ['$scope', '$location', '$http', '$timeout', '$cookieStore', '$rootScope',

            function LoginCtrl($scope, $location, $http, $timeout, $cookieStore, $rootScope) {

                // navbar Id to hide navigation bar in Login page..
                // document.getElementById("navBars").style.display="none";

                // $(".user").hide(); // To hide User portal list in Admin portal..
                // $(".admin").hide();

                $scope.navbarCollapsed = true;


                //alert("help");
                console.log('LoginCtrl module is called..');
                var keyValue = $location.search();
                console.log("----->", keyValue);
                if (keyValue.id && keyValue.id != "") {
                    if (typeof keyValue.id === "string") {
                    }
                    if (typeof keyValue.id === "boolean") {
                        return;
                    }
                    $http({
                        method: 'PUT',
                        url: 'api/resource/paypal/' + keyValue.id,
                        data: keyValue,
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })
                        .success(function (data, status, response) {

                        });
                }


                // window.localStorage['companyNameTodisplay'] = "";


                $scope.login = function () {


                    // alert($scope.userName);
                    // alert($scope.password);

                    $("#isAdmin").hide();

                    $http({
                        method: 'POST',
                        url: 'api/user/authenticate',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        data: { 'email': $scope.userName, 'password': $scope.password }
                    }).success(function (data, status) {                        
                        // $scope.password = "";
                        // $scope.$parent.authendicated = true;
                        $cookieStore.put('authToken', data.token);
                        data = data.data;
                        // ===================== To set role based login.. ==========================

                        var emailId = $scope.userName;
                        window.localStorage['isInitialSetupDone'] = data[0].setupdone;
                        window.localStorage['userRoleData'] = data[0].role;
                        $scope.firstNameTodisplay = data[0].firstname;
                        $scope.lastNameTodisplay = data[0].lastname;

                        window.localStorage['companyNameTodisplay'] = data[0].companyname;
                        $rootScope.companyNameTodisplay = data[0].companyname;
                        $rootScope.firstNameTodisplay = data[0].firstname;
                        $rootScope.lastNameTodisplay = data[0].lastname;
                        window.localStorage['firstNameTodisplay'] = data[0].firstname;
                        window.localStorage['lastNameTodisplay'] = data[0].lastname;


                        window.localStorage['emailToDisplay'] = data[0].email;

                        window.localStorage['groupAdmin'] = data[0].isGroupAdmin;
                        window.localStorage['roleAdmin'] = data[0].role;
                        $rootScope.groupAdmin = data[0].isGroupAdmin;
                        $rootScope.roleAdmin = data[0].role;

                        if (data[0].role == "ROLE_ADMIN" || data[0].isGroupAdmin == 'Y') {
                            $("#isAdmin").show();
                        }

                        // if(data[0].status=="Y")
                        // {
                        //     window.location='#/event';
                        //     document.getElementById("navBars").style.display="block";
                        //     $(".user").hide();
                        //     $(".admin").show();
                        // }

                        //  if(data[0].status=="N")
                        // {
                        //     window.location='#/initialSetup';
                        //     document.getElementById("navBars").style.display="block";
                        //     $(".user").hide();
                        //     $(".admin").show();
                        // }







                        // if(data[0].role=="ROLE_ADMIN")
                        // {
                        //     window.location='#/initialSetup';
                        //     document.getElementById("navBars").style.display="block";
                        //     $(".user").hide();
                        //     $(".admin").show();
                        // }




                        console.log("$location.search()", $location.search());

                        if (data[0].role == "ROLE_USER" && $location.search().id != null) {

                            window.location = '#/event_user?id=' + $location.search().id;
                            document.getElementById("navBars").style.display = "block";
                            $(".admin").hide();
                            $(".user").show();
                            return;
                        }


                        if (data[0].role == "ROLE_USER") {

                            window.location = '#/event_user';
                            document.getElementById("navBars").style.display = "block";
                            $(".admin").hide();
                            $(".user").show();
                        }


                        if (data[0].role == "ROLE_ADMIN" && data[0].setupdone != "Y" && data[0].setupdone != "N") {
                            window.location = '#/initialSetupOne';
                            document.getElementById("navBars").style.display = "block";
                            $(".user").hide();
                            $(".admin").show();
                        }



                        if (data[0].role == "ROLE_ADMIN" && data[0].setupdone == "Y") {

                            console.log("Admin");
                            window.location = '#/event';
                            document.getElementById("navBars").style.display = "block";
                            $(".user").hide();
                            $(".admin").show();
                        }

                        if (data[0].role == "ROLE_ADMIN" && data[0].setupdone == "N") {
                            window.location = '#/initialSetupOne';
                            document.getElementById("navBars").style.display = "block";
                            $(".user").hide();
                            $(".admin").show();
                        }


                        window.localStorage['userId'] = data[0].userid;
                        //   alert( data[0].userId);

                        //});

                        // ==========================================================================





                        // if($scope.userName=="admin@crowdtxt.com")
                        // {
                        //     window.location='#/initialSetup';
                        //     document.getElementById("navBars").style.display="block";
                        //     $(".user").hide();
                        // }
                        // if($scope.userName=="user@crowdtxt.com")
                        // {
                        //     window.location='#/event_user';
                        //     document.getElementById("navBars").style.display="block";
                        //     $(".admin").hide();
                        // }
                        // $scope.$parent.loadBasicInfo();
                        // $scope.isAuthendicated = true;
                        // $scope.$parent.closeAlert();

                    }).error(function (data, status) {

                        // ================================ To show alert on deleting the user.. =========================================

                        $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                        window.setTimeout(function () {
                            $(".showAlertClass").hide();
                        }, 3000)

                        // ===============================================================================================================

                        $scope.showAlert = true; // To show Toast Notification when wrong Username and Password is entered..
                        // $scope.$parent.addAlert('Invalid username or password', 'danger');
                    });


                };




                $scope.openForgotPassword = function () {
                    window.location = '#/forgotPassword';
                };




                //    $scope.login = function () {
                //      $scope.$parent.closeAlert();
                //     $http({
                //         method: 'POST',
                //         url: "api/user/authenticate",
                //         data: "username=" + $scope.tUsername + "&password=" + $scope.tPassword
                //     }).success(function (data, status) {
                //         $scope.tPassword = "";
                //         $scope.$parent.authendicated = true;
                //         $cookieStore.put('authToken', data.token);
                //         $scope.$parent.loadBasicInfo();
                //         $scope.isAuthendicated = true;
                //         $scope.$parent.closeAlert();

                //     }).error(function (data, status) {
                //         $scope.$parent.addAlert("Invalid username or password", "danger");
                //     }).then(function(data){


                //                 $http({
                //                 method: 'GET',
                //                 url: 'api/v1/user/config',
                //                 headers: {
                //                     "Content-Type": 'application/json'
                //                 }
                //             }).success(function (data, status) {
                //                 if(data.appLandingPage){
                //                     if(data.appLandingPage=="My Reports"){
                //                         $location.path("/myReports");
                //                     }
                //                     else{
                //                           $location.path("/"+data.appLandingPage);
                //                      }
                //                }else {
                //                       $location.path("/myReports");
                //                }
                //             }).error(function (data, status) {
                //                 $location.path("/myReports");
                //             });

                //             });
                // };
            }

        ]);

})();
