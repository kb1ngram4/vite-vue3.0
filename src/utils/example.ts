// 接口 interface 关键字声明显示式描述此对象的内部数据类型
interface User {
    id:number
    name:string,
    age:number
}
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
    user,square,triangle
}
