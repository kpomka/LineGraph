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

                function Builder(data, mode) {

                    var defaultCampaignName = "All Guests";
                    var constructedObject = {
                        series: [],
                        xAxis: {
                            categories: []
                        }
                    };

                    this.data_ = data;
                    this.mode_ = mode;

                    this.createSeriesItem = function () {
                        _.each(this.data_.layer.campaigns.item, function (item) {
                            constructedObject.series.push({
                                id: item.id,
                                name: item.name || defaultCampaignName,
                                data: []
                            });
                        });
                    };
                    this.createSeriesDataItem = function () {
                        _.each(this.data_.layer.campaigns.item, function (item) {
                            var target = _.find(constructedObject.series, function (series) {
                                return series.id === item.id
                            });
                            var sourceItem = item[this.mode_].item;
                            _.each(constructedObject.xAxis.categories, function (category) {
                                var item = _.find(sourceItem, function (seriesData) {
                                    return seriesData.year === category.year &&
                                        seriesData.month === category.month &&
                                        seriesData.day === category.day;
                                });
                                target.data.push(item ? parseInt(item.total, 10) : 0);
                            }, this);

                        }, this);
                    };
                    this.createCategoriesItem = function () {
                        _.each(this.data_.layer.campaigns.item, function (item) {
                            _.each(item[this.mode_].item, function (seriesData) {
                                var category = createCategory(seriesData);
                                var categoryExists = _.find(constructedObject.xAxis.categories, function (categoryItem) {
                                    return categoryItem.date === category.date;
                                });
                                if (!categoryExists) {
                                    constructedObject.xAxis.categories.push(category);
                                }
                            });
                        }, this);

                        constructedObject.xAxis.categories = _.sortBy(constructedObject.xAxis.categories, function (category) {
                            return category.date;
                        });
                    };
                    this.cleanConstructedObject = function(){
                        constructedObject.xAxis.categories = _.map(constructedObject.xAxis.categories, function(category){
                            return category.name;
                        });
                    };

                    this.getConstructed = function () {
                        return constructedObject;
                    };

                    function createCategory(item) {
                        return {
                            name: String.prototype.concat(item.month, "/", item.day, "/", item.year),
                            date: +(new Date(item.year, item.month, item.day)),
                            year: item.year,
                            month: item.month,
                            day: item.day
                        };
                    }
                }

                function ChartDirector(builder) {

                    this.builder_ = builder;
                    this.construct = function () {
                        this.builder_.createSeriesItem();
                        this.builder_.createCategoriesItem();
                        this.builder_.createSeriesDataItem();
                        this.builder_.cleanConstructedObject();
                        return this.builder_.getConstructed();
                    };
                }


                function convert(data, mode) {

                    var builder = new Builder(data, mode);
                    var director = new ChartDirector(builder);
                    director.construct();
                    return builder.getConstructed();
                }

                return function (campaigns, mode) {
                    return convert(campaigns, mode);
                }
            }
        ]);
