import Watcher from "./watcher";
export default class Dep {
  static target: Watcher = null;
  subs = new Array<Watcher>();
  //收集订阅者的容器类
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
