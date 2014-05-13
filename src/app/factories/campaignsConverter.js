/**
 * User: Kupin.R
 * Date: 5/12/14
 */



angular
    .module("LineGraph")
    .factory("campaignsConverter",
        [
            "_",
            function (_) {

                /**
                 * Builder that creates chart options that are used in highcharts
                 * @param data
                 * @param mode
                 * @constructor
                 */
                function Builder(data, mode) {

                    var defaultCampaignName = "All Guests",
                        campaigns = data.layer.campaigns.item,
                        constructedObject = {
                            series: [],
                            xAxis: {
                                categories: []
                            }
                        };

                    /**
                     * Create campaigns array
                     */
                    this.createCampaigns = function () {
                        _.each(campaigns, function (item) {
                            constructedObject.series.push({
                                id: item.id,
                                name: item.name || defaultCampaignName,
                                data: []
                            });
                        });
                    };
                    /**
                     * Create campaigns data array
                     */
                    this.createCampaignsData = function () {
                        _.each(campaigns, function (campaign) {
                            var createdCampaign = findCampaignById(campaign.id);
                            createdCampaign.data = getCampaignData(campaign);
                        });
                    };
                    /**
                     * Creates categories array
                     */
                    this.createCategories = function () {
                        createCategories();
                        removeDuplicateCategories();
                        sortCategories();
                    };
                    /**
                     * Removes not necessary properties from result object
                     */
                    this.clean = function () {
                        constructedObject.xAxis.categories = _.map(constructedObject.xAxis.categories, function (category) {
                            return category.name;
                        });
                    };
                    /**
                     * Returns create object
                     * @returns {{series: Array, xAxis: {categories: Array}}}
                     */
                    this.getResult = function () {
                        return constructedObject;
                    };

                    /**
                     * Create category item with auxiliary properties
                     * @param item
                     * @returns {{name: string, date: number, year: string, month: string, day: string}}
                     */
                    function createCategory(item) {
                        return {
                            name: String.prototype.concat(item.month, "/", item.day, "/", item.year),
                            date: +(new Date(item.year, item.month, item.day)),
                            year: item.year,
                            month: item.month,
                            day: item.day
                        };
                    }

                    /**
                     * Find campaign by id
                     * @param id
                     * @returns {*}
                     */
                    function findCampaignById(id) {
                        return _.find(constructedObject.series, function (series) {
                            return series.id === id
                        });
                    }

                    /**
                     * Returns campaign data as an array of numbers, if there is missing date - inserts zero for that date
                     * @param item
                     * @returns {Array}
                     */
                    function getCampaignData(item) {

                        var sourceData = item[mode].item;
                        return _.map(constructedObject.xAxis.categories, function (category) {
                            var item = _.find(sourceData, function (seriesData) {
                                return seriesData.year === category.year &&
                                    seriesData.month === category.month &&
                                    seriesData.day === category.day;
                            });
                            return item ? parseInt(item.total, 10) : 0;
                        });
                    }

                    /**
                     * Create category for each campaign data
                     */
                    function createCategories() {
                        _.each(campaigns, function (campaign) {
                            var campaignCategories = _.map(campaign[mode].item, function (series) {
                                return createCategory(series);
                            });
                            constructedObject.xAxis.categories = Array.prototype.concat(constructedObject.xAxis.categories, campaignCategories);
                        });
                    }

                    /**
                     * Remove duplicate categories
                     */
                    function removeDuplicateCategories() {
                        constructedObject.xAxis.categories = _.uniq(constructedObject.xAxis.categories, false, function (item) {
                            return item.date;
                        });
                    }

                    /**
                     * Sort categories array
                     */
                    function sortCategories() {
                        constructedObject.xAxis.categories = _.sortBy(constructedObject.xAxis.categories, function (category) {
                            return category.date;
                        });
                    }
                }

                /**
                 * Rules construction process
                 * @param builder
                 * @constructor
                 */
                function ChartDirector(builder) {
                    /**
                     * Returns highcharts options object
                     * @returns {{series: Array, xAxis: {categories: Array}}|*}
                     */
                    this.construct = function () {
                        builder.createCampaigns();
                        builder.createCategories();
                        builder.createCampaignsData();
                        builder.clean();
                        return builder.getResult();
                    };
                }

                function convert(data, mode) {
                    var builder = new Builder(data, mode);
                    var director = new ChartDirector(builder);
                    director.construct();
                    return builder.getResult();
                }

                return function (campaigns, mode) {
                    return convert(campaigns, mode);
                }
            }
        ]);
