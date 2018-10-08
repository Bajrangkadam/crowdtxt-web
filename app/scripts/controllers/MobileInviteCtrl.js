/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.mobileInvite',
        []
    );

    module.controller('MobileInviteCtrl',
        [ '$scope',
        

    function MobileInviteCtrl($scope) {

        document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('MobileInviteCtrl module is called..');

    }

    ]);

})();