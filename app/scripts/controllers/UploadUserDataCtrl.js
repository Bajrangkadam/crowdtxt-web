/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.uploadUserData',
        []
    );

    module.controller('UploadUserDataCtrl',
        [ '$scope', '$location', '$http', '$timeout', '$upload', '$cookieStore',
        

    function UploadUserDataCtrl($scope, $location, $http, $timeout, $upload, $cookieStore) {

      document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..



        // ==================== To avoide Admin to access user pages.. ===============

            var userRoleDatass = window.localStorage['userRoleData'];
                $scope.userRoleDatas = userRoleDatass;

                if($scope.userRoleDatas!='ROLE_ADMIN'){

                   window.location = '#/login';

                }

        // ============================================================================

        
        //alert("help");
        console.log('UploadUserDataCtrl module is called..');







          var limitedusers = $http({
                                method: 'GET',
                                url: 'api/v1/totalUser',
                                //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                headers: {
                                    "Content-Type": 'application/json'
                                }
                            })
                      limitedusers.success(function (data, status, response) {

            console.log("data",data.reamining);
            if(data.reamining==0){
             
                $scope.showOnUserLimitRemaining = false;
                $scope.showOnUserLimitOver = true;

            } else{
                $scope.showOnUserLimitRemaining = true;
                $scope.showOnUserLimitOver = false;

            }
          });




            $scope.goToUserPage = function(){
              window.location = '#/user';
            }






        // To open modal window for Poll result..
            $scope.openUploadModelContent = function(){
                angular.element('#uploaddetails').modal('show');

                                        

               // console.log("ljjjjjjjhj____________",$scope.files[0]);



                // $scope.upload = $upload
                // .upload({
                //     url: 'api/v1/file/upload',
                //     method: 'POST',
                //     data: {
                //         "uploadFile": $scope.files[0]
                //     }
                // })
                
                // .success(function (data, status, headers, config) {

                // });



            };




            $scope.backToUserList = function(){
              window.location = '#/user';
            };







// ========================== To have upload data functionality.. =================================

                       // Show loader on file upload
                          $scope.onFileSelect = function ($files) {
                           // alert("");
                        //    var fileType = "customUploadFile";
                              $scope.selectedFile = $files[0];
                              $scope.selectedFile.uploadStatus = 1; // In progress
                              $scope.upload = $upload
                                  .upload({
                                      url: 'api/v1/file/upload',
                                      method: 'POST',
                                      data: {
                                          "uploadFile": $scope.selectedFile
                                      }
                                  })
                                  .progress(
                                  function (evt) {
                                      $scope.selectedFile.fileUploadProgress = parseInt(100.0
                                          * evt.loaded / evt.total);
                                  })
                                  .success(function (data, status, headers, config) {




                                      console.log("uploaded json format", data);
                                      $scope.selectedFile.fileUploadProgress = 100;
                                      $scope.selectedFile.uploadStatus = 2; 


                                       if(data.length>0){
                                        $scope.showAfterFileUpload = true;
                                      }


                                      $scope.uploaddedData = data;

                                      if (status== 200) {

                                            $(".showAlertOnSuccessClass").show(); // To show Toast Notification when clicked on delete..
                                           window.setTimeout(function() {
                                            $(".showAlertOnSuccessClass").hide();
                                          },3000)

                                         }




                                      // Completed
                                     // $scope.fullFilename=$scope.selectedFile.name;
                                      // Assign unique filename
                                    //  $scope.reportUploadFile = data.uniqueName;
                                  }).error(function (data, status) {







                                    console.log("kjhkhkhj",data)

                                      $scope.selectedFile.fileUploadProgress = 0;
                                      $scope.selectedFile.uploadStatus = 0; // Failed
                                     
                                      if (status== 406) {

                                        
                                          $(".showAlertOnUnsupportedClass").show(); // To show Toast Notification when clicked on delete..
                                           window.setTimeout(function() {
                                            $(".showAlertOnUnsupportedClass").hide();
                                          },3000)
     
                                 
                                      }

                                      if (status== 404) {

                                     
                                
                                      $(".showAlertOnfileOnCorruptedClass").show(); // To show Toast Notification when clicked on delete..
                                       window.setTimeout(function() {
                                        $(".showAlertOnfileOnCorruptedClass").hide();
                                      },3000)

                                        
                                      }
                                  });

                          };

                           $scope.removeUploadedFile = function () {
                              // $scope.reportUploadFile = undefined;
                              // $scope.selectedFile.fileUploadProgress = 0;
                              // $scope.selectedFile.uploadStatus = 0;

                              $scope.duplicateUserValues = [];
                              $scope.uploadedUsersDatass = [];
                              $scope.limitedUsersToDisplay = [];
                              $scope.reportUploadFile = undefined;
                              $scope.selectedFile.fileUploadProgress = 0;
                              $scope.selectedFile.uploadStatus = 0;
                              $scope.showAfterFileUpload = false;
                            };


                             $scope.removeUploadedUser = function(index) {
                                 $scope.uploaddedData.splice(index, 1);
                                 $scope.showProcessUpload = true;
                              };



                            $scope.duplicateUserValues;


 $scope.saveCombinedUsers = function(){
            console.log("jkhhjkh",$scope.limitedUsersToDisplay);

                     $scope.limitedUsersToDisplay = $scope.duplicateUserValues;


            var GroupAddedManuallys = $http({
                        method: 'POST',
                        url: 'api/v1/initial/filedata',
                        data: $scope.limitedUsersToDisplay,
                        headers: {
                            "Content-Type": 'application/json'
                        }
                      })
                  GroupAddedManuallys.success(function (data, status, response) {

                       console.log(data);
                       console.log("jjjjjjjN",data.result.duplicate);
                      // console.log("jjjjjjjN",data.duplicate);

                      $scope.duplicateDataToDisplay = data.result.duplicate;
                      $scope.usersToSendNotificationToShow = data.result.records;

                      if($scope.duplicateDataToDisplay.length>0){
                          angular.element('#duplicateUsersDetails').modal('show');
                      }

                });

            GroupAddedManuallys.error(function (data, status) {

                     

                      console.log("jjjjjjjN",data.records[0].limitOver);
                        console.log("jjjjjjjN",data.records[0].remainingUsers);
                        console.log("jjjjjjjN",data.records.remainingUsers);
                        console.log("jjjjjjjN",data.duplicate);

                       if (status === 406) {
                        console.log("406");
                          angular.element('#editUserDetails').modal('show');
                        console.log("jjjjjjjN",data.records[0].limitOver);
                        console.log("jjjjjjjN",data.records[0].totalLimit);
                        console.log("jjjjjjjN",data.records[0].remainingUsers);
                        console.log("jjjjjjjN",data.records.remainingUsers);
                        console.log("jjjjjjjN",data.duplicate);

                        $scope.limitedUsersToDisplayLength = data.records[0].limitOver.length;
                        $scope.limitedUsersToDisplay = data.records[0].limitOver;
                        $scope.totalAllowedUsers = data.records[0].totalLimit;
                        $scope.totalRemainingUsers = data.records[0].remainingUsers;

                        
                       }

                    //   if (status === 409) {

                    //   $scope.limitedUsersToDisplayLength = data.records[0].limitOver.length;
                    //     $scope.limitedUsersToDisplay = data.records[0].limitOver;
                    //     $scope.totalAllowedUsers = data.records[0].totalLimit;
                    //     $scope.totalRemainingUsers = data.records[0].remainingUsers;

                    //     console.log("limitedUsersToDisplay",limitedUsersToDisplay);

                    // }

                    if (status === 409) {

                      console.log("409");

                         $scope.duplicateUserValues = data.duplicate;

                         $scope.duplicateUserValues = data.duplicate;

                           $scope.totalLimits = data.totalLimit;
                           $scope.remaininguserss = data.remainingusers;
                           $scope.duplicateUsersLength = data.duplicate.length;

                        angular.element('#duplicateUsersDetailsToShow').modal('show');

                     // console.log("data______",data.duplicate);

                     //$scope.limitedUsersToDisplay = data.duplicate;

                    }

                    });

          };



          $scope.showEmailandMessageList = function(){
              angular.element('#duplicateUsersDetails').modal('hide');
                $scope.duplicateUserValues = [];
                $scope.uploadedUsersDatass = [];
                $scope.limitedUsersToDisplay = [];
                $scope.reportUploadFile = undefined;
                $scope.selectedFile.fileUploadProgress = 0;
                $scope.selectedFile.uploadStatus = 0;
                $scope.showAfterFileUpload = false;
             // window.location = '#/user';
          };



           $scope.removeCombinedUser = function(index){
            $scope.limitedUsersToDisplay.splice(index, 1);

            $scope.uploadedUsersDatass = $scope.limitedUsersToDisplay;

            if($scope.limitedUsersToDisplay.length==0){
              angular.element('#editUserDetails').modal('hide');
            }
         };




                $scope.showToastNotification = function(){
                 
                    $scope.limitedUsersToDisplay = $scope.duplicateUserValues;

                      var uploadedJson = $scope.uploaddedData;


                        var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/sent/invite',
                                                  data:uploadedJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {

                                        console.log("data_________________",data);

                                        $scope.showAfterFileUpload = false;

                       //                   console.log(data);
                       // console.log("jjjjjjjN",data.result.duplicate);


                       $scope.duplicateDataToDisplay = data.result.duplicate;
                       $scope.usersToSendNotificationToShow = data.result.records;

                      if($scope.duplicateDataToDisplay.length>0){
                          angular.element('#duplicateUsersDetails').modal('show');
                      }

                                        // $scope.emailNotifications = data;
                                        // $scope.emailNotificationsLength = data.length;

                                            $scope.uploadedUsersDatass = data;

                                             console.log(data);
                                        console.log("Users data entered1..",data.result.records);


                                        $scope.usersToSendNotification = data.result.records;


                                       //   $scope.emailNotifications = [];

                                       //  for(var i=0; i<data.length; i++){
                                       //    // console.log("hjhjhjjkjhkj___________",data[i].emailid);
                                       //    if(data[i].emailid!=undefined){
                                       //    $scope.emailNotifications.push(data[i]);

                                       //    // console.log("jklkjkjk...........",$scope.emailNotifications);
                                       //     }
                                       //  }

                                       // // $scope.emailNotifications = data;
                                       //   $scope.emailNotificationsLength = $scope.emailNotifications.length;




                                       //   $scope.msgNotifications=[];

                                       //    for(var j=0; j<data.length; j++){
                                       //    // console.log("hjhjhjjkjhkj___________",data[j].phone);
                                       //    if(data[j].phone!=undefined){
                                       //    $scope.msgNotifications.push(data[j]);

                                       //    // console.log("jklkjkjk...........",$scope.msgNotifications);
                                       //     }
                                       //  }

                                       //  $scope.msgNotificationsLength = $scope.msgNotifications.length;

                                       //  console.log("jjkjjljkjk",$scope.emailNotifications);
                                       //  console.log("jjkjjljkjk",$scope.msgNotifications);

                                      //  alert("success");

                                         

                                            $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClass").hide();
                                                            },3000)


                                      }).error(function (data, status, response) {

                                    //    alert("error");

                                        

                       //console.log("jjjjjjjN",data.duplicate);
                      // console.log("jjjjjjjN",duplicate);


                       $scope.duplicateUserValues = data.duplicate;

                      // console.log("jjjjjjjN",data.records[0].limitOver);
                      //   console.log("jjjjjjjN",data.records[0].remainingUsers);
                      //   console.log("jjjjjjjN",data.records.remainingUsers);
                      //   console.log("jjjjjjjN",data.duplicate);

                       if (status === 406) {
                          angular.element('#editUserDetails').modal('show');

                        console.log("data______",data);
                        console.log("jjjjjjjN",data.records[0].limitOver);
                        console.log("jjjjjjjN",data.records[0].totalLimit);
                        console.log("jjjjjjjN",data.records[0].remainingUsers);
                        console.log("jjjjjjjN",data.records.remainingUsers);
                        console.log("jjjjjjjN",data.duplicate);

                        $scope.limitedUsersToDisplayLength = data.records[0].limitOver.length;
                        $scope.limitedUsersToDisplay = data.records[0].limitOver;
                        $scope.totalAllowedUsers = data.records[0].totalLimit;
                        $scope.totalRemainingUsers = data.records[0].remainingUsers;

                        
                       }

                      if (status === 409) {

                     // console.log("data______",data.duplicate);

                     // $scope.limitedUsersToDisplay = data.duplicate;
                     // console.log("$scope.limitedUsersToDisplay",$scope.limitedUsersToDisplay);
                     // $scope.limitedUsersToDisplayLength = data.limitOver.length;
                     //    $scope.limitedUsersToDisplay = data.limitOver;
                     //    $scope.totalAllowedUsers = data.totalLimit;
                     //    $scope.totalRemainingUsers = data.remainingusers;
                     //    console.log("limitedUsersToDisplay",limitedUsersToDisplay);

                      $scope.duplicateUserValues = data.duplicate;

                           $scope.totalLimits = data.totalLimit;
                           $scope.remaininguserss = data.remainingusers;
                           $scope.duplicateUsersLength = data.duplicate.length;

                        angular.element('#duplicateUsersDetailsToShow').modal('show');

                    }

                                      });




              };  










                $scope.showProcessUpload = false;

               $scope.editUploadUserss = function(index){


                   
                                          var uploaduserNames = /^[a-zA-Z ]*$/;
                                          var uploademailIdvalidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                          var uploadmobilePattern = /^$|^(?:1-?)?[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}$/;

                                         var uploadUserfirstName = $scope.uploaddedData[index].firstName;
                                         var uploadUserlastName = $scope.uploaddedData[index].lastName;
                                         var uploadUseremailid = $scope.uploaddedData[index].emailid;
                                         var uploadUserphone = $scope.uploaddedData[index].phone;
                                          

                                         $scope.uploadfirstName = false;
                                         $scope.uploadlastName = false;
                                         $scope.uploadEmail = false;
                                         $scope.uploadMobile = false;



                                      if (uploadUserfirstName == "" || !uploaduserNames.test(uploadUserfirstName)) {
                                          $scope.uploadfirstName = true;
                                        
                                        } else if (uploadUserlastName == "" || !uploaduserNames.test(uploadUserlastName)) {
                                            $scope.uploadlastName = true;

                                        } else if (uploadUseremailid == "" || !uploademailIdvalidation.test(uploadUseremailid)) {
                                            $scope.uploadEmail = true;
                                          // } else if (mobileNop == "") {

                                        } else if (!uploadmobilePattern.test(uploadUserphone)) {
                                            $scope.uploadMobile = true;

                                        } else {

                                            $scope.showProcessUpload = true;

                                            setTimeout(function(){ angular.element('.savePrivateUsersssss').trigger('click'); }, 200);
                                              

                                         }


                    
                  };




                   $scope.btnDisabless = false;

                  $scope.editlimitedUserss = function(index){

                 
                                          var limitedUsersuserNames = /^[a-zA-Z ]*$/;
                                          var limitedUsersemailIdvalidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                          var limitedUsersmobilePattern = /^$|^(?:1-?)?[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}$/;

                                         var limitedUserfirstNamess = $scope.limitedUsersToDisplay[index].firstName;
                                         var limitedUserlastNamess = $scope.limitedUsersToDisplay[index].lastName;
                                         var limitedUseremailidss = $scope.limitedUsersToDisplay[index].emailid;
                                         var limitedUserphoness = $scope.limitedUsersToDisplay[index].phone;
                                          
                                         
                                         console.log("duplicateUserValues",$scope.limitedUsersToDisplay[index].firstName);

                                         $scope.limitedUsersfirstName = false;
                                         $scope.limitedUserslastName = false;
                                         $scope.limitedUsersemailid = false;
                                         $scope.limitedUsersphone = false;



                                      if (limitedUserfirstNamess == "" || !limitedUsersuserNames.test(limitedUserfirstNamess)) {
                                          $scope.limitedUsersfirstName = true;
                                        
                                        } else if (limitedUserlastNamess == "" || !limitedUsersuserNames.test(limitedUserlastNamess)) {
                                            $scope.limitedUserslastName = true;

                                        } else if (limitedUseremailidss == "" || !limitedUsersemailIdvalidation.test(limitedUseremailidss)) {
                                            $scope.limitedUsersemailid = true;
                                          // } else if (mobileNop == "") {

                                        } else if (!limitedUsersmobilePattern.test(limitedUserphoness)) {
                                            $scope.limitedUsersphone = true;

                                        } else {

                                           $scope.btnDisabless = true;

                                            setTimeout(function(){ angular.element('.savePrivateUsersssssnn').trigger('click'); }, 200);
                                              

                                         }


                    
                  };






                  $scope.btnDisable = false;

                $scope.editDuplicateUserss = function(index){


                   
                                          var duplicateuserNames = /^[a-zA-Z ]*$/;
                                          var duplicateemailIdvalidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                          var duplicatemobilePattern = /^$|^(?:1-?)?[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}$/;

                                         var duplicateUserfirstName = $scope.duplicateUserValues[index].firstName;
                                         var duplicateUserlastName = $scope.duplicateUserValues[index].lastName;
                                         var duplicateUseremailid = $scope.duplicateUserValues[index].emailid;
                                         var duplicateUserphone = $scope.duplicateUserValues[index].phone;
                                          
                                         console.log("duplicateUserlastName",duplicateUserlastName);
                                         console.log("duplicateUserValues",$scope.duplicateUserValues[index]);

                                         $scope.duplicatefirstName = false;
                                         $scope.duplicatelastName = false;
                                         $scope.duplicateEmail = false;
                                         $scope.duplicateMobile = false;



                                      if (duplicateUserfirstName == "" || !duplicateuserNames.test(duplicateUserfirstName)) {
                                          $scope.duplicatefirstName = true;
                                        
                                        } else if (duplicateUserlastName == "" || !duplicateuserNames.test(duplicateUserlastName)) {
                                            $scope.duplicatelastName = true;

                                        } else if (duplicateUseremailid == "" || !duplicateemailIdvalidation.test(duplicateUseremailid)) {
                                            $scope.duplicateEmail = true;
                                          // } else if (mobileNop == "") {

                                        } else if (!duplicatemobilePattern.test(duplicateUserphone)) {
                                            $scope.duplicateMobile = true;

                                        } else {

                                            $scope.btnDisable = true;
                                          
                                            console.log("$scope.duplicateUserValues",$scope.duplicateUserValues);

                                            setTimeout(function(){ angular.element('.saveDuplicateUserss').trigger('click'); }, 200);
                                              

                                         }


                    
                  };


                   $scope.removeCombinedUsers = function(index){
                        $scope.duplicateUserValues.splice(index, 1);

                        $scope.uploadedUsersDatass = $scope.duplicateUserValues;

                        if($scope.duplicateUserValues.length==0){
                          angular.element('#duplicateUsersDetailsToShow').modal('hide');
                        }
                     };













    }

    ]);

})();