var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence');

var browserSync = require('browser-sync').create();


/** Development processes **/

// task for live reload
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'source'
        }
    });
});

// task for compiling/processing sass
gulp.task('sass', function() {
    return gulp.src('source/scss/main.scss')
        .pipe(sass({ includePaths : ['scss/partials/'] }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('source/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('source/scss/**/*.scss', ['sass']);
    gulp.watch('source/*.html', browserSync.reload);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});