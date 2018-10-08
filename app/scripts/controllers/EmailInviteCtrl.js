/**
 * Created by Steevan on 12/10/15.
 */

(function () {
    'use strict';

    var module = angular.module(
        'ct.controllers.emailInvite',
        []
    );

    module.controller('EmailInviteCtrl',
        [ '$scope',
        

    function EmailInviteCtrl($scope) {

        document.getElementById("navBars").style.display="block";

        $(".user").hide();// To hide User portal list in Admin portal..

        
        //alert("help");
        console.log('EmailInviteCtrl module is called..');

    }

    ]);

})();