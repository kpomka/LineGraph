/**
 * Created by roman.kupin
 */



angular
    .module("LineGraph.Api", [])
    .config([
        "$provide",
        function ($provide) {
            "use strict";

            /**
             * CampaignsService
             * @param $http
             * @constructor
             * @param baseUrl
             */
            function CampaignsService($http, baseUrl) {

                /**
                 * $http service
                 * @private
                 */
                this.$http = $http;
                /**
                 * Api url
                 */
                this.baseUrl = baseUrl;

                /**
                 * Returns campaigns
                 * @returns {HttpPromise}
                 */
                this.get = function () {
                    return this.$http
                        .get(this.baseUrl + "/campaigns.json")/*
                        .then(function (response) {
                            return response.data;
                        })*/;
                }
            }


            $provide.provider("campaigns", function () {
                    /**
                     * Web api url
                     */
                    var baseUrl;
                    /**
                     * Set web api url
                     * @param url
                     */
                    this.setWebApiUrl = function (url) {
                        baseUrl = url;
                    };
                    /**
                     * Returns CampaignsService instance
                     * @type {CampaignsService}
                     */
                    this.$get = ["$http", function ($http) {
                        return new CampaignsService($http, baseUrl);
                    }];
                }
            );
        }
    ]);
