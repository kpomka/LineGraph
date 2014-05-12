/**
 * Created by roman.kupin
 */



angular
    .module("LineGraph")
    .controller("LineGraph.CampaignsController",
        [
            "$scope", "campaigns", "campaign",
            function ($scope, campaigns, campaign) {
                "use strict";

                angular.extend($scope, { model: { mode: campaign.DailyUniqueVisitors}});
                campaigns
                    .get()
                    .then(function (data) {
                        $scope.model.campaigns = data;
                    });
            }
        ]);
