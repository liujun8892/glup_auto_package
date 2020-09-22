//引入gulp
const gulp = require("gulp");
//引入htmlmin插件
const htmlmin = require('gulp-htmlmin')
//引入公共代码插入的插件
const fileinclude = require('gulp-file-include');
//引入less转换插件
var less = require('gulp-less');
//引入css压缩插件
const csso = require('gulp-csso');
//引入js转换插件 babel
const babel = require('gulp-babel');
//引入js压缩插件uglify
var uglify = require('gulp-uglify');

//创建第一个gulp任务,实现css的拷贝
gulp.task("first",()=>{
    console.log('第一个gulp任务执行了')
    //要处理的源文件
    gulp.src("./src/css/base.css")
        .pipe(gulp.dest('./dist/css'))
})

//引入公共部分
// 创建压缩html的任务
gulp.task("htmlmin",()=>{
    gulp.src("./src/*.html")
        //引入头部
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist/"))
})

//css任务
//1.转化less
//2.压缩css
gulp.task("cssmin",()=>{
    gulp.src(['./src/css/*.less','./src/css/*.css'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'))
})

//js任务
gulp.task('jsmin',()=>{
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
})

//copy images 和 lib
gulp.task('copy',()=>{
    gulp.src('./src/images/**')
        .pipe(gulp.dest('./dist/images/'));

    gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib/'))
})

//自动构建
//在gulp4中需要使用gulp.parallel
//['htmlmin','cssmin','jsmin','copy']
gulp.task('default',gulp.parallel('htmlmin','cssmin','jsmin','copy',function () {
    console.log("完成")
}) )
