const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const sourcemaps = require("gulp-sourcemaps")
const babel = require('gulp-babel')

const paths = {
  srcCss: 'app/scss/style.scss',
  srcJs: 'app/js/front.js',
  css: 'public/css',
  js: 'public/js'
}

function style() {
  return (
    gulp
      .src(paths.srcCss)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.css))
  )
}

function js() {
  return (
    gulp
      .src(paths.srcJs)
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest(paths.js))
  )
}

function watch() {
  gulp.watch('./app/scss/style.scss', style)
  gulp.watch('./app/js/front.js', js)
}

const dev = gulp.series(style, js, watch);

exports.dev = dev
