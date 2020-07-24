const gulp = require('gulp');
const sass = require('gulp-sass');
const jsonServer = require("gulp-json-srv");
const server = jsonServer.create();
 
gulp.task('scss', function () {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('build/css'));
});

gulp.task('json-server', function() {
  return gulp.src("data.json")
    .pipe(server.pipe());
});

// gulp.task('');

gulp.task('watch', function () {
  gulp.watch('source/sass/**/*.scss', gulp.parallel('scss','json-server'));
});

gulp.task('start', gulp.parallel('watch','json-server'));