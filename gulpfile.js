var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require("browser-sync").create();
var reload      = browserSync.reload;
var plumber     = require('gulp-plumber');
var watch       = require('gulp-watch');
var jade        = require('gulp-jade');

gulp.task('sass', function() {
    gulp.src(['./src/scss/**/*.scss'])
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./build/css'))
      .pipe(reload({stream: true}));
});
gulp.task('default', ['sass','jade']);

gulp.task('jade', function () {
  gulp.src(['src/**/*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(reload({stream: true}));
});


gulp.task('watch', ['default'], function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/**/*.jade'], ['jade']);
});