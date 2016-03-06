var gulp = require('gulp');
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
    runSequence('ts2es5', 'sass2css', ['copyjs', 'copyhtml']);
});
gulp.task('default', function() {
    runSequence('clean', 'compile');
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.sass', ['sass2css']);
    gulp.watch('app/**/*.ts', ['ts2es5']);
    gulp.watch('app/**/*.js', ['copyjs']);
    gulp.watch('app/**/*.html', ['copyhtml']);
});

gulp.task('clean', function () {
  return gulp.src('www/**/*', {read: false})
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
        .pipe(ts(tsProject));
    return tsResult.js
        // .pipe(destopt({ext: '.min.js'}))
        .pipe(gulp.dest('www/'));
});

gulp.task('copyjs', function() {
    gulp.src('app/**/*.js')
    .pipe(gulp.dest('www/'));
});

gulp.task('copyhtml', function() {
    gulp.src('app/**/*.html')
    .pipe(gulp.dest('www/'));
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
