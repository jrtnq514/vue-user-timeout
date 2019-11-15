const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const packageName = require('./package').name;
const webpack = require('webpack-stream');

gulp.task('default', () => {
  return gulp
    .src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(rename(`${packageName}.es5.js`))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename(`${packageName}.min.es5.js`))
    .pipe(gulp.dest('dist'));
});
