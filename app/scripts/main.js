// console.log('\'Allo \'Allo!');

// $(document).ready(function(){
    
 
//     $('button.sec-cus-buttons').click(function(){

//         if ($("button.sec-cus-buttons[data-url]").length) {
//             var data = $(this).data("url");
//             console.log(data);
//             window.location.href=data;
//         } else {
//             console.log("No data attribute is present");
//         }
//     });
// });


(function () {
    'use strict';


var baseHtmlPath = 'views/';


var ctApp = angular.module('ctApp', ['ngRoute','ct.controllers.main', 'ui.bootstrap',
        'xeditable','ngSanitize','adaptv.adaptStrap','checklist-model','ngTagsInput','ngCookies','angularFileUpload','ct.directives.formSubmitter']);

console.log("Main.js Ctrl is called..");



  //document.getElementById("navBars").style.display="none";

 //        $(".user").hide(); // To hide User portal list in Admin portal..
 //        $(".admin").hide();

ctApp.config(function ($sceProvider) {
     $sceProvider.enabled(true);
});

ctApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/help', {
            templateUrl: baseHtmlPath + 'help.html',
            controller: 'HelpCtrl'
        })

        .when('/initialSetup', {
            templateUrl: baseHtmlPath + 'initialSetup.html',
            controller: 'InitialSetupCtrl'
        })

         .when('/changePassword', {
            templateUrl: baseHtmlPath + 'changePassword.html',
            controller: 'ChangePasswordCtrl'
        })

        .when('/initialSetupOne', {
            templateUrl: baseHtmlPath + 'initialSetupOne.html',
            controller: 'InitialSetupOneCtrl'
        })

        .when('/initialSetupTwo', {
            templateUrl: baseHtmlPath + 'initialSetupTwo.html',
            controller: 'InitialSetupTwoCtrl'
        })

        .when('/initialSetupThree', {
            templateUrl: baseHtmlPath + 'initialSetupThree.html',
            controller: 'InitialSetupThreeCtrl'
        })

        .when('/home', {
            templateUrl: baseHtmlPath + 'home.html',
            controller: 'HomeCtrl'
        })

        .when('/updateEventDetails', {
            templateUrl: baseHtmlPath + 'updateEventDetails.html',
            controller: 'UpdateEventDetailsCtrl'
        })

        .when('/user', {
            templateUrl: baseHtmlPath + 'user.html',
            controller: 'UserCtrl'
        })

        .when('/planBilling', {
            templateUrl: baseHtmlPath + 'planBilling.html',
            controller: 'PlanBillingCtrl'
        })

        .when('/forgotPassword', {
            templateUrl: baseHtmlPath + 'forgotPassword.html',
            controller: 'ForgotPasswordCtrl'
        })

        .when('/forgotPasswordGetLink', {
            templateUrl: baseHtmlPath + 'forgotPasswordGetLink.html',
            controller: 'ForgotPasswordGetLinkCtrl'
        })

        .when('/employeeSignup', {
            templateUrl: baseHtmlPath + 'employeeSignup.html',
            controller: 'EmployeeSignupCtrl'
        })

        .when('/settingsUser', {
            templateUrl: baseHtmlPath + 'settingsUser.html',
            controller: 'SettingsUserCtrl'
        })

        .when('/group', {
            templateUrl: baseHtmlPath + 'group.html',
            controller: 'GroupCtrl'
        })

        .when('/event', {
            templateUrl: baseHtmlPath + 'event.html',
            controller: 'EventCtrl'
        })

        .when('/settings', {
            templateUrl: baseHtmlPath + 'settings.html',
            controller: 'SettingsCtrl'
        })

        .when('/tripNotification', {
            templateUrl: baseHtmlPath + 'tripNotification.html',
            controller: 'TripNotificationCtrl'
        })

        .when('/dashboard', {
            templateUrl: baseHtmlPath + 'dashboard.html',
            controller: 'DashboardCtrl'
        })

        .when('/subscribe', {
            templateUrl: baseHtmlPath + 'subscribe.html',
            controller: 'SubscribeCtrl'
        })

        .when('/notifications', {
            templateUrl: baseHtmlPath + 'notifications.html',
            controller: 'NotificationsCtrl'
        })

          .when('/login', {
            templateUrl: baseHtmlPath + 'login.html',
            controller: 'LoginCtrl'
        })

          .when('/trip', {
            templateUrl: baseHtmlPath + 'trip.html',
            controller: 'TripCtrl'
        })

           .when('/group_user', {
            templateUrl: baseHtmlPath + 'group_user.html',
            controller: 'Group_userCtrl'
        })

           .when('/event_user', {
            templateUrl: baseHtmlPath + 'event_user.html',
            controller: 'Event_userCtrl'
        })

           .when('/emailInvite', {
            templateUrl: baseHtmlPath + 'emailInvite.html',
            controller: 'EmailInviteCtrl'
        })

           .when('/mobileInvite', {
            templateUrl: baseHtmlPath + 'mobileInvite.html',
            controller: 'MobileInviteCtrl'
        })

           .when('/uploadUserData', {
            templateUrl: baseHtmlPath + 'uploadUserData.html',
            controller: 'UploadUserDataCtrl'
        })

            .when('/web', {
            templateUrl: baseHtmlPath + 'web.html',
            controller: 'WebCtrl'
        })


      
        .otherwise({
         redirectTo: '/web'
         });
});



ctApp.config(['$httpProvider', function ($httpProvider) {

if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


    
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
            return {
                'responseError': function (rejection) {
                    var status = rejection.status;
                    var config = rejection.config;
                    var method;
                    var url;
                    if (config) {
                        method = config.method;
                        url = config.url;
                    }

                    if (status == 401) {
                        // $location.path("/login");
                        $location.path("/login");
                    } else {
                        $rootScope.error = method + " on " + url + " failed with status " + status;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    );

    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
     * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location, $cookieStore) {
            return {
                'request': function (config) {
                    var authToken = $cookieStore.get('authToken');
                    if (authToken) {
                        config.headers['X-Auth-Token'] = authToken;
                    }
                    return config || $q.when(config);
                }
            };
        }
    );
    // intercepting the response of Angular's ajax call
    /*$httpProvider.responseInterceptors.push(['$q',function($q){
     return function(promise) {
     return promise.then(
     function(response) {
     return response;
     }, function(err) {
     if (err.status == 401) {
     window.location = "#/login"; // redirect to login page in case of server side timeout
     }
     return $q.reject(err);
     }
     );
     };
     }]);*/
}]);

})();













