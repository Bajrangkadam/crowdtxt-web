/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.initialSetupThree',
        []
    );

    module.controller('InitialSetupThreeCtrl',
        ['$rootScope', '$scope', '$location', '$http', '$timeout', '$upload', '$cookieStore',
        

    function InitialSetupThreeCtrl($rootScope, $scope, $location, $http, $timeout, $upload, $cookieStore) {

        document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('InitialSetupThreeCtrl module is called..');

        var isInitialSetupDoness = window.localStorage['isInitialSetupDone'];

            $scope.isInitialSetupDones = isInitialSetupDoness;

            // if($scope.isInitialSetupDones=='Y'){

            //    window.location = '#/event';

            // }




                  $scope.stepThreeGroup = 'group'; // To change "group" to "groups" in step3..

                        var numberOfGroupss = window.localStorage['numberOfGroups'];
                        $scope.numberOfGroupssss = numberOfGroupss;

                        console.log("$scope.numberOfGroupssss",$scope.numberOfGroupssss);

                  // ---------------- To change "group" to "groups" in step3.. ------------------
                         if($scope.numberOfGroupssss>1){
                          $scope.stepThreeGroup = 'groups';
                         }
                  // ----------------------------------------------------------------------------    




          // ==================== To avoide Admin to access user pages.. ===============

                  var userRoleDatass = window.localStorage['userRoleData'];
                      $scope.userRoleDatas = userRoleDatass;

                      if($scope.userRoleDatas!='ROLE_ADMIN'){

                         window.location = '#/login';

                      }

          // ============================================================================









              // ===================== To logout and direct the page to login.. ========================


                                        $http({
                                                  method: 'GET',
                                                  url: 'api/v1/Company/info/2'
                                              }).success(function (data, status) {
                                                 
                                              
                                          });

              // ========================================================================================







       var emailss = window.localStorage['emailToDisplay'];

       $scope.email = emailss;





// ========================== To have upload data functionality.. =================================

                       // Show loader on file upload
                          $scope.onFileSelect = function ($files) {
                           // alert("");
                        //    var fileType = "customUploadFile";
                              $scope.selectedFile = $files[0];
                              $scope.selectedFile.uploadStatus = 1; // In progress
                              $scope.upload = $upload
                                  .upload({
                                      url: 'api/v1/inital/upload',
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

                              $scope.duplicateUserValues = [];
                              $scope.uploadedUsersDatass = [];
                              $scope.limitedUsersToDisplay = [];
                              $scope.reportUploadFile = undefined;
                              $scope.selectedFile.fileUploadProgress = 0;
                              $scope.selectedFile.uploadStatus = 0;
                              $scope.showAfterFileUpload = false;
                            };



                            $scope.emailNotifications=[];
                            $scope.msgNotifications=[];

            $scope.showToastNotification = function(){
                  // $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                   

                      var uploadedJson = $scope.uploaddedData;


                        var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/initial/records',
                                                  data:uploadedJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {

                                        console.log("data_________________",data);

                                        $scope.showAfterFileUpload = false;

                                        $scope.uploadedUsersDatass = data;

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
                                      });



              };







              $scope.uploadedUsersDatass;
               $scope.usersManually;










                  $scope.removeUploadedUser = function(index) {
                     $scope.uploaddedData.splice(index, 1);
                     $scope.showProcessUpload = true;
                  };

                  $scope.homePage = function(){

                     var uploadedJson = $scope.uploaddedData;
                     
                       var inviteUsers = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/sent/invite',
                                                  data:uploadedJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            inviteUsers.success(function (data, status, response) {
                                      });

                                       window.location = '#/event';
                                      $(".admin").show();
                  };



// ================================================================================================












// =================================== Hide and show initialsetup pages.. ======================================
                                

                                  $scope.class = "btn-primary";
                                  $scope.class1 = "btn-default";
                                  $scope.class2 = "btn-default";

                                    $scope.showInitialsetupStep1 = true;
                                    $scope.showInitialsetupStep2 = false;
                                    $scope.showInitialsetupStep3 = false;
                                    $scope.goBackToStep1 = function(){
                                      $scope.showInitialsetupStep1 = true;
                                      $scope.showInitialsetupStep2 = false;
                                      $scope.showInitialsetupStep3 = false;

                                      $scope.class1 = "btn-default";
                                      $scope.class2 = "btn-default";

                                      if ($scope.class === "btn-primary")
                                        
                                          $scope.class = "btn-primary";
                                        else
                                          $scope.class = "btn-primary";

                                        // if ($scope.class1 === "btn-primary")
                                        
                                        //   $scope.class1 = "btn-default";
                                        // else
                                        //   $scope.class1 = "btn-primary";

                                        // if ($scope.class2 === "btn-primary")
                                        
                                        //   $scope.class2 = "btn-default";
                                        // else
                                        //   $scope.class2 = "btn-primary";
                                    };
                                    $scope.gotoStep2 = function(){
                                      $scope.showInitialsetupStep1 = false;
                                      $scope.showInitialsetupStep2 = true;
                                      $scope.showInitialsetupStep3 = false;

                                      if ($scope.class1 === "btn-primary")
                                        
                                          $scope.class1 = "btn-primary";
                                        else
                                          $scope.class1 = "btn-primary";

                                      
                                    };

                                    $scope.goBackToStep2 = function(){
                                      window.location = '#/initialSetupTwo';
                                    };

                                    $scope.gotoStep3 = function(){
                                      $scope.showInitialsetupStep1 = false;
                                      $scope.showInitialsetupStep2 = false;
                                      $scope.showInitialsetupStep3 = true;

                                       if ($scope.class2 === "btn-default")
                                        
                                          $scope.class2 = "btn-primary";
                                        else
                                          $scope.class2 = "btn-default";
                                    };

// =============================================================================================================






     // -------------------------- Funtion to refresh the list.. ----------------------------

                           $scope.filterVal=[];

                              function refreshGroupList()
                              {
                                 var listGroup = $http({
                                              method: 'POST',
                                              url: 'api/v1/groups/list?limit=250&page=1',
                                               data: {"sort":[],"filters":[],"filterType":"and"},
                                             // data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},

                                      // ------------------ To have pagination.. ---------------------

                                                            // params:{
                                                            //             page:$scope.pagination.page,
                                                            //             limit: $scope.pagination.limit
                                                            //         }

                                      // -----------------------------------------------------------------  

                                          })
                                 listGroup.success(function (data, status, response) {

                          console.log("lklklllll_______________________",data.records);

                          $scope.groupDetails = data.records;



                          // --------------- To show status beside group name.. ----------------

                                                       $scope.statusssssssss = data.records;

                                                       for(var i=0;i<$scope.statusssssssss.length;i++)
                                                         {
                                                          var statusLists;
                                                          if($scope.statusssssssss[i].adminApproved=="Y")
                                                          {
                                                            statusLists="VIP Group";
                                                            $scope.statusssssssss[i].newClass='label label-warning'; // To change the color based on status.. 
                                                          }
                                                           if($scope.statusssssssss[i].isPrivate=="Y")
                                                          {
                                                            statusLists="Private";
                                                            $scope.statusssssssss[i].newClass='label label-danger'; // To change the color based on status.. 
                                                          }
                                                           if($scope.statusssssssss[i].isPublic=="Y")
                                                          {
                                                            statusLists="Public";
                                                             $scope.statusssssssss[i].newClass='label label-success'; // To change the color based on status.. 
                                                          }
                                                          $scope.statusssssssss[i].isPublic=statusLists;
                                                         }

                                                         $scope.groups = $scope.statusssssssss;

                                                         console.log("jkhjkghkjhkjhkhhjk",$scope.statusssssssss);

                                                  // -------------------------------------------------------------------   
                                      
                                                


                                     console.log("Resultsssssssss",data);

                                       
                               });
                              };



                        // Json data for users..
                        $scope.models = {
                           basket: [],
                            users : [
                                    { id: 1,  first: 'John', last: 'Rambo', email: 'john@gmail.com', mobileNo: '9942459922', status: 1 },
                                    { id: 2,  first: 'Rocky', last: 'Balboa',email: 'Rocky@gmail.com', mobileNo: '9942456823', status: 1 },
                                    { id: 3,  first: 'Willam', last: 'Kimble', email: 'Willam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 4,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 5,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    { id: 6,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    { id: 7,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    { id: 8,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    { id: 9,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 10,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    { id: 11,  first: 'Willam', last: 'Kimble', email: 'Willam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 12,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 13,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    { id: 14,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    { id: 15,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    { id: 16,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    { id: 17,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 18,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    { id: 19,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    { id: 20,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    { id: 21,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    { id: 22,  first: 'Nik', last: 'Kimble', email: 'nik@gmail.com', mobileNo: '9942456452', status: 1 },
                                    { id: 23,  first: 'Ben', last: 'Richards', email: 'Ben@gmail.com', mobileNo: '9942456452', status: 1 }
                                ]

                            };





                      // Empty json data to push group name created in the initial setup..
                      $scope.groups = [];


                      // Json data for Group status..
                      $scope.groupss = [
                              { id: 1, status:'Public'},
                              { id: 2, status:'Private'},
                              { id: 3, status:'Admin approved'}
                          ];



                  



                   // Users List Arrays
                    $scope.privateUsers = [];

                    var privateUserss = $scope.privateUsers; // Private Group users list in Json array..

                $scope.add = function() {
                  
                  $scope.privateUsers; // To get private group users data..

                  // alert($scope.privateUsers);

                  if($scope.result.id==0 || $scope.result.id==null){
                            $scope.submittedGroup12 = true;
                       }

                  if ($scope.myformGroup.$valid) {

                   
                 
                  
                     $scope.showaddApproverDetails=false;
                    
                    // To push Group status
                    // for (var i=0; i<$scope.groupss.length; i++) {
                    //     if ($scope.groupss[i].id === $scope.groupss.length) {
                    //       $scope.groupss[i].status = $scope.user.roles.join(); // join() is user to convert array in to string..
                    //       break;
                    //     }
                    //   }

                      // To show full group details into simple title..

                      //  var adminApproveds = $scope.user.roles.join();

                                var publicValue="N";
                                var adminApproved ="N"; 
                                var privateValue="N";
                            
                      // if(adminApproveds=="Public Group - Anyone can see your notifications"){
                      //   $scope.user.roles="Public Group";
                      //   publicValue="Y";
                      //  }

                      // if(adminApproveds=="VIP Group - People I approve can see my notifications"){
                      //   $scope.user.roles="VIP Group";
                      //    adminApproved ="Y";
                      //   $scope.showAddApprover = true;
                      //  }

                      // if(adminApproveds=="Private Group - Only people I name can see my notifications"){
                      //   $scope.user.roles="Private Group";
                      //    privateValue ="Y";
                      //  }

                      if($scope.result.id==1){
                        $scope.user.roles="Public Group";
                        publicValue="Y";
                        $scope.submittedGroup12 = false;

                       }

                      if($scope.result.id==2){
                        $scope.user.roles="VIP Group";
                         adminApproved ="Y";
                        $scope.showAddApprover = true;
                        $scope.submittedGroup12 = false;
                       }

                      if($scope.result.id==3){
                        $scope.user.roles="Private Group";
                         privateValue ="Y";
                         $scope.submittedGroup12 = false;
                       }




                      // To push both Group name and Group status
                      // $scope.groups.push({groupName: $scope.newGroup, purpose: $scope.groupPurpose, status:$scope.user.roles});


                       console.log("lklkk_________________",$scope.user.roles);

                       // alert(adminApproved);
                       // console.log("lllllllll",adminApproved);


                             
                         if($scope.result.id==1){

                           var groupJson1={
                                          "groupName":$scope.newGroup,
                                          "purpose":$scope.groupPurpose,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "addedUsers":[] // Shoul send userID (1, 2, 3)
                                          }

                                           console.log("kjhkhkhjkhjk______",groupJson1);

                                               var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group',
                                                  data:groupJson1 ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {


                                                          $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },3000)


                                         refreshGroupList(); // To call list all the group service..

                                        console.log("lllllllllllllll___________________________",data);

                                         $scope.newGroup = '';
                                         $scope.groupPurpose = '';
                                         $scope.result.id=0;
                                         $scope.submittedGroup = false;
                                      });
                                      GroupAdd.error(function (data, status, response) {
                                        if(status==409){
                                          // alert("Group already exist");
                                         

                                          $(".showAlertOnexistingGroup").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnexistingGroup").hide();
                                                            },3000)
                                        }

                                      });


                                   
                                   // console.log($scope.groups);

                                  $scope.showAddApprover=false;


                         }    



                         if($scope.result.id==2){

                           var groupJson2={
                                          "groupName":$scope.newGroup,
                                          "purpose":$scope.groupPurpose,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "addedUsers": [{
                                                          "firstName": $scope.firstName,
                                                          "lastName": $scope.lastName,
                                                          "emailId": $scope.emailss,
                                                          "phoneNo": $scope.mobileNoss
                                                          }]

                                          }

                                          console.log("kjhkhkhjkhjk______",groupJson2);



                                               var GroupAddApprover = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group/setup',
                                                  data:groupJson2 ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAddApprover.success(function (data, status, response) {



                                                      $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },3000)



                                          $scope.newGroup = '';
                                          $scope.groupPurpose = '';
                                          $scope.firstName = '';
                                          $scope.lastName = '';
                                          $scope.emailss = '';
                                          $scope.mobileNoss = '';
                                          $scope.result.id=0;

                                        $scope.showAddApprover = false;
                                        $scope.showaddApproverDetails = false;
                                        $scope.submittedGroup = false;

                                        console.log("hjkhhhh______",data);
                                        console.log("hjkhhhh______",data[1]);

                                        if(data[1].Status=="Users already exists"){
                                          // alert("User already exist");

                                          $(".showAlertOnexistingUser").show(); // To show Toast Notification when clicked on delete..
                                             window.setTimeout(function() {
                                              $(".showAlertOnexistingUser").hide();
                                            },3000)

                                          // Status: "Users already exists"
                                        }

                                         refreshGroupList(); // To call list all the group service..

                                        console.log("lllllllllllllll___________________________",data);

                                         

                                         

                                      });
                                      GroupAddApprover.error(function (data, status, response) {
                                        if(status==409){
                                          // alert("Group already exist");
                                         

                                          $(".showAlertOnexistingGroup").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnexistingGroup").hide();
                                                            },8000)
                                        }

                                      });



                         }


                         if($scope.result.id==3){

                          // alert("private");
                          $scope.privateUsers;

                           var groupJson3={
                                          "groupName":$scope.newGroup,
                                          "purpose":$scope.groupPurpose,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "addedUsers":privateUserss

                                          }

                                          console.log("kjhkhkhjkhjk______",groupJson3);



                                               var GroupAddPrivate = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group/setup',
                                                  data:groupJson3 ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAddPrivate.success(function (data, status, response) {



                                                          $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },8000)





                                         refreshGroupList(); // To call list all the group service..

                                        console.log("lllllllllllllll___________________________",data);

                                        $scope.showAddPrivateUserToGroupBtn = false;
                                        $scope.showAddPrivateUserToGroup = false;

                                        $scope.newGroup = '';
                                         $scope.groupPurpose = '';
                                         $scope.result.id=0;
                                         $scope.submittedGroup = false;
                                      });
                                        GroupAddPrivate.error(function (data, status, response) {
                                        if(status==409){
                                          // alert("Group already exist");
                                         

                                          $(".showAlertOnexistingGroup").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnexistingGroup").hide();
                                                            },8000)
                                        }

                                      });



                         }


                        




                      

                         console.log("kkkkkkkkkkk",$scope.groups.length);


                     

                  // ---------------- To change "group" to "groups" in step3.. ------------------
                         // if($scope.groups.length>1){
                         //  $scope.stepThreeGroup = 'groups';
                         // }
                  // ----------------------------------------------------------------------------    


                  
                       } else {
                              $scope.submittedGroup = true;
                        }



                };




                 $scope.removeGroup = function(index) {
                     $scope.groups.splice(index, 1);
                  };








