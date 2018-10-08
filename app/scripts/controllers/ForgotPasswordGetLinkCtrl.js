/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.forgotPasswordGetLink',
        []
    );

    module.controller('ForgotPasswordGetLinkCtrl',
        [ '$rootScope', '$scope', '$filter', '$location', '$http','$routeParams',
        

    function ForgotPasswordGetLinkCtrl($rootScope, $scope, $filter, $location, $http, $routeParams) {

        // document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('ForgotPasswordGetLinkCtrl module is called..');

        console.log("Location URL data",$location.absUrl());

        console.log("$location.port()",$location.port());
        console.log("$location.path()",$location.path());
        console.log("$location.search()",$location.search());
        console.log("$location.hash()",$location.hash());

        $scope.keyValue = $location.search();

        console.log("Key value",$scope.keyValue.key);


        $scope.returnToLogin = function(){
           window.location='#/login'; 
        };


        $scope.submitPassword = function(){
           //   alert($scope.email);



            if ($scope.myformPassword.$valid) {
             } else {
                    $scope.submitted1 = true;

              }

          if ($scope.password != $scope.confirmPassword) {
            
                $scope.submitted2 = true;

              } 

               else {
     


            var confirmPassword = {
              "password":$scope.confirmPassword
            }
                  
          
                   $http({
                    method: 'POST',
                    url: 'api/resource/update/password?key='+$scope.keyValue.key,
                    data: {
                            "password":$scope.confirmPassword
                          }
                }).success(function (data, status) {

                  window.location='#/login'; 

                    //  if (status==200) {
                    //    alert("");
                          
                    // };
               
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

        };



        

    }

    ]);

})();
