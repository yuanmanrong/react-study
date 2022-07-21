// AST语法树
// 通过上面介绍的 console.log AST
// 下面我们就来完成一个在调用 console.log(xx) 时候给前面加一个函数名，这样用户在打印时候能改方便看到是哪个函数调用的。
// babel的原理就是这个，所以使用babel实现一下

/* 
 * 
 * 
 * 
 * 
 */
const parser = require("@babel/parser")
const traverse = require("@babel/traverse")
const types = require("@babel/types")
const gen = require("@babel/generator")


let preCode = `function getdata(){
    console.log("a");
}`

function compiler(code){
    //ast
    const ast = parser.parse(code)

    function addConsoleParam(node){
        if(node.type === "CallExpression") {
            // const funName = node.
            node.arguments.unshift(types.stringLiteral("hiiiii---------"))
        }
    }
    //遍历 操作
    let visitor = {
        enter: (path) => {
           addConsoleParam(path.node)
        }
    }
    traverse.default(ast, visitor)
    //返回新代码
    return gen.default(ast, {}, code)
}

console.log("res---",compiler(preCode).code);