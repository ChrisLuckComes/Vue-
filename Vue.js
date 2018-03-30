class Vue {//Vue类
    constructor(params) {
        this.data = params.data //获取属性
        this.methods = params.methods //获取方法
        this.observe(params.data, this)//监听属性
        var id = params.el;
        var dom = new Doms(document.getElementById(id), this)
        document.getElementById(id).appendChild(dom)
        params.mounted.call(this)
    }
    observe(obj, vm) {//读取data内属性，并监听
        if (!obj || typeof obj !== 'object') return
        Object.keys(obj).forEach(key => this.defineReactive(vm, key, obj[key]))
    }
    defineReactive(obj, key, val) {//利用Object.defineProperty监听属性改变
        var dep = new Dep()
        Object.defineProperty(obj, key, {
            get: function () {
                if (Dep.target) {//添加订阅者watcher到主题对象Dep
                    dep.addSub(Dep.target)
                }
                return val
            },
            set: function (newVal) {
                if (newVal === val) return
                val = newVal
                console.log(val)
                //作为发布者发布通知
                dep.notify()
            }
        })
    }

}
