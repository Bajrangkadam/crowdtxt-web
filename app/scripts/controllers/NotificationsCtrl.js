/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.notifications',
        []
    );

    module.controller('NotificationsCtrl',
       [   '$rootScope', '$scope', '$filter', '$http','$routeParams',
        

    function NotificationsCtrl($rootScope, $scope, $filter, $http,$routeParams) {

      document.getElementById("navBars").style.display="block";



      // ==================== To avoide Admin to access user pages.. ===============

            var userRoleDatass = window.localStorage['userRoleData'];
                $scope.userRoleDatas = userRoleDatass;

              var groupAdminss = window.localStorage['groupAdmin'];
                $scope.groupAdmin = groupAdminss;

                console.log("$scope.groupAdmin",$scope.groupAdmin);


                if($scope.userRoleDatas=='ROLE_USER' && $scope.groupAdmin=='Y'){

                   $(".admin").hide();// To hide Admin portal list in User portal..
                   $(".user").show();// To hide User portal list in Admin portal..

                }

                if($scope.userRoleDatas=='ROLE_ADMIN' && $scope.groupAdmin=='Y'){
   
                   $(".user").hide();// To hide Admin portal list in User portal..
                   $(".admin").show();// To hide User portal list in Admin portal..

                }
                

                if($scope.userRoleDatas!='ROLE_ADMIN' && $scope.groupAdmin!='Y'){

                   window.location = '#/login';

                }

      // ============================================================================





        
        //alert("help");
        console.log('NotificationsCtrl module is called..');






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




      // ------------------ To have pagination.. ---------------------

          $scope.$watchCollection('pagination', function(newValue, oldValue) {
           refreshList();

          });
         $scope.$watchCollection('sort', function(newValue, oldValue) {
           refreshList();

          });

      // -----------------------------------------------------------------   







 $scope.formatTimestampToDates = function(timestamp) {
                    // TODO: validate the timestamp
                    // var c=moment(timestamp).tz('Asia/Kolkata').format("MM-DD-YYYY hh:mm A") ;
                    var c=moment(timestamp).format("MM-DD-YYYY - hh:mm A") ;
                     console.log(c);
               return c;
            }



             function refreshList()
                                            {

                var showEventDetails = $http({
                                      method: 'GET',
                                      url: 'api/v1/notifications',
                                      //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
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
                            showEventDetails.success(function (data, status, response) {



                     $scope.pagination.totalRecords = data.totalRecords; // To have pagination..


                     

                    console.log("kkkkkkllll-----------------",data);
                    console.log("kkkkkklllljj-----------------",data.totalRecords);

                    $scope.notificationRecords = data.records;

                    $scope.notificationCount = data.totalRecords;



                    window.localStorage['notificationCount'] = data.totalRecords;
                    $rootScope.notificationCount = data.totalRecords;


                    var notificationID = [];

                    for(var i=0; i<$scope.notificationRecords.length; i++){
                        notificationID.push($scope.notificationRecords[i].notificationId)
                       }

                                           $scope.notificationId = notificationID;

                                           // console.log($scope.notificationId);

                });

              }

                refreshList(); // To call list all the notifications service..

       

                  $scope.isDisabled = true;

         $scope.requestDecline = function(index){

             var notificationDecline = {
                  "acceptOrDecline": "N"
                }

                   var postComments = $http({
                      method: 'POST',
                      url: 'api/v1/notification/response/'+$scope.notificationId[index],
                      data: notificationDecline ,
                      headers: {
                          "Content-Type": 'application/json'
                      }
                    })
                postComments.success(function (data, status, response) {

                    refreshList(); // To refresh the notification list..

                });

        };








        $scope.requestAccept = function(index){

          // console.log("jjjjjjjjjjjj_____________",$scope.notificationId[index]);

             var notificationAccept = {
                  "acceptOrDecline": "Y"
                }

                   var postComments = $http({
                      method: 'POST',
                       url: 'api/v1/notification/response/'+$scope.notificationId[index],
                      data: notificationAccept ,
                      headers: {
                          "Content-Type": 'application/json'
                      }
                    })
                postComments.success(function (data, status, response) {

                    refreshList(); // To refresh the notification list..

                });


        };




    }

    ]);

})();