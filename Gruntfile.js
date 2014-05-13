module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                src: [
                    'src/app/app.js',
                    'src/app/api/module.js',
                    'src/app/charts/module.js',
                    'src/app/underscore/module.js',
                    'src/app/charts/highCharts.js',
                    'src/app/constants/campaignMode.js',
                    'src/app/controllers/campaignsController.js',
                    'src/app/directives/campaigns.js',
                    'src/app/factories/campaignsConverter.js'
                ],
                dest: 'src/build/line-graph.min.js'
            },
            vendor: {
                src: [
                    'src/vendor/jquery-1.11.1.min.js',
                    'src/vendor/highcharts.js',
                    'src/vendor/angular.min.js',
                    'src/vendor/angular-ui-router.min.js',
                    'src/vendor/underscore.min.js'
                ],
                dest: 'src/build/vendor.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};
