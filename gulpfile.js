var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  rename = require('gulp-rename')
;

gulp.task('css', function () {
  return gulp.src('css/main.css')
    .pipe(cssnext({ compress: true }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
  ;
});

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css']);
});
