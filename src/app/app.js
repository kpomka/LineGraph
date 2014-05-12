/**
 * Created by roman.kupin
 */


angular
    .module("LineGraph",
    [
        "ui.router",
        "LineGraph.Api",
        "Charts",
        "Underscore"
    ]).config([
        "$stateProvider", "$urlRouterProvider", "$httpProvider", "campaignsProvider",
        function ($stateProvider, $urlRouterProvider, $httpProvider, campaigns) {
            "use strict";

            campaigns.setWebApiUrl("http://localhost:8889");

            $httpProvider.defaults.useXDomain = true;

            $urlRouterProvider
                .otherwise("/campaigns");

            $stateProvider.
                state("campaigns", {
                    url: "/campaigns",
                    templateUrl: "/app/templates/campaigns.html",
                    controller: "LineGraph.CampaignsController"
                });

        }
    ]).controller("LineGraph.App",
    [
        "$scope",
        function ($scope) {
            "use strict";

        }
    ]);
