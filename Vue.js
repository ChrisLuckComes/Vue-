class Vue { //Vue类
    constructor(params) {
        this.data = params.data //获取属性
        this.computed = params.computed
        this.methods = params.methods //获取方法
        this.observe(this) //监听属性
        // this.initComputed(params.computed)
        var id = params.el;
        var dom = new Doms(document.getElementById(id), this)
        document.getElementById(id).appendChild(dom)
        params.mounted.call(this)
    }
    observe(vm) { 
        this.initData(vm.data,vm)//读取data内属性，并监听
        this.initData(vm.computed,vm)//监听computed
    }
    initData(obj,vm){
        if (!obj || typeof obj !== 'object') return
        Object.keys(obj).forEach(key => this.defineReactive(vm, key, obj[key]))
    }
    defineReactive(obj, key, val) { //利用Object.defineProperty监听属性改变
        var dep = new Dep()
        Object.defineProperty(obj, key, {
            get: function () {
                if (Dep.target) { //添加订阅者watcher到主题对象Dep
                    dep.addSub(Dep.target)
                }
                return isFunction(val)?val.call(obj):val
            },
            set: function (newVal) {
                if (newVal === val) return
                if(isFunction(newVal)){
                    newVal.call(obj)
                }else{
                    val = newVal
                    console.log(val)
                }
                //作为发布者发布通知
                dep.notify()
            }
        })
    }

}

function isFunction(obj) {
    return typeof obj == 'function'
}