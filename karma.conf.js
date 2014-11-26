// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({

        preprocessors: {
            '{app,app/!(bower_components|plugins|modules)/**}/*.js': 'coverage'
        },

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/es5-shim/es5-shim.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/handlebars/handlebars.js',
            'app/shared/**/*.js',
            'app/features/**/*.js',

            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: ['app/js/main.js'],

        // web server port
        port: 9001,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],

        colors: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // Test coverage
        reporters: ['progress', 'coverage'],
        // Test coverage reporter
        coverageReporter: { type : 'text' }


    });
};
