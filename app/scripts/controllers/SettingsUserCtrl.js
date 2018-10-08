/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.settingsUser',
        []
    );

    module.controller('SettingsUserCtrl',
        [ '$rootScope', '$scope', '$filter', '$http','$routeParams',
        

    function SettingsUserCtrl($rootScope, $scope, $filter, $http,$routeParams) {

        document.getElementById("navBars").style.display="block";



        // ==================== To avoide Admin to access user pages.. ===============

                    var userRoleDatass = window.localStorage['userRoleData'];
                        $scope.userRoleDatas = userRoleDatass;

                        if($scope.userRoleDatas!='ROLE_USER'){

                           window.location = '#/login';

                        }

        // ============================================================================



        $(".admin").hide();// To hide User portal list in Admin portal..


        var id = window.localStorage['userId'];
       // alert(id);

            // console.log("useridd.....",$localstorage.get('userId'));
        
        //alert("help");
        console.log('SettingsUserCtrl module is called..');

        refresh();

        function refresh(){
            $http({
                    method: 'GET',
                    url: 'api/v1/Company/info/'+ id
                }).success(function (data, status) {
                    $scope.companyName=data.compname;
                    $scope.email=data.email;
                    $scope.firstName=data.firstname;
                    $scope.lastName=data.lastname;
                    $scope.mobileNumber=data.phone;
                    $scope.gender=data.gender;
                    $scope.address1=data.address1;
                    $scope.address2=data.address2;
                    $scope.country=data.country;
                    $scope.city=data.city;
                    $scope.state=data.state;
                    $scope.zip=data.zip;

                    if(data.emailNotify=="Y"){
                        $scope.sendEmail = "Y";
                      } else{
                        $scope.sendEmail = "N";
                    }

                    if(data.mobileNotify=="Y"){
                        $scope.sendMobile = "Y";
                      } else{
                        $scope.sendMobile = "N";
                    }

                 }).error(function (data, status) {

                
            });
        }


        $scope.update=function(){

             if ($scope.myform.$valid) {

                if($scope.newPassword != $scope.confirmPassword){
                      $scope.confirmPasswordCheck = true;
                    } else {
                      $scope.confirmPasswordCheck = false;
             

            var jsonData={
                    "FirstName":$scope.firstName,
                    "LastName":  $scope.lastName,
                    "Gender":$scope.gender,
                    "mobile":$scope.mobileNumber,
                    "AddressLine1":$scope.address1,
                    "AddressLine2":$scope.address2,
                    "country":$scope.country,
                    "city":$scope.city,
                    "state":$scope.state,
                    "zip":$scope.zip,
                    "currentpassword":$scope.currentPassword,
                    "NewPassword":$scope.newPassword,
                    "confirmpassword":$scope.confirmPassword,
                    "emailNotify":$scope.sendEmail,
                    "mobileNotify":$scope.sendMobile
                    }

             $http({
                    method: 'PUT',
                    url: 'api/v1/personal/info/' + id,
                    data: jsonData
                }).success(function (data, status) {

                     if (status==200) {
                       // ================================ To show alert on deleting the user.. =========================================

                                  $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                     window.setTimeout(function() {
                                      $(".showAlertOnSuccessEntry").hide();
                                    },3000)

                       // ===============================================================================================================
                    };
               
                 }).error(function (data, status) {
                   
                    if (status==304) {
                     //   alert("Invalid Current password! Please enter correct password.")
                    };
                    if (status==401) {
                      //  alert("Password doesn't match.")
                    };

                     if (status==500) {
                      //  alert("Please fill all the required Fields!.")
                    };


                
            });

             }

                 } else {
                    $scope.submitted = true;
              }

              
        }

          

    } // end of controller..

    ]);

})();