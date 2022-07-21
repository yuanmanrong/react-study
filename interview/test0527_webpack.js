// webpack基本知识和原理
// 入口 输出 plugin插件：可以执更多任务 loader：对模块进行转换，处理更多的文件

// loader: css-loader用来解释@import和url()；style-loader用来将css-loader生成的样式表通过<style>标签，插入到页面中去。
// 这是因为postcss主要功能只有两个：第一就是把css解析成JS可以操作的抽象语法树AST
//，第二就是调用插件来处理AST并得到结果；所以postcss一般都是通过插件来处理css，并不会直接处理，所以我们需要先安装一些插件：autoprefixer postcss-plugins-px2rem cssnano
// webpack-dev-server提供了一个服务器，直接在内存中，所以没有文件这样比较快 
// jsx文件需要用babel-loader 以及 @babel/preset-env @babel/preset-react两个转换规则
// tsx文件，需要awesome-typescript-loader


// webpack打包基本原理
/* 
 * 读取配置文件
 * 传入配置，实例化compiler 开始执行run方法
 * 从入口文件解析模块，loader翻译模块，找到各模块之间的依赖关系，递归处理
 * 完成编译后以及最终的依赖关系， 根据依赖关系组装成一个文件
 * 根据配置输出打包的文件，写入系统
 */
/* 大体结构 */
(function(modules){
   var installedModules = {} //放置已经被加载过的模块
   // 实现浏览器里的require功能
   /* 核心方法 */
    function _webpack_require_(moduleId){
        // 检查模块是否被加载过,有则导出
        if(installedModules[moduleId]){
            return installedModules[moduleId].exports
        }
        // 无则进行注册
        let module = installedModules[moduleId] = {
            i: moduleId,
            l: false, // 是否被注册
            exports: {}
        }
        
        // 执行模块并返回
        modules[moduleId].call(module.exports,module,module.exports,_webpack_require_)
        console.log(module.exports, "module---");
        module.l = true
        return module.exports
    }
   //....
   return _webpack_require_(0) // 返回加载的入口模块

})([])/* 入口文件的modules array */


// HMR热更新


// 手写loader 和 plugin
/* 手写loader
单一原则: 每个Loader只做一件事，简单易用，便于维护；
链式调用: Webpack 会按顺序链式调用每个Loader；
统一原则: 遵循Webpack制定的设计规则和结构，输入与输出均为字符串，各个Loader完全独立，即插即用；
无状态原则：在转换不同模块时，不应该在loader中保留状态； */


// 性能优化：打包结果 构建过程 tree-shaking  hackpcak bundle webpack懒加载？import不用require？
// 打包结果: webpack-bundle-analyser一个打包分析器
// 构建过程： exclude字段排除nodeModules  打包的时候会压缩optimization字段存放和压缩相关的配置minimizer TerserPlugin插件（移除debugger console.log一些代码）
// DCE无用代码 ===> treeshaking

//打包速度优化
//多进程打包:thread-loader   缓存资源，提高二次构建的速度:cache-loader  开启热更新
//css代码压缩 js代码压缩  terser-webpack-plugin
//小图片转成base64
//模块懒加载：网页会按需加载 遇到import的时候 webpack不支持动态import

let prmoise = new Promise((resolve, reject) => {
    console.log(1);
     setTimeout(() => {
         resolve("success")
     },0)
    console.log(2);
})

prmoise.then((res) =>{
    console.log(res);
}).then((res) => {
    console.log(res);
}).then((res) => {
    console.log(res);
})

console.log(3)