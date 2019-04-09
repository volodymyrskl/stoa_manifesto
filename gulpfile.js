const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const sourcemaps = require("gulp-sourcemaps")
const babel = require('gulp-babel')

function style() {
  return (
    gulp
      .src('app/scss/connector.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css/'))
  )
}

function js() {
  return (
    gulp
      .src('app/js/front.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('public/js/'))
  )
}

function watch() {
  style()
  js()
  gulp.watch('./app/scss/connector.scss', style)
  gulp.watch('./app/js/front.js', js)
}

exports.style = style
exports.js = js
exports.watch = watch