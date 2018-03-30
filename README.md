# Vue2WayBind

**vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。**
![示意图](https://github.com/ChrisLuckComes/Vue2WayBind/blob/master/img/20180330144401803.png)


Object.defineProperty()：方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
```javascript
var obj = {};
    Object.defineProperty(obj, 'hello', {
        get: function() {
            console.log('get val:'+ val);
            return val;
     　 },
    　　set: function(newVal) {
            val = newVal;
            console.log('set val:'+ val);
        }
    });
obj.hello='111';//控制台打印set val:111
obj.hello; //控制台打印get val:111
```
当获取hello属性时，触发get；设置hello值时，触发set；这就是vue实现双向绑定的核心
