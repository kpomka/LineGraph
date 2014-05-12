/**
 * Created by roman.kupin
 */

angular
    .module("LineGraph")
    .directive("campaigns",
        [
            "campaignsConverter",
            function (campaignsConverter) {
                "use strict";

                return {
                    replace: true,
                    restrict: "E",
                    template: "<high-chart config=\"chartData.config\"></high-chart>",
                    scope: {
                        "data": "=",
                        "mode": "=?"
                    },
                    link: function (scope) {

                        scope.$watch("mode", function () {
                            createChartConfig();
                        });
                        scope.$watch("data", function () {
                            createChartConfig();
                        });

                        function createChartConfig() {

                            if (scope.data && scope.mode) {
                                var campaigns = campaignsConverter(scope.data, scope.mode);
                                angular.extend(scope, {
                                    chartData: {
                                        config: {
                                            type: "area",
                                            title: "Campaigns",
                                            series: campaigns.series,
                                            xAxis: campaigns.xAxis
                                        }
                                    }
                                });
                            }
                        }

                    }
                };
            }
        ]);
