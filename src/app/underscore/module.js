/**
 * User: Kupin.R
 * Date: 5/12/14
 */



angular
    .module("Underscore", [])
    .factory("_",
        [
            "$window",
            function ($window) {
                return $window._;
            }
        ]);
