/**
 * Created by roman.kupin
 */



angular
    .module("LineGraph")
    .controller("LineGraph.CampaignsController",
    [
        "$scope", "campaigns",
        function ($scope, campaigns) {
            "use strict";

            $scope.data = campaigns.get();
        }
    ]);