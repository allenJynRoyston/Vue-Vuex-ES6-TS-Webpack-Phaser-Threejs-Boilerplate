var gulp = require('gulp');
var watch = require('gulp-watch');
var sequence = require('gulp-watch-sequence');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');
var nodemon = require('nodemon');
var inject = require('gulp-inject-string');
//var run = require('gulp-run-command').default;
var shell = require('gulp-shell')


//--------------------------------------
gulp.task('start-server', function (cb) {
	var started = false;
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});
//--------------------------------------


//--------------------------------------
gulp.task('rebuild-webpack', shell.task([
  'npm run build'
]))
//--------------------------------------

//--------------------------------------
gulp.task('trigger-sync', function(){
    gulp.src('./bsync.js')
        .pipe(inject.append('//reload'))
        .pipe(gulp.dest('./'));
});
//--------------------------------------


//--------------------------------------
gulp.task('browser-sync', ['start-server'], function() {


  // AFTER STARTER HAS BEEN STARTED, START BROWSERSYNC
  browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["server.js", "bsync.js"],
        port: 3030,
        reloadDelay: 2000,
	})

  // IF ANY OF THESE FILES HAVE BEEN CHANGED, COMPILE THEN START TRIGGER-SYNC, WHICH KICKS OFF BROWSERSYNC
  var queue = sequence(100);  // SMALL DELAY SO CLEARHTML DOESN'T BREAK

  /* CSS */
  watch('src/**/*.*', {
    emitOnGlob: false
  }, queue.getHandler('rebuild-webpack'));

	/* CSS */
  watch('dist/server.js', {
    emitOnGlob: false
  }, queue.getHandler('trigger-sync'));
})
//--------------------------------------


//--------------------------------------
gulp.task('build', ['rebuild-webpack'], function () {});
//--------------------------------------

//--------------------------------------
gulp.task('default', ['browser-sync'], function () {});
//--------------------------------------
