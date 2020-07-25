const gulp = require('gulp');
const sass = require('gulp-sass');
const jsonServer = require("gulp-json-srv");
const server = jsonServer.create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del'); 
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify');
const pump = require('pump');
const include = require('posthtml-include');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
gulp.task('scss', function () {
  return gulp.src('source/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(gulp.dest('build/css'))
});

gulp.task('json-server', function() {
  return gulp.src("data.json")
    .pipe(server.pipe());
});

gulp.task('html', function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest('build/'));
});

gulp.task('del', function() {
  return del('build')
});

gulp.task('watchCss', function () {
  gulp.watch('source/sass/**/*.scss', gulp.parallel('scss'));
});

gulp.task('imageMin', () => {
  return gulp.src('source/assets/img/**/*')
    // .pipe(imagemin())    нужно включить но времезатратно
    .pipe(gulp.dest('build/assets/img'));
})

const jsFiles = ['source/js/getResourse.js','source/js/createElement.js','source/js/showSearch.js',
                'source/js/showFilter.js','source/js/basketArr.js','source/js/showBasket.js','source/js/function.js','source/js/app.js',]

gulp.task('js',() => {
  return gulp.src(jsFiles, '!source/js/build.js')
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    // .pipe(babel())        //не работает после конкатенации 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'))
    .pipe(gulp.dest('source/js'))
})

gulp.task('watchJs', function () {
  gulp.watch(['source/js/**', '!source/js/build.js'], gulp.series('js'));
});

gulp.task('build', gulp.series('del','html','scss','js','imageMin')); //'imageMin'

gulp.task('start', gulp.parallel('watchCss','json-server','watchJs'));
