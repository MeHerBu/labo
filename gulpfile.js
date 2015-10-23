// --------------------------------------------------------
// コマンド
// --------------------------------------------------------
//
// gulp : Sass, EJS, 画像圧縮を行った上で、Watch状態に入る
// gulp sprite : スプライト画像生成したいとき
//
// --------------------------------------------------------


// --------------------------------------------------------
// プラグイン読み込み
// --------------------------------------------------------
var gulp = require('gulp');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var fs = require('fs');

// --------------------------------------------------------
// ディレクトリパス設定
// --------------------------------------------------------
var path = {
    src : {
        ejs : './src/ejs/**/',
        sass : './src/sass/',
        img : './src/img/**/'
    },
    dest : {
        html : './',
        css : './dest/css/',
        img : './dest/img/'
    }
}


// -------------------------------------------------i-------
// タスク設定
// --------------------------------------------------------
gulp.task('sass', function() {
    gulp.src(path.src.sass + '*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('ejs', function() {
    var json = JSON.parse(fs.readFileSync("./src/ejs/seting.json"));
    gulp.src([path.src.ejs + '*.ejs', '!' + path.src.ejs + '_*.ejs'])
        .pipe(ejs(json))
        .pipe(gulp.dest(path.dest.html))
});

gulp.task('imagemin', function(){
    var srcGlob = path.src.img + '/**/*.+(jpg|jpeg|png|gif|svg)';
    var dstGlob = path.dest.img;
    var imageminOptions = {
        optimizationLevel: 7,
        progressive: true,
    };

    gulp.src(srcGlob)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(dstGlob));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(path.src.img + 'sprite/*.png') //スプライトにする愉快な画像達
    .pipe(spritesmith({
        imgName: 'sprite.png', //スプライトの画像
        cssName: '_sprite.scss', //生成されるscss
        imgPath: '/img/sprite.png', //生成されるscssに記載されるパス
        cssFormat: 'scss', //フォーマット
        cssVarMap: function (sprite) {
        sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
    }));
    spriteData.img.pipe(gulp.dest(path.dest.img)); //imgNameで指定したスプライト画像の保存先
    spriteData.css.pipe(gulp.dest(path.src.sass)); //cssNameで指定したcssの保存先
});

gulp.task('watch', function (){
    gulp.watch(path.src.sass, ['sass']);
    gulp.watch(path.src.ejs + '*.ejs', ['ejs']);
});

gulp.task('default', ['ejs', 'sass', 'imagemin', 'watch']);