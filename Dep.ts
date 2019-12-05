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

// let uid = 0;

// export default class Dep {
//   static target: Watcher = null;
//   subs = new Array<Watcher>();
//   id: number;
//   constructor() {
//     this.id = uid++;
//     this.subs = [];
//   }

//   addSub(sub: Watcher) {
//     this.subs.push(sub);
//   }

//   removeSub(sub: Watcher) {
//     let index = this.subs.findIndex(s => Object.is(s, sub));
//     this.subs.splice(index, 1);
//   }

//   depend() {
//     if (Dep.target) {
//       Dep.target.addDep(this);
//     }
//   }
//   notify() {
//     // this.subs.forEach(sub => sub.update());
//     const subs = this.subs.slice();
//     subs.sort((a, b) => a.id - b.id);
//     subs.forEach(sub => sub.update());
//   }
// }

// Dep.target = null;

// const targetStack = [];

// export function pushTarget(target?: Watcher) {
//   targetStack.push(target);
//   Dep.target = target;
// }

// export function popTarget() {
//   targetStack.pop();
//   Dep.target = targetStack[targetStack.length - 1];
// }
