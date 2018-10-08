/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.group_user',
        []
    );

    module.controller('Group_userCtrl',
        [   '$rootScope', '$scope', '$filter', '$http',

    function Group_userCtrl($rootScope, $scope, $filter, $http) {

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

 //  // ------------------- To filter the users.. ----------------------

 //        $scope.$watchCollection('filters', function(newValue, oldValue) {
 //            console.log("cwatch");
 //             if(newValue){
 //               $scope.xyz();
 //               refreshList();
 //             }
 //        });

 // // -----------------------------------------------------------------




 //      // ------------------ To have pagination.. ---------------------

 //          $scope.$watchCollection('pagination', function(newValue, oldValue) {
 //           refreshList();

 //          });
 //         $scope.$watchCollection('sort', function(newValue, oldValue) {
 //           refreshList();

 //          });

 //      // -----------------------------------------------------------------   


// ------------------- To filter the users.. ----------------------

        $scope.$watchCollection('filters', function(newValue, oldValue) {
            
             if(newValue.groupName){
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



              // =========================== To get date and time formate.. ============================

              $scope.formatTimestampToDate = function(timestamp) {
                      // TODO: validate the timestamp
                      // var c=moment(timestamp).tz('America/Los_Angeles').format("MM-DD-YYYY") ;
                       var c=moment(timestamp).format("MM-DD-YYYY");
                      // console.log(c);
                 return c;
              };



             $scope.formatTimestampToDates = function(timestamp) {
                    // TODO: validate the timestamp
                    // var c=moment(timestamp).tz('Asia/Kolkata').format("MM-DD-YYYY hh:mm A") ;
                    var c=moment(timestamp).format("MM-DD-YYYY hh:mm A") ;
                 //    console.log(c);
               return c;
            };

        // =======================================================================================    



        

             // $scope.pageNumberCount=1; // To have pagination..
             //  $scope.totalPages=""; // To have pagination..

                         // -------------------------- To list all the groups.. --------------------------
                         


                        // -----------------------------------------------------------------------------------------

                         // -------------------------- Funtion to refresh the list.. ----------------------------

                           $scope.filterVal=[];

                              function refreshList()
                              {
                                 var listGroup = $http({
                                              method: 'GET',
                                              url: 'api/v1/user/groupsList',
                                              // data: {"sort":[],"filters":[],"filterType":"and"},
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
                                 listGroup.success(function (data, status, response) {



                                      
                                                  // --------------- To show status beside group name.. ----------------

                                                       $scope.statusssssssss = data.groups;

                                                       for(var i=0;i<$scope.statusssssssss.length;i++)
                                                         {
                                                          if($scope.statusssssssss[i].isAcceptOrDecline != null){
                                                            
                                                          } else{
                                                            $scope.statusssssssss[i].isAcceptOrDecline = 'sent';
                                                            //console.log("logklhjkjj____________________");
                                                          }
                                                          if($scope.statusssssssss[i].isRequest != null){
                                                            
                                                          } else{
                                                            $scope.statusssssssss[i].isRequest = 'N';
                                                            //console.log("logklhjkjj____________________");
                                                          }
                                                          var statusLists;
                                                          if($scope.statusssssssss[i].adminApproved=="Y")
                                                          {
                                                            statusLists="VIP Group";
                                                            $scope.statusssssssss[i].newClass='label label-warning'; // To change the color based on status.. 
                                                             $scope.statusssssssss[i].hideJoinBtn='VIP Group';
                                                          }
                                                           if($scope.statusssssssss[i].isPrivate=="Y")
                                                          {
                                                            statusLists="Private";
                                                            $scope.statusssssssss[i].newClass='label label-danger'; // To change the color based on status.. 
                                                              $scope.statusssssssss[i].hideJoinBtn='Private';
                                                          }
                                                           if($scope.statusssssssss[i].isPublic=="Y")
                                                          {
                                                            statusLists="Public";
                                                             $scope.statusssssssss[i].newClass='label label-success'; // To change the color based on status.. 
                                                              $scope.statusssssssss[i].hideJoinBtn='Public';
                                                             $scope.showInPublic = true;
                                                          }
                                                          $scope.statusssssssss[i].isPublic=statusLists;
                                                         }

                                                         $scope.groups = $scope.statusssssssss;

                                                         console.log("jkhjkghkjhkjhkhhjk-----------",$scope.groups);

                                                  // -------------------------------------------------------------------   


                                                  $scope.pagination.totalRecords = data.totalRecords; // To have pagination..

                                                  

                                     console.log("Resultsssssssss",data);



                                     console.log("llllll------------",$scope.statusssssssss);

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
                                                var f1;
                                                  var filterArray=[];

                                                  // For jobName filter
                                                  if($scope.filters.groupName){
                                                    
                                                  f1=  {property: "groupName", operator: "startw", value: $scope.filters.groupName};
                                                  filterArray.push(f1);
                                                  }
                                                 
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
                                $scope.disabled = false;
                                $scope.models.users.splice(index, 1);
                              };






                               $scope.editRow = function(){
                                          editButtonClicked=true;
                                           addButtonClicked=false;
                                           editButtonClickedCondition=true;
                                           addButtonClickedCondition=false;
                                         };



                            



                            // add Groups page..

                             $scope.addNewUserDisable = false; // To unabel ans disable ( Add new user ) button..

                              $scope.addUser = function() {
                                // alert($scope.groups.length+1);

                                // alert();

                                addButtonClicked=true;
                                editButtonClicked=false;
                                editButtonClickedCondition=false;
                                addButtonClickedCondition=true;

                                $scope.disabled = true; // To disable action button when clicked on add user..
                                
                                $scope.inserted = {
                                  id: $scope.groups.length+1,
                                  name: '',
                                  status: '',
                                  group: null 
                                };
                                $scope.groups.unshift($scope.inserted);

                                 // To unable and disable ( Add new user ) button..
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




                              // To add group status in ng-repeat while adding new group when the perticular checkbox is checked..

                              $scope.saveUser = function(data, group, index){

                                   console.log("lllllllls",$scope.groups);

                                // group.id = $scope.groups.length + 1;
                                var publicValue="N";
                                var adminApproved ="N"; 
                                var privateValue="N";
                               for (var i=0; i<$scope.groups.length; i++) {
                                if ($scope.groups[i].id === $scope.groups.length) {
                                  $scope.groups[i].status = $scope.user.roles.join(); // join() is user to convert array in to string..
                                  break;
                                  }
                                }
                                $scope.disabled = false;


                                
                               for(var i=0;i<$scope.user.roles.length;i++)
                               {
                                if($scope.user.roles[i]=="Public")
                                {
                                  publicValue="Y";
                                }
                                if($scope.user.roles[i]=="VIP Group")
                                {
                                  adminApproved ="Y";
                                }
                                if($scope.user.roles[i]=="Private")
                                {
                                  privateValue ="Y";
                                }
                               }
                               
                             

                       // -------------------------------- Add condition Starts here.. ------------------------------   

                                          if(addButtonClickedCondition){

                                         var groupJson={
                                          "groupName":data.group,
                                          "isPublic":publicValue,
                                          "isPrivate":privateValue,
                                          "adminApproved":adminApproved,
                                          "addedUsers":[] // Shoul send userID (1, 2, 3)
                                          }



                                               var GroupAdd = $http({
                                                  method: 'POST',
                                                  url: 'api/v1/group',
                                                  data:groupJson ,
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                                })
                                            GroupAdd.success(function (data, status, response) {
                                                
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

                                             console.log("ssssssssll",data);

                                              addButtonClickedCondition=false;

                                              }

                         // -------------------------------- Edit condition ends here.. --------------------------------



                          // -------------------------------- Edit condition Starts here.. ------------------------------

                                              // ===== condition to convert group status value from "Public" to "Y".. ========

                                                     if(editButtonClickedCondition) 
                                                        {
                                                          console.log($scope.groups[index]);

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

                                              // ==============================================================================

                                                         
                                                            $scope.groups[index]["groupName"]=data.group; // To send the Group name..

                                                           
                                                              var GroupEdit = $http({
                                                                  method: 'PUT',
                                                                  url: 'api/v1/group/'+$scope.groups[index].groupId,
                                                                  data: $scope.groups[index],
                                                                  
                                                              })
                                                              GroupEdit.success(function (data, status, response) {
                                                                  
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
                                                                      $scope.showAlertValidation = true;
                                                                      refreshList(); // To call refresh function..
                                                                    }

                                                              });

                                                               editButtonClickedCondition=false;
                                                            

                                                             } 
                          // -------------------------------- Edit condition ends here.. --------------------------------


                                                };



                              // ----------------------- checkbox selection ends --------------------------








                              // To show Chevron-right when clicked on join button..
                              $scope.showChevronRight = function(index){

                               // alert("jklkjjkl___________________",$scope.groups[index].isPublic);

                              //  alert(index);
                                console.log("jkhhhhhhhh________",$scope.groups[index]);


                                $scope.groups[index].hideJoinBtn = "Private";

                                $scope.disableChevronRightButton = true;

                              


                              //   $scope.disableJoinButton = {'visibility': 'hidden'};

                              // // To show Chevron-right icon when clicked on button..
                              //   $scope.disableChevronRightButton = {'visibility': 'visible'};
                              //    var element = angular.element('#removeId');
                              //     element.removeClass('ng-hide');




                                    var jsonStructure = {
                                                "groupId":$scope.groups[index].groupId
                                             };

                                            
                                          $http({
                                                method: 'POST',
                                                url: 'api/v1/join/group',
                                                data: jsonStructure,
                                                
                                            }).success(function (data, status) {

                                                  refreshList(); // To call list all the group service..

                                                });



                              };





                              $scope.isDisabled = false;
                              $scope.adminApproved = function(index){
                               // alert("You have requested for Admin approval..");
                                $scope.isDisabled = true;
                                // var element = angular.element('#removeBtnClass');
                                //   element.removeClass('sec-cus-buttons');
                                //   element.addClass('btn btn-success');
                                //   console.log(element);



                                    var jsonStructures = {
                                                "groupId":$scope.groups[index].groupId
                                             };

                                            
                                          $http({
                                                method: 'POST',
                                                url: 'api/v1/join/group',
                                                data: jsonStructures,
                                                
                                            }).success(function (data, status) {

                                                  refreshList(); // To call list all the group service..
                                                  $scope.isDisabled = false;

                                                });



                                  
                              };
                            













                                  $scope.saveSendInvite = function(){


                                         var jsonStructure = {
                                                'emailId': $scope.email,
                                                'firstName': $scope.first,
                                                
                                                'lastName': $scope.last,
                                                'phoneNo': $scope.mobileNo,
                                                'receiverstatus': 3,
                                                'groupResponse':[]
                                             };

                                            
                                          $http({
                                                method: 'POST',
                                                url: 'api/v1/user',
                                                data: jsonStructure,
                                                
                                            }).success(function (data, status) {

                                                console.log(data,status);

                                              refreshUserList();




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

                                    };










                              // To unable and disable the checkbox base on the last checked checkbox selection using ( ng-click="$last&&mytest(checked)" )..

                                  $scope.mytest=function(value){
                                  
                                    if(value)
                                      {
                                        $scope.showAddGroup = true;
                                        document.getElementById('Public').disabled = true;
                                        document.getElementById('VIP Group').disabled = true;
                                        document.getElementById('Private').disabled = false;
                                        refreshUserList();

                                        $scope.models.basket = []; // To make Drop section clear when new Group is added..
                                      }
                                    else
                                        {
                                          $scope.showAddGroup = false;
                                          document.getElementById('Public').disabled = false;
                                          document.getElementById('VIP Group').disabled = false;
                                          document.getElementById('Private').disabled = false;
                                      
                                        }

                                    };

                              // ------------------ private checkbox selection ends.. ----------------------





                              $scope.cancelEdit = function(){
                                $scope.disabled = false;
                                $scope.addNewUserDisable = false; // To enable the addNewUserDisable button once refreshed..
                                refreshList(); // To call refresh function..
                              };



                              $scope.privateChecked = function(toggleButtons){
                                //$scope.disabled = false;
                                // alert();
                                console.log(toggleButtons);
                                if(toggleButtons)
                                {
                                  $scope.showAddGroup = true;
                                }
                              else
                                {
                                  $scope.showAddGroup = false;
                                }
                              };







                      // -------------------- To change the page to Group details.. ---------------------------

                              $scope.showGroupDetails = function(index){
                                $scope.groupMain = true;
                                $scope.groupMainPage = false;


                            // ======================== To list the user inside the group.. =============================

                                 var listUserInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/groupmemberlist/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listUserInGroup.success(function (data, status, response) {


                                        console.log("User list",data);
                                        console.log("User list",data.UserList);

                                        $scope.userNameToDisplay = data.UserList;




                                         // --------------- To show status beside group name.. ----------------

                                                      

                                                      
                                                          var statusLists;
                                                          if($scope.groups[index].adminApproved=="Y")
                                                          {
                                                            statusLists="VIP Group";
                                                            $scope.groups[index].newClass='label label-warning'; // To change the color based on status.. 
                                                            $scope.groups[index].hideJoinBtn='Y';
                                                          }
                                                           if($scope.groups[index].isPrivate=="Y")
                                                          {
                                                            statusLists="Private";
                                                            $scope.groups[index].newClass='label label-danger'; // To change the color based on status.. 
                                                            $scope.groups[index].hideJoinBtn='Y';
                                                          }
                                                           if($scope.groups[index].isPublic=="Y")
                                                          {
                                                            statusLists="Public";
                                                             $scope.groups[index].newClass='label label-success'; // To change the color based on status.. 
                                                             $scope.groups[index].hideJoinBtn='Y';
                                                          }
                                                          //$scope.statusssssssss[i].isPublic=statusLists;
                                                        


                                                  // -------------------------------------------------------------------   


                                              console.log("jklklkklkkkkk",data.length);
                                              console.log("lkklkkkkk",data);
                                              console.log("jjjjjjjjj",$scope.groups[index]);


                                              // ------- To show Group status when clicked on view group details icon.. ------

                                              $scope.groupNameToDisplayss = $scope.groups[index].groupName;
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






                            // ======================== To list the group inside the group.. =============================

                                 var listEventsInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/listevnt/'+$scope.groups[index].groupId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listEventsInGroup.success(function (data, status, response) {

                                        //alert($scope.groups[index].groupId);

                                          console.log("data_________",data.EventList);

                                          $scope.eventListToDisplay = data.EventList;

                                      }); 


                            // ============================================================================================                 

                                    
                               };

                      // -------------------------------------------------------------------------------------    













                      $scope.showEventDetails = function(index){

                           // ======================== To list the group inside the group.. =============================

                                 var listEventsInGroup = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/messagelist/'+$scope.eventListToDisplay[index].EventId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  listEventsInGroup.success(function (data, status, response) {

                                        //alert($scope.groups[index].groupId);

                                          console.log("data_________",data);

                                          $scope.messageToDisplay = data;

                                          //$scope.eventListToDisplay = data.EventList;

                                      }); 


                            // ============================================================================================      

                      };    





                          // =============================== To show group name in private section.. ==========================================

                              var groupNameForPrivate;
                              $scope.disableEditandAdd = function()
                              {

                                refreshUserList(); // To call list all the users service..

                                 $scope.addButtonClickedCondition=false;

                                $scope.editButtonClickedCondition=false;
                                
                                addedUsersPrivate=[];

                              $scope.groupDetailsPrivate=$("input[name=group]").val();
                              
                              groupNameForPrivate=$("input[name=group]").val();



                              };

                         // ===========================================================================================================     




                         // ====================================== To save private users.. ================================================

//                               $scope.savePrivateUser = function()
//                               {

//                                 refreshUserList(); // To call list all the users service..

//                                  $scope.addButtonClickedCondition=false;

//                                 $scope.editButtonClickedCondition=false;

//                                 console.log(groupNameForPrivate)
//                                  var privateGroupJson={
//                                           "groupName":groupNameForPrivate,
//                                           "isPublic":"N",
//                                           "isPrivate":"Y",
//                                           "adminApproved":"N",
//                                           "addedUsers":addedUsersPrivate // Should send userID (1, 2, 3)
//                                           }



//                                                var GroupAdd = $http({
//                                                   method: 'POST',
//                                                   url: 'api/v1/group',
//                                                   data:privateGroupJson ,
//                                                   headers: {
//                                                       "Content-Type": 'application/json'
//                                                   }
//                                                 })
//                                             GroupAdd.success(function (data, status, response) {

//                                         refreshList(); // To call refresh function..

//                                         refreshUserList(); // To call list all the users service..

//                                           $scope.addUserToGroup = false;
//                                           $scope.groupMainPage = true;
//                                           $scope.addNewUserDisable = false;

//                                             $scope.disabled = false; // To enable action button when private group is submitted..
                                                
//                                                        refreshList(); // To call refresh function..
//                                                        $scope.showAddGroup = false;

//                                           // ---------------------- To show add users to private group section.. -----------------------

//                                                        // if(privateValue ==="Y")
//                                                        //  {
//                                                        //    $scope.addUserToGroup = true; // To show add user to private group section..
//                                                        //    $scope.groupMainPage = false; // To hide add group section..
//                                                        //  }

//                                           // -------------------------------------------------------------------------------------------


                                                 
//                                              }).error(function (data, status) {


//                                               // Condition for 409 error and to show alertbox..
//                                                   if (status === 409) {
//                                                     $scope.showAlertValidation = true;
//                                                     refreshList(); // To call refresh function..
//                                                   }

//                                             });




//                               };



                        // ===========================================================================================================





                              $scope.messageToDisplay;

                              // To change the page to Group details..
                              $scope.showGroupDetails1 = function(){
                                $scope.groupMainPage = true;
                                $scope.groupMain = false;
                                $scope.messageToDisplay=[];
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

                                       

                                          $scope.validateRequired = function(value) {
                                            if(!value){
                                                $scope.disabled=true; // To show the checkbox when the inputbox is empty and when clicked on save group button..
                                                $scope.addNewUserDisable=true;
                                                return "Required";
                                              }
                                            if(value){
                                                $scope.addNewUserDisable=false;
                                              }

                                              if(addButtonClicked)
                                             {

                                                //To check if the Checkbox (status) are checked..
                                                 if($scope.user.roles.length===0){
                                                    $scope.disabled = true;// To show the checkbox when the inputbox is empty and when clicked on save group button..
                                                    return $scope.user.roles.length ? false : 'Please select the group status.';
                                                  }
                                                  addButtonClicked = false;
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







                                     // function for pagination count..
                                        // setTimeout(function () {
                                        //  $scope.recordCounts = $('#table12').length;
                                        //  document.getElementById('totalCount').innerHTML = $scope.currentPage*10 + $scope.recordCounts;
                                        // },100);

                                        // $scope.currentPage = 0;
                                        // $scope.pageSize = 10;
                                        // // $scope.data = [];
                                        // $scope.numberOfPages=function(){

                                        //     if($scope.users){
                                        //     return Math.ceil($scope.users.length/$scope.pageSize);   
                                        //     }             
                                        // };
                                        

                                        // $scope.pageRecord= function(){
                                        //     setTimeout(function () {
                                        //     $scope.recordCounts = $('#table12').length;
                                        //      document.getElementById('totalCount').innerHTML = $scope.currentPage*10 + $scope.recordCounts;
                                        // },100);
                                        // };




                                        // To add users to perticular group..
                                        $scope.addUserToGroupBtn = function(){
                                            $scope.addUserToGroup = true;
                                            $scope.groupMainPage = false;
                                            refreshUserList(); // To call list all the users service..
                                        };


                                        $scope.backCancelbtn = function(){
                                           
                                           $scope.addNewUserDisable = false;
                                            $scope.addUserToGroup = false;
                                            $scope.groupMainPage = true;

                                            $scope.disabled = false; // To enable action button when private group is submitted..

                                            refreshList(); // To call refresh function..
                                            $scope.showAddGroup = false; // To hide the showAddGroup (add users to private group btn)..
                                        };


                                        // Show Div
                                        $scope.showDiv = function () {
                                        //  alert();
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
                                                $scope.models.basket.unshift(data);
                                                $scope.remove($scope.users, data);

                                              
                                            };


    }

    ]);

})();