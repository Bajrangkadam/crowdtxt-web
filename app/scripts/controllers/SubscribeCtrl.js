/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.subscribe',
        ['ct.directives.formSubmitter']
    );

    module.controller('SubscribeCtrl',
        ['$rootScope', '$scope', '$filter', '$location', '$http', '$routeParams', 'FormSubmitter',



            function SubscribeCtrl($rootScope, $scope, $filter, $location, $http, $routeParams, FormSubmitter) {


                console.log('WebCtrl module is called..');



                $scope.navbarCollapsed = true;



                $scope.keyValue = $location.search();

                console.log($scope.keyValue.isFree);

                $scope.newKeyValue = $scope.keyValue.isFree;

                console.log("$location.search()", $location.search());



                var showEventDetails = $http({
                    method: 'GET',
                    url: 'api/resource/plandetails',
                    //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                showEventDetails.success(function (data, status, response) {
                    data.data.data[0].amount = 300;
                    console.log("jjjjljjjjjjjjj", data.data);
                    $scope.planDetails = data.data.data;
                    $scope.planNameToDisplay = data.data.data.planname;
                    // $scope.dataPlanDetails = data.noOfUsers;
                    // $scope.noOfUsersToDisplay = data.noOfMsgs;
                    // $scope.amountToDisplay = data.planPrice;

                    // console.log("jjjjkklkj",planNameToDisplay);


                });

                document.getElementById("navBars").style.display = "none";

                $(".user").hide();// To hide User portal list in Admin portal..


                //alert("help");
                console.log('SubscribeCtrl module is called..');

                $scope.showPlanDetails = true;
                $scope.adminDetails = false;

                $scope.showAdminDetailPage = function (index) {
                    $scope.adminDetails = true;
                    $scope.showPlanDetails = false;


                    console.log('cpme here===', index);
                    console.log('cpme here===>>>>>>>', $scope.planDetails);
                    console.log('cpme here111111===>>>>>>>', $scope.planDetails[index].planid);

                    $scope.planDetails[index].planid;
                    // $scope.indexCount = index;

                    $scope.planID = $scope.planDetails[index].planid;



                    var showEventDetailss = $http({
                        method: 'GET',
                        url: 'api/resource/plandetails/' + $scope.planDetails[index].planid,
                        //data: {"sort":[{"property":"","dir":""}],"filters":[{"property":"startw","operator":"","value":"opera"}],"filterType":""},
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })
                    showEventDetailss.success(function (data, status, response) {

                        $scope.planNameToDisplay = data.data.data[0].planname;

                        // $scope.dataPlanDetails = data.noOfUsers;
                        // $scope.noOfUsersToDisplay = data.noOfMsgs;
                        // $scope.amountToDisplay = data.planPrice;

                        // console.log(noOfUsersToDisplay);

                    });
                };

                $scope.goToPlanPage = function () {
                    $scope.adminDetails = false;
                    $scope.showPlanDetails = true;
                };



                $scope.adminDetailsSubmit = function () {

                    $scope.loading = true;

                    if ($scope.myform.$valid) {
                    } else {
                        $scope.submitted = true;
                    }

                    if ($scope.password != $scope.confirmPassword) {
                        $scope.passwordMatch = true;
                        return false;
                    } else {
                        $scope.passwordMatch = false;


                        var companyJson = {
                            "companyName": $scope.firstName,
                            "companyEmail": $scope.email,
                            "companyTaxid": $scope.planID,
                            "companyPassword": $scope.confirmPassword,
                        }





                        var companyJsonAdd = $http({
                            method: 'POST',
                            url: 'api/resource/company/signup',
                            data: companyJson,
                            headers: {
                                "Content-Type": 'application/json'
                            }
                        })
                        companyJsonAdd.success(function (data, status, response) {

                            $(".showAlertOnSubscribtion").show(); // To show Toast Notification when clicked on delete..
                            window.setTimeout(function () {
                                $(".showAlertOnSubscribtion").hide();
                                data = data.data;
                                console.log('data====', data);
                                if (data.planname && data.planname != "Free") {
                                    $scope.loading = false;
                                    $scope.redirectMe(data);

                                } else {
                                    window.location = '#/login';
                                }
                            }, 3000)
                        });
                        companyJsonAdd.error(function (data, status, response) {
                            console.log('status=1==', status, data);
                            if (status == 409) {
                                alert(data && data.message)
                                console.log('status==2=', status);
                                $(".showAlertOnValidation").show(); // To show Toast Notification when clicked on delete..
                                window.setTimeout(function () {
                                    $(".showAlertOnValidation").hide();
                                }, 3000)
                                window.location = '#/web';
                            } else {
                                alert(data && data.message)
                                window.location = '#/web';
                            }

                        });
                    }
                };


                $scope.redirectMe = function (data) {
                    var id = 0
                    if (data.companyPlanId) {
                        id = data.companyPlanId;
                    }
                    var url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
                    var method = 'POST';
                    var params = {
                        business: 'krrkarthik86@gmail.com',
                        cmd: '_cart',
                        upload: 1,
                        item_name_1: data.planName ? data.planName : 'Pro',
                        amount_1: data.planPrice ? data.planPrice : 15,
                        quantity_1: 1,
                        currency_code: 'USD',
                        'return': 'http://crowdaround.net:7080/crowdtxt/#/login?id=' + id,
                        cancel_return: 'http://crowdaround.net:7080/crowdtxt/#/login?id=' + id
                    };

                    FormSubmitter.submit(url, method, params);
                };

            }

        ]);

})();