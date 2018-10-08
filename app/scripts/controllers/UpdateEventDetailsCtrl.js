/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.updateEventDetails',
        []
    );

    module.controller('UpdateEventDetailsCtrl',
        [   '$rootScope', '$scope', '$filter', '$http', '$routeParams',

    function UpdateEventDetailsCtrl($rootScope, $scope, $filter, $http, $routeParams) {

      document.getElementById("navBars").style.display="block";

        console.log('UpdateEventDetailsCtrl module is called..');


        // ==================== To avoide Admin to access user pages.. ===============

            var userRoleDatass = window.localStorage['userRoleData'];
                $scope.userRoleDatas = userRoleDatass;

                if($scope.userRoleDatas!='ROLE_ADMIN'){

                   window.location = '#/login';

                }

        // ============================================================================


       


// 
        $scope.surveys = [0];
          $scope.addSurvey = function() {
            $scope.surveys.push({
            })
          }

           $scope.remove = function(index) {
               $scope.surveys.splice(index, 1);

               console.log(surveys);
             };





             
        // =========================== To get date and time formate.. ============================

              $scope.formatTimestampToDate = function(timestamp) {
                      // TODO: validate the timestamp
                       var c=moment(timestamp).tz('America/Los_Angeles').format("MM-DD-YYYY") ;
                       console.log(c);
                 return c;
              }



             $scope.formatTimestampToDates = function(timestamp) {
                    // TODO: validate the timestamp
                     var c=moment(timestamp).tz('Asia/Kolkata').format("MM-DD-YYYY hh:mm A") ;
                     console.log(c);
               return c;
            }

        // =======================================================================================   

        


                                 // To push checked users or group to inputbox in update Event.. 
                                  $scope.msgSendMethodMap = {
                                    groups: []
                                  };

                                  $scope.msgUserMap = {
                                    users: []
                                  };



                         // =============================== To show Group list.. =================================

                                  $scope.openAddUsersGroup = function(){


                                    angular.element('#AddUsersGroup').modal('show');


                                    var listGroups = $http({
                                    //                         method: 'POST',
                                    //                         url: 'api/v1/groups/list?limit=250&page=1',
                                                            method: 'GET',
                                                            url: 'api/v1/listAllgroups',
                                                            data: {"sort":[],"filters":[],"filterType":"and"}
                                                            
                                                        })
                                             listGroups.success(function (data, status, response) {


                                              
                                                      // $scope.groups = data.records;
                                                      $scope.groups = data;
                                                      console.log("llllllllllsssssssssssssss",data);
                                                      // $scope.totalRecordCount = data.totalRecords;
                                                      // $scope.pageNumber=data.pageNumber;
                                                      
                                                      // var counting=data.pageNumber-1;
                                                      // $scope.totalPages=data.totalPages;
                                                    
                                                      // $scope.startingCount=counting*10+1;

                                                      // $scope.endingCount=data.records.length*data.pageNumber;

                                                      
                                             });
                                  };


                          // =======================================================================================        



                          // =============================== To show Group list.. =================================

                                            $scope.showUserListInTab = function(){
                                                 var listUsers = $http({
                                      //                       method: 'POST',
                                      //                       url: 'api/v1/user/list?limit=250&page=1',
                                                            method: 'GET',
                                                            url: 'api/v1/listAllusers',
                                                            data: {sort: [], filters: [], filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             listUsers.success(function (data, status, response) {
                                              
                                                       // $scope.users = data.records;
                                                       $scope.users = data;
                                                       console.log("lkjkljjkklllllllllllll",data);


                                                     // var groupNameInEdit = [];
                                                    

                                                     //  console.log("lllll",$scope.msgSendMethodMap.groups);

                                                     //  for(var i=0; i<data.length;i++){
                                                     //    for(var j=0; j<$scope.msgSendMethodMap.groups.length;j++){
                                                     //      if(data[i].groupId==$scope.msgSendMethodMap.groups[j].groupId){
                                                            
                                                            
                                                     //        groupNameInEdit.push(data[i]);
                                                     //      }
                                                     //      else{
                                                           
                                                     //       // console.log("kjhkhjkjjjjjjjjjjjjjjjjj",data.records[i].groupName);
                                                     //      }
                                                     //    }
                                                     //  }


                                                      




                                                      $scope.msgSendMethodMap.groups = groupNameInEdit;
                                                   
                                                    
                                             });
                                            };

                          // ======================================================================================= 






                           $scope.eventStatuses = [
                                {
                                name: "Open",
                                code: "Open"},
                            {
                                name: "Close",
                                code: "Close"},
                            
                                ];

                                $scope.eventStatus="Open";


                    // ============ To hide and show the content based on botton click.. =================

                                $scope.showUpdateContent = function(){
                                  $scope.showUpdateBtn = false;
                                       $scope.hideUpdateContent = false;
                                };  

                    // ===================================================================================


                               
                                 $scope.updateEvent = function(){

                                          // if(eventMessage.addPoll=='Y'){
                                          //   alert();
                                          //   $scope.showopenPollQuestion = false;
                                          // }

                                            // if()showopenSurveyQuestion

                                         

                                     
                                     
                                     
                                    
                                       var msgSendMethodMapJsonID = [];

                                       for(var i=0; i<$scope.msgSendMethodMap.groups.length; i++){
                                            msgSendMethodMapJsonID.push($scope.msgSendMethodMap.groups[i].groupId);
                                       }

                                        var msgUserMapJsonID = [];

                                       for(var i=0; i<$scope.msgUserMap.users.length; i++){
                                            msgUserMapJsonID.push($scope.msgUserMap.users[i].receiverConfigId);
                                       }

                                      if($scope.event!=undefined){

                                      }
                                      else {

                                        $scope.event = [];
                                        $scope.event.isPollEnabled = "";
                                        $scope.event.isSurveyEnabled = "";

                                      }

                                     var updateEventJsonDetails =  {
                                            "currentStatus": $scope.eventStatus,
                                            "message": $scope.UpdatedEvent,
                                            "addPoll":$scope.event.isPollEnabled,
                                            "addSurvey":$scope.event.isSurveyEnabled,
                                            "msgSendMethodMap": msgSendMethodMapJsonID,
                                            "msgUserMap": msgUserMapJsonID
                                        }

                                        

                                        console.log(updateEventJsonDetails);


                                       var promisewq = $http({
                                              method: 'PUT',
                                              url: 'api/v1/event/'+$routeParams.id,
                                              data: updateEventJsonDetails,
                                              headers: {
                                                  "Content-Type": 'application/json'
                                              }
                                          })
                                        promisewq.success(function (data, status, response) {

                                    window.location = '#/event?id='+$routeParams.index;



                                            $scope.showUpdateBtn = true; // To hide and show the Upload event button..
                                            $scope.hideUpdateContent = true; // To hide and show the Upload event content..



                                             // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },3000)

                                            // ===============================================================================================================



                                        $scope.showEventDetails($routeParams.id);


                                           // ================== To make all fields empty.. ====================

                                                  $scope.msgSendMethodMap.groups = "";
                                                  $scope.msgUserMap.users = "";
                                                  $scope.eventStatus = "";
                                                  $scope.UpdatedEvent = "";

                                           // ==================================================================


                                        
                                                // $scope.users = data.records;
                                                console.log("shrinivasasasas",$scope.users)


                   

                                             });


                                 };






                                $(".user").hide();// To hide User portal list in Admin portal..

                                 // To open modal window for Poll result..
                                    $scope.openPollResult = function(){
                                        angular.element('#poll-result').modal('show');
                                    };

                                 // To open modal window for Poll result..
                                    $scope.openSurveyResultResult = function(){
                                        angular.element('#survey-result').modal('show');
                                    };

                                 // To open modal window for adding users or groups to list..
                                    // $scope.openAddUsersGroup = function(){
                                    //     angular.element('#AddUsersGroup').modal('show');
                                    // };

                                    $scope.openPollQuestion = function(){

                                          if($scope.event.isPollEnabled=='Y'){
                                             angular.element('#addPollQuestion').modal('show');
                                          }
                                          if($scope.event.isPollEnabled=='N'){
                                            angular.element('#addPollQuestion').modal('hide');
                                          }
                                    };

                                    $scope.cancelPollCheckbox = function(){
                                      $scope.event.isPollEnabled='N';
                                    };





                                    $scope.openSurveyQuestion = function(){
                                        angular.element('#addSurveyQuestion').modal('show');

                                         if($scope.event.isSurveyEnabled=='Y'){
                                             angular.element('#addSurveyQuestion').modal('show');
                                          }
                                          if($scope.event.isSurveyEnabled=='N'){
                                            angular.element('#addSurveyQuestion').modal('hide');
                                          }
                                    };

                                    $scope.cancelSurveyCheckbox = function(){
                                      $scope.event.isSurveyEnabled='N';
                                    };  


                                 // To open modal window for Poll result..
                                    $scope.openPollResultUsers = function(){
                                        angular.element('#pollResult').modal('show');
                                    };

                                     $scope.showTextAreaBtn = function(){
                                            $scope.showTextArea = true;
                                        };







                             // -------------------------- To show the list of Posted comments.. ------------------------------

                                                     


                                          $scope.replyinfo=[[],[],[]];

                                      function   getReplyForEachComment(parentIndex,index,id){

                                           
                                                 
                                                     

                                                           var listreplyToPostComments = $http({
                                                              method: 'GET',
                                                              url: 'api/v1/replies/'+id,
                                                              headers: {
                                                                  "Content-Type": 'application/json'
                                                              }
                                                              })
                                                          listreplyToPostComments.success(function (data, status, response) {
                                                             $scope.replyinfo[parentIndex][index]=data;
                                                            // console.log();
                                                            });

                                                                 

                                        } 


                            // ------------------------------------------------------------------------------------------------   
                                               






                                                     $scope.comments=[];
                                                     $scope.commentsCount=[];
                                                   function refreshPostCommentsList(id,index)
                                                     {
                                                     
                                                       var listPostedComments = $http({
                                                                    method: 'GET',
                                                                     url: 'api/v1/comments/'+id,
                                                                    //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                                    headers: {
                                                                        "Content-Type": 'application/json'
                                                                    }
                                                                })
                                                          listPostedComments.success(function (data, status, response) {

                                                                  $scope.comments[index] = data; 
                                                                  //$scope.commentResponse[index].commentDesc;
                                                                 // console.log("llkkkkkkkkk",commentDesc);


 

                                                                  // $scope.comments[index] = data; 
                                                                  for(var j=0;j<data.length;j++){
                                                                   
                                                                    getReplyForEachComment(index,j,data[j].commentId);

                                                                  }

                                                              $scope.commentsCount[index] = $scope.comments[index].length;


                                                             });

                                                      };












         // ======================== To list the user inside the group.. =============================


                    $scope.showEventDetails = function(index){


                        $scope.eventList = true;
                        $scope.eventMain = true;
                        $scope.createEvents = false;


                            // ======================== To list the user inside the group.. =============================

                                 var listUserInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/event/'+$routeParams.id,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listUserInGroup.success(function (data, status, response) {

                                         console.log("data to display___________________",data[0].eventMsgResponse);

                                       
                                          $scope.msgSendMethodMap.groups = data[0].msgSendResponse;
                                          $scope.msgUserMap.users = data[0].msgUserMapResponse;
                                                   

    // ================================================= To get pre filled Group list.. ===========================================================

                                                  var listGroupsss = $http({
                                    //                         method: 'POST',
                                    //                         url: 'api/v1/groups/list?limit=250&page=1',
                                                            method: 'GET',
                                                            url: 'api/v1/listAllgroups',
                                                            data: {"sort":[],"filters":[],"filterType":"and"}
                                                            
                                                        })
                                                  listGroupsss.success(function (data, status, response) {
                                             

                                                     var groupNameInEdit = [];
                                                    

                                                      console.log("lllll",$scope.msgSendMethodMap.groups);

                                                      for(var i=0; i<data.length;i++){
                                                        for(var j=0; j<$scope.msgSendMethodMap.groups.length;j++){
                                                          if(data[i].groupId==$scope.msgSendMethodMap.groups[j].groupId){
                                                            
                                                            
                                                            groupNameInEdit.push(data[i]);
                                                          }
                                                          else{
                                                           
                                                           // console.log("kjhkhjkjjjjjjjjjjjjjjjjj",data.records[i].groupName);
                                                          }
                                                        }
                                                      }


                                                      $scope.msgSendMethodMap.groups = groupNameInEdit;
                                                       console.log("llllllllllsssssssssssssss",$scope.msgSendMethodMap.groups);
                                                     


                                             });

    // ===================================================================================================================================================


    // ================================================= To get pre filled Group list.. ===========================================================

                                            var listUsers = $http({
                                      //                       method: 'POST',
                                      //                       url: 'api/v1/user/list?limit=250&page=1',
                                                            method: 'GET',
                                                            url: 'api/v1/listAllusers',
                                                            data: {sort: [], filters: [], filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             listUsers.success(function (data, status, response) {
                                              
                                                      
                                                       // console.log("lkjkljjkklllllllllllll__________",data.records);

                                                        var userNameInEdit = [];

                                                       for(var n=0; n<data.length;n++){
                                                        for(var m=0; m<$scope.msgUserMap.users.length;m++){
                                                          if(data[n].receiverConfigId==$scope.msgUserMap.users[m].userId){
                                                         
                                                            userNameInEdit.push(data[n]);

                                                        //    console.log("kkkkllkllll_______",data.records[n]);
                                                            
                                                          }
                                                          else{
                                                           
                                                           // console.log("kjhkhjkjjjjjjjjjjjjjjjjj",data.records[i].groupName);
                                                          }
                                                        }
                                                      }

                                                       $scope.msgUserMap.users = userNameInEdit;

                                                    
                                             });


    // ===================================================================================================================================================








                                          // var poll = [];
                                          // var survey = [];

                                          //  for(var i=0; i<data[0].eventMsgResponse.length; i++){
                                          //   poll.push(data[0].eventMsgResponse[i].addPoll)
                                          //  }

                                          //   for(var j=0; j<data[0].eventMsgResponse.length; j++){
                                          //   survey.push(data[0].eventMsgResponse[j].addSurvey)
                                          //  }

                                          
                                          //   $scope.pollShowCheckbox = poll;

                                            for(var n=0; n<data[0].eventMsgResponse.length; n++){
                                            if(data[0].eventMsgResponse[n].addPoll=="Y"){
                                             

                                              $scope.showPollAlternativeText = true;

                                              $scope.hideOnAddPollY = true;
                                            }
                                            }

                                            for(var m=0; m<data[0].eventMsgResponse.length; m++){
                                            if(data[0].eventMsgResponse[m].addSurvey=="Y"){
                                             

                                              $scope.showSurveyAlternativeText = true;

                                              $scope.hideOnAddSurveyY = true;
                                            }
                                           }








                                                          if($scope.pollShowCheckbox=="N")
                                                                  {
                                                                  //  alert();
                                                                    console.log("jjjjjjjjjjjjjjjjj______________");
                                                                    $scope.showopenPollQuestion = false;
                                                                  }

                                                    // console.log("kljjjjjjjjjjjjj",$scope.eventss[index].eventId);

                                              // console.log("jklklkklkkkkk",data.length)

                                                    // console.log("List of events",$scope.eventss[index].eventTitle);

                                                     $scope.eventTitle = data[0].eventTitle;
                                                     $scope.currentStatus = data[0].currentStatus;
                                                     $scope.eventTime = data[0].eventTime;
                                                     $scope.eventDate = data[0].eventDate;

                                                  
                                                    $scope.eventMsgResponse = data[0].eventMsgResponse;
                                                    $scope.isPollEnabled = data[0].isPollEnabled;
                                                    $scope.isSurveyEnabled = data[0].isSurveyEnabled;

                                                    for(var i=0;i<data[0].eventMsgResponse.length;i++){
                                                      refreshPostCommentsList(data[0].eventMsgResponse[i].evenMsgId,i);
                                                    }
                                                  


                                                     // -------------------------- To show poll result and survey result in event details based on the selection.. --------------------------
                                                           
                                                                if($scope.isPollEnabled=='Y')
                                                                  {
                                                                    $scope.showopenPollQuestion = true;
                                                                  }

                                                                if($scope.isSurveyEnabled=='Y')
                                                                  {
                                                                    $scope.showopenSurveyQuestion = true;
                                                                  }

                                                // -------------------------------------------------------------------------------------------------------------------------------------                  



                                                  
                                                

                                                // -------------------------- To show poll result and survey result in event details based on the selection.. --------------------------
                                                           
                                                                if($scope.isPollEnabled=='Y')
                                                                  {
                                                                    $scope.pollResults = 'Poll Result';
                                                                  }

                                                                if($scope.isSurveyEnabled=='Y')
                                                                  {
                                                                    $scope.surveyResults = 'Survey Result';
                                                                  }

                                                // -------------------------------------------------------------------------------------------------------------------------------------                  






 // ====================================== To post comments.. ===============================================

                       $scope.postcommentsBtn = function(){

                                    console.log("jjjjjjjll",$scope.postCommentContent);

                                        var postCommentContent = {
                                          "commentDescription" : $scope.postCommentContent
                                        }

                                           var postComments = $http({
                                              method: 'POST',
                                              url: 'api/v1/post/comment/'+$scope.evenMsgId,
                                              data:postCommentContent ,
                                              headers: {
                                                  "Content-Type": 'application/json'
                                              }
                                            })
                                        postComments.success(function (data, status, response) {

                                            $scope.postCommentContent = "";


                                          //  refreshPostCommentsList(); // To refresh post comments list..


                                        });

                                  
                                            

                       };

 // ===========================================================================================================



  // ================== To go back to Event list page.. ====================

            $scope.showEventpage = function(index){
               // window.location='#/event';

               // alert($routeParams.index);

               console.log($routeParams.index);
               window.location = '#/event?id='+$routeParams.index;


            };

        // =======================================================================    




                                       $scope.btnToAddPollQuestion = function(){

                                        //console.log("jjjjjjjll",$scope.addPollQuestion);

                                           var addPollQuestion = {
                                                "pollQuestion" : $scope.addPollQuestion
                                              }

                                                 var addPoll = $http({
                                                    method: 'POST',
                                                    url: 'api/v1/poll/question/'+$routeParams.id,
                                                    data:addPollQuestion ,
                                                    headers: {
                                                        "Content-Type": 'application/json'
                                                    }
                                                  })
                                              addPoll.success(function (data, status, response) {

                                                   angular.element('#addPollQuestion').modal('hide'); // To hide the poll queston model window..

                                                     console.log("kljljkjjjjjjjjjjj",data);

                                                    $scope.addPollQuestion = "";

                                                });

                                       }; 


                                        $scope.ParametersJsonObject={
                                          surveyQuestions:[],
                                          surveyAnswers:[]
                                        }

                                        $scope.btnToAddSurvey = function(){

                                       console.log("jjjjjjjll",$scope.ParametersJsonObject);

                                         
                                                 var addSurvey = $http({
                                                    method: 'POST',
                                                    url: 'api/v1/survey/'+$routeParams.id,
                                                    data:$scope.ParametersJsonObject ,
                                                    headers: {
                                                        "Content-Type": 'application/json'
                                                    }
                                                  })
                                              addSurvey.success(function (data, status, response) {

                                                    // console.log("kljljkjjjjjjjjjjj"data);

                                                    angular.element('#addSurveyQuestion').modal('hide');

                                                   // $scope.addSurveyQuestion = "";

                                                    $scope.ParametersJsonObject.surveyQuestions[0].surveyQue = "";
                                                    $scope.$parent.ParametersJsonObject.surveyAnswers[0].surveyAns = "";

                                                });

                                       }; 








                                                  // --------------- To show status beside event name.. ----------------

                                                      
                                                          if($scope.currentStatus=="Open")
                                                          {
                                                            $scope.newClass='label label-warning'; // To change the color based on status.. 
                                                          }
                                                           if($scope.currentStatus=="Close")
                                                          {
                                                            $scope.newClass='label label-success'; // To change the color based on status.. 
                                                          }
                                                     
                                                  // -------------------------------------------------------------------  





















                                      // ============= Reply to Post comments section.. ============

                                              $scope.showPostCommentsOnReply = function(){
                                                $scope.showPostcommentsOnReply = true;
                                              };

                                              $scope.postcommentsReplyBtn = function(){
                                                $scope.showPostcommentsOnReply = false;
                                              };
                                              
                                      // =============================================================








                                           



                                                 
                                             });
                           // ============================================================================================          

                                    
                               };
                           // ============================================================================================    



 $scope.showEventDetails();
        

    }

    ]);

})();