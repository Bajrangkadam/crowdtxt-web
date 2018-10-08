/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.tripNotification',
        []
    );

    module.controller('TripNotificationCtrl',
        [ '$scope',
        

    function TripNotificationCtrl($scope) {

        document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..



        // ==================== To avoide Admin to access user pages.. ===============

                var userRoleDatass = window.localStorage['userRoleData'];
                    $scope.userRoleDatas = userRoleDatass;

                    if($scope.userRoleDatas!='ROLE_ADMIN'){

                       window.location = '#/login';

                    }

        // ============================================================================



        
        //alert("help");
        console.log('TripNotificationCtrl module is called..');

    }

    ]);

})();