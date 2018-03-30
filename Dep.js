class Dep {//收集订阅者的容器类
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => sub.update())
    }
}
