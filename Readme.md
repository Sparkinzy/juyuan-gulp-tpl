# 聚源gulp应用初始化模版

# 测试gulp的打包加密

```sh
npm install -g gulp 
npm install -g uglify-js # js压缩混淆

npm install --save-dev gulp
npm install --save-dev gulp-sequence # 任务队列执行
npm install --save-dev gulp-clean-css # css 压缩
npm install --save-dev gulp-autoprefixer  # css 自动前缀
npm install --save-dev gulp-livereload # 实时预览工具
npm install --save-dev gulp-uglify # js压缩混淆
npm install --save-dev gulp-imagemin # 图片压缩
npm install --save-dev gulp-htmlmin # html模版页面压缩
npm install --save-dev gulp-clean # 文件夹清理
npm install --save-dev gulp-rev  # 添加版本 js css img
npm install --save-dev gulp-rev-collector # gulp-rev 的插件，用于html模板更改引用路径
# npm install --save-dev jshint gulp-jshint # js 语法检查 ，下载太慢，没用
npm install --save-dev gulp-plumber # 错误拦截，防止被错误打断


# 开发阶段，监听变动
gulp watch

# 生成正式版
gulp

```


