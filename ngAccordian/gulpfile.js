﻿/// <binding ProjectOpened='sass:watch, sass-site:watch' />
var gulp = require('gulp');

var uglify = require('gulp-uglify');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var rename = require('gulp-rename');

var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
	return gulp.src('ng-accordian/src/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('ng-accordian/src/'));
});

gulp.task('minify-css', function () {
	return gulp.src('ng-accordian/src/*.css')
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('ng-accordian/dist'));
});

gulp.task('minify-js', function () {
	return gulp.src('ng-accordian/src/*.js')
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('ng-accordian/dist'));
});

gulp.task('sass:watch', function () {
	gulp.watch('ng-accordian/src/*.scss', ['sass']);
});

// -- demo site
gulp.task('sass-site', function () {
	return gulp.src('site/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('site/css'));
});

gulp.task('sass-site:watch', function () {
	gulp.watch('site/sass/*.scss', ['sass-site']);
});

gulp.task('build', ['sass', 'minify-css', 'minify-js']);