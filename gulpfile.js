/*
* gulpfile.js
*/

var gulp = require('gulp');
var ghelper = require('gulp-helper');
ghelper.require();

var pkg = require('./package.json');

var banner = [
  "/* ",
  " * <%= pkg.name %> <%= pkg.version %>",
  " * <%= pkg.description %>",
  " * MIT Licensed",
  " * ",
  " * Copyright (C) 2015 phi, <%= pkg.homepage %>",
  " */",
  "",
  "",
].join('\n');


gulp.task('default', ['copy', 'uglify']);

gulp.task('copy', function() {
  return gulp
    .src('./src/tap.js')
    .pipe(header(banner, {
      pkg: pkg,
    }))
    .pipe(gulp.dest('./'))
    ;
});

gulp.task('uglify', function() {
  return gulp.src('./src/tap.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg,
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./'))
    .on('end', function() {
      console.log('finish');
    });
});
