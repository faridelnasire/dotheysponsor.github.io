var gulp = require('gulp'),
  runs_sequence = require('run-sequence'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  livereload = require('gulp-livereload'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass'),
  minify_css = require('gulp-minify-css'),
  html_beautify = require('gulp-html-beautify'),
  html_validator = require('gulp-html-validator'),
  minify_image = require('gulp-imagemin');

/*
  Process CSS
*/
gulp.task('build_css', function () {
  var sassCompilation = sass();
  sassCompilation.on('error', console.error.bind(console));

  return gulp.src('./src/styling/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError('\ud83d\udc4e SASS processing failed.')
    }))
    .pipe(sourcemaps.init())
    .pipe(sassCompilation)
    .pipe(sourcemaps.write())
    .pipe(rename('styling.css'))
    .pipe(minify_css())
    .pipe(gulp.dest('./dist/assets/css'));
});


/*
  Process HTML
*/
gulp.task('build_html', function () {
  var options = {
    indentSize: 2
  };

  // Validate with W3C
  gulp.src('./src/index.html')
    .pipe(html_validator())
    .pipe(rename('html_validation.json'))
    .pipe(gulp.dest('./'));

  // Build HTML
  return gulp.src('./src/index.html')
    .pipe(html_beautify(options))
    .pipe(gulp.dest('./dist/'));
});


/*
  Process images
*/
gulp.task('build_images', function () {
  gulp.src('./src/images/*')
    .pipe(minify_image())
    .pipe(gulp.dest('./dist/assets/img'))
});


gulp.task('build', function () {
  runs_sequence(['build_css', 'build_html', 'build_images']);
});

gulp.task('default', function () {
  gulp.start('build');

  gulp.watch('./src/**/**', function () {
    console.log('');
    console.log('Change detected, initiating new build...');
    gulp.start('build');
  });
});
