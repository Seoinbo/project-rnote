var gulp = require('gulp');
var ignore = require('gulp-ignore');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var cordova = require("cordova-lib").cordova;
var destopt = require('gulp-dest')
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var packageInfo = require('./package.json');
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});

var buildOpt = {
    argv: ["--release","--gradleArg=--no-daemon"]
};

// Main task
gulp.task('compile', function() {
    runSequence('ts2es5', 'sass2css', ['copymodules', 'copyhtml']);
});
gulp.task('dev', function() {
    runSequence('ts2es5', 'sass2css', 'copymodules', 'copyhtml', 'watch');
});
gulp.task('default', function() {
    runSequence('clean', 'compile');
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.sass', ['sass2css']);
    gulp.watch('app/**/*.ts', ['ts2es5']);
    gulp.watch('app/**/*.html', ['copyhtml']);
});

gulp.task('clean', function () {
    return gulp.src('www/**/*', {read: false})
    .pipe(ignore(['index.html', 'styles.css', 'ibr.*']))
    .pipe(clean());

});

// make:
gulp.task('sass2css', function() {
    gulp.src('app/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        //.pipe(gulp.dest('www/css'))
        // .pipe(uglifycss())
        // .pipe(destopt({ext: '.min.css'}))
        .pipe(gulp.dest('www/'));
});

// Typescript trans-conpile ES5
gulp.task('ts2es5', function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject))
        .pipe(gulp.dest('www/'));
    return tsResult.js
        // .pipe(destopt({ext: '.min.js'}))

});

gulp.task('copyjs', function() {
    gulp.src('app/**/*.js')
    .pipe(gulp.dest('www/'));
});

gulp.task('copyhtml', function() {
    gulp.src('app/**/*.html')
    .pipe(gulp.dest('www/'));
});

gulp.task('copymodules', function() {
    gulp.src('node_modules/angular2/**/*.js').pipe(gulp.dest('www/modules/angular2/'));
    gulp.src('node_modules/rxjs/**/*.js').pipe(gulp.dest('www/modules/rxjs/'));
    gulp.src('node_modules/es6-shim/**/*.js').pipe(gulp.dest('www/modules/es6-shim/'));
    gulp.src('node_modules/systemjs/**/*.js').pipe(gulp.dest('www/modules/systemjs/'));
    gulp.src('node_modules/zone.js/**/*.js').pipe(gulp.dest('www/modules/zone.js/'));
    gulp.src('node_modules/reflect-metadata/**/*.js').pipe(gulp.dest('www/modules/reflect-metadata/'));
    gulp.src('node_modules/dexie/dist/*.js').pipe(gulp.dest('www/modules/dexie/dist'));
    gulp.src('node_modules/jquery/dist/*.js').pipe(gulp.dest('www/modules/jquery/dist'));
    gulp.src('node_modules/bounce.js/*.js').pipe(gulp.dest('www/modules/bounce.js'));
    gulp.src('node_modules/dragula/dist/*').pipe(gulp.dest('www/modules/dragula/dist'));
    gulp.src('node_modules/ng2-dragula/**/*').pipe(gulp.dest('www/modules/ng2-dragula/'));
});

gulp.task('build-browser', function() {
    cordova.build({
        "platforms": ["browser"],
        "options": buildOpt
    });
});

gulp.task('build-aos', function() {
    cordova.build({
        "platforms": ["android"],
        "options": buildOpt
    });
});

gulp.task('build-ios', function() {
    cordova.build({
        "platforms": ["ios"],
        "options": buildOpt
    });
});
