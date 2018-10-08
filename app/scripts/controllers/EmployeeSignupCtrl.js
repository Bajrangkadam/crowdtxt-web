/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.employeeSignup',
        []
    );

    module.controller('EmployeeSignupCtrl',
        [ '$rootScope', '$scope', '$filter', '$location', '$http','$routeParams',
        

    function EmployeeSignupCtrl($rootScope, $scope, $filter, $location, $http, $routeParams) {



        // if ($scope.password != $scope.confirmPassword) {
        //     $scope.passwordMatch = true;
        //     return false;
        //   } else {
        //     $scope.passwordMatch = false;

        // }

        // document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('EmployeeSignupCtrl module is called..');

        console.log("Location URL data",$location.absUrl());
        console.log("$location.port()",$location.port());
        console.log("$location.path()",$location.path());
        console.log("$location.search()",$location.search());
        console.log("$location.hash()",$location.hash());


                        $scope.keyValue = $location.search();



                                                var listUsers = $http({
                                      //                       method: 'POST',
                                      //                       url: 'api/v1/user/list?limit=250&page=1',
                                                            method: 'GET',
                                                            url: 'api/resource/userdetail?key='+$scope.keyValue.key,
                                                           // data: {sort: [], filters: [], filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             listUsers.success(function (data, status, response) {
                                              
                                                       // $scope.users = data.records;
                                                        $scope.users = data;
                                                       console.log("lkjkljjkklllllllllllll",data);

                                                       $scope.companyId = data.compId;
                                                       $scope.companme = data.compnyName;
                                                       $scope.email = data.email;
                                                       $scope.firstName = data.firstName;
                                                       $scope.lastName = data.lastName;
                                                       $scope.phone = data.phone;
                                                    
                                             });





                                      $scope.isDisabled = false;
                                      $scope.isDisabled1 = true;


                                      $scope.phone = "";
                                
                                      $scope.verifyBtn = function(){
                                          

                                        // $scope.isDisabled = true;
                                        // $scope.hideOnVerify = true;
                                        // $scope.showOnVerify = true;



//                                          $scope.dataJson= {
//                                                         "firstname":$scope.first,
//                                                         "lastName":$scope.last,
//                                                         "emailId":$scope.email,
//                                                         "receiverPhoneNo":$scope.phone
//                                                         
//                                                         }
                                

                               //  var  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                 var  mobilePattern = /^(?:1-?)?[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}$/;
              
     
                                        //  if($scope.phone==""){

                                        //   $scope.mobileValidation = true;

                                        //   return;
                                        // } 

                                        // if(!mobilePattern.test($scope.phone) || !emailPattern.test($scope.email)){

                                           if(!mobilePattern.test($scope.phone)){
                                          $scope.mobileValidation12 = true;
                                          $scope.mobileValidation = false;
                                        } else{

                                          $scope.mobileValidation = false;
                                          $scope.mobileValidation12 = false;
                                         
                                        // alert("Correct");
                                           $scope.dataJson= {
                                                        "firstname":$scope.firstName,
                                                        "lastName":$scope.lastName,
                                                        "emailId":$scope.email,
                                                        "receiverPhoneNo":$scope.phone
                                                        
                                                        }
                                                   
                                                $http({
                                                      method: 'POST',
                                                      url: 'api/resource/user/otp?token='+$scope.keyValue.key,
                                                      // data: $scope.phone,
                                                      data: $scope.dataJson,
                                                      headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                      
                                                  }).success(function (data, status) {


                                                    $scope.isDisabled = true;
                                                    $scope.hideOnVerify = true;
                                                    $scope.showOnVerify = true;



                                                      $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClass").hide();
                                                            },8000)

                                                      
                                                     
                                                          console.log("kjkjjjjjjj",data);
                                                  }).error(function (data, status, response) {

                                                    if(status==401){

                                                         $(".showAlertOnUnAuthorizedAccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnUnAuthorizedAccess").hide();
                                                            },8000)
                                                          }

                                                            if(status==304){

                                                         $(".showAlertOnWrongCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnWrongCode").hide();
                                                            },8000)
                                                          }

                                                          if(status==500){

                                                         $(".showAlertOnSubscribedUser").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSubscribedUser").hide();
                                                            },8000)
                                                          }

                                                     });



                                          
                                        }



                                      };

                                      $scope.isDisabled12 = false;
                                      $scope.isDisabledCheckbox = true;


                                        var inc = 0;

                                        $scope.otpCodeVerify = "";

                                      $scope.verifyOTPBtn = function(){
                                        
                                        inc++;
                                    $scope.counter = inc;

                                    console.log("Btn Count", inc);

                                    if($scope.counter==3){
                                     
                                      $scope.phone = "";
                                      $scope.hideOnVerify = false;
                                      $scope.showOnVerify = false;

                                      $scope.otpCodeVerify = "";

                                       $(".reEnterMobileNumber").show(); // To show Toast Notification when clicked on delete..
                                           window.setTimeout(function() {
                                            $(".reEnterMobileNumber").hide();
                                          },8000)

                                          

                                           $scope.counter = 0;
                                           inc = 0;
                                           return;

                                    }





                                    if($scope.otpCodeVerify==""){
                                      // alert("Empty");
                                      $scope.otpvalidation = true;

                                    } else{
                                      // alert("Value");

                                                    // $scope.isDisabled12 = true;
                                                    // $scope.hideOnVerify = false;
                                                    // $scope.showOnVerify = false;


                                       $http({     
                                                      method: 'POST',
                                                      url: 'api/resource/verify/user/'+$scope.otpCodeVerify+'?token='+$scope.keyValue.key,
                                                      //data: $scope.dataJson,
                                                      headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                      
                                                  }).success(function (data, status) {


                                                    $scope.isDisabledCheckbox = false;


                                                    // $scope.isDisabled = true;
                                                    // $scope.hideOnVerify = true;
                                                    // $scope.showOnVerify = true;

                                                     $scope.isDisabled12 = true;
                                                    $scope.hideOnVerify = false;
                                                    $scope.showOnVerify = false;




                                                      $(".OTPSuccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".OTPSuccess").hide();
                                                            },8000)

                                                      
                                                     
                                                          console.log("kjkjjjjjjj",data);
                                                  }).error(function (data, status, response) {

                                                    if(status==401){

                                                         $(".showAlertOnUnAuthorizedAccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnUnAuthorizedAccess").hide();
                                                            },8000)
                                                          }

                                                          if(status==304){

                                                         $(".showAlertOnWrongCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnWrongCode").hide();
                                                            },8000)
                                                          }

                                                          if(status==500){

                                                         $(".showAlertOnSubscribedUser").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSubscribedUser").hide();
                                                            },8000)
                                                          }

                                                     });

                                    }
                               

                                      };








              // ======================================= Email verification =============================================






                                        $scope.otpDisabled = true;



                                      $scope.email = "";
                                
                                      $scope.verifyEmailBtn = function(){
                                   
                                       var  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                              

                                        // if(!mobilePattern.test($scope.phone) || !emailPattern.test($scope.email)){

                                        if(!emailPattern.test($scope.email)){

                                          $scope.emailValidation12 = true;
                                          $scope.otpEmailvalidation = false;
                                        } else{

                                         

                                          $scope.otpEmailvalidation = false;
                                          $scope.emailValidation12 = false;
                                         
                                        // alert("Correct");
                                           $scope.dataJsons= {
                                                        "firstname":$scope.firstName,
                                                        "lastName":$scope.lastName,
                                                        "emailId":$scope.email,
                                                        "receiverPhoneNo":$scope.phone
                                                        
                                                        }
                                                   
                                                $http({
                                                      method: 'POST',
                                                      url: 'api/resource/userEmail/otp?token='+$scope.keyValue.key,
                                                      // data: $scope.phone,
                                                      data: $scope.dataJsons,
                                                      headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                      
                                                  }).success(function (data, status) {


                                                    $scope.isDisabled = true;
                                                    $scope.hideOnEmailVerify = true;
                                                    $scope.showOnEmailVerify = true;



                                                      $(".showAlertClassEmailid").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClassEmailid").hide();
                                                            },8000)

                                                      
                                                     
                                                          console.log("kjkjjjjjjj",data);
                                                  }).error(function (data, status, response) {

                                                    if(status==401){

                                                         $(".showAlertOnUnAuthorizedAccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnUnAuthorizedAccess").hide();
                                                            },8000)
                                                          }

                                                            if(status==304){

                                                         $(".showAlertOnWrongCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnWrongCode").hide();
                                                            },8000)
                                                          }

                                                          if(status==500){

                                                         $(".showAlertOnSubscribedUser").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSubscribedUser").hide();
                                                            },8000)
                                                          }

                                                     });



                                          
                                        }



                                      };

                                      $scope.isDisabledEmail = false;
                                      $scope.isDisabledCheckbox = true;


                                        var inc = 0;

                                        $scope.otpEmailCodeVerify = "";

                                      $scope.verifyEmailOTPBtn = function(){


                                        
                                        inc++;
                                    $scope.counters = inc;

                                    console.log("Btn Count", inc);

                                    if($scope.counters==3){
                                     
                                      $scope.email = "";
                                      $scope.hideOnEmailVerify = false;
                                      $scope.showOnEmailVerify = false;

                                      $scope.otpEmailCodeVerify = "";

                                       $(".reEnterEmailId").show(); // To show Toast Notification when clicked on delete..
                                           window.setTimeout(function() {
                                            $(".reEnterEmailId").hide();
                                          },8000)

                                          

                                           $scope.counters = 0;
                                           inc = 0;
                                           return;

                                    }





                                    if($scope.otpEmailCodeVerify==""){
                                      // alert("Empty");
                                      $scope.otpEmailvalidation = true;

                                    } else{
                                      // alert("Value");

                                                

                                       $http({     
                                                      method: 'POST',
                                                      url: 'api/resource/verify/EmailUser/'+$scope.otpEmailCodeVerify+'?token='+$scope.keyValue.key,
                                                      //data: $scope.dataJson,
                                                      headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                      
                                                  }).success(function (data, status) {

                                                      $scope.otpDisabled = false;


                                                    $scope.isDisabledCheckbox = false;


                                                     $scope.isDisabledEmail = true;
                                                    $scope.hideOnEmailVerify = false;
                                                    $scope.showOnEmailVerify = false;




                                                      $(".OTPSuccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".OTPSuccess").hide();
                                                            },8000)

                                                      
                                                     
                                                          console.log("kjkjjjjjjj",data);
                                                  }).error(function (data, status, response) {

                                                    if(status==401){

                                                         $(".showAlertOnUnAuthorizedAccess").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnUnAuthorizedAccess").hide();
                                                            },8000)
                                                          }

                                                          if(status==304){

                                                         $(".showAlertOnWrongCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnWrongCode").hide();
                                                            },8000)
                                                          }

                                                          if(status==500){

                                                         $(".showAlertOnSubscribedUser").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSubscribedUser").hide();
                                                            },8000)
                                                          }

                                                     });

                                         }
                               

                                      };










                                      $scope.showSubmitBtn = function(value){

                                        if($scope.showSubmitBotton ==true){
                                          $scope.isDisabled1 = false;
                                        } else{
                                          $scope.isDisabled1 = true;
                                        }

                                        console.log(value);

                                      };





                                      $scope.password = "";
                                      $scope.confirmPassword = "";

                                      $scope.employeeSignUp =function(){

                                        if($scope.password == "" || $scope.confirmPassword == "" || $scope.password != $scope.confirmPassword){
                                          $scope.passwordMatch = true;
                                        } else {
                                          $scope.passwordMatch = false;


                                          var employeeDetails = {
                                              "firstName" : $scope.firstName,
                                              "lastName" : $scope.lastName,
                                              "email" : $scope.email,
                                              "phone" : $scope.phone,
                                              "password" : $scope.confirmPassword,
                                              "emailNotify" : $scope.sendEmail,
                                              "mobileNotify" : $scope.sendMobile
                                            }

                                               var postEmployeeDetails = $http({
                                                  method: 'POST',
                                                  url: 'api/resource/inviteuser/signup?key='+$scope.keyValue.key,
                                                  data:employeeDetails ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            postEmployeeDetails.success(function (data, status, response) {

                                               console.log("Employee signup details",data);

                                                window.location='#/login';

                                            });



                                        }
                                        
                                      };

    }

    ]);

})();
