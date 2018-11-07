var gulp = require('gulp'),
    gulpSequence = require('gulp-sequence'), //同步执行任务
    // csso = require('gulp-csso'), //css压缩
    cleancss = require('gulp-clean-css'),//css压缩
    uglify = require('gulp-uglify'), //js压缩 
    imageMin = require('gulp-imagemin'), //压缩图片
    htmlMin = require('gulp-htmlmin'), //压缩html
    clean = require('gulp-clean'), //清空文件夹
    rev = require('gulp-rev'), //更改版本名 md5后缀
    autoFx = require('gulp-autoprefixer'), //加浏览器前缀
    livereload = require('gulp-livereload');
    revCollector = require('gulp-rev-collector'); //gulp-rev 的插件，用于html模板更改引用路径
    plumber = require('gulp-plumber'); // 可以阻止 gulp 插件发生错误导致进程退出并输出错误日志。
// 全局配置
var options = {
    dist_html_dir : '../../application/views/templates', // 模版目录
    src_html_dir :'src/html/',
    src_html:'src/html/**/*.html',
    src_js : 'src/js/*.js',
    src_css: 'src/css/*.css',
    src_img : 'src/img/**/*.{png,jpg,gif,ico}',
};
//清空文件夹
gulp.task('clean', function() {
    return gulp.src('dist', {
        read: false
    }).pipe(clean());
});
//压缩css/加浏览器前缀
gulp.task('css', function() {
    return gulp.src(options.src_css)
    .pipe(plumber())
    .pipe(autoFx({
        browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 8', 'Android >= 4.0'],
        cascade: true, //是否美化格式
        remove: false //是否删除不必要的前缀
    }))
    .pipe(cleancss({
        keepSpecialComments:"*"
    }))
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'));
});
// js语法检测
gulp.task('checkJs',function(){
  return gulp.src('dist/js/*.js')
          .pipe(jshint)
          .pipe(jshint.reporter('default'));
});
//压缩js
gulp.task('js', function() {
    return gulp.src(options.src_js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/js'));
});
//压缩image
gulp.task('image', function() {
    return gulp.src(options.src_img)
    .pipe(imageMin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('dist/img'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/img'));
});
//改变css引用路径

//改变html引用路径
gulp.task('rev', function() {
    return gulp.src(['dist/rev/**/*.json', options.src_html_dir+'**/*.html'])
    .pipe(plumber())
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements:{
          '/src/css':'/dist/css',
          '/src/js':'/dist/js',
          '/src/img':'/dist/img'
        }
    }))
    .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments:true,
        minifyJS: true,//压缩页面JS,
        minifyCSS: true,//压缩页面CSS
    }))
    .pipe(gulp.dest(options.dist_html_dir))
    .pipe(livereload());
});
// 替换css 中图片路径
gulp.task('revimg', function() {
    return gulp.src(['dist/rev/img/*.json', 'dist/css/**/*.css'])
    .pipe(revCollector({
        replaceReved: true,
        dirReplacements:{
          '/src/img':'/dist/img'
        }
    }))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('default', function(cb){
    gulpSequence('clean', 'css', 'js', 'image', 'rev','revimg')(cb);
});

gulp.task('watch',function(){
    livereload.listen({
        start:true
    });
    gulp.watch(options.src_html,['default']);
    gulp.watch(options.src_js,['default']);
    gulp.watch(options.src_css,['default']);
});





