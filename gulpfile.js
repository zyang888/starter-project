const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// compile sass into css
function style() {
  // 1. where is my sass file
  return gulp.src('./css/*.scss')
  // 2. pass that file through sass compiler
  .pipe(sass().on('error', sass.logError))
  // 2.1. clean css
  .pipe(cleanCSS({compatibility: 'ie8'}))
  // 3. where do I save the comiled CSS?
  .pipe(gulp.dest('./css'))
  // 4. stream changes to all browser
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./css/*.scss', style);
  gulp.watch('./js/*.js').on('change',browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
