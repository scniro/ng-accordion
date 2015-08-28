/// <binding ProjectOpened='sass:watch' />
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var util = require('gulp-util');

gulp.task('sass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('minify-css', ['clean-css-dist'], function () {
	return gulp.src('src/css/*.css')
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-js', ['clean-js-dist'], function () {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean-css-dist', function (done) {

	var file = 'dist/ng-accordian.min.css';
	util.log(util.colors.green('cleaning'), ' -- ', util.colors.yellow(file));
	del(file, done);
});

gulp.task('clean-js-dist', function (done) {

	var file = 'dist/ng-accordian.min.js';
	util.log(util.colors.green('cleaning'), ' -- ', util.colors.yellow(file));
	del(file, done);
});

gulp.task('sass:watch', function () {
	gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'minify-css', 'minify-js']);