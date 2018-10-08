/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.user',
        []
    );


    module.controller('UserCtrl',
        [   '$rootScope', '$scope', '$filter', '$http',

    function UserCtrl($rootScope, $scope, $filter, $http) {

      document.getElementById("navBars").style.display="block";



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



      $scope.sort=[{property: "createdDate", dir: "DESC"}]; // To short new user first when added..


      // ------------------- To filter the users.. ----------------------

        $scope.$watchCollection('filters', function(newValue, oldValue) {
            console.log("cwatch");
             if(newValue){
               $scope.xyz();
               refreshList();
             }
        });

      // -----------------------------------------------------------------



      // ------------------ To have pagination.. ---------------------

         $scope.$watchCollection('pagination', function(newValue, oldValue) {
           refreshList();

          });
         $scope.$watchCollection('sort', function(newValue, oldValue) {
           refreshList();

          });

      // -----------------------------------------------------------------   

       

      $(".user").hide();// To hide User portal list in Admin portal..
 
    
              // console.log('userCtrl module is called..');

                                  

              $scope.btnDisabled = "false";



//data: {sort: [], filters: [{"property":"receiverFirstName","operator":"startw","value":"sam"}], filterType: "and"},





                 // -------------------------------------- Funtion to refresh the list.. -----------------------------------------------------

                                             $scope.filterVal=[];
                                           
                                          function refreshList()
                                            {
                                              var promisewq = $http({
                                                            method: 'POST',
                                                            url: 'api/v1/user/list',
                                                            data: {sort: $scope.sort, filters: $scope.filterVal, filterType: "and"},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            },

                                      // ------------------ To have pagination.. ---------------------

                                                            params:{
                                                                        page:$scope.pagination.page,
                                                                        limit: $scope.pagination.limit
                                                                    }

                                      // -----------------------------------------------------------------  

                                                        })
                                              promisewq.success(function (data, status, response) {
                                              
                                                     $scope.users = data.records;
                                                      console.log(data);
                                                      $scope.pagination.totalRecords = data.totalRecords; // To have pagination..
                                                      
                                             });
                                            };

                                          


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
                                                var f1,f2,f3,f4;
                                                  var filterArray=[];

                                                  // For jobName filter
                                                  if($scope.filters.receiverFirstName){
                                                    
                                                  f1=  {property: "receiverFirstName", operator: "startw", value: $scope.filters.receiverFirstName};
                                                  filterArray.push(f1);
                                                  }
                                                  if($scope.filters.receiverLastName){
                                                        f2=  {property: "receiverLastName", operator: "startw", value: $scope.filters.receiverLastName};
                                                        filterArray.push(f2);
                                                  }
                                                  if($scope.filters.receiverEmail)
                                                  {
                                                    f3= {property: "receiverEmail", operator: "startw", value: $scope.filters.receiverEmail};
                                                      filterArray.push(f3);
                                                  }
                                                     if($scope.filters.receiverPhoneNo)
                                                  {
                                                    f4= {property: "receiverPhoneNo", operator: "startw", value: $scope.filters.receiverPhoneNo};
                                                      filterArray.push(f4);
                                                  }
                                                    $scope.filterVal=filterArray;
                                            }
                                          };

                            // =======================================================================================
                            


                 // ---------------------------------------------------------------------------------------------------------------------------------------




                        // -------------------- To enable and disable (Prev and Next button) and check the page count.. -------------------------
                                     
                                 

                                      //   var promisewq = $http({
                                      //                       method: 'POST',
                                      //                       url: 'api/v1/user/list?limit=10&page='+$scope.pageNumberCount,
                                      //                       data: {sort: [], filters: [], filterType: "and"},
                                      //                       headers: {
                                      //                           "Content-Type": 'application/json'
                                      //                       }
                                      //                   })
                                      //        promisewq.success(function (data, status, response) {
                                              
                                      //                 $scope.users = data.records;
                                      //                 console.log(data);
                                      //                 $scope.pagination.totalRecords = data.totalRecords;
                                      //                 $scope.pagination.page=data.pageNumber;
                                                    


                                      //        });
                                      // };


                      // -------------------------------------------------------------------------------------------------------------------



                             // ------------------------------ Set timeout to alert box.. -------------------------------

                                // window.setTimeout(function() {
                                //     $(".slideDown").fadeTo(500, 0).slideUp(500, function(){
                                //         $(this).hide();
                                //     });
                                //   }, 5000);

                             // -----------------------------------------------------------------------------------------





                                      // ------------------- To change the color of the Inactive row.. ---------------------

                                                           $scope.set_color = function (user) {

                                                            if (user.receiverstatus =="UnSubscribed" || user.receiverstatus =="UnSubscribed") {
                                                                return {
                                                                  color: "#CDCED0"
                                                                }
                                                            }
                                                           };

                                      // -----------------------------------------------------------------------------------------

                            

                               

                                    $scope.statuses = [
                                        {value: 1, text: 'Subscribed'},
                                        {value: 2, text: 'Unsubscribed'},
                                        {value: 3, text: 'Invite sent'}
                                      ]; 

                                      // $scope.changeColor = function(){
                                      //   if(user.value===3){
                                      //     alert("Hey here you have InActive values..");
                                      //     return'{color: red}'
                                      //   }
                                      //   console.log("klhjkhjkhhjk",value);
                                      // };





                                      $scope.groups = [];
                                      $scope.loadGroups = function() {
                                        return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
                                          $scope.groups = data;
                                        });
                                      };

                                      // $scope.showGroup = function(user) {
                                      //   if(user.group && $scope.groups.length) {
                                      //     var selected = $filter('filter')($scope.groups, {id: user.group});
                                      //     return selected.length ? selected[0].text : 'Not set';
                                      //   } else {
                                      //     return user.groupName || 'Not set';
                                      //   }
                                      // };


                                      var addButtonClicked; // Variables for addButton and Edit button..
                                      var editButtonClicked; // Variables for addButton and Edit button..
                                      $scope.showStatus = function(user) {
                                      var selected = [];


                              // ---------------- To convert status value from 1 to String "Active".. --------------


                                      var statussss;
                                      if(user.receiverstatus === 'Subscribed'){
                                        statussss = 1;
                                      }
                                      if(user.receiverstatus === 'UnSubscribed'){
                                        statussss = 2;
                                      }
                                      if(user.receiverstatus === 'UnSubscribed'){
                                        statussss = 2;
                                      }
                                      if(user.receiverstatus === 'Invite sent'){
                                        statussss = 3;
                                      }

                                      if(user.receiverstatus) {
                                          selected = $filter('filter')($scope.statuses, {value: statussss});
                                        }
                                        return selected.length ? selected[0].text : 'Not set';
                                      };


                             // -----------------------------------------------------------------------------------------

                                      



                                       $scope.uploadData = function(){
                                            window.location='#/uploadUserData';
                                        };


                            // -------- To validate the input fieldsby using (onbeforesave="validateRequired($data)") in span.. ---------

                                          
                                            $scope.validateRequired = function(data, valid, user) {


                                              console.log("user",user);
                                              console.log("$scope.user",$scope.user);
                                             
                                            if(!(valid==true && data!=undefined)){




                                                if(!data){

                                                  console.log("Entered value",data);
                                                  $scope.addNewUserDisable=true;
                                                  return "Required valid field";

                                                 }


                                           }

                                            // if(data){
                                             
                                            //   $scope.addNewUserDisable=false;
                                            //  }

                                          };

                            //--------------------- Validation end -------------------
                                      



                             // --------------------- To Save user.. ---------------------------------------------         

                                    $scope.saveUser = function (data, user) {


                                       $scope.loading = true ;
                                      console.log(data)
                                      var statussss;
                                      if(data.receiverstatus === 1){
                                        statussss = 'Subscribed';
                                      }

                                      if(data.receiverstatus === 2){
                                        statussss = 'Unsubscribed';
                                      }

                                      if(data.receiverstatus === 3){
                                        statussss = 'Invite sent';
                                      }
                                    
                                        
                                



                            // ----------------------- When clicked on Add button below function is called.. ------------------
                                      
                                      if(addButtonClicked)
                                      {

                                      // console.log("Test Name", data);

                                      if(data.mobileNo==undefined){
                                         $scope.dataJson= [{
                                                        'firstName':data.first,
                                                        'lastName':data.last,
                                                      //'emailId':data.email,
                                                        'emailid':data.email,
                                                        'phone':"",
                                                        'receiverstatus':statussss,
                                                        'groupResponse':[]
                                                        }]
                                      } else {



                                          $scope.dataJson= [{
                                                        'firstName':data.first,
                                                        'lastName':data.last,
                                                      //'emailId':data.email,
                                                        'emailid':data.email,
                                                        'phone':data.mobileNo,
                                                        'receiverstatus':statussss,
                                                        'groupResponse':[]
                                                        }]
                                              }

                                                        // console.log("$scope.dataJson", data1);

                                                                  console.log("$scope.dataJson....",  $scope.dataJson);

                                       

                                                $http({
                                                      method: 'POST',
                                                      url: 'api/v1/user',
                                                      data: $scope.dataJson,
                                                      
                                                  }).success(function (data, status) {

                                                       $scope.btnDisabled = "false";
                                                         $scope.loading = false ;
                                                      console.log(data,status);


                                                    refreshList(); // To call refresh function..

                                            // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertAddClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertAddClass").hide();
                                                            },3000)

                                            // ===============================================================================================================

                                             
                                                
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

                            // =============================================================================================



                                              addButtonClicked=false;
                                             }



                            // -----------------------------------------------------------------------------------------





                            // -------------------------- When clicked on Edit button below function is called..----------------------------------
                                      
                                             if(editButtonClicked)
                                             {


                                              if(data.mobileNo==undefined){
                                                     $scope.dataJson= [{
                                                        'firstName':data.first,
                                                        'lastName':data.last,
                                                      //'emailId':data.email,
                                                        'emailid':data.email,
                                                        'phone':"",
                                                        'receiverstatus':statussss,
                                                        'groupResponse':[]
                                                                }]
                                              } else {

                                                    $scope.dataJson= [{
                                                        'firstName':data.first,
                                                        'lastName':data.last,
//                                                         'emailId':data.email,
                                                        'emailId':data.email,
                                                        'phoneNo':data.mobileNo,
                                                        'receiverstatus':statussss,
                                                        'groupResponse':[]
                                                        }]
                                              }

                                                        // console.log("$scope.dataJson", data1);

                                                                
                                              var userId= user.receiverConfigId;
                                                        
                                            
                                            user.receiverConfigId = $scope.users.length + 1;
                                            angular.extend(data, {
                                                receiverConfigId: user.receiverConfigId
                                            });
                                          $http({
                                                method: 'PUT',
                                                url: 'api/v1/user/'+userId,
                                                data: $scope.dataJson[0],
                                                
                                            }).success(function (data, status) {

                                               $scope.btnDisabled = "false";


                                                    refreshList(); // To call refresh function..

                                             // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertOnSuccessEditEntry").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnSuccessEditEntry").hide();
                                                            },3000)

                                            // ===============================================================================================================

                                                  

                                                
                                            }).error(function (data, status) {
                                                console.log(data,status);

                                                $scope.btnDisabled = "false";

                                          // =================== To have alert on creating same emailID or mobileNo.. ===================

                                                  if (status === 409) {
                                                    $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertOnValidation").hide();
                                                            },3000)
                                                  }

                                                  refreshList(); // To call refresh function..

                                           // ===========================================================================================



                                            });
                                               editButtonClicked=false;
                                             }


                                // -----------------------------------------------------------------------------------------




                                        }; // Save User function ends here..



                                // ------------------------------------- End of Save user.. ----------------------------------------

                                        

                                         $scope.editRow = function(){
                                          $scope.btnDisabled = "true";
                                           editButtonClicked=true;
                                           addButtonClicked=false;
                                           $scope.addNewUserDisable=true;
                                         };

                                          $scope.cancelEdit = function(){
                                            $scope.addNewUserDisable=false;
                                            $scope.btnDisabled = "false";
                                            
                                          };




                                      // To remove blank input fields when clicked on Cancel..
                                       $scope.removeUser1 = function(index) {
                                         $scope.users.splice(index, 1);
                                         $scope.addNewUserDisable=false;
                                      };

                                      
                                  

                              // ------------------- To call service to view groups.. ----------------------------

                                      $scope.getGroupInfo = function(index){
                                      
                                         var getGroupInfo = $http({
                                                            method: 'GET',
                                                            url: 'api/v1/groups/'+$scope.users[index].receiverConfigId,
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                             getGroupInfo.success(function (data, status, response) {

                                                    
                                                      console.log("List of users",data.length);
                                                   
                                                      if(data.length>0)
                                                      $scope.listofgroup=data[0].groupResponse;
                                                    else

                                                       $scope.listofgroup=[{groupName:"No Groups For this User"}];
                                                    
                                                    // $( "#dropdownMenu2" ).trigger( "click" );
                                                 
                                             });

                                      };

                              // ----------------------------------------------------------------------------------
                              

                              // ----------------------------- remove user -----------------------------------------
                                             

                                              $scope.removeUser = function(index) {
                                                // $scope.users.splice(index, 1);
                                                // $scope.addNewUserDisable=false; // To unable ( Add new user ) button after clicking cancel..
                                               
                                                        console.log("llllllll",$scope.users[index].receiverstatus);

                                                        console.log("jjjjjjjj____________",$scope.btnDisabled);

                                              // ================ To disable delete option when the user is already deleted.. =================
                                              
                                                         if($scope.users[index].receiverstatus=="UnSubscribed" || $scope.btnDisabled=="true"){
                                                          return;
                                                         }

                                              // =============================================================================================         
                                                       
                                                $(".showAlertClass").hide(); // To hide every time you click on delete and show new alert..
                                                          
                                                 var deleteUser = $http({
                                                       method: 'DELETE',
                                                       url: 'api/v1/user/'+$scope.users[index].receiverConfigId
                                                       })
                                                       deleteUser.success(function (data, status, response) {

                                         // ================================ To show alert on deleting the user.. =========================================

                                                          $(".showAlertClass").show(); // To show Toast Notification when clicked on delete..
                                                             window.setTimeout(function() {
                                                              $(".showAlertClass").hide();
                                                            },3000)

                                         // ===============================================================================================================

                                                          // To refresh the user list..
                                                    //        var promisewq = $http({
                                                    //                       method: 'POST',
                                                    //                       url: 'api/v1/user/list?limit=10&page=1',
                                                    //                       data: {sort: [], filters: [], filterType: "and"},
                                                    //                       headers: {
                                                    //                           "Content-Type": 'application/json'
                                                    //                       }
                                                    //                   })
                                                    //        promisewq.success(function (data, status, response) {
                                                    //               $scope.users = data.records;
                                                    //                 console.log(data);
                                                                   


                                                               
                                                    //        });

                                                          refreshList(); // To call refresh function..
                                                       });

                                                        refreshList(); // To call refresh function..

                                                       deleteUser.error(function (data, status, response) {

                                                       });
                                                 };

                              //-------------------------------------------------------------------------------------------



                                      // add user
                                      // $scope.addUser = function() {
                                      //    $scope.hideButton=true;         
                                      //   $scope.inserted = {
                                      //     id: $scope.users.length+1,
                                      //     name: '',
                                      //     status: null,
                                      //     group: null 
                                      //   };
                                      //   $scope.users.unshift($scope.inserted);
                                      // };









                                      // ------------------------- add user ------------------------------------------

                                       $scope.addNewUserDisable = false; // To unabel ans disable ( Add new user ) button..

                                        $scope.addUser = function () {
                                          addButtonClicked=true;
                                           editButtonClicked=false;

                                           $scope.btnDisabled = "true";
                                          

                                            // To hide buttons..
                                            $scope.hideButton=true; 

                                            // ------------------ To push the static values to json data.. ----------------

                                             var limitedusers = $http({
                                                  method: 'GET',
                                                  url: 'api/v1/totalUser',
                                                  //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                  headers: {
                                                      "Content-Type": 'application/json'
                                                  }
                                              })
                                            limitedusers.success(function (data, status, response) {

                                                  
                                                  if(data.reamining==0){
                                                   
                                                   $(".userLimitOver").show(); // To show Toast Notification when clicked on delete..
                                                     window.setTimeout(function() {
                                                      $(".userLimitOver").hide();
                                                    },3000)

                                                  } else{
                                                     
                                                 

                                            $scope.inserted = {
                                                id: -1,
                                                name: '',
                                                status: null,
                                                group: null
                                            };
                                            $scope.users.unshift($scope.inserted);


                                          // To unabel ans disable ( Add new user ) button..
                                             $scope.addNewUserDisable = true;
                                             return false;

                                              }
                                                });

                                        };  

                                        // ------------------------- add user End.. ----------------------------------







                                      // To show Save and cancel buttons..

                                      $scope.showButtons = function(index){
                                        //$scope.hideButton(index)=false;
                                        // alert(index);
                                      };






                                     // function for pagination count..
                                        // setTimeout(function () {
                                        // $scope.recordCounts = $('#table12 > tbody > tr').length;
                                        //  document.getElementById('totalCount').innerHTML = $scope.currentPage*10 + $scope.recordCounts;
                                        // },100);

                                        // $scope.currentPage = 0;
                                        // $scope.pageSize = 10;
                                        // // $scope.data = [];
                                        // $scope.numberOfPages=function(){
                                        //     return Math.ceil($scope.users.length/$scope.pageSize);                
                                        // };
                                        

                                        // $scope.pageRecord= function(){
                                        //     setTimeout(function () {
                                        //     $scope.recordCounts = $('#table12 > tbody > tr').length;
                                        //      document.getElementById('totalCount').innerHTML = $scope.currentPage*10 + $scope.recordCounts;
                                        // },100);
                                        // };



                                        // To send invite and toggle the text to Resend..
                                            $scope.buttonText = 'Save & send invite';
                                            $scope.sendInvite = function() {
                                                $scope.buttonText = 'Resend invite';
                                               // $scope.btnDisabled = "false";


                                            };





                                            // To upload user list..

                                            $scope.showUploadUserList = function(){
                                              $scope.userList = true;
                                              $scope.uploadUserDetails = true;
                                            };

                                            $scope.showUserList = function(){
                                              $scope.userList = false;
                                              $scope.uploadUserDetails = false;
                                            };





    }

     ]);

})();