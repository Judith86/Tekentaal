//region Requires
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var postcssInlineSVG = require('postcss-inline-svg');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var beeper = require('beeper');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var log = require('fancy-log');

//region Tasks
gulp.task('default', function () {
    RockbergCss('./scss/style.scss', './', 'style.css');
});

gulp.task('watch', function () {
    watch(['./scss/style.scss', './scss/**/*.scss'], function () {
        RockbergCss('./scss/style.scss', './', 'style.css');
    });
});

function RockbergCss(input, output, filename) {
    var cssMessages = [
        'approximate energy cost: 264839 GW',
        'solved quantum theory',
        'the nobel prize is yours'
    ];

    var processors = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src(input)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat(filename))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./', {sourceRoot: './../scss'}))
    .pipe(gulp.dest(output))
    .on('end', function(){
        log('CSS Compiled, ' + cssMessages[Math.floor(Math.random() * cssMessages.length)] + '');
    });
}
