/**
 * Created by roman.kupin
 */

angular
    .module("LineGraph")
    .directive("lgCampaignsGraph",
    [
        function () {
            "use strict";

            return {
                replace: true,
                restrict: "E",
                scope: {
                    "data": "="
                },
                link: function (scope) {

                }
            };
        }
    ]);
