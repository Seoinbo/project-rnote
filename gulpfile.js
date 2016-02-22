var gulp = require('gulp');
var cordova = require("cordova-lib").cordova;
var destopt = require('gulp-dest')
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var buildOpt = {
    argv: ["--release","--gradleArg=--no-daemon"]
};

// make:
//   - index.css
//   - index.min.css
gulp.task('sass2css', function() {
    gulp.src('www/sass/index.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('www/css/'))
        .pipe(uglifycss())
        .pipe(destopt({ext: '.min.css'}))
        .pipe(gulp.dest('www/css/'));
});

// Javascript trans-conpile ES5 to ES6
// make:
//   - index.js
//   - index.min.js
gulp.task('es6to5', function() {
    gulp.src('www/es6/**/*.js')
        .pipe(babel({presets:['es2015']}))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('www/js/'))
        .pipe(uglify({"max-line-len": 80}))
        .pipe(destopt({ext: '.min.js'}))
        .pipe(gulp.dest('www/js/'));
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

gulp.task('convert', ['sass2css', 'es6to5']);
gulp.task('default', ['convert']);

gulp.task('watch', function() {
    gulp.watch('www/sass/**/*.sass', ['sass2css']);
    gulp.watch('www/es6/**/*.js', ['es6to5']);
    gulp.watch('www/es6/**/*.js', ['es6to5']);
});
