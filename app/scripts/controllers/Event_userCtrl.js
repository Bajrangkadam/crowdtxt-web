/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.event_user',
        []
    );

    module.controller('Event_userCtrl',
        [   '$rootScope', '$scope', '$location', '$filter', '$http','$routeParams',

    function Event_userCtrl($rootScope, $scope, $location, $filter, $http,$routeParams) {

      document.getElementById("navBars").style.display="block";

        $(".admin").hide();// To hide Admin portal list in User portal..




         // ==================== To avoide Admin to access user pages.. ===============

              var userRoleDatass = window.localStorage['userRoleData'];
                  $scope.userRoleDatas = userRoleDatass;

                  if($scope.userRoleDatas!='ROLE_USER'){

                     window.location = '#/login';

                  }

        // ============================================================================


        
       
        $scope.filters={};



 // ------------------ To have pagination.. ---------------------

      resetPagination();
    

      function resetPagination() {
                $scope.pagination = {
                    limit: 10, // limit per page
                    page: 1, // page number
                    totalRecords: 0, // total number of records
                    totalPages: 1
                };
            };

 // -----------------------------------------------------------------   


  $scope.sort=[{property: "createdDate", dir: "DESC"}]; // To short new user first when added..

   // ------------------- To filter the users.. ----------------------

        $scope.$watchCollection('filters', function(newValue, oldValue) {
            
             if(newValue.eventTitle){
              console.log("valuessssss".newValue)
               $scope.xyz();
               refreshList();
              
             }
        });

 // -----------------------------------------------------------------




      // ------------------ To have pagination.. ---------------------

          $scope.$watch('pagination.page', function(newValue, oldValue) {
           refreshList();
          

          });
         $scope.$watchCollection('sort', function(newValue, oldValue) {
          console.log("sort",newValue);
          if(newValue){
                refreshList();
          }
         

          });

      // -----------------------------------------------------------------   





       
        console.log('EventCtrl module is called..');
       

        // $scope.eventss = [
        //                     { id: 1,  events: 'Email Server Down', date: 'Oct 23, 2015', status:'Open', message: 'demo'},
        //                     { id: 2,  events: 'Scheduled Maintenance', date: 'Oct 14, 2015', status:'Close', message: 'demo1'}
                            

        //                 ];




        // =========================== To get date and time formate.. ============================

              $scope.formatTimestampToDate = function(timestamp) {
                      // TODO: validate the timestamp
                      // var c=moment(timestamp).tz('America/Los_Angeles').format("MM-DD-YYYY") ;
                       var c=moment(timestamp).format("MM-DD-YYYY");
                       // console.log(c);
                 return c;
              }



             $scope.formatTimestampToDates = function(timestamp) {
                    // TODO: validate the timestamp
                    // var c=moment(timestamp).tz('Asia/Kolkata').format("MM-DD-YYYY hh:mm A") ;
                    var c=moment(timestamp).format("MM-DD-YYYY hh:mm A") ;
                     // console.log(c);
               return c;
            }

        // =======================================================================================    



        // ============= Status json values.. ===================

            $scope.eventStatus="Open";

             $scope.eventStatuses = [
                                {
                                name: "Open",
                                code: "Open"},
                            {
                                name: "Close",
                                code: "Close"},
                            
                                ];

        // ======================================================





                         function refreshList()
                                            {
                                              var listEvent = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/evntlistofuser',
                                                            data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
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
                                             listEvent.success(function (data, status, response) {



                                                 // --------------- To show status beside event name.. ----------------

                                                       $scope.statusssssssss = data.records;

                                                       for(var i=0;i<$scope.statusssssssss.length;i++)
                                                         {
                                                          var statusLists;
                                                          if($scope.statusssssssss[i].currentStatus=="Open")
                                                          {
                                                            $scope.statusssssssss[i].newClass='label label-warning'; // To change the color based on status.. 
                                                          }
                                                           if($scope.statusssssssss[i].currentStatus=="Close")
                                                          {
                                                            $scope.statusssssssss[i].newClass='label label-success'; // To change the color based on status.. 
                                                          }
                                                     
                                                         }

                                                         $scope.eventss = $scope.statusssssssss;

                                                         console.log("jkhjkghkjhkjhkhhjk",$scope.statusssssssss);

                                                  // -------------------------------------------------------------------   




                                              
                                                      $scope.eventss = data.records;

                                                 // ======================= To get notification of event details.. ========================

                                                               if($location.search().id!=null)
                                                                {

                                                                  for(var i=0; i<$scope.eventss.length; i++){
                                                                    if($scope.eventss[i].eventId==$location.search().id){
                                                                      $scope.showEventDetails(i);
                                                                    }
                                                                  }
                                                                  
                                                                }

                                                 // ====================================================================================== 


                                          // =================== To show event details page.. =====================

                                                       // if($routeParams.id){         
                                                       //    $scope.showEventDetails($routeParams.id);
                                                       //  }

                                          // ======================================================================              

                                                      console.log("Event List",data.records[0].eventDate);

                                                       $scope.pagination.totalRecords = data.totalRecords; // To have pagination..



                                                    


                                                        // var year    = data.records[0].eventDate.getFullYear();
                                                        // var month   = data.records[0].eventDate.getMonth()+1; 
                                                        // var day     = data.records[0].eventDate.getDate();
                                                       
                                                        // if(month.toString().length === 1) {
                                                        //      month = '0'+month;
                                                        // }
                                                        // if(day.toString().length === 1) {
                                                        //      day = '0'+day;
                                                        // }   
                                                      
                                                        //  var dateTimes1 = year+'-'+month+'-'+day;

                                                      //   alert(dateTimes1);






                                                        
                                                      // $scope.totalRecordCount = data.totalRecords;
                                                      // $scope.pageNumber=data.pageNumber;
                                                      
                                                      // var counting=data.pageNumber-1;
                                                      // $scope.totalPages=data.totalPages;
                                                    
                                                      // $scope.startingCount=counting*10+1;

                                                      // $scope.endingCount=data.records.length*data.pageNumber;

                                             });
                                            };

                                            refreshList(); // To call list all the users service..











                                            
                                  // ======================== To sort the data.. ========================


                                            $scope.sortData=function(val,name){
                                              console.log(val);
                                               console.log(name);
                                                  var value="ASC";
                                                 if(val){
                                                    value="ASC";
                                                 }else{
                                                    value="DESC";
                                                 }
                                                 $scope.sort=[{property: name, dir: value}];
                                            }

                                  // ===================================================================
                                    


                                            

                            // ========================== To filter with startW.. ===================================

                                            $scope.xyz=function(){

                                              if($scope.filters){
                                                var f1;
                                                  var filterArray=[];

                                                  // For jobName filter
                                                  if($scope.filters.eventTitle){
                                                    
                                                  f1=  {property: "eventTitle", operator: "startw", value: $scope.filters.eventTitle};
                                                  filterArray.push(f1);
                                                  }
                                                 
                                                    $scope.filterVal=filterArray;

                                                    console.log("filterArray",filterArray);
                                            }
                                          };

                            // =======================================================================================





                      
                        // --------------------------------- To list user list.. ----------------------------------------

                                            $scope.showUserListInTab = function(){


                                              var listUsers = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/user/list?limit=250&page=1',
                                                            data: {sort: [], filters: [], filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             listUsers.success(function (data, status, response) {
                                              
                                                       $scope.users = data.records;
                                                       console.log("lkjkljjkklllllllllllll",data);
                                                    
                                             });

                                            };


                    // --------------------------------------------------------------------------------------------------

                    // ------------------------- To show all user lists in Private section.. -----------------------

                                          $scope.showGroupListInTab = function(){
                                              var listGroups = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/groups/list?limit=250&page=1',
                                                            data: {"sort":[],"filters":[],"filterType":"and"}
                                                            
                                                        })
                                             listGroups.success(function (data, status, response) {
                                              
                                                      $scope.groups = data.records;
                                                      console.log("llllllllllsssssssssssssss",data);
                                                      // $scope.totalRecordCount = data.totalRecords;
                                                      // $scope.pageNumber=data.pageNumber;
                                                      
                                                      // var counting=data.pageNumber-1;
                                                      // $scope.totalPages=data.totalPages;
                                                    
                                                      // $scope.startingCount=counting*10+1;

                                                      // $scope.endingCount=data.records.length*data.pageNumber;

                                             });
                                            };


                   // ----------------------------------------------------------------------------------------------   

                            // To push checked users or group to inputbox in create event.. 

                                 // $scope.event={
                                 //        msgSendMethodMap:[],
                                 //        msgUserMap:[]
                                 //    }


                               // To push checked users or group to inputbox in create event.. 
                                  $scope.msgSendMethodMap = {
                                    groups: []
                                  };

                                  $scope.msgUserMap = {
                                    users: []
                                  };



                     //=============== Update event ================

                              $scope.updateEvent = function(id){
                                window.location='#/updateEventDetails?id='+id+'&index='+$scope.indexVal;



                              };


                    // ================= Group list section.. ====================

                        // To hide events section and show create section..

                        $scope.showCreateSection = function(){

                          $scope.messageTitle = "Send message";
                          $scope.showInCreateEvent = true;
                          $scope.showInUpdateEvent = false;




                            $scope.eventMain = true;
                            $scope.createEvents = true;

                             $scope.event = ""; // To make create event fields blank..

                        };



                    // ================= Create even section.. ====================
                        // To show the tab on button click..

                        $scope.showTab = function(){
                            $scope.showTabs = true;
                            $scope.hideBtn = true;
                        };

                        $scope.hideTab = function(){
                            $scope.showTabs = false;
                            $scope.hideBtn = false;
                        };

                        $scope.backToEventList = function(){
                            $scope.eventMain = false;
                            $scope.createEvents = false;
                        };

                        $scope.showGroup = function(id){
                            var singleObject = $filter('filter')($scope.eventss, function (d) {return d.id === id;})[0];
                                // If you want to see the result, just check the log
                                console.log(singleObject);
                                $scope.groupDetails = singleObject;
                                
                            };









  


                    // ================= View event section.. ====================


                    $scope.showEventlist1 = function(){
                        $scope.eventList = false;
                        $scope.eventMain = true;
                        $scope.createEvents = false;
                        $scope.previewEvent = true;
                    };

                    $scope.backToEventList1 = function(){
                            $scope.eventMain = false;
                            $scope.eventList = false;
                        };

                        $scope.backToEventList12 = function(){
                            $scope.eventMain = false;
                            $scope.eventList = false;
                            $scope.previewEvent = false;
                        };



        // ==================================== To submit event.. =======================================

                        var eventData;

                        $scope.submitEvent = function(){
                            $scope.showAlert = true; // To show Toast Notification when wrong Username and Password is entered..
                            $scope.eventMain = false;
                            $scope.eventList = false;
                            $scope.previewEvent = false;

                              var privateUsers = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/event/create',
                                                            data: eventData,
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             privateUsers.success(function (data, status, response) {
                                              
                                                      console.log("llllllllllsssssssssssssss",data);

                                                      refreshList(); // To call list all the event service..







                                      // ================== To make all fields empty.. ====================

                                                      $scope.event.eventTitle = "";
                                                      $scope.event.eventDate = "";
                                                      $scope.event.eventTime = "";
                                                      $scope.event.allowReply = "";
                                                      $scope.event.allowPrivateComments = "";
                                                      $scope.msgSendMethodMap.groups = "";
                                                      $scope.msgUserMap.users = "";
                                                      $scope.event.message = "";
                                                      $scope.event.isPollEnabled = "";
                                                      $scope.event.isSurveyEnabled = "";

                                      // ====================================================================                


                                            // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },3000)

                                            // ===============================================================================================================
                                                     

                                             });

                        };


       // ===============================================================================================

        // $scope.editEvent = function(){
        //   $scope.createEvents = true;
        // };



         // ======================== To list the user inside the group.. =============================






         var eventID;
                    $scope.showEventDetails = function(index){



                      console.log("hjgjghjgh",$scope.eventss[index]);
                      $scope.indexVal=index;
                        $scope.eventList = true;
                        $scope.eventMain = true;
                        $scope.createEvents = false;

                        eventID = $scope.eventss[index].eventId;
                            // ======================== To show Event Details .. =============================

                                 var showEventDetails = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/event/'+$scope.eventss[index].eventId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  showEventDetails.success(function (data, status, response) {




                                                    // console.log("kljjjjjjjjjjjjj",$scope.eventss[index].eventId);

                                              // console.log("jklklkklkkkkk",data.length)

                                                    // console.log("List of events",$scope.eventss[index].eventTitle);

                                                      for(var i=0;i<data[0].eventMsgResponse.length;i++){
                                                      refreshPostCommentsList(data[0].eventMsgResponse[i].evenMsgId,i);
                                                      data[0].eventMsgResponse[i].newCreatedDate=moment(data[0].eventMsgResponse[i].createdDate).format("MM-DD-YYYY hh:mm A") ;
                                                      console.log(data[0].eventMsgResponse[i].newCreatedDate)
                                                    }
                                                    console.log("lklklllllllllllss",data);

                                          // ========================= To show data in edit event page.. =========================         

                                                    $scope.event = $scope.eventss[index];
                                                    $scope.eventStatus = data[0].currentStatus;
                                                    $scope.event.eventDate= new Date($scope.formatTimestampToDate($scope.event.eventDate));
                                                    $scope.event.eventTime= new Date($scope.formatTimestampToDates($scope.event.eventTime));
                                                  //  console.log("date",d);
                                                   $scope.event.message = data[0].eventMsgResponse[0].messages;

                                                   $scope.msgSendMethodMap.groups = data[0].msgSendResponse;
                                                   console.log("jjjjjjjss",data[0].msgSendResponse);
                                                     //console.log("kljkkkkkkkkk",data[0].msgSendResponse[0]);
                                                     //console.log("sssssssll",newTag.text);

                                                     console.log("sssssssll",$scope.msgSendMethodMap.groups);

                                          // =====================================================================================

                                                

                                                    $scope.eventTitle = $scope.eventss[index].eventTitle;
                                                    $scope.currentStatus = $scope.eventss[index].currentStatus;
                                                    $scope.eventTime = $scope.eventss[index].eventTime;
                                                    $scope.eventDate = $scope.eventss[index].eventDate;
                                                    console.log("jjjjjjj",moment($scope.eventDate).format("MM/DD/YYYY"));

                                                    $scope.eventPreviewDate = moment($scope.eventDate).format("MM-DD-YYYY");
                                                    $scope.eventPreviewDateTime = moment($scope.eventTime, ["h:mm A"]).format("HH:mm:ss");

                                                    console.log("lkjjkjjjjjjj",data[0].eventMsgResponse);
                                                    $scope.eventMsgResponse = data[0].eventMsgResponse;
                                                    $scope.isPollEnabled = data[0].isPollEnabled;
                                                    $scope.isSurveyEnabled = data[0].isSurveyEnabled;
                                                    $scope.eventId=data[0].eventId;
                                                  //  $scope.evenMsgId = data[0].eventMsgResponse[0].evenMsgId;

                                                  console.log("lkjjkjjjjjjjssss",data[0].addPoll);
                                                    

                                                    console.log("kljljkjkjjjjjjjjl",data[0].isPollEnabled);

                                                    console.log("lkjljkkljsssssss",$scope.eventss[index].eventTime);




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





                                                // ============================ Calling service to get survey QuestionID ==============================

                                                         var getSurveyQuestion = $http({
                                                                    method: 'GET',
                                                                    url: 'api/v1/survey/que-ans/'+eventID,
                                                                    headers: {
                                                                        "Content-Type": 'application/json'
                                                                    }
                                                                })
                                                         getSurveyQuestion.success(function (data, status, response) {

                                                 
                                                            //    $scope.surveyIDToDisplay = data[0].surveyId;
                                                                $scope.surveyQueId = data[0].surveyQuestionResponse[0].surveyQueId;
                                                               
                                                         });



                                                // ====================================================================================================




                                                // ============================ Calling service to get survey QuestionID ==============================

                                                             var getPollQuestion = $http({
                                                                        method: 'GET',
                                                                        url: 'api/v1/poll/question/'+eventID,
                                                                        headers: {
                                                                            "Content-Type": 'application/json'
                                                                        }
                                                                    })
                                                         getPollQuestion.success(function (data, status, response) {

                                                              
                                                                  $scope.pollQuestionIdToDisplay = data[0].pollQueId;

                                                               
                                                         });

                                                // ====================================================================================================















                      // ============================== To add reply in comments.. ======================================

                                      $scope.cancelReplyBtn = function(id,parentIndex,index){

                                        $scope.showPostcommentsOnReply[parentIndex][index] = false;

                                        $scope.replyDisabled = false;

                                      };


                                      $scope.replyDisabled = false;

                                                $scope.postReplyByComment = function(id,parentIndex,index){


                                                  


                                                     var postComments = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/post/reply/'+id,
                                                            data: {

                                                              "replyDesc": $scope.replyToComment

                                                              },
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             postComments.success(function (data, status, response) {

                                                $scope.replyDisabled = false;

                                                 // $scope.showPostcommentsOnReply = false; // To hide the textbox when clicked on post comments..
                                              
                                                 //$scope.showPostcommentsOnReply = true;

                                                  console.log("kjkjjjjjjj",parentIndex);
                                                  console.log("kjkjjjjjjj",index);

                                                 $scope.showPostcommentsOnReply[parentIndex][index] = false;

                                                 getReplyForEachComment(parentIndex,index,id);

                                                       $scope.replyToComment = undefined;

                                                       
                                                    
                                             });

                                                };


                      // =================================================================================================                               





 // ====================================== To post comments.. ===============================================

                         $scope.postcommentsBtn = function(id,index){

                                        console.log("index",index);
                                        console.log("ss", $scope.postCommentContent['field_' + index] );

                                            var postCommentContent = {
                                              "commentDescription" : $scope.postCommentContent['field_' + index]
                                            }

                                               var postComments = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/post/comment/'+id,
                                                  data:postCommentContent ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            postComments.success(function (data, status, response) {

                                                $scope.postCommentContent = "";


                                                refreshPostCommentsList(id,index); // To refresh post comments list..


                                            });

                                      
                                                

                           };


           // ===========================================================================================================




                                      // ============= Reply to Post comments section.. ============

                                             $scope.showPostcommentsOnReply = [[],[],[]];

                                              $scope.showPostCommentsOnReply = function(id, parentindex,index){

                                                if($scope.replyDisabled==true){
                                                  return;
                                                }

                                                $scope.replyDisabled = true;

                                                console.log(id);
                                                console.log(index);
                                                console.log(parentindex);
                                                $scope.showPostcommentsOnReply[parentindex][index] = true;
                                              };

                                              $scope.postcommentsReplyBtn = function(){
                                                $scope.showPostcommentsOnReply[index,index1] = false;
                                              };

                                      // =============================================================


                                                    $scope.tests =function(index){



                                                          var now = moment(new Date()); //todays date
                                                                  var end = moment(index); // another date
                                                                  var duration = moment.duration(now.diff(end));
                                                                  var hours = duration.asHours();
                                                                  var intvalue = Math.floor( hours );
                                                                 var minutes = now.diff(end, 'minutes');

                                                                  //data[0].newDateToDisplay=intvalue+"hours ago";
                                                              
                                                            if (intvalue>24) {
                                                                  var days= duration.asDays();
                                                                  var ss=Math.floor( days );
                                                                  return ss + " day ago";
                                                                   // data[0].newDateToDisplay=ss+"Days ago"
                                                                
                                                            }
                                                            else 
                                                            {

                                                              if(intvalue==0)
                                                              {
                                                                return minutes + " minutes ago"
                                                              }

                                                               return intvalue+ " hour ago" ;
                                                            }

}





                                            // -------------------------- To show the list of Posted comments.. ------------------------------
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
                                                                  for(var j=0;j<data.length;j++){
                                                                    getReplyForEachComment(index,j,data[j].commentId);

                                                                  }
                                                                  //$scope.commentResponse[index].commentDesc;
                                                                  
                                                                  console.log("lklklklklklkklkkkkkkkjj",$scope.comments[index].length);

                                                                  $scope.commentsCount[index] = $scope.comments[index].length;


                                                                 

                                                             });
                                                    
                                                      };

                                                  //    refreshPostCommentsList(); // To refresh post comments list..

                                            // ------------------------------------------------------------------------------------------------   
                                              
                                                    



                                                 
                                             });
                           // ============================================================================================          

                                    
                               };
                           // ============================================================================================    


                                           $scope.replyinfo=[[],[],[]];

                                           $scope.replyCount=[];

                                      function   getReplyForEachComment(parentIndex,index,id){

                                           
                                      
                                                           var listreplyToPostComments = $http({
                                                              method: 'GET',
                                                              url: 'api/v1/replies/'+id,
                                                              headers: {
                                                                  "Content-Type": 'application/json'
                                                              }
                                                              })
                                                          listreplyToPostComments.success(function (data, status, response) {

                                            

                                                console.log("To call replies__________________________");

                                                console.log("To call replies__________________________",parentIndex);
                                                console.log("To call replies__________________________",$scope.replyinfo[0][0]);
                                                
                                                             $scope.replyinfo[parentIndex][index]=data;
                                                            console.log("ljjljjjjjjj",data.length);

                                                             $scope.replyCount[index] = $scope.replyinfo[parentIndex][index].length;


                                                            });

                                                                 

                                        }; 
             





                        $scope.editEvent = function(){

                          $scope.messageTitle = "Edit message";
                          $scope.showInCreateEvent = false;
                          $scope.showInUpdateEvent = true;
                           
                            $scope.eventMain = true;
                            $scope.createEvents = true;
                            $scope.eventList = false;
                            $scope.createEvents = true;



                            $scope.showUserListInTab();
                             $scope.showGroupListInTab();


                                           var listGroups = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/groups/list?limit=250&page=1',
                                                            data: {"sort":[],"filters":[],"filterType":"and"}
                                                            
                                                        })
                                                  listGroups.success(function (data, status, response) {
                                              
                                                    //  $scope.groups = data.records;
                                                      console.log("llllllllllsssssssssssssss",data);

                                                     // $scope.msgSendMethodMap.groups;

                                                     var groupNameInEdit = [];

                                                      console.log("lllll",$scope.msgSendMethodMap.groups);

                                                      for(var i=0; i<data.records.length;i++){
                                                        for(var j=0; j<$scope.msgSendMethodMap.groups.length;j++){
                                                          if(data.records[i].groupId==$scope.msgSendMethodMap.groups[j].groupId){        
                                                            
                                                            groupNameInEdit.push(data.records[i]);
                                                          }
                                                          else{
                                                           
                                                           // console.log("kjhkhjkjjjjjjjjjjjjjjjjj",data.records[i].groupName);
                                                          }
                                                        }
                                                      }


                                                      $scope.msgSendMethodMap.groups = groupNameInEdit;

                                                      console.log("kjhkhjkjjjjjjjjjjjjjjjjj_____________",$scope.msgSendMethodMap.groups);


                                             });


                        };

                        $scope.submitEditEvent = function(){

                        //  alert();

                          $scope.dataJson= {
                                                'eventTitle': $scope.event.eventTitle,
                                                'eventDate': moment($scope.event.eventDate).format("MM-DD-YYYY"),
                                                'eventTime': moment($scope.event.eventTime, ["h:mm A"]).format("HH:mm:ss"),
                                                'currentStatus': $scope.eventStatus,
                                                'allowReply': $scope.event.allowReply,
                                                'allowPrivateComments': $scope.event.allowPrivateComments,
                                                'isPollEnabled': $scope.event.isPollEnabled,
                                                'isSurveyEnabled': $scope.event.isSurveyEnabled,
                                                'message': $scope.event.message
                                                        }

                                  // console.log("hhhhjjjjjjj",dataJson);

     
                          

                              var privateUsers = $http({
                                                            method: 'PUT',
                                                            url: 'api/v1/event/edit/'+eventID,
                                                            data: $scope.dataJson,
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             privateUsers.success(function (data, status, response) {
                                              
                                                      console.log("llllllllllsssssssssssssss",data);

                                                      refreshList(); // To call list all the event service..







                                      // ================== To make all fields empty.. ====================

                                                      $scope.event.eventTitle = "";
                                                      $scope.event.eventDate = "";
                                                      $scope.event.eventTime = "";
                                                      $scope.event.allowReply = "";
                                                      $scope.event.allowPrivateComments = "";
                                                      $scope.msgSendMethodMap.groups = "";
                                                      $scope.msgUserMap.users = "";
                                                      $scope.event.message = "";
                                                      $scope.event.isPollEnabled = "";
                                                      $scope.event.isSurveyEnabled = "";

                                      // ====================================================================                


                                            // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEdited").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEdited").hide();
                                                            },3000)

                                            // ===============================================================================================================
                                                     

                                                     $scope.eventMain = false;
                                                      $scope.eventList = false;
                                                      $scope.previewEvent = false;
                                                      $scope.createEvents = false;

                                             });
                };









                      





                         $scope.surveyOutPut = function(index){
                         
                          $scope.surveyAnswer = index;

                         
                         };



                         $scope.submitSurvey = function(){
                             var testjson = {
                              "feedback":$scope.surveyAnswer
                              }


                               var listEvent = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/survey/feedback/'+$scope.surveyQueId,
                                                            data: testjson,
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            },

                                                        })
                                             listEvent.success(function (data, status, response) {
                                              angular.element('#showSurveyQuestions').modal('hide');
                                       
                                      });

                         };




                         // To open modal window for Poll result..
                            $scope.openPollQuestion = function(index,id){
                            //  alert(eventID);
                              console.log("kljkljjkjjjjjjjjjjj____",$scope.eventss[index]);

                              $scope.eventMessageID = id;
                               

                              

                                         var getPollQuestion = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/poll/question/'+eventID,
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             getPollQuestion.success(function (data, status, response) {

                                          // if condition to check if the poll question has been added or no..

                                                    if(data.length>0){

                                                      angular.element('#showPollQuestions').modal('show');
                                           
                                                      console.log("kllklllllllll",data[0].pollQuestion);

                                                      $scope.pollQuestionToDisplay = data[0].pollQuestion;

                                                      $scope.pollQuestionIdToDisplay = data[0].pollQueId;

                                                    }

                                                    else{
                                                  //    alert("No Poll question in this event..");
                                                    }
                                                    
                                             });


                            };


                            $scope.openSurveyQuestion = function(index){
                             
                                         var getSurveyQuestion = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/survey/que-ans/'+eventID,
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             getSurveyQuestion.success(function (data, status, response) {

                                                  if(data.length>0){

                                                     angular.element('#showSurveyQuestions').modal('show');
                                     
                                               
                                                      $scope.surveyQuestionToDisplay = data[0].surveyQuestionResponse[0].surveyQue;
                                                      console.log("kllklllllllllss",data[0].surveyQuestionResponse[0].surveyQueAnsResponses);
                                                      $scope.surveyQueAnswers = data[0].surveyQuestionResponse[0].surveyQueAnsResponses;

                                                      console.log("kllklllllllll survey",data[0]);

                                                    $scope.surveyQueId = data[0].surveyQuestionResponse[0].surveyQueId;

                                                  }
                                                    
                                             });
                            };


                              // =========================== To POST Poll service.. ==================================

                                    $scope.sendPollYes = function(){
                                       $scope.sendPollYesJson= {
                                                          "feedback":"Yes",
                                                          "message":""
                                                        }

                                                        $http({
                                                              method: 'POST',
                                                              url: 'api/v1/poll/feedback/'+$scope.pollQuestionIdToDisplay,
                                                              data: $scope.sendPollYesJson,
                                                              
                                                          }).success(function (data, status) {

                                                                angular.element('#showPollQuestions').modal('hide');

                                                               });
                                    };

                                    $scope.sendPollNo = function(evenMsgId,index){






                                      
                                       $scope.sendPollNoJson= {
                                                          "feedback":"No",
                                                          "message":$scope.pollComment,
                                                          // "eventId":eventID,
                                                          "eventmessageId":$scope.eventMessageID,
                                                        }

                                                        $http({
                                                              method: 'POST',
              //                                                 url: 'api/v1/poll/feedback/'+$scope.eventMessageID,
                                                              url: 'api/v1/poll/feedback/'+$scope.pollQuestionIdToDisplay,

                                                              data: $scope.sendPollNoJson,
                                                              
                                                          }).success(function (data, status) {

                                                                   angular.element('#showPollQuestions').modal('hide');

                                                               });

                                    };


                        // ============================================================================================



                            $scope.openPollResult = function(){

                             // alert($scope.pollQuestionIdToDisplay);
                             

                                               var getPollResult = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/poll/feedback/'+$scope.pollQuestionIdToDisplay,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                 getPollResult.success(function (data, status, response) {

                                             angular.element('#poll-result').modal('show');

                                            console.log("Data",data);

                                                   });
                            };

                       //  To open modal window for Poll result..
                            $scope.openPollResultUsers = function(){
                                angular.element('#pollResult').modal('show');
                            };






                         // To open modal window for Poll result..
                            $scope.openSurveyResult = function(){
                                

                              //  alert($scope.surveyQueId);

                                            var getSurveyResult = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/survey/feedback/'+$scope.surveyQueId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                 getSurveyResult.success(function (data, status, response) {

                                                       angular.element('#survey-result').modal('show');

                                                       console.log("Datassssss",data);
                                                        console.log("kllklllllllllsurvey",data.Response.Percentage);
                                                      console.log("Datassssss",data.ServerQuestion);
                                                      console.log("Datassssss",data.SurveyAnswers);

                                                      $scope.percentageToDisplay = data.Response;

                                                      $scope.surveyAnswersToDisplay = data.SurveyAnswers;

                                                      $scope.diplayServerQuestion = data.ServerQuestion;

                                            // ======================= To combaine to json object.. ========================

                                                      var jsonObjectA = data.Noresponse;
                                                      var jsonObjectB = data.Response;

                                                      $scope.namePercentageToDisplay = jsonObjectA.concat(jsonObjectB);
                                            
                                            // =============================================================================         



                                                   });
                               };



                             $scope.showTextAreaBtn = function(){

                                $scope.showTextArea = true;
                            }





                              // ----------------------------- Remove Event -----------------------------------------
                                             

                                            //   $scope.removeEvent = function(index) {
                                               
                                            //             console.log($scope.eventss[index].eventId)
                                                       
                                            //     $(".showAlertClass").hide(); // To hide every time you click on delete and show new alert..
                                                          
                                            //      var deleteEvents = $http({
                                            //            method: 'DELETE',
                                            //            url: 'api/v1/event/'+$scope.eventss[index].eventId
                                            //            })
                                            //            deleteEvents.success(function (data, status, response) {

                                            //               refreshList(); // To call refresh function..

                                            // // ================================ To show alert on deleting the user.. =========================================

                                            //               $(".showAlertOnSuccessDelete").show(); // To show Toast Notification when clicked on delete..
                                            //                  window.setTimeout(function() {
                                            //                   $(".showAlertOnSuccessDelete").hide();
                                            //                 },3000)

                                            // // ===============================================================================================================

                                            //            });

                                            //            deleteEvents.error(function (data, status, response) {

                                            //            });
                                            //      };

                              //-------------------------------------------------------------------------------------------





                                    // To get polling and servey results in Event detail..

                                        $scope.saveEvent = function () {

                                          

                                            console.log("lkklkllllll",$scope.events);

                                            console.log("hjklhjkhjkhjkhjjkhhjk",$scope.event.eventTime);

                                         
                                            console.log($scope.checkSurvey);

                                            if($scope.event.isPollEnabled=='Y')
                                            {
                                              $scope.pollResult = 'Poll Result';
                                            }

                                            if($scope.event.isSurveyEnabled=='Y')
                                            {
                                              $scope.surveyResult = 'Survey Result';
                                            }




                                        // To show date and time in Event detail..      
                                            
                                        // var eventName = $scope.eventName;
                                        // var dateTime =  $scope.eventDate;
                                        // var timeStamp = $scope.eventTime;

                                        // Instude of declairing variables have directly user $scope.eventName, .eventDate, .eventTime;
                                    
                                        var year    = $scope.event.eventDate.getFullYear();
                                        var month   = $scope.event.eventDate.getMonth()+1; 
                                        var day     = $scope.event.eventDate.getDate();
                                        var hour    = $scope.event.eventTime.getHours();
                                        var minute  = $scope.event.eventTime.getMinutes();
                                        var second  = $scope.event.eventTime.getSeconds(); 
                                        if(month.toString().length === 1) {
                                             month = '0'+month;
                                        }
                                        if(day.toString().length === 1) {
                                             day = '0'+day;
                                        }   
                                        if(hour.toString().length === 1) {
                                             hour = '0'+hour;
                                        }
                                        if(minute.toString().length === 1) {
                                             minute = '0'+minute;
                                        }
                                        if(second.toString().length === 1) {
                                             second = '0'+second;
                                        }  

                                        var dateTimes = month+'-'+day+'-'+year;
                                         var dateTimes1 = month+'-'+day+'-'+year;

                                        var time = hour+':'+minute+':'+second; 
                                        var time1 = hour+':'+minute; 


                                        //console.log(dateTimes);
                                        $scope.titleDisplay = $scope.event.eventTitle;
                                        $scope.dateDisplay = $scope.event.eventDate;
                                        $scope.timeDisplay = $scope.event.eventTime;


                                        // To append(show)the message details when the event is created..
                                         // $('#newEventEntry').append('<li   class="list-group-item clearfix"><div class="row"><div class="col-sm-offset-1 col-sm-4"><div class="chat-content-wrapper bottom-moderate2-box-shadow"><div class="avatar pull-left"><img src="images/admin-avatar.png" alt="User-Avatar"></div><div class="post-body"><p><b>'+$scope.eventMessage+' <a href="#" data-toggle="modal" data-target="#survey">Click here</a> to provide your feedback.</b></p><small class="text-muted">'+dateTimes+'</small> - <a href="#" data-toggle="" data-target="">'+checkSurvey+' &nbsp; &nbsp;'+checkPoll+'</a></div></div></div><div class="col-sm-1">&nbsp;</div><div class="col-sm-offset-1 col-sm-4"></div></div></li>');
                                         // $('#newEventEntry1').append('<li   class="list-group-item clearfix"><div class="row"><div class="col-sm-offset-1 col-sm-4"><div class="chat-content-wrapper bottom-moderate2-box-shadow"><div class="avatar pull-left"><img src="images/admin-avatar.png" alt="User-Avatar"></div><div class="post-body"><p><b>'+$scope.eventMessage+' <a href="#" data-toggle="modal" data-target="#survey">Click here</a> to provide your feedback.</b></p><small class="text-muted">'+dateTimes+'</small> - <a href="#" data-toggle="" data-target="">'+checkSurvey+' &nbsp; &nbsp;'+checkPoll+'</a></div></div></div><div class="col-sm-1">&nbsp;</div><div class="col-sm-offset-1 col-sm-4"></div></div></li>');
                                         // $('#newEventEntry2').append('<li class="list-group-item"> <h4 class="list-group-item-heading">'+dateTimes+'</h4><p class="list-group-item-text">'+$scope.eventMessage+'  - Please help us improve by taking part in survey <a href="#" data-toggle="modal" data-target="#survey">Click here</a></p> </li>');
                                        // $('#newEventEntry3').append('<div class="row"><div class="col-sm-12 cus-panels-with-pad mar-10-0"><div class="row"><div class="avatar col-sm-1 mar-5-0"><img src="images/admin-avatar.png" alt="User-Avatar"></div><div class="col-sm-9"><h4 class="clearfix">'+$scope.eventMessage+'</h4><small class="text-muted">'+dateTimes+'</small></div></div></div></div>')

                                         

                                         // <li class="list-group-item"> 
                                         // <h4 class="list-group-item-heading">'+dateTimes+'</h4>
                                         // <p class="list-group-item-text">'+$scope.eventMessage+'  - Please help us improve by taking part in survey <a href="#" data-toggle="modal" data-target="#survey">Click here</a></p> </li>





                                        
                                            



                                           if($scope.event.allowReply==false){
                                                $scope.event.allowReply = 'N';
                                           }

                                            if($scope.event.allowPrivateComments==false){
                                                $scope.event.allowPrivateComments = 'N';
                                           }

                                            if($scope.event.isPollEnabled==false){
                                                $scope.event.isPollEnabled = 'N';
                                           }

                                            if($scope.event.isSurveyEnabled==false){
                                                $scope.event.isSurveyEnabled = 'N';
                                           }

                                           console.log("jkhhjkkjhhjk_______________________",$scope.msgSendMethodMap.groups);
                                           console.log("llkklklklklllllllll",$scope.msgUserMap.users);


                                           var groupID = [];
                                           var userID = [];
                                           for(var i=0; i<$scope.msgSendMethodMap.groups.length; i++){
                                            groupID.push($scope.msgSendMethodMap.groups[i].groupId)
                                           }

                                           for(var i=0; i<$scope.msgUserMap.users.length; i++){
                                            userID.push($scope.msgUserMap.users[i].receiverConfigId)
                                           }

                                          eventData = {
                                                eventTitle: $scope.event.eventTitle,
                                                eventDate: dateTimes1,
                                                eventTime: time1,
                                                currentStatus:'Open',
                                                allowReply: $scope.event.allowReply,
                                                allowPrivateComments: $scope.event.allowPrivateComments,
                                                isPollEnabled: $scope.event.isPollEnabled,
                                                isSurveyEnabled: $scope.event.isSurveyEnabled,
                                                message: $scope.event.message,
                                                msgSendMethodMap: groupID,
                                                msgUserMap:userID
                                             };

                                             // console.log("hhhhjjjjjjj",eventData);
                                             // console.log("hhhhjjjjjjj",msgSendMethodMap);

                                             $scope.eventDateToDisplay = dateTimes1;
                                             $scope.eventTimeToDisplay = time1;

                                             //$scope.eventss.unshift(eventData);
                                             

                                           //  return dateTime;

                                         };


    }

    ]);

})();