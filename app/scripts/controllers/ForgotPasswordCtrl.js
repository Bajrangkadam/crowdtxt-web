/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.forgotPassword',
        []
    );

    module.controller('ForgotPasswordCtrl',
        [   '$rootScope', '$scope', '$filter', '$location', '$http','$routeParams',

    function ForgotPasswordCtrl($rootScope, $scope, $filter, $location, $http, $routeParams) {
      
      // document.getElementById("navBars").style.display="none";

    	console.log("ForgotPasswordCtrl is called..");

      console.log("Location URL data",$location.absUrl());


    		$scope.returnToLogin = function(){
    			 window.location='#/login'; 
    		};





    		$scope.submitForgotPassword = function(){
           //   alert($scope.email);

      

    			if ($scope.myform.$valid) {
	             
          
                   $http({
                    method: 'POST',
                    url: 'api/resource/forget/password',
                    data: {
                            "emailid":$scope.email
                          }
                }).success(function (data, status) {

                  $scope.showtextMessage = true;
                  $scope.showMessage = true;
                  

                     if (status==200) {
                       // ================================ To show alert on password entry.. =========================================

                                $(".showAlertOnSuccessPassword").show(); // To show Toast Notification when clicked on delete..
                                   window.setTimeout(function() {
                                    $(".showAlertOnSuccessPassword").hide();
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

                 else {
                      $scope.submitted = true;

       
	              }

    		};













    		 



    	  }

    ]);

})();