// ================================================= Model window validation ============================================================
                
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

                                            setTimeout(function(){ angular.element('.saveDuplicateUserss').trigger('click'); }, 200);
                                              

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
                                          
                                         
                                         console.log("duplicateUserValues",$scope.limitedUsersToDisplay[index].phone);

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


        // ======================================================================================================================================







 // ============================ To add private users to the group.. ====================================

    // -------------------- Step 2 add and list new user.. -------------------- 

                                    
                                     
                                      // Add a User to the list
                                      $scope.addPrivateUsers = function () {

                                        console.log("check12");

                                        // if ($scope.privateUserForm.$valid) {
                                        //  } else {
                                        //         $scope.submitted2 = true;
                                        //   }

                                       // alert();

                                         var  emailPattern = /^(?:1-?)?[(]?\d{3}[)]?\s?-?\s?\d{3}\s?-?\s?\d{4}$/;

                                         var firstNamep = document.getElementById("firstNamep").value;
                                         var lastNamep = document.getElementById("lastNamep").value;
                                         var emailp = document.getElementById("emailp").value;
                                         var mobileNop = document.getElementById("mobileNop").value;
                                          

                                         $scope.firstNamepMsg = false;
                                         $scope.lastNamepMsg = false;
                                         $scope.emailpMsg = false;
                                         $scope.mobileNopMsg = false;




                                          
              
     

                                        



                                      if (firstNamep == "") {
                                          // alert("Name must..");
                                          $scope.firstNamepMsg = true;
                                        } else if (lastNamep == "") {
                                            $scope.lastNamepMsg = true;
                                        } else if (emailp == "") {
                                            $scope.emailpMsg = true;
                                          // } else if (mobileNop == "") {
                                        } else if (mobileNop == "" && !emailPattern.test(mobileNop)) {
                                            $scope.mobileNopMsg = true;
                                        } else {
                                          
                                            $scope.showPrivateList = true;

                                              $scope.privateUsers.push({
                                                  
                                                 "firstName": $scope.firstNamep,
                                                 "lastName": $scope.lastNamep,
                                                 "emailId": $scope.emailp,
                                                 "phoneNo": $scope.mobileNop
                                              });

                                              console.log("kjhhjjjjjjjj-------",$scope.privateUsers);

                                              $scope.privateUsers;

                                              // Clear input fields after push
                                                $scope.firstNamep = "";
                                                $scope.lastNamep = "";
                                                $scope.emailp = "";
                                                $scope.mobileNop = "";

                                         }

                                      };

                                       $scope.removePrivateUser = function(index) {
                                             $scope.privateUsers.splice(index, 1);
                                          };

                                    //----------------------------------------------------------------------


                  $scope.addPrivateGroupUsers = function(){

                    $scope.privateUsers;

                     $scope.showPrivateList = true;

                     var privateGroupJson={
                                          "groupName":$scope.newGroup,
                                          "isPublic":"N",
                                          "isPrivate":"Y",
                                          "adminApproved":"N",
                                          "purpose":$scope.groupPurpose,
                                          "addedUsers":$scope.privateUsers // Should send userID (1, 2, 3)
                                          }

                                          // "groupName":$scope.newGroup,
                                          // "purpose":$scope.groupPurpose,
                                          // "isPublic":publicValue,
                                          // "isPrivate":privateValue,
                                          // "adminApproved":adminApproved,
                                          // "addedUsers":[] // Shoul send userID (1, 2, 3)

                                           console.log("kjhhjjjjjjjj-------",privateGroupJson);



                                               var privateGroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group',
                                                  data:privateGroupJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            privateGroupAdd.success(function (data, status, response) {

                                        $scope.showAddPrivateUserToGroup = false;
                                              });
                  };

