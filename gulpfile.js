var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var path = {
    sass : './src/sass/**/*.scss',
    css : './src/css',
    jade : './*.jade'
}

gulp.task('sass', function() {
    gulp.src(path.sass)
        .pipe(sass())
        .pipe(gulp.dest(path.css));
});

gulp.task('jade', function() {
    gulp.src(path.jade)
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function (){
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.jade, ['jade']);
});

gulp.task('default', ['jade', 'sass', 'watch']);