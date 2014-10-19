'use strict';

var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

// load plugins
var $ = require('gulp-load-plugins')();

// Build main.css file
// Styles specific for the proposal tool that aren't included in the UX framework
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size()).on('error', function (e) {
            console.log(e);
        });
});

// Check the code quality of the scripts
gulp.task('scripts', function () {
    return gulp.src(['app/**/*.js', '!app/bower_components{,/**}'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size()).on('error', function (e) {
            console.log(e);
        });
});

// Add the correct links to the html files
gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}).on("error", console.log))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.rev())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest('dist'))
        .pipe($.size()).on('error', function (e) {
            console.log(e);
        });
});

// Copy the extras
gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html', '!app/*.js'], { dot: true })
        .pipe(gulp.dest('dist')).on('error', function (e) {
            console.log(e);
        });
});

// Clean the folders on process start
gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

// Start livereload server
gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

// Inject bower components in the correct files
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});


// All tasks for testing:
gulp.task('test', function () {
    console.log('START TESTS');
    return gulp.src('./lalala')
        .pipe($.karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('tdd', function () {
    gulp.src('./lalala')
        .pipe($.karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});


gulp.task('build', ['html', 'extras'], function () {
    console.log('build done!');
});

// Default task deployment task '~ gulp'
gulp.task('default', ['clean'], function () {
    console.log('Running default task');
    gulp.start('build');
});

// Serve task for local development without watch: '~ gulp serve'
gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// Watch task for local development with watch & testing: '~ gulp watch'
gulp.task('watch', [
    'connect',
    'serve',
    'tdd'
], function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        'app/**/*.html',
        'app/**/*.js',
        '.tmp/styles/**/*.css'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('bower.json', ['wiredep']);
});