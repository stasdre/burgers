'use strict';

const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.MODE_ENV;

const { SRC_PATH, DIST_PATH, STYLES, JS } = require('./gulp.config');

sass.compiler = require('node-sass');


task("clean", () => {
  console.log(env);
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/**/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src(`${SRC_PATH}/fonts/*.*`)
    .pipe(dest(`${DIST_PATH}/fonts`))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src(`${SRC_PATH}/img/**/*.*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
});


task("sass", () => {
  return src(STYLES)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    //.pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({ stream: true }));
});

task("js", () => {
  return src(JS)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('app.min.js', { newLine: ";" }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({ stream: true }));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: `${DIST_PATH}/`
    },
    open: false
  });
});

task('watch', () => {
  watch(`${SRC_PATH}/scss/**/*.scss`, series("sass"));
  watch(`${SRC_PATH}/**/*.html`, series("copy:html"));
  watch(`${SRC_PATH}/js/**/*.js`, series("js"));
  watch(`${SRC_PATH}/fonts/*.*`, series("copy:fonts"));
  watch(`${SRC_PATH}/js/**/*.*`, series("copy:img"));
});

task(
  "default",
  series("clean", parallel("copy:html", "copy:fonts", "copy:img", "sass", "js"),
    parallel("watch", "server")
  )
);

task(
  "build",
  series("clean", parallel("copy:html", "copy:fonts", "copy:img", "sass", "js"))
);