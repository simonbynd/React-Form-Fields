var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	browserify = require('browserify'),
	reactify = require('reactify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

var pkg = require('./package.json');

gulp.task('js', function() {
	return browserify()
		.transform(reactify)
		.add(pkg.js.src+pkg.js.file)
		.bundle()
		.pipe(source(pkg.js.file))
		.pipe(buffer())
		.pipe(gulp.dest(pkg.js.dist))
		.pipe(livereload());
});

gulp.task('serve', function(done) {
	var port = 4000,
		express = require('express'),
		app = express();
	app.use(express.static(__dirname + '/'));
	app.listen(port, function () {
		 done();
	});
	console.log('http://localhost:' + port)
})

gulp.task('watch', function() {
	gulp.watch(pkg.js.src+"**/*.*", ['js']);
	livereload.listen();
});

gulp.task('default', ['watch', 'serve']);