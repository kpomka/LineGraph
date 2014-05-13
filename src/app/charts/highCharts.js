/**
 * User: Kupin.R
 * Date: 5/12/14
 */



"use strict";
angular
    .module("Charts")
    .factory("Highcharts", [
        "$window",
        function ($window) {

            return $window.Highcharts;
        }])
    .directive("highChart",
        [
            "Highcharts", "$parse",
            function (Highcharts, $parse) {

                return {
                    replace: true,
                    restrict: "EAC",
                    scope: false,
                    link: function (scope, element, attrs) {

                        var chart;

                        function initChart(config) {

                            if (chart) chart.destroy();
                            var options = {};
                            angular.extend(options, config);

                            chart = new Highcharts.Chart({
                                chart: {
                                    type: options.type,
                                    renderTo: element[0]
                                },
                                title: {
                                    text: options.title
                                },
                                subtitle: {
                                    text: options.subtitle
                                },
                                series: options.series || [],
                                xAxis: options.xAxis,
                                yAxis: options.yAxis,
                                tooltip: options.tooltip || {},
                                plotOptions: options.plotOptions || {}
                            });
                        }

                        scope.$watch(
                            function () {
                                return $parse(attrs.config)(scope);
                            },
                            function (config) {
                                if (config) {
                                    initChart(config);
                                    chart.redraw();
                                }
                            },
                            true
                        );

                        scope.$on('$destroy', function () {
                            if (chart) chart.destroy();
                            element.remove();
                        });
                    }
                };
            }
        ]);
