/// <binding ProjectOpened='sass:watch' />
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('compress', function () {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('src/sass/*.scss', ['sass']);
});