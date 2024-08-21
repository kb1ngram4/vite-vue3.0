// 接口 interface 关键字声明显示式描述此对象的内部数据类型
interface User {
    id:number
    name:string,
    age:number
}

// 接口继承
interface User1 extends User {
    sex:string
}

const x:User1 = {
 id:1,
 name:'x',
 age:12,
 sex:'男'
}

/**
 * 组合类型 通过组合简单类型来创建复杂类型  联合 和 泛型
 * 联合 可以声明类型可以是许多类型中的一种
 */
type MyBool = true | false
// 联合类型的一个流行用法是描述 string 或者 number 的字面量的合法值。
type WindowStates = 'open'| 'closed' | 'minimized'
type LockStates = 'locked'|'unlocked'
type num = 1|2|3|4

let window:string|number = 'open'
console.log(window);


// 有一个函数处理string或者array string[]:字符串数组
function getLength(obj:string |string[]):number {
    return obj.length
}
/**
 * 泛型：泛型为类型提供变量，例如数组，没有泛型的数组可以包含任何内容。带有泛型的数组可以描述数组包含的值   
 * 
 */
type StringArray = Array<string>
let stringArr:StringArray = ['1','2']

let list:Array<object> = [
    {name:'string'},
    {name:'ssss'}
]


interface BackPack<Type>{
    add:(obj:Type)=>void;
    get:()=>Type
}
declare const backpack:BackPack<string>

class UserAccount {
    id:number;
    name:string;
    age:number

    constructor(name:string,age:number,id:number){
        this.name = name;
        this.age = age;
        this.id = id;
    }
}
const user: User = new UserAccount('qioa',18,1)

class Shape {

    name:string;
    sides:number;
    sideLength:number
    constructor(name:string,sides:number,sideLength:number){
        this.name = name
        this.sides = sides
        this.sideLength = sideLength

    }
    calcPerimeter(){
     return this.sides*this.sideLength
  
    }
  
  }
const square = new Shape('square',4,5)
const triangle = new Shape('tri',3,3)

export {
    user,square,triangle,window,getLength
}
