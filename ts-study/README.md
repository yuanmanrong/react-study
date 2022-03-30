## typescript学习
学习一下ts,将react-study改成ts的
参考学习文档： https://juejin.cn/post/7018805943710253086?share_token=c4029c41-9cc7-4e39-9e2d-c57b6617d2d8
             https://www.tslang.cn/docs/handbook/interfaces.html
 
## `tsc --init` 
创建tsconfig.json 该文件为ts的编译相关配
参考文档： https://www.tslang.cn/docs/handbook/tsconfig-json.html
files - 设置要编译的文件的名称；
include - 设置需要进行编译的文件，支持路径模式匹配；
exclude - 设置无需进行编译的文件，支持路径模式匹配；
compilerOptions - 设置与编译流程相关的选项。

路径: ** 表示任意目录
      * 表示任意文件

## `./node_modules/.bin/tslint --init`
生成tslint.json文件，这个就是一个代码风格的约束 
配置参考：https://zhuanlan.zhihu.com/p/29970355

typescript-node-starter脚手架