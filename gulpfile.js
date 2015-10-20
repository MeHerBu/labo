// --------------------------------------------------------
// プラグイン読み込み
// --------------------------------------------------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');


// --------------------------------------------------------
// ディレクトリパス設定
// --------------------------------------------------------
var path = {
    sass : './src/sass/**/*.scss',
    css : './src/css/',
    ejs : './src/ejs/**/'
}


// --------------------------------------------------------
// タスク設定
// --------------------------------------------------------
gulp.task('sass', function() {
    gulp.src(path.sass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(path.css));
});

gulp.task('ejs', function() {
    gulp.src([path.ejs + '*.ejs', '!' + path.ejs + '_*.ejs'])
        .pipe(ejs())
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function (){
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.ejs + '*.ejs', ['ejs']);
});

gulp.task('default', ['ejs', 'sass', 'watch']);