const
  gulp = require('gulp'),
  cssnext = require("postcss-cssnext"),
  postcss = require('gulp-postcss'),
  postCssProcessors = [
    require("postcss-import"),
    cssnext({ browsers: ['last 2 versions'] })
  ],
  cssnano = require('gulp-cssnano'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
;

gulp.task('css-main', function () {
  return gulp.src('css-src/main.css')
    .pipe(postcss(postCssProcessors))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('css-home', function () {
  return gulp.src('css-src/main-home.css')
    .pipe(postcss(postCssProcessors))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('css-topics', function () {
  return gulp.src('css-src/main-topics.css')
    .pipe(postcss(postCssProcessors))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('css-article', function () {
  return gulp.src('css-src/main-article.css')
    .pipe(postcss(postCssProcessors))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('css-course', function () {
  return gulp.src('css-src/main-course.css')
    .pipe(postcss(postCssProcessors))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('js-common', function () {
  return gulp.src(['js-src/common.js'])
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-topics', function () {
  return gulp.src(['js-src/fuzzy-match.js', 'js-src/topic-search.js', 'js-src/topics-visited.js'])
    .pipe(concat('topics.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-article', function () {
  return gulp.src(['js-src/prism.js', 'js-src/syntax.js', 'js-src/article-nav.js', 'js-src/section-links.js', 'js-src/video.js'])
    .pipe(concat('article.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-course', function () {
  return gulp.src(['js-src/fullscreen.js'])
    .pipe(concat('course.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-slide-deck', function () {
  return gulp.src(['js-src/prism.js', 'js-src/syntax.js', 'js-src/slide-deck.js'])
    .pipe(concat('slide-deck.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-lesson', function () {
  return gulp.src(['js-src/prism.js', 'js-src/syntax.js', 'js-src/lesson.js'])
    .pipe(concat('lesson.min.js'))
    .pipe(gulp.dest('./js'))
  ;
});

gulp.task('js-fonts', function () {
  return gulp.src(['_includes/source-code-pro-observer.js', '_includes/alegreya-observer.js'])
    .pipe(uglify())
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('build-css', ['css-main', 'css-home', 'css-topics', 'css-article', 'css-course'], function () {
  return gulp.src(['css/main.min.css', 'css/main-home.min.css', 'css/main-topics.min.css', 'css/main-article.min.css', 'css/main-course.min.css'])
    .pipe(cssnano())
    .pipe(gulp.dest('./css'))
  ;
});

gulp.task('build-js', ['js-common', 'js-topics', 'js-article', 'js-course', 'js-slide-deck', 'js-lesson'], function () {
  return gulp.src(['js/common.min.js', 'js/topics.min.js', 'js/article.min.js', 'js/course.min.js', 'js/slide-deck.min.js', 'js/lesson.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
});

gulp.task('build', ['build-css', 'build-js', 'js-fonts']);

gulp.task('watch', function() {
  gulp.watch('css-src/*.css', ['css-main', 'css-home', 'css-topics', 'css-article', 'css-course']);
  gulp.watch('js-src/*.js', ['js-common', 'js-topics', 'js-article', 'js-course', 'js-slide-deck', 'js-lesson']);
});

gulp.task('default', ['css-main', 'css-home', 'css-topics', 'css-article', 'css-course', 'js-common', 'js-topics', 'js-article', 'js-course', 'js-slide-deck', 'js-lesson']);
