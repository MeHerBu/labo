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
    src : {
        ejs : './src/ejs/**/',
        sass : './src/sass/**/',
        img : './src/img/**/'
    },
    dest : {
        html : './dest/',
        css : './dest/css/',
        img : './dest/img/'
    }
}


// --------------------------------------------------------
// タスク設定
// --------------------------------------------------------
gulp.task('sass', function() {
    gulp.src(path.src.sass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('ejs', function() {
    gulp.src([path.src.ejs + '*.ejs', '!' + path.src.ejs + '_*.ejs'])
        .pipe(ejs())
        .pipe(gulp.dest(path.dest.html))
});

gulp.task('watch', function (){
    gulp.watch(path.src.sass, ['sass']);
    gulp.watch(path.src.ejs + '*.ejs', ['ejs']);
});

gulp.task('default', ['ejs', 'sass', 'watch']);