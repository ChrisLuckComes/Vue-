# Vue2WayBind

## 使用方法

`parcel index.html`

## Object.defineProperty()

**vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。**

`Object.defineProperty()`：方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

```js
var obj = {};
Object.defineProperty(obj, "hello", {
  get: function() {
    console.log("get val:" + val);
    return val;
  },
  set: function(newVal) {
    val = newVal;
    console.log("set val:" + val);
  }
});
obj.hello = "111"; //控制台打印set val:111
obj.hello; //控制台打印get val:111
```

当获取 hello 属性时，触发 get；设置 hello 值时，触发 set；这就是 vue 实现双向绑定的核心

---

## `Proxy`

Proxy 用于定义基础操作的自定义行为，例如属性查找，赋值，枚举，函数调用等。

> `let p = new Proxy(target, handler);`

接受两个参数，返回一个对象，对 p 的操作全部会转发到 target 上。

- target 用 Proxy 包装的目标对象，任意类型。
- handler 占位符，包含 Proxy 的捕捉器，有很多可选项，这里我们只需要用到`handler.set()`

和`Object.defineProperty()`descriptor set 属性不同的是`Proxy()`handler set 函数有三个参数

- obj 对象
- prop key
- value 值

## `Reflect`

`Reflect` 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 proxy handlers 的方法相同。`Reflect` 不是一个函数对象，因此它是不可构造的，且所有方法都是静态的。

它的所有方法和 proxy handler 一样

- `Reflect.apply()`  
  和`Function.prototype.apply`类似

- `Reflect.construct()`  
  相当于执行 new 操作

- `Reflect.defineProperty()`  
  和 Object.defineProperty()类似

- `Reflect deleteProperty()`  
  相当于 delete obj[name]

- `Reflect.get()`  
  相当于 obj[name]

- `Reflect.has()`
  相当于 `in`运算符

- `Reflect.ownKeys()`
  相当于 Object.keys()

- `Reflect.set()`
  将值分配给属性，返回一个 boolean，成功返回 true

## vue.ts

使用 proxy 代替 Object.defineProperty
