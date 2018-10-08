/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.planBilling',
        ['ct.directives.formSubmitter']
    );

    module.controller('PlanBillingCtrl',
        [ '$rootScope', '$scope', '$location', '$filter', '$http', '$routeParams','FormSubmitter',
        

    function PlanBillingCtrl($rootScope, $scope, $location, $filter, $http, $routeParams,FormSubmitter) {

        document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('PlanBillingCtrl module is called..');



        refreshPlan();



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




        var keyValue= $location.search();
            console.log("----->",keyValue);
            if(keyValue.id && keyValue.id!="" )
            {
                   if(typeof keyValue.id === "string"){
                   }
                      if(typeof keyValue.id === "boolean"){
                         return ;
                      }
                 $http({
                              method: 'PUT',
                              url: 'api/v1/company/plan/'+keyValue.id,
                              data:keyValue,
                              headers: {
                                  "Content-Type": 'application/json'
                              }
                           })
                      .success(function (data, status, response) {

                            refreshPlan();

                   });
             }





        function refreshPlan(){



            var showEventDetailss = $http({
                                method: 'GET',
                                url: 'api/v1/company/current/plan',
                                //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                headers: {
                                    "Content-Type": 'application/json'
                                }
                            })
                      showEventDetailss.success(function (data, status, response) {


                        $scope.planStartDate = data.startDate;
                        $scope.planEndDate = data.endDate;
                        $scope.planAmountPaid = data.amountPaid;
                        $scope.planPlanName = data.planName;
                        $scope.planNoOfUsers = data.noOfUsers;
                        



             });

           };



          $scope.renewPlan = function(){
             var renewPlan = $http({
                                method: 'GET',
                                url: 'api/v1/company/plan/renew',
                                //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                headers: {
                                    "Content-Type": 'application/json'
                                }
                            })
                      renewPlan.success(function (data, status, response) {

                               $scope.redirectMe(data);
                       
             });
          };


          $scope.viewPlanHistory = function(){

             // $scope.viewCompanyPlanHistory = true;

              var planHistory = $http({
                                method: 'GET',
                                url: 'api/v1/company/transactions',
                                //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                headers: {
                                    "Content-Type": 'application/json'
                                }
                            })
                      planHistory.success(function (data, status, response) {

                               $scope.viewCompanyPlanHistory = true;
                               $scope.showPlanDetails = false;

                               $scope.plansHistorys = data.companyPlans;
                       
             });

          };







        $scope.showPlanDetails = false;

        $scope.showPlanPage = function(){
           

              var showEventDetails = $http({
                                                            method: 'GET',
                                                            url: 'api/resource/plandetails',
                                                            //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                                            headers: {
                                                                "Content-Type": 'application/json'
                                                            }
                                                        })
                                                  showEventDetails.success(function (data, status, response) {

                                        console.log("jjjjljjjjjjjjj",data);

                                         $scope.showPlanDetails = true;
                                         $scope.viewCompanyPlanHistory = false;

                                        $scope.planDetails = data;
                                        $scope.planNameToDisplay = data.planName;
                                        // $scope.dataPlanDetails = data.noOfUsers;
                                        // $scope.noOfUsersToDisplay = data.noOfMsgs;
                                        // $scope.amountToDisplay = data.planPrice;

                                        // console.log("jjjjkklkj",planNameToDisplay);
                                       

                                      });
        };




        $scope.showAdminDetailPage = function(index){
            // $scope.adminDetails = true;
            // $scope.showPlanDetails = false;


              console.log(index);

              $scope.planDetails[index].planId;
                // $scope.indexCount = index;

                $scope.planID=$scope.planDetails[index].planId;
                


              var showEventDetailss = $http({
                                method: 'GET',
                                url: 'api/v1/company/changeplan/'+$scope.planDetails[index].planId,
                                //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                                headers: {
                                    "Content-Type": 'application/json'
                                }
                            })
                      showEventDetailss.success(function (data, status, response) {

                            $scope.planIdss = data.id;
                            $scope.planPricess = data.price;
                            $scope.planitemName = data.itemName;

                        $scope.planNameToDisplay = data.planName;

                        $scope.redirectMe(data);


                        // $scope.dataPlanDetails = data.noOfUsers;
                        // $scope.noOfUsersToDisplay = data.noOfMsgs;
                        // $scope.amountToDisplay = data.planPrice;

                        // console.log(noOfUsersToDisplay);

          });
        };





        $scope.cancelPlanPage = function(){
             $scope.showPlanDetails = false;
             $scope.viewCompanyPlanHistory = false;
        };


        $scope.redirectMe = function(data) {

            var id=0
            if(data.id){
                id=data.id;
            }
            var url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
            var method = 'POST';
            var params = {
                business: 'krrkarthik86@gmail.com',
                cmd: '_cart',
                upload:1,
                item_name_1:data.itemName?data.itemName:'Pro',
                amount_1:data.price?data.price:15,
                quantity_1:1,
                currency_code:'USD',
                'return':'http://crowdaround.net:7080/crowdtxt/#/planBilling?id='+id,
                cancel_return:'http://crowdaround.net:7080/crowdtxt/#/planBilling'
            };

            FormSubmitter.submit(url, method, params);
        };




    }

    ]);

})();