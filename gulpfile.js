let gulp = require('gulp');
    sass = require('gulp-sass');
    
 
gulp.task('scss', function () {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('source/css'));
});

gulp.task('watch', function () {
  gulp.watch('source/sass/**/*.scss', gulp.parallel('scss'));
});