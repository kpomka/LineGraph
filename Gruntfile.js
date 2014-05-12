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
                    'src/app/*.js',
                    'src/app/**/*.js'
                ],
                dest: 'build/<%= pkg.name %>.min.js'
            },
            vendor: {
                src: [
                    'src/vendor/angular.min.js',
                    'src/vendor/angular-ui-router.min.js',
                    'src/vendor/highcharts.js',
                    'src/vendor/jquery-1.11.1.min.js',
                    'src/vendor/underscore.min.js',
                ],
                dest: 'build/vendor.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};
