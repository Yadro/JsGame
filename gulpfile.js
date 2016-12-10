
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json');
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const rimraf = require('rimraf');

const config = {
  server: {
    baseDir: "./"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "Game"
};

gulp.task('ts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
      .pipe(tsProject())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf('build', cb);
});

gulp.task('default', ['webserver', 'ts', 'watch']);