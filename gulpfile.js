const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const packageName = require('./package').name;

gulp.task('default', () => {
  return gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename(`${packageName}.es5.js`))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename(`${packageName}.min.es5.js`))
    .pipe(gulp.dest('dist'));
});