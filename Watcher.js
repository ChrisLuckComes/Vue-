class Watcher {
    constructor(vm, node, name, type) {
        Dep.target = this
        this.name = name
        this.node = node
        this.vm = vm
        this.type = type
        this.update()
        Dep.target = null
    }
    update() {
        this.get()
        this.node[this.type] = this.value//订阅者执行响应操作
    }
    get() {
        this.value = this.vm[this.name]//触发响应属性的get
    }
}
