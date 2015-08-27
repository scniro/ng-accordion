var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('compress', function () {
	return gulp.src('src/js/*.js')
	  .pipe(uglify())
	  .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	gulp.src('src/sass/*.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(gulp.dest('src/css'));
});