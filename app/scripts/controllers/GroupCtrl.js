/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.group',
        []
    );

    module.controller('GroupCtrl',
        [   '$rootScope', '$scope', '$filter', '$http',

    function GroupCtrl($rootScope, $scope, $filter, $http) {

      document.getElementById("navBars").style.display="block";
      // alert();




// ==================== To avoide Admin to access user pages.. ===============

        var userRoleDatass = window.localStorage['userRoleData'];
            $scope.userRoleDatas = userRoleDatass;

            if($scope.userRoleDatas!='ROLE_ADMIN'){

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


  // $scope.sort=[{property: "createDate", dir: "DESC"}]; // To short new user first when added..

  // ------------------- To filter the users.. ----------------------

        $scope.$watchCollection('filters', function(newValue, oldValue) {
            
             if(newValue.groupName||newValue.purpose){
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




      $(".user").hide();// To hide User portal list in Admin portal..


        var addButtonClicked; 
        var editButtonClicked;

         var addButtonClickedCondition; // Variables for addButton and Edit button..
         var editButtonClickedCondition; // Variables for addButton and Edit button..
      
            var promisewq = $http({
                          method: 'POST',
                          url: 'api/v1/user/list?limit=250&page=1',
                          data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
                          headers: {
                              "Content-Type": 'application/json'
                          }
                      })
            promisewq.success(function (data, status, response) {

            
                    $scope.users = data.records;
                    console.log("shrinivasasasas",$scope.users)
                   

           });



             console.log('groupCtrl module is called..');

             // $scope.pageNumberCount=1; // To have pagination..
             //  $scope.totalPages=""; // To have pagination..

                         // -------------------------- To list all the groups.. --------------------------
                         


                        // -----------------------------------------------------------------------------------------

                         // -------------------------- Funtion to refresh the list.. ----------------------------

                           $scope.filterVal=[];

                              function refreshList()
                              {
                                 var listGroup = $http({
                                              method: 'POST',
                                              url: 'api/v1/groups/list',
                                              // data: {"sort":[],"filters":[],"filterType":"and"},
                                              data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},

                                      // ------------------ To have pagination.. ---------------------

                                                            params:{
                                                                        page:$scope.pagination.page,
                                                                        limit: $scope.pagination.limit
                                                                    }

                                      // -----------------------------------------------------------------  

                                          })
                                 listGroup.success(function (data, status, response) {

                          $scope.addNewUserDisable = false; // To enable the addNewUserDisable button once refreshed..
                          $scope.showOnDisabledCondition = false;

                          console.log("lklklllll_______________________",data.records);
                                      
                                                  // --------------- To show status beside group name.. ----------------

                                                       $scope.statusssssssss = data.records;

                                                       $scope.statusssssssssotherGroups= data.otherGroups;

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

                                                         

                                                            for(var i=0;i<$scope.statusssssssssotherGroups.length;i++)
                                                         {
                                                          var statusLists;
                                                          if($scope.statusssssssssotherGroups[i].adminApproved=="Y")
                                                          {
                                                            statusLists="VIP Group";
                                                            $scope.statusssssssssotherGroups[i].newClass='label label-warning'; // To change the color based on status.. 
                                                          }
                                                           if($scope.statusssssssssotherGroups[i].isPrivate=="Y")
                                                          {
                                                            statusLists="Private";
                                                            $scope.statusssssssssotherGroups[i].newClass='label label-danger'; // To change the color based on status.. 
                                                          }
                                                           if($scope.statusssssssssotherGroups[i].isPublic=="Y")
                                                          {
                                                            statusLists="Public";
                                                             $scope.statusssssssssotherGroups[i].newClass='label label-success'; // To change the color based on status.. 
                                                          }
                                                          $scope.statusssssssssotherGroups[i].isPublic=statusLists;
                                                         }

                                                         $scope.groups = $scope.statusssssssss;
                                                        $scope.groupsotherGroups = $scope.statusssssssssotherGroups;

                                                         console.log("jkhjkghkjhkjhkhhjk",$scope.statusssssssss);

                                                         console.log("kljkljjkjkjjj______________",$scope.records);

                                                  // -------------------------------------------------------------------   


                                                  $scope.pagination.totalRecords = data.totalRecords; // To have pagination..



                                     console.log("Resultsssssssss",data);

                                          // console.log(data);
                                          // $scope.totalRecordCount = data.totalRecords;
                                          // $scope.pageNumber=data.pageNumber;
                                          
                                          // var counting=data.pageNumber-1;
                                          // $scope.totalPages=data.totalPages;
                                        
                                          // $scope.startingCount=counting*10+1;

                                          // $scope.endingCount=data.records.length*data.pageNumber;
                                  
                               });
                              };

                              refreshList(); // To call list all the group service..




                        // -----------------------------------------------------------------------------------------

                         // ------ To enable and disable (Prev and Next button) and check the page count.. ----------
                        //               $scope.recordMore =function(comingFrom)
                        //               {

                        //                 if(comingFrom){
                        //                   $scope.pageNumberCount--;
                        //                   console.log($scope.pageNumberCount)
                        //                 }
                        //                 else
                        //                 {
                        //                   $scope.pageNumberCount++;
                        //                   console.log($scope.pageNumberCount)

                        //                 }

                        //                  var listGroup = $http({
                        //                       method: 'POST',
                        //                       url: 'api/v1/groups/list?limit=10&page=1'+$scope.pageNumberCount,
                        //                       data: {"sort":[],"filters":[],"filterType":"and"}
                        //                   })
                        //          listGroup.success(function (data, status, response) {
                        //               $scope.groups = data.records;
                        //                 console.log("Resultsssssssss",data);
                        //                 $scope.totalRecordCount = data.totalRecords;
                        //                 $scope.pageNumber=data.pageNumber;
                                        
                        //                 var counting=data.pageNumber-1;
                        //                 $scope.totalPages=data.totalPages;
                                      
                        //                 $scope.startingCount=counting*10+1;

                        //                 $scope.endingCount=data.records.length*data.pageNumber;
                                      
                        //         });

                                        
                        //               };


                             // -----------------------------------------------------------------------------------------

                                $scope.result = {};

                                $scope.roles = [
                                    {id: 1, text: 'Public'},
                                    {id: 2, text: 'VIP Group'},
                                    {id: 3, text: 'Private'}
                                  ];

                                $scope.user = {
                                    roles: []
                                  };




                              // ------------------------- To show all user lists in Private section.. -----------------------

                                   function refreshUserList()
                                            {
                                              var privateUsers = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/user/list?limit=250&page=1',
                                                            data: {"sort":[],"filters":[],"filterType":"and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             privateUsers.success(function (data, status, response) {
                                              
                                                     $scope.users = data.records;
                                                      // console.log("llllllllllsssssssssssssss",data);
                                                      // $scope.totalRecordCount = data.totalRecords;
                                                      // $scope.pageNumber=data.pageNumber;
                                                      
                                                      // var counting=data.pageNumber-1;
                                                      // $scope.totalPages=data.totalPages;
                                                    
                                                      // $scope.startingCount=counting*10+1;

                                                      // $scope.endingCount=data.records.length*data.pageNumber;

                                             });
                                            };

                                            refreshUserList(); // To call list all the users service..

                              // ----------------------------------------------------------------------------------------------          





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
                                                var f1,f2,f3;
                                                  var filterArray=[];

                                                  // For jobName filter
                                                  if($scope.filters.groupName){   
                                                    f1=  {property: "groupName", operator: "startw", value: $scope.filters.groupName};
                                                    filterArray.push(f1);
                                                  }

                                                  if($scope.filters.isPublic){
                                                    f2=  {property: "isPublic", operator: "startw", value: $scope.filters.isPublic};
                                                    filterArray.push(f2);
                                                  }

                                                  if($scope.filters.purpose){
                                                    f3=  {property: "purpose", operator: "startw", value: $scope.filters.purpose};
                                                    filterArray.push(f3);
                                                  }

                                                  console.log("jjkkjjjjjj",f1);
                                                  console.log("jjkkjjjjjj",filterArray);
                                                 
                                                    $scope.filterVal=filterArray;
                                            }
                                          };


                            // =======================================================================================
                                





                        // Json data for users..
                        $scope.models = {
                           basket: [],
                            users : [
                                    // { id: 1,  first: 'John', last: 'Rambo', email: 'john@gmail.com', mobileNo: '9942459922', status: 1 },
                                    // { id: 2,  first: 'Rocky', last: 'Balboa',email: 'Rocky@gmail.com', mobileNo: '9942456823', status: 1 },
                                    // { id: 3,  first: 'Willam', last: 'Kimble', email: 'Willam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 4,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 5,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    // { id: 6,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    // { id: 7,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    // { id: 8,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    // { id: 9,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 10,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    // { id: 11,  first: 'Willam', last: 'Kimble', email: 'Willam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 12,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 13,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    // { id: 14,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    // { id: 15,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    // { id: 16,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    // { id: 17,  first: 'Sam', last: 'Rambo', email: 'Sam@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 18,  first: 'Bill', last: 'Balboa',email: 'Bill@gmail.com', mobileNo: '9942456454', status: 1 },
                                    // { id: 19,  first: 'Jenni', last: 'Rambo', email: 'jenni@gmail.com', mobileNo: '9942432114', status: 1 },
                                    // { id: 20,  first: 'John', last: 'Kimble', email: 'john@gmail.com', mobileNo: '9942343433', status: 1 },
                                    // { id: 21,  first: 'Sharon', last: 'Balboa',email: 'sharon@gmail.com', mobileNo: '9942423222', status: 1 },
                                    // { id: 22,  first: 'Nik', last: 'Kimble', email: 'nik@gmail.com', mobileNo: '9942456452', status: 1 },
                                    // { id: 23,  first: 'Ben', last: 'Richards', email: 'Ben@gmail.com', mobileNo: '9942456452', status: 1 }
                                ]

                            };


                            // To list all the groups..
                                       
                                             var listUsersDragDrop = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/listAllusers',
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                            listUsersDragDrop.success(function (data, status, response) {
                                                    
                                                      console.log("List of users",data);
                                                 
                                             });







                                 // add user page..
                              $scope.addUser1 = function() {
                                $scope.inserted = {
                                  id: $scope.models.users.length+1,
                                  name: '',
                                  status: null,
                                  group: null 
                                };
                                $scope.models.users.unshift($scope.inserted);
                              };

                              // remove user page..
                              $scope.removeUser1 = function(index) {
                                // $scope.disabled = false;
                                // $scope.models.users.splice(index, 1);

                                 // console.log("GroupID",$scope.groups[index].groupId);
                                 // console.log("GroupID",$scope.groups[index]);
                                 // console.log("$scope.inviteUserResponse",$scope.inviteUserResponse[index].receiverConfigId);

                                var userDetails = {

                                      "groupId":$scope.groups[index].groupId,
                                      "userId":$scope.inviteUserResponse[index].receiverConfigId
                                }

                                // console.log("userDetails",userDetails);

                                   var deleteUser = $http({
                                                       method: 'POST',
                                                       url: 'api/v1/delete/groupUser',
                                                       data: userDetails
                                                       })
                                 
                                                       deleteUser.success(function (data, status, response) {

                                                         // ================================ To show alert on deleting the user.. =========================================

                                                              $(".showAlertOnUserDelete").show(); // To show Toast Notification when clicked on delete..
                                                                 window.setTimeout(function() {
                                                                  $(".showAlertOnUserDelete").hide();
                                                                },3000)

                                                         // ===============================================================================================================


                                                          refreshInvitedUserInGroupList();
                                                          refreshUserInGroupList();
                                                       });

                                      deleteUser.error(function (data, status, response) {
                                        alert();

                                        refreshInvitedUserInGroupList();
                                                          refreshUserInGroupList();
                                      });
                              };






                               $scope.editRow = function(index){


                                  $scope.showOnNewUserAdd = false;
                                  $scope.addNewUserDisable = true;
                                  $scope.showAddGroupss = false;
                                  $scope.showOnDisabledCondition = true;
                                  $scope.showAddGroupssss = false;
                                  $scope.submittedGroup12 = false;
                                          $scope.disabled = false;
                                          editButtonClicked=true;
                                           addButtonClicked=false;
                                           editButtonClickedCondition=true;
                                           addButtonClickedCondition=false;

                                           $scope.inEdit = false;
                                           $scope.inEditPrivateUser = true;


                                         };



                            



                            // add Groups page..

                             $scope.addNewUserDisable = false; // To unabel ans disable ( Add new user ) button..

                              $scope.addUser = function(index) {


                                document.getElementById('hideInVipGroup1').style.display = "none";
                                $scope.showAddGroup = true;

                                $scope.showOnNewUserAdd = true;

                                console.log("$scope.result.id==0",$scope.result.id);

                                // alert($scope.groups.length+1);

                                $scope.showOnDisabledCondition = true;
                                $scope.submittedGroup12 = false;
                                $scope.showAddGroupss = false;
                                $scope.showAddGroupssss = false;
                               
                              // $scope.hideButton = true;
                                

                                addButtonClicked=true;
                                editButtonClicked=false;
                                editButtonClickedCondition=false;
                                addButtonClickedCondition=true;


                                $scope.result.id=0;

                                $scope.disabled = true; // To disable action button when clicked on add user..
                                
                                $scope.inserted = {
                                  // id: $scope.groups.length+1,
                                  id: -1,
                                  name: '',
                                  status: '',
                                  adminApproved: 'none', // To stop breaking UI when clicked on add new group button..
                                  group: null 
                                };
                                $scope.groups.unshift($scope.inserted);

                                 // To unable and disable ( Add new user ) button..

                                  console.log("$scope.result.id",$scope.result.id);
                                             $scope.addNewUserDisable = true;
                                             return false;
                              };





                      
                              console.log();

                            // remove Groups page..
                              $scope.removeUser = function(index) {

                              //   $scope.disabled = false;
                              //   $scope.groups.splice(index, 1);

                              //    $scope.addNewUserDisable=false; // To unable ( Add new user ) button after clicking cancel..
                              // };

                              // $scope.private1 = {isselected: false};


                              // $scope.recordSelected = function(){

                                 console.log("swrtuopp;khdfryuop[[",$scope.groups[index])
                                   $scope.showAlert = false;
                                         var deleteUser = $http({
                                               method: 'DELETE',
                                               url: 'api/v1/group/'+$scope.groups[index].groupId
                                               })
                                             deleteUser.success(function (data, status, response) {
                                                    
                                            // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClass").hide();
                                                            },3000)

                                            // ===============================================================================================================
                                                     
                                                      refreshList(); // To call refresh function..
                                               });

                                               deleteUser.error(function (data, status, response) {

                                               });
                              
                              };



                               $scope.groupChange = function(){

                                  if($scope.result.id==1){
                                    $scope.showAddGroup = false;
                                    $scope.showAddGroupss = false;
                                    $scope.showAddGroupssss = false;
                                    $scope.showOnNewUserAdd = true;
                                    // document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                    document.getElementById('hideInVipGroup1').style.display = "none";
                                    document.getElementById('hideInVipGroup2').style.display = "inline-block";
                                    $scope.submittedGroup12 = false;

                                   }

                                  if($scope.result.id==2){
                                    $scope.showAddGroup = false;
                                    $scope.showAddApprover = true;
                                    $scope.showAddGroupss = true;
                                    $scope.showAddGroupssss = false;
                                   $scope.showOnNewUserAdd = true;
                                    // document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                    document.getElementById('hideInVipGroup1').style.display = "none";
                                    document.getElementById('hideInVipGroup2').style.display = "inline-block";
                                    $scope.submittedGroup12 = false;


                                   }

                                  if($scope.result.id==3){
                                     $scope.showAddGroupssss = true;
                                     $scope.showAddGroupss = false;
                                     $scope.showAddGroup = false;
                                     $scope.showOnNewUserAdd = true;
                                    // document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                    document.getElementById('hideInVipGroup1').style.display = "none";
                                     document.getElementById('hideInVipGroup2').style.display = "none";
                                     refreshUserList();
                                     $scope.inEdit = true;
                                      $scope.inEditPrivateUser = false;
                                     $scope.models.basket = []; // To make Drop section clear when new Group is added..
                                    $scope.submittedGroup12 = false;
                                     
                                   }

                                   if($scope.result.id==0){
                                    document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                    document.getElementById('hideInVipGroup2').style.display = "inline-block";
                                    $scope.showAddGroupss = false;
                                    $scope.showAddGroup = false;
                                    $scope.showAddApprover = false;
                                    $scope.showAddGroupssss = false;
                                   }

                               };

                               $scope.addApproverToGroup = function(){

                                angular.element('#showAddApprover').modal('hide');
                                $scope.showAddApprover = false;
                                document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                document.getElementById('hideInVipGroup2').style.display = "inline-block";
                                document.getElementById('hideInVipGroup3').style.display = "none";


                               };

                               $scope.addApprover = function(){

                                $scope.approverDetails=[];

                                $scope.checkedApproverss=[];

                                angular.element('#showAddApprover').modal('show');

                               };



                               $scope.existingUserss = function(){

                                   var listUsers = $http({
                                      
                                                            method: 'GET',
                                                            url: 'api/v1/userlist',
                                                            data: {sort: [], filters: [], filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             listUsers.success(function (data, status, response) {
                                              
                                                        $scope.usersApprover = data.result;
                                                       console.log("lkjkljjkklllllllllllll",data);
                                                    
                                             });

                               };



                               $scope.addApproverCancelBtn = function(){
                                 $scope.showAddGroup = false;
                                    $scope.showAddApprover = false;
                                    $scope.showAddGroupss = false;

                                    document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                    document.getElementById('hideInVipGroup2').style.display = "inline-block";

                               };




                              // To add group status in ng-repeat while adding new group when the perticular checkbox is checked..

                              // $scope.saveUser = function(data, group, index){
                                $scope.saveUser = function(data,index){

                  
                               


                               //   console.log(inde);

                                  console.log("jjjjjj_______________",index);

                                  $scope.indexss = index;
                                  console.log("jjjjjj_______________",$scope.indexss);

                                   console.log("lllllllls",$scope.groups);

                                // group.id = $scope.groups.length + 1;
                                var publicValue="N";
                                var adminApproved ="N"; 
                                var privateValue="N";
                               // for (var i=0; i<$scope.groups.length; i++) {
                               //  if ($scope.groups[i].id === $scope.groups.length) {
                               //    $scope.groups[i].status = $scope.user.roles.join(); // join() is user to convert array in to string..
                               //    break;
                               //    }
                               //  }
                               //  $scope.disabled = false;


                                
                               // for(var i=0;i<$scope.user.roles.length;i++)
                               // {
                               //  if($scope.user.roles[i]=="Public")
                               //  {
                               //    publicValue="Y";
                               //  }
                               //  if($scope.user.roles[i]=="VIP Group")
                               //  {
                               //    adminApproved ="Y";
                               //  }
                               //  if($scope.user.roles[i]=="Private")
                               //  {
                               //    privateValue ="Y";
                               //  }
                               // }


                                if($scope.result.id==0 || $scope.result.id==null){
                                        $scope.submittedGroup12 = true;
                                   }


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

                                     $scope.addUserToGroupBtn();
                                   }
                               

                              
                             

                       // -------------------------------- Add condition Starts here.. ------------------------------   

                       

                                          if(addButtonClickedCondition){

                                            $scope.showOnDisabledCondition = false;

                                            $scope.dataToSend = $scope.groups[index]; // To send Group data to the service..
                                            $scope.dataToSend['addedUsers']=[];

                                          //   $scope.groups[index]["groupName"]=data.group; // To send the Group name..

                                             if($scope.result.id==1){

                                         var groupJson={
                                          "groupName":data.group,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "purpose":data.purpose,
                                          "addedUsers":[] 
                                          }

                                          console.log("jkljjjj",groupJson);



                                               var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group',
                                                  data:groupJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {

                                              $scope.disabled = false;

                                     
                                       
                                                       refreshList(); // To call refresh function..


                                          // ---------------------- To show add users to private group section.. -----------------------

                                                       if(privateValue ==="Y")
                                                        {
                                                          $scope.addUserToGroup = true; // To show add user to private group section..
                                                          $scope.groupMainPage = false; // To hide add group section..
                                                        }

                                          // -------------------------------------------------------------------------------------------

                                           // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEntry").hide();
                                                            },3000)

                                           // ===============================================================================================================

                                            $scope.result.id==0;
                                                 
                                             }).error(function (data, status) {



                                // =================== Condition for 409 error and to show alertbox.. ===================

                                                  if (status === 409) {
                                                    $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnValidation").hide();
                                                       },3000)
                                                  }

                                                  refreshList(); // To call refresh function..

                                // =============================================================================================





                                            });

                                           }






                         if($scope.result.id==2){


                         // $scope.approverDetails;

                         $scope.combinedApproverss;


                                              

                           var groupJson2={
                                          "groupName":data.group,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "purpose":data.purpose,
                                          "addedUsers": $scope.combinedApproverss

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

                                              $scope.disabled = false;

                                         // refreshGroupList(); // To call list all the group service..
                                         refreshList(); // To call refresh function..

                                        console.log("lllllllllllllll___________________________",data);

                                         $scope.newGroup = '';
                                         $scope.groupPurpose = '';
                                         $scope.result.id=0;
                                      });


                         }


                         // if($scope.result.id==3){

                         //  alert("private");
                         //  $scope.privateUsers;

                         //   var groupJson3={
                         //                  "groupName":data.group,
                         //                  "isPublic":publicValue,
                         //                  "isPrivate":privateValue,
                         //                  "adminApproved":adminApproved,
                         //                  "purpose":data.purpose,
                         //                  "addedUsers":privateUserss

                         //                  }

                         //                  console.log("kjhkhkhjkhjk______",groupJson3);



                         //                       var GroupAddPrivate = $http({
                         //                          method: 'POST',
                         //                          url: 'api/v1/group/setup',
                         //                          data:groupJson3 ,
                         //                          headers: {
                         //                              "Content-Type": 'application/json'
                         //                          }
                         //                        })
                         //                    GroupAddPrivate.success(function (data, status, response) {

                         //                 refreshGroupList(); // To call list all the group service..

                         //                console.log("lllllllllllllll___________________________",data);

                         //                $scope.newGroup = '';
                         //                 $scope.groupPurpose = '';
                         //                 $scope.result.id=0;
                         //              });



                         // }

                                             console.log("ssssssssll",data);


                                              addButtonClickedCondition=false;

                                              }

                         // -------------------------------- Edit condition ends here.. --------------------------------



                          // -------------------------------- Edit condition Starts here.. ------------------------------

                                              // ===== condition to convert group status value from "Public" to "Y".. ========

                                                     if(editButtonClickedCondition) 
                                                        {


                                                          $scope.showOnDisabledCondition = false;
                                                       
                                                          console.log($scope.groups[index]);
                                                          console.log(index);

                                                          if( $scope.groups[index]["isPublic"]=="Public")
                                                            {
                                                              $scope.groups[index]["isPublic"]="Y";
                                                            }
                                                            else{
                                                              $scope.groups[index]["isPublic"]="N";
                                                            }
                                                            if($scope.groups[index]["adminApproved"]=="VIP Group")
                                                            {
                                                              $scope.groups[index]["adminApproved"] ="Y";
                                                            }
                                                            if($scope.groups[index]["isPrivate"]=="Private")
                                                            {
                                                              $scope.groups[index]["isPrivate"] ="Y";
                                                            }


                                                            console.log("jjljkj_____",data);
                                              // ==============================================================================

                                                         
                                                            $scope.groups[index]["groupName"]=data.group; // To send the Group name..

                                                            console.log("jjjjjjjj",$scope.groups[index]);

                                                            $scope.dataToSend = $scope.groups[index]; // To send Group data to the service..
                                                            $scope.dataToSend['addedUsers']=[]; // To send empty addedUsers Json array to the service..

                                                          console.log("ssssssssss",index);


                                                         
                                                           
                                                              var GroupEdit = $http({
                                                                  method: 'PUT',
                                                                  url: 'api/v1/group/'+$scope.groups[index].groupId,
                                                               //   data: $scope.groups[index],
                                                                  data: $scope.dataToSend,
                                                                  
                                                              })
                                                              GroupEdit.success(function (data, status, response) {

                                                          console.log("jkhkhjhhh",data);
                                                                  
                                                                         refreshList(); // To call refresh function..


                                                            // ---------------------- To show add users to private group section.. -----------------------

                                                                         // if(privateValue ==="Y")
                                                                         //  {
                                                                         //    $scope.addUserToGroup = true; // To show add user to private group section..
                                                                         //    $scope.groupMainPage = false; // To hide add group section..
                                                                         //  }

                                                            // -------------------------------------------------------------------------------------------

                                            // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEditEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEditEntry").hide();
                                                            },3000)

                                            // ===============================================================================================================


                                                                   
                                                               }).error(function (data, status) {


                                                                // Condition for 409 error and to show alertbox..
                                                                    if (status === 409) {
                                                                       $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                                         window.setTimeout(function() {
                                                                          $(".showAlertOnValidation").hide();
                                                                        },3000)
                                                                      refreshList(); // To call refresh function..
                                                                    }

                                                              });

                                                               editButtonClickedCondition=false;
                                                            

                                                             } 
                          // -------------------------------- Edit condition ends here.. --------------------------------


                                                };



                              // ----------------------- checkbox selection ends --------------------------












                                  $scope.saveSendInvite = function(){

                                      if ($scope.registerForm.$valid) {

                                        // alert("Correct");


                                         var jsonStructure = [{
                                                'emailid': $scope.email,
                                                'firstName': $scope.first,         
                                                'lastName': $scope.last,
                                                'phone': $scope.mobileNo,
                                                'receiverstatus': 3,
                                                'groupResponse':[]
                                             }];

                                            
                                          $http({
                                                method: 'POST',
                                                url: 'api/v1/user',
                                                data: jsonStructure,
                                                
                                            }).success(function (data, status) {

                                                console.log(data,status);

                                              refreshUserList();


                                              $scope.showhideprop = false;

                                                   // refreshList(); // To call refresh function..


                                                
                                            }).error(function (data, status) {


                            // =================== To have alert on creating same emailID or mobileNo.. ===================

                                                  if (status === 409) {
                                                    $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnValidation").hide();
                                                            },3000)
                                                  }

                                                  refreshList(); // To call refresh function..

                                            });

                                            } else {

                                              // alert("Error");
                                                $scope.submittedPrivate = true;
                                          }

                                    };










                              // To unable and disable the checkbox base on the last checked checkbox selection using ( ng-click="$last&&mytest(checked)" )..

                                  // $scope.mytest=function(value){
                                  
                                  //   if(value)
                                  //     {
                                  //       $scope.showAddGroup = true;
                                  //       document.getElementById('Public').disabled = true;
                                  //       document.getElementById('VIP Group').disabled = true;
                                  //       document.getElementById('Private').disabled = false;
                                  //       refreshUserList();
                                  //       // $('Public').prop('checked', false);

                                  //       $scope.models.basket = []; // To make Drop section clear when new Group is added..
                                  //     }
                                  //   else
                                  //       {
                                  //         $scope.showAddGroup = false;
                                  //         document.getElementById('Public').disabled = false;
                                  //         document.getElementById('VIP Group').disabled = false;
                                  //         document.getElementById('Private').disabled = false;
                                      
                                  //       }

                                  //   };

                                  

                              // ------------------ To add approver in model.. ----------------------

                                $scope.approverDetails=[];

                                $scope.addApproverToGroupBtn = function(){

                                  if ($scope.myformss.$valid) {
                                     
                                    $scope.submittedGroup = false;
                                 
                                  // var groupJson3 = [{
                                  //                         "firstName": $scope.firstName,
                                  //                         "lastName": $scope.lastName,
                                  //                         "emailid": $scope.emailss,
                                  //                         "phone": $scope.mobileNoss
                                  //                         }];

                                  // $scope.approverDetails = groupJson3;

                                  $scope.approverDetails.push({
                                                  
                                                 "firstName": $scope.firstName,
                                                 "lastName": $scope.lastName,
                                                 "emailid": $scope.emailss,
                                                 "phone": $scope.mobileNoss,
                                                 "newUser": "Y"
                                              });

                                              console.log("kjhhjjjjjjjj-------",$scope.approverDetails);

                                              $scope.approverDetails;

                                               // Clear input fields after push
                                                $scope.firstName = "";
                                                $scope.lastName = "";
                                                $scope.emailss = "";
                                                $scope.mobileNoss = "";

                                  // angular.element('#showAddApprover').modal('hide');

                                  //   $scope.showAddGroup = false;
                                  //   $scope.showAddApprover = false;
                                  //   $scope.showAddGroupss = false;

                                  //   document.getElementById('hideInVipGroup1').style.display = "inline-block";
                                  //   document.getElementById('hideInVipGroup2').style.display = "inline-block";

                                    } else {
                                                $scope.submittedGroup = true;
                                          }            

                                };



                                $scope.checkedApproverss=[];

                                $scope.selectUser = function(index,userss,selectApprover){

                                  console.log(index);
                                  console.log(userss);
                                  console.log(selectApprover);

                                  if(selectApprover=='Y'){
                                    $scope.checkedApproverss.push(userss);
                                  }

                                  if(selectApprover=='N'){

                                    console.log(userss.receiverConfigId);
                                    $scope.checkedApproverss = _.without($scope.checkedApproverss, _.findWhere($scope.checkedApproverss, {receiverConfigId: userss.receiverConfigId}));
                                    // $scope.checkedApproverss.splice(userss);
                                  }

                                  console.log($scope.checkedApproverss);

                                };



                                $scope.combineApproverData = function(){

                                  $scope.approverDetails;
                                  $scope.checkedApproverss;

                                   // ======================= To combaine to json object.. ========================

                                    var jsonObjectC = $scope.approverDetails;
                                    var jsonObjectD = $scope.checkedApproverss;  

                                    $scope.combinedApproverss = jsonObjectC.concat(jsonObjectD);

                                    console.log("combinedApproverss",$scope.combinedApproverss);

                                    // $scope.uploadedUsersDatassLength = $scope.emailNotificationUserEntryList.length;

                                  
                          
                                  // =============================================================================  

                                  $scope.showAddGroupss = false;


                                };

                              





                              $scope.cancelEditFirstUser = function(index){

                               $scope.showOnDisabledCondition = false;
                                 $scope.disabled = false;
                                $scope.groups.splice(index, 1);
                                document.getElementById('hideInVipGroup1').style.display = "inline-block";

                                $scope.showAddGroup = false;
                               refreshList(); // To call refresh function..
                                // $scope.result.id=0; // To make checkbox un checked..

                                $scope.addNewUserDisable = false; // To enable the addNewUserDisable button once refreshed..
                              };

                              $scope.cancelEdit = function(index){

                                $scope.showOnDisabledCondition = false;
                                $scope.disabled = false;
                                $scope.showAddGroup = false;
                               // $scope.groups.splice(index, 1);
                              // refreshList(); // To call refresh function..
                                $scope.result.id=0; // To make checkbox un checked..

                                $scope.addNewUserDisable = false; // To enable the addNewUserDisable button once refreshed..
                              };



                              // $scope.privateChecked = function(toggleButtons){
                              //   //$scope.disabled = false;
                              //   // alert();
                              //   console.log(toggleButtons);
                              //   if(toggleButtons)
                              //   {
                              //     $scope.showAddGroup = true;
                              //   }
                              // else
                              //   {
                              //     $scope.showAddGroup = false;
                              //   }
                              // };






                               // ------------------- To call service to view groups.. ----------------------------

                                      $scope.getGroupInfo = function(index){

                                        // alert(index);
                                      
                                         var getGroupInfo = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/users/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             getGroupInfo.success(function (data, status, response) {

                                                      // console.log("List of users",data);

                                                      // console.log("List of users",data.length);
                                                   
                                                      if(data.length>0)
                                                      $scope.subscribedUsers=data[0].userResponse;
                                                    else

                                                       $scope.subscribedUsers=[{receiverFirstName:"No Subscribed user for this group"}];
                                                    
                                                    // $( "#dropdownMenu2" ).trigger( "click" );
                                                 
                                             });

                                      };

                              // ----------------------------------------------------------------------------------




                      // -------------------- To change the page to Group details.. ---------------------------

                              $scope.showGroupDetails = function(index){
                                $scope.groupMain = true;
                                $scope.groupMainPage = false;

                                 // ======================== To list the user inside the group.. =============================


                                function refreshInvitedUserInGroupList(){


                                 var listInvitedUserInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/invite-users/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listInvitedUserInGroup.success(function (data, status, response) {
                                                    
                                                    $scope.inviteUserResponse = data[0].userResponse;

                                                    console.log("$scope.inviteUserResponse",$scope.inviteUserResponse);
                                      });
                                     } 

                                     refreshInvitedUserInGroupList();


                            // ======================== To list the user inside the group.. =============================


                               function refreshUserInGroupList(){

                                 var listUserInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/users/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listUserInGroup.success(function (data, status, response) {




                                         // --------------- To show status beside group name.. ----------------

                                                      

                                                      
                                                          var statusLists;
                                                          if($scope.groups[index].adminApproved=="Y")
                                                          {
                                                            statusLists="VIP Group";
                                                            $scope.groups[index].newClass='label label-warning'; // To change the color based on status.. 
                                                          }
                                                           if($scope.groups[index].isPrivate=="Y")
                                                          {
                                                            statusLists="Private";
                                                            $scope.groups[index].newClass='label label-danger'; // To change the color based on status.. 
                                                          }
                                                           if($scope.groups[index].isPublic=="Y")
                                                          {
                                                            statusLists="Public";
                                                             $scope.groups[index].newClass='label label-success'; // To change the color based on status.. 
                                                          }
                                                          //$scope.statusssssssss[i].isPublic=statusLists;
                                                        


                                                  // -------------------------------------------------------------------   


                                              console.log("jklklkklkkkkk",data.length);
                                              console.log("lkklkkkkk",data);
                                              console.log("jjjjjjjjj",$scope.groups[index]);


                                              // ------- To show Group status when clicked on view group details icon.. ------

                                              $scope.groupPurpose = $scope.groups[index].purpose;
                                              $scope.groupStatus = $scope.groups[index].isPublic;
                                              $scope.newClass = $scope.groups[index].newClass;

                                             

                                              // if($scope.groups[index].isPublic=="VIP Group"){
                                              //   alert();
                                              //   $scope.groups[index].isPublic.newClass='label label-warning';
                                              // }
                                                          





                                             



                                               if( $scope.groups[index]["isPublic"]=="Y")
                                                  {
                                                    $scope.groupsStatus=="Public";
                                                    console.log("nnnnnnnnn",groupsStatus);
                                                  }







                                              if(data.length<1){
                                                console.log(data);
                                                $scope.groupName = $scope.groups[index].groupName;
                                                $scope.privateUserResponse = [];

                                                console.log("lkklkkkkk",data);
                                              }
                                              else{


                                                     $scope.groupName = undefined;
                                                     $scope.userResponse = undefined;

                                                  // To show the users inside the group..
                                                      $scope.privateUserResponse = data[0].userResponse;

                                                  // To show the perticular group name in groupdetails..
                                                      if(data[0].groupName){
                                                        $scope.groupName = data[0].groupName;
                                                      }


                                                      console.log("List of users in Group",data);

                                                      }
                                                 
                                             });
                           // ============================================================================================          

                                      }

                                      refreshUserInGroupList();
                               };



                      // -------------------------------------------------------------------------------------        





                          // =============================== To show group name in private section.. ==========================================

                              var groupNameForPrivate;
                              var groupPurposeForPrivate;
                              $scope.disableEditandAdd = function()
                              {

                                refreshUserList(); // To call list all the users service..

                                 $scope.addButtonClickedCondition=false;

                                $scope.editButtonClickedCondition=false;
                                
                                addedUsersPrivate=[];

                              $scope.groupDetailsPrivate=$("input[name=group]").val();
                               $scope.groupPurposeDetailsPrivate=$("input[name=purpose]").val();
                              
                              groupNameForPrivate=$("input[name=group]").val();
                              groupPurposeForPrivate=$("input[name=purpose]").val();



                              };

                         // ===========================================================================================================     




                         // ====================================== To save private users.. ================================================

                              $scope.savePrivateUser = function()
                              {

                                refreshUserList(); // To call list all the users service..

                                 $scope.addButtonClickedCondition=false;

                                $scope.editButtonClickedCondition=false;

                                console.log(groupNameForPrivate)
                                 var privateGroupJson={
                                          "groupName":groupNameForPrivate,
                                          "isPublic":"N",
                                          "isPrivate":"Y",
                                          "adminApproved":"N",
                                          "purpose":groupPurposeForPrivate,
                                          "addedUsers":addedUsersPrivate // Should send userID (1, 2, 3)
                                          }

                                        



                                               var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group',
                                                  data:privateGroupJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {

                                        refreshList(); // To call refresh function..

                                        refreshUserList(); // To call list all the users service..

                                          $scope.addUserToGroup = false;
                                          $scope.groupMainPage = true;
                                          $scope.addNewUserDisable = false;

                                            $scope.disabled = false; // To enable action button when private group is submitted..
                                                
                                                       refreshList(); // To call refresh function..
                                                       $scope.showAddGroup = false;

                                          // ---------------------- To show add users to private group section.. -----------------------

                                                       // if(privateValue ==="Y")
                                                       //  {
                                                       //    $scope.addUserToGroup = true; // To show add user to private group section..
                                                       //    $scope.groupMainPage = false; // To hide add group section..
                                                       //  }

                                          // -------------------------------------------------------------------------------------------


                                                 
                                             }).error(function (data, status) {


                                              // Condition for 409 error and to show alertbox..
                                                  if (status === 409) {
                                                     $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnValidation").hide();
                                                            },3000)
                                                    refreshList(); // To call refresh function..
                                                  }

                                            });




                              };





                              $scope.inEdit = true;
                              $scope.inEditPrivateUser = false;


                              $scope.savePrivateUserInEdit = function(index)
                               {

                                        $scope.groupDetailsPrivate;
                                        $scope.groupPurposeDetailsPrivate;
                                        $scope.addedUsersPrivatess;
                                        $scope.groupIDtoShow;


                                        refreshUserList(); // To call list all the users service..

                                         $scope.addButtonClickedCondition=false;

                                        $scope.editButtonClickedCondition=false;


                                        console.log("kjhjjjjjjjjjj",$scope.models.basket);


                                        $scope.newDroppedUsers = [];
                                        for(var n=0;n<$scope.models.basket.length;n++){
                                          $scope.newDroppedUsers.push($scope.models.basket[n].receiverConfigId)
                                        }

                                         var privateGroupJson={
                                                  "groupName":$scope.groupDetailsPrivate,
                                                  "isPublic":"N",
                                                  "isPrivate":"Y",
                                                  "adminApproved":"N",
                                                  "purpose":$scope.groupPurposeDetailsPrivate,
                                                  "addedUsers":$scope.newDroppedUsers // Should send userID (1, 2, 3)
                                                  }

                                                



                                                       var GroupAdd = $http({
                                                          method: 'PUT',
                                                          url: 'api/v1/group/'+$scope.groupIDtoShow,
                                                          data:privateGroupJson ,
                                                          headers: {
                                                              "Content-Type": 'application/json'
                                                          }
                                                        })
                                                    GroupAdd.success(function (data, status, response) {

                                                refreshList(); // To call refresh function..

                                                refreshUserList(); // To call list all the users service..

                                                  $scope.addUserToGroup = false;
                                                  $scope.groupMainPage = true;
                                                  $scope.addNewUserDisable = false;

                                                    $scope.disabled = false; // To enable action button when private group is submitted..
                                                        
                                                               refreshList(); // To call refresh function..
                                                               $scope.showAddGroup = false;

                                                  // ---------------------- To show add users to private group section.. -----------------------

                                                               // if(privateValue ==="Y")
                                                               //  {
                                                               //    $scope.addUserToGroup = true; // To show add user to private group section..
                                                               //    $scope.groupMainPage = false; // To hide add group section..
                                                               //  }

                                                  // -------------------------------------------------------------------------------------------


                                                         
                                                     }).error(function (data, status) {


                                                      // Condition for 409 error and to show alertbox..
                                                          if (status === 409) {
                                                             $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnValidation").hide();
                                                            },3000)
                                                            refreshList(); // To call refresh function..
                                                          }

                                                    });




                                      };




                        // ===========================================================================================================




                              $scope.inviteUserResponse=[];
                                $scope.privateUserResponse=[];


                              // To change the page to Group details..
                              $scope.showGroupDetails1 = function(){

                                $scope.inviteUserResponse=[];
                                $scope.privateUserResponse=[];
                                $scope.showOnDisabledCondition = false;
                                $scope.groupMainPage = true;
                                $scope.groupMain = false;
                              };



                                // $scope.showUsersInGroup = function(index){
                                //          var listUserInGroup = $http({
                                //                             method: 'GET',
                                //                             url: 'api/v1/users/'+$scope.groups[index].groupId,
                                //                             //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                //                             headers: {
                                //                                 "Content-Type": 'application/json'
                                //                             }
                                //                         })
                                //             listUserInGroup.success(function (data, status, response) {
                                //                     alert();
                                //                       console.log("List of users in Group",data);
                                                 
                                //              });
                                //      };







                              // To validate the input fieldsby using (onbeforesave="validateRequired($data)") in span..

                                       

                                          $scope.validateRequired = function(value, pattern) {



                                        // if(addButtonClickedCondition){
                                        //   alert("Add");
                                        //   addButtonClickedCondition=false;
                                        // }
                                            if(editButtonClickedCondition) 
                                                { 
                                                  $scope.submittedGroup12 = false;
                                                  console.log("value",value);
                                                 $("#hideOnEditGroup").hide();
                                                //  alert("Editss");
                                                 // document.getElementById('hideOnEditGroup').style.display = "none";
                                                 if(!value){
                                                    $scope.disabled=false; // To hide checkbox on empty input value..
                                                    $scope.addNewUserDisable=true;
                                                    $scope.submittedGroup12 = false;

                                                    return "Required valid field";
                                                
                                                }

                                                 //  editButtonClickedCondition=false;
                                                }

                                          
                                           else {

                                                    if(!value){
                                                        $scope.disabled=true; // To show the checkbox when the inputbox is empty and when clicked on save group button..
                                                        $scope.addNewUserDisable=true;
                                                        return "Required valid field";
                                                      }



                                                     if(($scope.result.id==0 || $scope.result.id==null) && addButtonClickedCondition){
                                                          $scope.submittedGroup12 = true;
                                                          return "";
                                                     }

                                                  
                                                    if(value){
                                                        $scope.addNewUserDisable=false;
                                                      }

                                                      if(addButtonClicked)
                                                     {

                                                        //To check if the Checkbox (status) are checked..
                                                         //  if($scope.result.id==0){
                                                         // // if($scope.user.roles.length===0){
                                                         //    $scope.disabled = true;// To show the checkbox when the inputbox is empty and when clicked on save group button..
                                                         //    return $scope.user.roles.length ? false : 'Please select the group status.';
                                                         //  }
                                                          addButtonClicked = false;
                                                    }
                                                }

                                          };





                              // To show the perticular group details using id..


                               // $scope.showGroup = function(id){

                               //  console.log("jhghjkghjkgjhkghjlghjkgghjl");

                               //          var singleObject = $filter('filter')($scope.groups, function (d) {return d.id === id;})[0];
                               //              // If you want to see the result, just check the log
                               //              console.log(singleObject);
                               //              $scope.groupDetails = singleObject;
                                            
                               //          };









                                        // To add users to perticular group..
                                        $scope.addUserToGroupBtn = function(index){





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
                                               
                                                  $scope.showBtnToEnterPrivateUser = true;

                                              } else{
                                                 $scope.showBtnToEnterPrivateUser = false;

                                              }
                                            });




                                            $scope.addUserToGroup = true;
                                            $scope.groupMainPage = false;
                                            refreshUserList(); // To call list all the users service..


                                              $scope.groupDetailsPrivate = $scope.groups[index].groupName;
                                              $scope.groupPurposeDetailsPrivate = $scope.groups[index].purpose;
                                              $scope.groupIDtoShow = $scope.groups[index].groupId;

                                             // ======================== To list the user inside the group.. =============================

                                                    var jsonArrays1 =[];
                                                    var jsonArrays2 = [];

                                                   var listInvitedUserInGroup = $http({
                                                                              method: 'GET',
                                                                              url: 'api/v1/invite-users/'+$scope.groups[index].groupId,
                                                                              //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                                              headers: {
                                                                                  "Content-Type": 'application/json'
                                                                              }
                                                                          })
                                                                    listInvitedUserInGroup.success(function (data, status, response) {


                                                                      
                                                                      $scope.invitedUsersResponse = data[0].userResponse;

                                                                      jsonArrays1 = data[0].userResponse;
                                                                      

                                                                      var join = jsonArrays1.concat(jsonArrays2);
                                                                      console.log("jjjjjjjsssss",join);

                                                                      $scope.existingUsers = join;

                                                                      $scope.models.basket = $scope.existingUsers;





                    // =========================== To remove users from user list when the user is already selected.. =========================




                                                                  var promisewq = $http({
                                                                            method: 'POST',
                                                                            url: 'api/v1/user/list?limit=250&page=1',
                                                                            data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
                                                                            headers: {
                                                                                "Content-Type": 'application/json'
                                                                            }
                                                                        })
                                                              promisewq.success(function (data, status, response) {
                                                          

                                                             $scope.concatinatedUsers = [];

                                                             $scope.beforeJoiningUsers = [];

                                                                for(var i=0;i<data.records.length;i++){
                                                                  for(var j=0;j<$scope.existingUsers.length;j++){
                                                                    if($scope.existingUsers[j].receiverConfigId==data.records[i].receiverConfigId){
                                                                      $scope.beforeJoiningUsers.push(data.records[i].receiverConfigId);
                                                                    } else {
                                                                       // $scope.concatinatedUsers.push(data.records[i])
                                                                    }
                                                                  }
                                                                }


                                                                $scope.users = [];

                                                                 $scope.users = data.records.filter(function(obj) {
                                                                    return $scope.beforeJoiningUsers.indexOf(obj.receiverConfigId) === -1;
                                                                });

                                                                  
                                                                     // $scope.users = $scope.beforeJoiningUsers;
                                                                      console.log("shrinivasasasas",$scope.users)
                                                                     

                                                             });



                  // =======================================================================================================================================


                                                        });

                                              // ======================== To list the user inside the group.. =============================

                                               var listUserInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/users/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listUserInGroup.success(function (data, status, response) {

                                                                  $scope.subscribedUsersResponse = data[0].userResponse;
                                                                  jsonArrays2 = data[0].userResponse;

                                                                   var join = jsonArrays1.concat(jsonArrays2); 
                                                                   console.log("jjjjjjjsssssss",join);

                                                                   $scope.existingUsers = join;



                                                                   $scope.models.basket = $scope.existingUsers;

                                                                   console.log("kjljkjk_________",$scope.models.basket);





                   // =========================== To remove users from user list when the user is already selected.. =========================






                                                                  var promisewq = $http({
                                                                            method: 'POST',
                                                                            url: 'api/v1/user/list?limit=250&page=1',
                                                                            data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
                                                                            headers: {
                                                                                "Content-Type": 'application/json'
                                                                            }
                                                                        })
                                                              promisewq.success(function (data, status, response) {
                                                                
                                                          
                                                       $scope.concatinatedUsers = [];

                                                             $scope.beforeJoiningUsers = [];

                                                                for(var i=0;i<data.records.length;i++){
                                                                  for(var j=0;j<$scope.existingUsers.length;j++){
                                                                    if($scope.existingUsers[j].receiverConfigId==data.records[i].receiverConfigId){
                                                                      $scope.beforeJoiningUsers.push(data.records[i].receiverConfigId);
                                                                    } else {
                                                                       // $scope.concatinatedUsers.push(data.records[i])
                                                                    }
                                                                  }
                                                                }


                                                                $scope.users = [];

                                                                 $scope.users = data.records.filter(function(obj) {
                                                                    return $scope.beforeJoiningUsers.indexOf(obj.receiverConfigId) === -1;
                                                                });

                                                                  
                                                                     // $scope.users = $scope.beforeJoiningUsers;
                                                                      console.log("shrinivasasasas",$scope.users)

                                                             });



             // =======================================================================================================================================

                                                                  

                                                });

                                      
                                      




                                        };


                                        $scope.backCancelbtn = function(){

                                          $scope.showOnDisabledCondition = false;
                                          
                                           $scope.addNewUserDisable = false;
                                            $scope.addUserToGroup = false;
                                            $scope.groupMainPage = true;

                                            $scope.disabled = false; // To enable action button when private group is submitted..

                                            refreshList(); // To call refresh function..
                                            $scope.showAddGroup = false; // To hide the showAddGroup (add users to private group btn)..

                                            if($scope.result.id==3){
                                              $scope.result.id==0;
                                            }
                                        };


                                        // Show Div
                                        $scope.showDivToEnterDetails = function () {
                                         // alert();
                                          $scope.showhideprop = true;
                                        };
                                        // Hide Div
                                        $scope.hideDiv = function () {
                                          $scope.showhideprop = false;
                                        };




                                        // $scope.saveUserGroup = function () {

                                            
                                        //     var jsonStructure = {
                                        //         email: $scope.email,
                                        //         first: $scope.first,
                                        //         id: '',
                                        //         last: $scope.last,
                                        //         mobileNo: $scope.mobileNo,
                                        //         status: 3
                                        //      };

                                            
                                            
                                        //     $scope.models.basket.unshift(jsonStructure);


                                        //     // To clear all the input fields..
                                        //      $scope.first = '';
                                        //      $scope.last = '';
                                        //      $scope.email = '';
                                        //      $scope.mobileNo = '';
                                            

                                        //  };




                                         // $scope.saveUserGroup1 = function () {
                                            
                                         //    var jsonStructure1 = {
                                         //        email: $scope.email,
                                         //        first: $scope.first,
                                         //        id: '',
                                         //        last: $scope.last,
                                         //        mobileNo: $scope.mobileNo,
                                         //        status: 3
                                         //     };
                                             
                                            
                                            
                                         //    $scope.models.users.unshift(jsonStructure1);


                                         //    // To clear all the input fields..
                                         //     $scope.first = '';
                                         //     $scope.last = '';
                                         //     $scope.email = '';
                                         //     $scope.mobileNo = '';

                                         // };



                                        




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

                                            var addedUsersPrivate=[];
                                            $scope.onDrop = function(data) {

                                                 $scope.showDiv = false;
                                               console.log(data);
                                               addedUsersPrivate.push(data.receiverConfigId)
                                               console.log(addedUsersPrivate)
                                               $scope.addedUsersPrivatess = addedUsersPrivate;
                                                $scope.models.basket.unshift(data);
                                                $scope.remove($scope.users, data);

                                              
                                            };

    }

    ]);

})();