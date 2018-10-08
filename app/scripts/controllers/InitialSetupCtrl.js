/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.initialSetup',
        []
    );

    module.controller('InitialSetupCtrl',
        [ '$scope', '$location', '$http', '$timeout', '$upload', '$cookieStore',
        

    function InitialSetupCtrl($scope, $location, $http, $timeout, $upload, $cookieStore) {

      document.getElementById("navBars").style.display="block";

       console.log('InitialSetupCtrl module is called..');




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
                              $scope.reportUploadFile = undefined;
                              $scope.selectedFile.fileUploadProgress = 0;
                              $scope.selectedFile.uploadStatus = 0;
                            };



                            $scope.emailNotifications=[];
                            $scope.msgNotifications=[];

            $scope.showToastNotification = function(){
                  // $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                   

                      var uploadedJson = $scope.uploaddedData;


                        var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/initial/filedata',
                                                  data:uploadedJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {

                                        console.log("data_________________",data);

                                         $scope.emailNotifications = [];

                                        for(var i=0; i<data.length; i++){
                                          // console.log("hjhjhjjkjhkj___________",data[i].emailid);
                                          if(data[i].emailid!=undefined){
                                          $scope.emailNotifications.push(data[i]);

                                          // console.log("jklkjkjk...........",$scope.emailNotifications);
                                           }
                                        }

                                       // $scope.emailNotifications = data;
                                         $scope.emailNotificationsLength = $scope.emailNotifications.length;




                                         $scope.msgNotifications=[];

                                          for(var j=0; j<data.length; j++){
                                          // console.log("hjhjhjjkjhkj___________",data[j].phone);
                                          if(data[j].phone!=undefined){
                                          $scope.msgNotifications.push(data[j]);

                                          // console.log("jklkjkjk...........",$scope.msgNotifications);
                                           }
                                        }

                                        $scope.msgNotificationsLength = $scope.msgNotifications.length;



                                      //  alert("success");

                                         

                                            $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClass").hide();
                                                            },3000)


                                      }).error(function (data, status, response) {
                                    //    alert("error");
                                      });



              };


                  $scope.removeUploadedUser = function(index) {
                     $scope.uploaddedData.splice(index, 1);
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
                                      $scope.showInitialsetupStep1 = false;
                                      $scope.showInitialsetupStep2 = true;
                                      $scope.showInitialsetupStep3 = false;

                                      if ($scope.class === "btn-primary")
                                        
                                          $scope.class = "btn-primary";
                                        else
                                          $scope.class = "btn-primary";

                                        if ($scope.class2 === "btn-primary")
                                        
                                          $scope.class2 = "btn-default";
                                        else
                                          $scope.class2 = "btn-primary";
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



                  $scope.stepThreeGroup = 'group'; // To change "group" to "groups" in step3..

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
                         if($scope.groups.length>1){
                          $scope.stepThreeGroup = 'groups';
                         }
                  // ----------------------------------------------------------------------------    


                  
                       } else {
                              $scope.submittedGroup = true;
                        }



                };




                 $scope.removeGroup = function(index) {
                     $scope.groups.splice(index, 1);
                  };





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
                                        } else if (mobileNop == "") {
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
                                      $scope.users = [];
                                     
                                      // Add a User to the list
                                      $scope.addUsers = function () {

                                         if ($scope.myformUser.$valid) {
                                        
                                        $scope.showList = true;

                                          // $scope.users.push({
                                              
                                          //    firstName: $scope.firstName,
                                          //    lastName: $scope.lastName,
                                          //    email: $scope.email,
                                          //    mobileNo: $scope.mobileNo
                                          // });

                                          // Clear input fields after push
                                            // $scope.firstName = "";
                                            // $scope.lastName = "";
                                            // $scope.email = "";
                                            // $scope.mobileNo = "";

                                             $scope.dataJson= {
                                                        'firstName':$scope.firstNames,
                                                        'lastName':$scope.lastNames,
                                                        'emailId':$scope.emails,
                                                        'phoneNo':$scope.mobileNos,
                                                        'receiverstatus':"Invite sent",
                                                        'groupResponse':[]
                                                        }

                                                        // console.log("$scope.dataJson", data1);

                                                                  console.log("$scope.dataJson....",  $scope.dataJson);

                                       

                                                $http({
                                                      method: 'POST',
                                                      url: 'api/v1/user',
                                                      data: $scope.dataJson,
                                                      
                                                  }).success(function (data, status) {

                                                        $scope.firstNames = "";
                                                        $scope.lastNames = "";
                                                        $scope.emails = "";
                                                        $scope.mobileNos = "";

                                                    refreshUserList();

                                                    });

                                          } else {
                                                $scope.submitted3 = true;
                                          }


                                      };




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
                                             var deleteUser = $http({
                                                       method: 'DELETE',
                                                       url: 'api/v1/user/'+$scope.users[index].receiverConfigId
                                                       })
                                                       deleteUser.success(function (data, status, response) {
                                                          refreshUserList();
                                                       });
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
            $scope.showAddUserToGroup = false;
            $scope.showUploadUserDetails = true;
            $scope.addUsersToPrivateGroup = false;
            $scope.showLinkTableOnShareClick = false;
         };

         $scope.hideUploadUserDetails = function(){
            $scope.showUploadUserDetails = false;
             $scope.showLinkTableOnShareClick = false;
         };


         $scope.addUserDetails = function(){
            $scope.showUploadUserDetails = false;
            $scope.showAddUserToGroup = true;
            $scope.addUsersToPrivateGroup = false;
             $scope.showLinkTableOnShareClick = false;
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






         $scope.showInvitePreview = function(){
          $scope.showInvitePreviewss = true;
          $scope.hideWhenPrivateSelected = false;
          $scope.hideWhenPrivateSelected = false;
          $scope.hideOnPrivateChecked = false;
          $scope.showPreviousStep = true;
          $scope.showUploadUserDetails = false;
          $scope.showAddUserToGroup = false;
          $scope.showLinkTableOnShareClick = false;
         };

         $scope.showStepThree = function(){
           $scope.showInvitePreviewss = false;
          $scope.hideWhenPrivateSelected = true;
          $scope.hideWhenPrivateSelected = true;
          $scope.hideOnPrivateChecked = true;
          $scope.showPreviousStep = false;
         };



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

                                        

                console.log("ljjjjjjjhj____________",$scope.files[0]);



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