# Vue 3 + TypeScript + Vite

## setup函数的特性和作用
```
   setup函数是处于beforeCreate和Created两个钩子函数之间，即 setup的this指向undefined
   setup是Composition APi的入口
   在setup中定义的变量和函数都要return出去，否则无法在模板中使用
   若有重名，setup优先
   vue2可以访问到setup中的属性、方法，反之不行
   setup只能是同步的不能是异步的
```
## 遇到的问题及解决方式
### 路由组件，ts识别不了vue模块问题
```
   在src目录下创建一个vite-env.d.ts文件
   <!-- 所有以 .vue结尾的文件都是vue组件，可以通过import 语句导入 -->
    declare module '*.vue' {
      import{ Component } from 'vue';
      const conponent:Component;
      export default component;
    }

```
