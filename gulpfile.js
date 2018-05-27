'use strict';

const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app',  
        },
        notify: false
    });
});

gulp.task('concatJs', function () {
    return gulp.src([
        'node_modules/lodash/lodash.min.js', 
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
         ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('app/js'))
        // .pipe(browserSync.reload({stream: true}))
});
gulp.task('concatCss', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css', 
         ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('app/css'))
        // .pipe(browserSync.reload({stream: true}))
});
gulp.task('concat', ['concatCss', 'concatJs'])

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);