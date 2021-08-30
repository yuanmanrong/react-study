let root = document.getElementById('root')
//模拟createElement()：返回一个对象理解为虚拟DOM
function createElement(type,props,...childrens){
    let obj = {
        type:null,
        ref:null,
        key:undefined,
        props:{}
    }
    
    /* obj.type = type
    for(let i in props){
        console.log(i)
        if(i==='ref'){
            obj[i] = props[i]
        }
        if(i==='key'){
            obj[i]= props[i]
        }
        obj.props[i] = props[i]
    }
    obj.props['children'] = children */

    //使用传递的覆盖原有的默认值
    obj = {...obj,type,props:{...props,children:childrens.length<=1 ?(childrens[0]|| ''):childrens}}
    //判断是否存在ref和key，若存在则删除,这里用三元运算符报语法无效
    /* 'key' in obj.props? (obj.key=obj.props.key,delete obj.props.key) : null
    'ref' in obj.props? (obj.ref = obj.props.ref,delete obj.props.ref) : null */
   if('key' in obj.props){
    obj.key=obj.props.key
    delete obj.props.key
   }
   if('ref' in obj.props){
    obj.ref=obj.props.ref
    delete obj.props.ref
   }

    return obj
}

//模拟render()：把创建的对象生成DOM元素插入到页面中，要注意处理style,className和children属性
function render(obj,container,callback){
    //创建元素
    let {type,props} = obj
    let newEle = document.createElement(type)
    //处理属性
    for (let attr in props) {
        if(!props.hasOwnProperty(attr))break//不是私有属性结束遍历
        if(!props[attr])continue//当前属性没有值，则不处理

        let value = props[attr]
        if (attr === 'className') {
            newEle.setAttribute('class', value)
            continue
        }
        if (attr === 'style') {
            if ( value === '') continue
            for(let item in value){
                if (value.hasOwnProperty(item)) {
                    let val = value[item]
                    newEle['style'][item] = val
                }
               
            }
            continue
        }
        //children的情况：1.数组为空 2.数组有一个值：字符串或者对象 3.有多个值： 为字符串或者对象
        if (attr === 'children') {
            //如果不是数组把它变成数组进行统一处理
            if (!(value instanceof Array)) {
                value = [value]
            }
            value.forEach((item,index) => {
                //如果是字符串创建文本，如果是对象继续调用render方法
                if (typeof item === 'string') {
                    let text = document.createTextNode(item)
                    newEle.appendChild(text) 
                  } else {
                      render(item, newEle) //newEle作为新创建的容器
                  }
            })
            
            continue
        }
        
        newEle.setAttribute(attr, value)
    }
    //插入元素
    container.appendChild(newEle)
    //执行回调
    callback && callback()
}



let objJSX = createElement('div',{id:'title',className:'title',key:'1',style:{color:'blue',padding:'30px'}},createElement('h1',null,'React学习')  )
console.log(objJSX)
render(objJSX,root,()=>{
    console.log('ok')
})