// ======================================================================================================












                                $scope.result = {};

                                $scope.roles = [
                                    {id: 1, text: 'Public Group - Anyone can see your notifications'},
                                    {id: 2, text: 'VIP Group - People I approve can see my notifications'},
                                    {id: 3, text: 'Private Group - Only people I name can see my notifications'}
                                  ];

                                  $scope.user = {
                                    roles: []
                                  };



                                   $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..

                                  $scope.groupChange = function(){
    
   

                                  if($scope.result.id==1){

                                    $scope.showAddPrivateUserToGroupBtn = false;
                                       $scope.showAddPrivateUserToGroup = false;
                                        $scope.addUsersToGroup = false;
                                        $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..
                                      //   document.getElementById('showInPrivate').style.display = "none";
                                      // document.getElementById('hideInPrivate').style.display = "block";

                                      $scope.showAddApprover = false;
                                     $scope.showaddApproverDetails=false;
                                     $scope.submittedGroup12 = false;
                                    
                                  }

                                  if($scope.result.id==2){

                                    $scope.showAddPrivateUserToGroupBtn = false;
                                       $scope.showAddPrivateUserToGroup = false;
                                        $scope.addUsersToGroup = false;
                                        $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..
                                      //   document.getElementById('showInPrivate').style.display = "none";
                                      // document.getElementById('hideInPrivate').style.display = "block";
                                      $scope.showAddApprover = true;
                                     $scope.showaddApproverDetails=false;
                                     $scope.submittedGroup12 = false;
                                   
                                  }

                                  if($scope.result.id==3){
                                    $scope.showAddPrivateUserToGroupBtn = true;
                                    // document.getElementById('showInPrivate').style.display = "block";
                                    // document.getElementById('hideInPrivate').style.display = "none";
                                    $scope.showAddApprover = false;
                                     $scope.showaddApproverDetails=false;
                                     $scope.submittedGroup12 = false;
                                  }

                                  if($scope.result.id==0){

                                    $scope.showAddApprover = false;
                                    $scope.showAddPrivateUserToGroupBtn = false;
                                    $scope.hideOnPrivateChecked = false;

                                  }
                                  
                                };




                              // // To unable and disable the checkbox base on the last checked checkbox selection using ( ng-click="$last&&mytest(checked)" )..

                              //   $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..

                              // $scope.mytest=function(value){
                              
                              //   if(value)
                              //    {
                              //     console.log("llllllllllll");
                              //     $scope.showAddPrivateUserToGroupBtn = true;
                              //       // $scope.addUsersToGroup = true;
                              //       // $scope.hideOnPrivateChecked = false; // To hide (Add users to private group) button when private option is checked..
                              //       // $scope.addUsersToPrivateGroup = true;
                              //       document.getElementById('Public Group - Anyone can see your notifications').disabled = true;
                              //       document.getElementById('VIP Group - People I approve can see my notifications').disabled = true;
                              //       document.getElementById('Private Group - Only people I name can see my notifications').disabled = false;
                              //       document.getElementById('showInPrivate').style.display = "block";
                              //       document.getElementById('hideInPrivate').style.display = "none";
                              //    }
                              //       else
                              //       {

                              //         console.log("jjjjjjjjjjjjjjjj");

                              //          $scope.showAddPrivateUserToGroupBtn = false;
                              //          $scope.showAddPrivateUserToGroup = false;
                              //           $scope.addUsersToGroup = false;
                              //           $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..
                              //         // $scope.addUsersToPrivateGroup = false;
                              //         document.getElementById('Public Group - Anyone can see your notifications').disabled = false;
                              //         document.getElementById('VIP Group - People I approve can see my notifications').disabled = false;
                              //         document.getElementById('Private Group - Only people I name can see my notifications').disabled = false;
                              //         document.getElementById('showInPrivate').style.display = "none";
                              //         document.getElementById('hideInPrivate').style.display = "block";
                                      
                              //       }

                              //   };



                                $scope.addUsersToPrivate = function(){
                                  $scope.showAddPrivateUserToGroup = true;
                                  $scope.showAddPrivateUserToGroupBtn = false;
                                 // $scope.hideGroupTableInPrivate = true;
                                };

                                $scope.addUsersToPrivateLater = function(){
                                  $scope.showAddPrivateUserToGroupBtn = false;
                                  $scope.showAddPrivateUserToGroup = false;
                                  $scope.hideGroupTableInPrivate = false;
                                   //$scope.showAddPrivateUserToGroupBtn = true;
                                };

                                $scope.hidePrivateAddFields = function(){
                                  $scope.showAddPrivateUserToGroupBtn = true;
                                  $scope.hideGroupTableInPrivate = false;
                                  $scope.showAddPrivateUserToGroup = false;
                                };







  




                              //   $scope.showapprover = function(value, position, roles, checked){
                              //     console.log(checked);
                              //     console.log(value);
                              //     console.log(roles);
                                  
                              //   angular.forEach(roles, function(role, index) {
                              //     if (position != index) 
                              //       role.checked = false;
                              //   });

                              //   $scope.showAddApprover = false;
    
                                 
                              //     if(value==1)
                              //     {
                              //        $scope.showAddApprover = false;
                              //        $scope.showaddApproverDetails=false;
                              //     }

                              //     if(value==2)
                              //     {
                              //        $scope.showAddApprover = true;
                              //        $scope.showaddApproverDetails=false;
                              //     }

                              //     if(value==3)
                              //     {
                              //        $scope.showAddApprover = false;
                              //        $scope.showaddApproverDetails=false;
                              //     }
                              //   }



                                // $scope.doesItemMatch = function(role) {
                                //  for(var i in $scope.roles) {
                                //     var match = $scope.roles[i];
                                //     if(role.id === role.idToMatch)
                                //       return true;
                                //     console.log("lkjljkljkjjjjjjj",role.id);
                                //  }
                                //  return false;
                                // }





                               


                       // -------------------------------------- Funtion to refresh the list.. -----------------------------------------------------

                                                   function refreshUserList()
                                            {
                                              var promisewq = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/user/list?limit=250&page=1',
                                                           // data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
                                                            data: {"sort":[],"filters":[],"filterType":"and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            },

                                      // ------------------ To have pagination.. ---------------------

                                                            // params:{
                                                            //             page:$scope.pagination.page,
                                                            //             limit: $scope.pagination.limit
                                                            //         }

                                      // -----------------------------------------------------------------  

                                                        })
                                              promisewq.success(function (data, status, response) {
                                              
                                                     $scope.users = data.records;
                                                      console.log(data);
                                                      $scope.pagination.totalRecords = data.totalRecords; // To have pagination..
                                                      
                                             });
                                            };





                                  // -------------------- Step 3 add and list new user.. -------------------- 

                                     // Users List Arrays
                                      $scope.usersManually = [];
                                     
                                      // Add a User to the list
                                      $scope.addUsers = function () {

                                         if ($scope.myformUser.$valid) {
                                        
                                             $scope.showList = true;
                                             $scope.submitted3 = false;

                                             if($scope.mobileNos==undefined){
                                                  $scope.usersManually.push({
                                              
                                                   'firstName':$scope.firstNames,
                                                   'lastName':$scope.lastNames,
                                                   'emailid':$scope.emails,
                                                   'phone':"",
                                                   'status':"Y",
                                                });
                                             } else{

                                                 $scope.usersManually.push({
                                                      
                                                     'firstName':$scope.firstNames,
                                                     'lastName':$scope.lastNames,
                                                     'emailid':$scope.emails,
                                                     'phone':$scope.mobileNos,
                                                     'status':"Y",
                                                  });

                                                }

                                        //  Clear input fields after push
                                            $scope.firstNames = "";
                                            $scope.lastNames = "";
                                            $scope.emails = "";
                                            $scope.mobileNos = "";

                                            console.log("Users data",$scope.usersManually);


                                            } else {
                                                $scope.submitted3 = true;
                                           }







                                      };

                                       console.log("Users data",$scope.users);




        // ======================================== Edit users in 3rd step.. ========================================


                                      // $scope.editRow = function(index){

                                         
                                      // };

                                      $scope.editSaveUsers = function(index){



                                         // if ($scope.myformUser.$valid) {
                                         // } else {
                                         //        $scope.submitted3 = true;
                                         //  }

                                        console.log("jjjkljkljjk",$scope.users[index]);

                                       // alert($scope.users[index].receiverConfigId);
                                        console.log("$scope.users[index].receiverConfigId",$scope.users[index].receiverConfigId);

                                        // $scope.$watch('firstName',function(newValue, oldValue) {
                                        //   console.log("newValue",newValue);
                                        //   console.log("oldValue",oldValue);

                                         

                                        //   });

                                        console.log(index);
                                          $scope.dataJson1= {
                                                        'firstName':$scope.users[index].receiverFirstName,
                                                        'lastName':$scope.users[index].receiverLastName,
                                                        'emailId':$scope.users[index].receiverEmail,
                                                        'phoneNo':$scope.users[index].receiverPhoneNo,
                                                        'receiverstatus':"Invite sent",
                                                        'groupResponse':[]
                                                        }

                                                         console.log("$scope.dataJson1",index);
                                                         console.log("$scope.dataJson1",$scope.dataJson1);

                                                                
                                             
                                          $http({
                                                method: 'PUT',
                                                url: 'api/v1/user/'+$scope.users[index].receiverConfigId,
                                                data: $scope.dataJson1,
                                                
                                            }).success(function (data, status) {
                                                refreshUserList();

                                            });


                                      };

                                      // ------------------- To change the color of the Inactive row.. ---------------------

                                                           $scope.set_color = function (user) {

                                                            if (user.receiverstatus =="InActive" || user.receiverstatus =="Inactive") {
                                                                return {
                                                                  color: "#CDCED0"
                                                                }
                                                            }
                                                           };

                                      // -----------------------------------------------------------------------------------------







                                       $scope.removeUser = function(index) {
                                         $scope.usersManually.splice(index, 1);

                                             // var deleteUser = $http({
                                             //           method: 'DELETE',
                                             //           url: 'api/v1/user/'+$scope.users[index].receiverConfigId
                                             //           })
                                             //           deleteUser.success(function (data, status, response) {
                                             //              refreshUserList();
                                             //           });
                                           
                                          };

                                    //----------------------------------------------------------------------


          // ========================================================================================================================




                                $scope.hideWhenPrivateSelected = true; // To show some content of 3rd step when when private private option is selected..
                                $scope.showPrivateGroupSection = function(){
                                    $scope.addUsersToPrivateGroup = true;
                                    $scope.showUploadUserDetails = false;
                                    $scope.showAddUserToGroup = false;
                                    $scope.hideWhenPrivateSelected = false; // To hide some content of 3rd step when when private private option is selected..
                                    $scope.addUsersToGroup = false;
                                    $scope.hideOnPrivateChecked = true; // To show (Add users to private group) button when private option is checked..
                                    $scope.mobileSectionShowBtn = true; // To show (Save group) button in mobile view..
                                };


                                  // $scope.showPrivateGroupSection = function(){
                                  //   $scope.mobileSectionShowBtn = true;
                                  // }





        $(".hideInInitial").hide(); // To hide the navigation bar list only in initialSetup.html page..

        $(".user").hide();// To hide User portal list in Admin portal..

       
         

        // To create group and hide createGroupBtn button..
         $scope.createGroupBtn = function(){
            $scope.createGroupBtn = false;
            $scope.createGroupForm = true;
         };


        // To hide createGroupForm and show creatGroupBtn..
         $scope.saveGroup = function(){
            $scope.createGroupBtn = true;
            $scope.createGroupForm = false;
         };


        // To hide and show the Upload user details..
         $scope.uploadUserDetails = function(){

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
              $scope.showUploadUserDetails = false;

              $(".userLimitOver").show(); // To show Toast Notification when clicked on delete..
                 window.setTimeout(function() {
                  $(".userLimitOver").hide();
                },3000)


            } else{
                $scope.showAddUserToGroup = false;
                $scope.showUploadUserDetails = true;
                $scope.addUsersToPrivateGroup = false;
                $scope.showLinkTableOnShareClick = false;
            }

           // $scope.remainingData = 

            });

           
         };

         $scope.hideUploadUserDetails = function(){
            $scope.showUploadUserDetails = false;
             $scope.showLinkTableOnShareClick = false;
         };


         $scope.addUserDetails = function(){


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
              $scope.showUploadUserDetails = false;

              $(".userLimitOver").show(); // To show Toast Notification when clicked on delete..
                 window.setTimeout(function() {
                  $(".userLimitOver").hide();
                },3000)


            } else{
                $scope.showUploadUserDetails = false;
                $scope.showAddUserToGroup = true;
                $scope.addUsersToPrivateGroup = false;
                $scope.showLinkTableOnShareClick = false;
            }

           // $scope.remainingData = 

            });


            
         };

         $scope.hideUploadUserDetails = function(){
            $scope.showAddUserToGroup = false;
            $scope.showLinkTableOnShareClick = false;
         };

         $scope.showLinkDetails = function(){
            $scope.showLinkTableOnShareClick = true;
            $scope.showAddUserToGroup = false;
            $scope.showUploadUserDetails= false;
         };



           $scope.uploadedUsersDatass=[];
            $scope.usersManually=[];  

            $scope.secondEmailNotifications = [];
            $scope.secondmsgNotifications = [];


         $scope.showInvitePreview = function(){

            // $scope.uploadedUsersDatass;
            // $scope.usersManually;  

            
            console.log("$scope.emailNotifications",$scope.secondEmailNotifications);
            console.log("$scope.msgNotifications",$scope.secondmsgNotifications);

            console.log("khjjk",$scope.uploadedUsersDatass);
            console.log("khjjk",$scope.usersManually);

             // $scope.secondEmailNotifications = $scope.emailNotifications;
             //                            $scope.secondmsgNotifications = $scope.msgNotifications;





            if(($scope.uploadedUsersDatass==undefined || $scope.uploadedUsersDatass.length==0) && $scope.usersManually.length==0){
              $scope.showInvitePreviewss = true;
                    $scope.hideWhenPrivateSelected = false;
                    $scope.hideWhenPrivateSelected = false;
                    $scope.hideOnPrivateChecked = false;
                    $scope.showPreviousStep = true;
                    $scope.showUploadUserDetails = false;
                    $scope.showAddUserToGroup = false;
                    $scope.showLinkTableOnShareClick = false;

                    return;
              }




                   // ======================= To combaine to json object.. ========================

                                    var jsonObjectC = $scope.uploadedUsersDatass;
                                    var jsonObjectD = $scope.usersManually;  

                                    $scope.uplodedUsersAndManualEntryUsers = jsonObjectC.concat(jsonObjectD);

                                    console.log("$scope.emailNotificationUserEntryList",$scope.uplodedUsersAndManualEntryUsers);

                                    // $scope.uploadedUsersDatassLength = $scope.emailNotificationUserEntryList.length;

                                  
                          
                          // =============================================================================  



            var combinedUsers = $scope.uplodedUsersAndManualEntryUsers;

            var GroupAddedManually = $http({
                        method: 'POST',
                        url: 'api/v1/initial/filedata',
                        data: combinedUsers,
                        headers: {
                            "Content-Type": 'application/json'
                        }
                      })
                  GroupAddedManually.success(function (data, status, response) {

                    

                      // console.log(data);
                      // console.log("Users data entered1..",data.result.records);


                       $scope.duplicateDataToDisplay = data.result.duplicate;
                       $scope.usersToSendNotificationToShow = data.result.records;


                       console.log("jljkjjjjjjj",$scope.usersToSendNotificationToShow);

                       $scope.usersToSendNotification = data.result.records;

                      if($scope.duplicateDataToDisplay.length>0){
                          angular.element('#duplicateUsersDetails').modal('show');
                      } else {
                          $scope.showInvitePreviewss = true;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideOnPrivateChecked = false;
                          $scope.showPreviousStep = true;
                          $scope.showUploadUserDetails = false;
                          $scope.showAddUserToGroup = false;
                          $scope.showLinkTableOnShareClick = false;
                      }




                      

                      // $scope.emailNotificationUserEntry = data;

                     // $scope.emailNotifications;

                     // $scope.uploadedUsersDatass;



                     // // ======================= To combaine to json object.. ========================

                     //                var jsonObjectA = $scope.uploadedUsersDatass;
                     //                var jsonObjectB = $scope.emailNotificationUserEntry;

                     //                $scope.emailNotificationUserEntryList = jsonObjectA.concat(jsonObjectB);

                     //                console.log("$scope.emailNotificationUserEntryList",$scope.emailNotificationUserEntryList);

                     //                 $scope.uploadedUsersDatassLength = $scope.emailNotificationUserEntryList.length;

                                  
                          
                     //      // =============================================================================  
                        







                        $scope.emailNotifications = [];

                                        for(var i=0; i<$scope.usersToSendNotification.length; i++){
                                          // console.log("hjhjhjjkjhkj___________",data[i].emailid);
                                          // if($scope.usersToSendNotification[i].emailid!=undefined){
                                          // $scope.emailNotifications.push($scope.usersToSendNotification[i]);

                                          //  }

                                          if($scope.usersToSendNotification[i].correctEmail=="Y"){
                                            $scope.emailNotifications.push($scope.usersToSendNotification[i]);

                                           }
                                        }

                                       // $scope.emailNotifications = data;
                                         $scope.emailNotificationsLength = $scope.emailNotifications.length;

                                         console.log("$scope.emailNotificationsLength",$scope.emailNotificationsLength);


                                         // if($scope.emailNotificationsLength==0){
                                         //      console.log("$scope.emailNotificationsLength",$scope.emailNotificationsLength);
                                         //        alert();
                                         //    }


                                         $scope.msgNotifications=[];

                                          for(var j=0; j<$scope.usersToSendNotification.length; j++){
                                          
                                          // if($scope.usersToSendNotification[j].phone!=undefined){
                                          // $scope.msgNotifications.push($scope.usersToSendNotification[j]);

                                          //  }

                                          if($scope.usersToSendNotification[j].correctPhone=="Y"){
                                            $scope.msgNotifications.push($scope.usersToSendNotification[j]);

                                          
                                           }
                                        }

                                        $scope.msgNotificationsLength = $scope.msgNotifications.length;

                                        $scope.secondEmailNotifications = $scope.emailNotifications;
                                        $scope.secondmsgNotifications = $scope.msgNotifications;

                                        console.log("jjkjjljkjk",$scope.emailNotifications);
                                        console.log("jjkjjljkjk",$scope.msgNotifications);

                                       

                                        // $scope.disableEmailNotification = true;

                                        //  if($scope.disableEmailNotification==true){
                                        //       return;
                                        //     }


                                           

                                            if($scope.emailNotificationsLength==0){
                                                $scope.disableEmailNotification==true;
                                                return;
                                            } else{
                                                $scope.disableEmailNotification==false;
                                            }

                                            if($scope.msgNotificationsLength==0){
                                                $scope.disableMobileNotification==true;
                                                return;
                                            } else{
                                                $scope.disableMobileNotification==false;
                                            }








                          

                    }).error(function (data, status) {

                       

                       //console.log("jjjjjjjN",data.duplicate);
                      // console.log("jjjjjjjN",duplicate);


                      // $scope.duplicateUserValues = data.duplicate;

                      // console.log("jjjjjjjN",data.records[0].limitOver);
                      //   console.log("jjjjjjjN",data.records[0].remainingUsers);
                      //   console.log("jjjjjjjN",data.records.remainingUsers);
                      //   console.log("jjjjjjjN",data.duplicate);

                       if (status === 406) {

                       

                        console.log("data______",data);
                        console.log("jjjjjjjN",data.records[0].limitOver);
                        console.log("jjjjjjjN",data.records[0].totalLimit);
                        console.log("jjjjjjjN",data.records[0].remainingUsers);
                        console.log("jjjjjjjN",data.records.remainingUsers);
                        console.log("jjjjjjjN",data.duplicate);

                        $scope.limitedUsersToDisplayLength = data.records[0].limitOver.length;
                        $scope.limitedUsersToDisplay = data.records[0].limitOver;
                        // $scope.totalAllowedUsers = data.records[0].totalLimit;
                        // $scope.totalRemainingUsers = data.records[0].remainingUsers;
                         $scope.totalAllowedUsers = data.totalLimit;
                        $scope.totalRemainingUsers = data.remainingusers;

                         angular.element('#editUserDetails').modal('show');

                        
                       }

                      if (status === 409) {

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
                          $scope.showInvitePreviewss = true;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideOnPrivateChecked = false;
                          $scope.showPreviousStep = true;
                          $scope.showUploadUserDetails = false;
                          $scope.showAddUserToGroup = false;
                          $scope.showLinkTableOnShareClick = false;
         };





         $scope.saveCombinedUsers = function(){


          console.log("$scope.emailNotifications",$scope.secondEmailNotifications);
            console.log("$scope.msgNotifications",$scope.secondmsgNotifications);
            
            console.log("jkhhjkh",$scope.limitedUsersToDisplay);

            console.log("Duplicate",$scope.duplicateUserValues);

              if($scope.duplicateUserValues!=undefined){

                  if($scope.duplicateUserValues.length!=0){

                    $scope.limitedUsersToDisplay = $scope.duplicateUserValues;

                  }

               }

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
                      // console.log("Users data entered..",data);
                      console.log("Users data entered..",data.result.records);

                      $scope.userDataToSend = data.result.records;



                       $scope.duplicateDataToDisplay = data.result.duplicate;



                        $scope.usersToSendNotificationToShow = data.result.records;


                       console.log("jljkjjjjjjj",$scope.usersToSendNotificationToShow);



                      if($scope.duplicateDataToDisplay.length>0){
                          angular.element('#duplicateUsersDetails').modal('show');
                      } else {
                          $scope.showInvitePreviewss = true;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideWhenPrivateSelected = false;
                          $scope.hideOnPrivateChecked = false;
                          $scope.showPreviousStep = true;
                          $scope.showUploadUserDetails = false;
                          $scope.showAddUserToGroup = false;
                          $scope.showLinkTableOnShareClick = false;
                      }


                //  console.log("Users data entered1..",data.results.records);

                      console.log("Users data entered2..",data.records);
                    //  console.log("Users data entered3..",records);

                      $scope.emailNotificationUserEntry = data;

                   
                        $scope.emailNotifications = [];

                        console.log("jklkjkjk...........",$scope.userDataToSend);

                                        for(var i=0; i<$scope.userDataToSend.length; i++){
                                          // console.log("hjhjhjjkjhkj___________",data[i].emailid);
                                          if($scope.userDataToSend[i].correctEmail=="Y"){
                                          $scope.emailNotifications.push($scope.userDataToSend[i]);

                                           console.log("jklkjkjk...........",$scope.emailNotifications);
                                           }
                                        }

                                       // $scope.emailNotifications = data;
                                         $scope.emailNotificationsLength = $scope.emailNotifications.length;

                                         console.log("$scope.emailNotificationsLength",$scope.emailNotificationsLength);


                                         $scope.msgNotifications=[];

                                          for(var j=0; j<$scope.userDataToSend.length; j++){
                                          // console.log("hjhjhjjkjhkj___________",data[j].phone);
                                          if($scope.userDataToSend[j].correctPhone=="Y"){
                                          $scope.msgNotifications.push($scope.userDataToSend[j]);

                                          // console.log("jklkjkjk...........",$scope.msgNotifications);
                                           }
                                        }

                                        $scope.msgNotificationsLength = $scope.msgNotifications.length;


                                        $scope.secondEmailNotifications = $scope.emailNotifications;
                                        $scope.secondmsgNotifications = $scope.msgNotifications;

                                        console.log("jjkjjljkjk",$scope.emailNotifications);
                                        console.log("jjkjjljkjk",$scope.msgNotifications);








                          

                    })
                        GroupAddedManuallys.error(function (data, status) {

                          $scope.duplicateUserValues = data.duplicate;

                          $scope.totalLimits = data.totalLimit;
                          $scope.remaininguserss = data.remainingusers;
                          $scope.duplicateUsersLength = data.duplicate.length;

                       

                      // console.log("jjjjjjjN",data.records[0].limitOver);
                      //   console.log("jjjjjjjN",data.records[0].remainingUsers);
                      //   console.log("jjjjjjjN",data.records.remainingUsers);
                      //   console.log("jjjjjjjN",data.duplicate);

                       if (status === 406) {
                        // console.log("jjjjjjjN",data.records[0].limitOver);
                        // console.log("jjjjjjjN",data.records[0].totalLimit);
                        // console.log("jjjjjjjN",data.records[0].remainingUsers);
                        // console.log("jjjjjjjN",data.records.remainingUsers);
                        // console.log("jjjjjjjN",data.duplicate);

                        angular.element('#editUserDetails').modal('show');

                        $scope.limitedUsersToDisplayLength = data.records[0].limitOver.length;
                        $scope.limitedUsersToDisplay = data.records[0].limitOver;
                        $scope.totalAllowedUsers = data.records[0].totalLimit;
                        $scope.totalRemainingUsers = data.records[0].remainingUsers;

                        
                       }

                      if (status === 409) {

                           $scope.duplicateUserValues = data.duplicate;

                           $scope.totalLimits = data.totalLimit;
                           $scope.remaininguserss = data.remainingusers;
                           $scope.duplicateUsersLength = data.duplicate.length;

                        angular.element('#duplicateUsersDetailsToShow').modal('show');

                    }

                    });


         };

         $scope.removeCombinedUser = function(index){
            $scope.limitedUsersToDisplay.splice(index, 1);
            $scope.btnDisabless = true;

            $scope.uploadedUsersDatass = $scope.limitedUsersToDisplay;

            if($scope.limitedUsersToDisplay.length==0){
              angular.element('#editUserDetails').modal('hide');
            }
         };

         $scope.removeCombinedUsers = function(index){
            $scope.duplicateUserValues.splice(index, 1);

            $scope.uploadedUsersDatass = $scope.duplicateUserValues;

            if($scope.duplicateUserValues.length==0){
              angular.element('#duplicateUsersDetailsToShow').modal('hide');
            }
         };













         $scope.showStepThree = function(){

          $scope.hideWhenPrivateSelected = true;
          $scope.showInvitePreviewss = false;
          $scope.showPreviousStep = false;
          $scope.hideOnPrivateChecked = true;

          $scope.limitedUsersToDisplay=[];
          $scope.duplicateUserValues=[];
          $scope.usersManually=[];
          $scope.removeUploadedFile();

           $scope.showInvitePreviewss = false;
          $scope.hideWhenPrivateSelected = true;
          $scope.hideWhenPrivateSelected = true;
          $scope.hideOnPrivateChecked = true;
          $scope.showPreviousStep = false;
         };




         //  $scope.showStepInitialOne = function(){
         //  window.location = '#/initialSetupOne';
         // };

         //  $scope.showStepInitialTwo = function(){
         //  window.location = '#/initialSetupTwo';
         // };

         //  $scope.showStepInitialThree = function(){
         //  window.location = '#/initialSetupThree';
         // };



                                     $scope.showMobileVerification = function(){


                                       // form validation..
                                       if ($scope.myform.$valid) {
                                        

                                      $scope.hideMobileVerification = true;
                                      $scope.hideVerificationBtn = true;
                                      $scope.disableMobileNo=true;



                                                $scope.dataJson= {
                                                        "firstname":$scope.first,
                                                        "lastName":$scope.last,
                                                        "receiverPhoneNo":"918892942049"
                                                        
                                                        }

                                                                 // console.log("$scope.dataJson....",  $scope.dataJson);

                                                  //  console.log(JSON.parse( $scope.dataJson));

                                                $http({
                                                      method: 'POST',
                                                      url: 'api/v1/send/Otp', 
                                                      data: $scope.dataJson,
                                                      headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                      
                                                  }).success(function (data, status) {

                                                       $(".showAlertOnSuccessMobileVerification").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessMobileVerification").hide();
                                                            },8000)

                                                       //   alert();
                                                          console.log("kjkjjjjjjj",data);
                                                  });

                                          } else {
                                          $scope.submitted = true;
                                        }
                                        // form validation..

         
                                     };



                                      $scope.hideMobileVerification = false;


                                  $scope.counter = 0;
                               $scope.showNextBtn = function(inc){

                                    $scope.counter += inc;

                                    console.log("Btn Count", $scope.counter);

                                    if($scope.counter==3){
                                     
                                      $scope.mobileNo = "";
                                      $scope.disableMobileNo=false;
                                      $scope.hideMobileVerification = false;

                                      $scope.otpCode = "";

                                       $(".showAlertOnReentering").show(); // To show Toast Notification when clicked on delete..
                                           window.setTimeout(function() {
                                            $(".showAlertOnReentering").hide();
                                          },8000)

                                           $scope.hideVerificationBtn = false;

                                           $scope.counter = 0;
                                           return;

                                    }
                               



                                 if ($scope.myform1.$valid) {
                                         
                                // alert();
                                  // $scope.hideMobileVerification = false;
                                  // $scope.hideVerificationBtn = true;
                                  // $scope.nextBtnDisable = false;
                                  


                                                $http({
                                                      method: 'POST',
                                                      url: 'api/v1/verify/Otp/'+$scope.otpCode
      //                                                 data: $scope.otpCodeJson,
      //                                                 
                                                  }).success(function (data, status) {

                                                    $scope.hideMobileVerification = false;
                                                    $scope.nextBtnDisable = false;

     
                            // =================== To have alert on creating same emailID or mobileNo.. ===================

                                                 
                                                    $(".showAlertOnSuccessOtpCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessOtpCode").hide();
                                                            },8000)
                                                 
                                     
                                                     }).error(function (data, status) {

                                                    $scope.hideMobileVerification = true;
                                                     $scope.hideVerificationBtn = true;

                                                           $(".showAlertOnErrorOtpCode").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnErrorOtpCode").hide();
                                                            },8000)
                                                 

                                                  });

                            // =============================================================================================

                              } else {
                                          $scope.submitted1 = true;


                              // ============== Remove this code.. ==============
                                  $scope.hideMobileVerification = false;
                                  $scope.hideVerificationBtn = true;
                                  $scope.nextBtnDisable = false;
                                        }
                              // ================================================          
                                                 
         };






         $scope.showAddApproverInputs = function(){
          $scope.showaddApproverDetails=true;
          $scope.showAddApprover=false;
         }

          // To open modal window for Poll result..
            $scope.openEmailContent = function(){

                angular.element('#openEmailModel').modal('show');
                // $scope.emailNotifications = data;
                // $scope.emailNotificationsLength = data.length;
            };

         // To open modal window for Poll result..
            $scope.openMessageContent = function(){
                angular.element('#openMobileModel').modal('show');
            };

            // To open modal window for Poll result..
            $scope.openUploadModelContent = function(){
                angular.element('#uploaddetails').modal('show');

                                        

             //   console.log("ljjjjjjjhj____________",$scope.files[0]);



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






                                      var addButtonClicked; // Variables for addButton and Edit button..
                                      var editButtonClicked; // Variables for addButton and Edit button..





             // ================================ To show alert on deleting the user.. =========================================
             
             // ===============================================================================================================



         // if(adminApproved=="VIP Group - People I approve can see my notifications"){
         //    $scope.showAddApprover = true;
         //   }

         // $scope.myClass = [];
         //  $scope.addClass = function() {
         //    $scope.myClass.push('red');
         //  };







                                        // Drag and drop..
                                        
                                         $scope.currentDropElement = null;

                                            $scope.remove = function(l, o) {
                                              var index = l.indexOf(o);
                                              if (index > -1) {
                                                l.splice(index, 1);
                                              }
                                            };

                                            $scope.onDragStart = function() {

                                                $scope.showDiv = true;

                                            };

                                            $scope.onDragEnd = function() {

                                            };

                                            $scope.onDragOver = function(data, dragElement, dropElement) {
                                              $scope.currentDropElement = dropElement;
                                            };

                                            $scope.onDragLeave = function() {
                                              $scope.currentDropElement = null;
                                            };

                                            $scope.onDrop = function(data) {

                                                 $scope.showDiv = false;
                                               console.log(data);
                                                $scope.models.basket.unshift(data);
                                                $scope.remove($scope.models.users, data);

                                              
                                            };











    }

    ]);

})();