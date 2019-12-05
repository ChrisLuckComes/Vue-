import { VueProps } from "./vue";
import Dep from "./Dep";
// import Dep, { pushTarget, popTarget } from "./Dep";

let uid = 0;

export default class Watcher {
  node: Node;
  type: string;
  name: string;
  props: VueProps;
  value: any;
  constructor(props, node, name, type) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.props = props;
    this.type = type;
    this.update();
    Dep.target = null;
  }
  update() {
    this.get();
    this.node[this.type] = this.value; //订阅者执行响应操作
  }
  get() {
    this.value = this.props[this.name]; //触发响应属性的get
  }
}

// export default class Watcher {
//   node: Node;
//   type: string;
//   name: string;
//   props: VueProps;
//   value: any;
//   id: number;
//   deps: Dep[];
//   newDeps: Dep[];
//   depIds: Set<any>;
//   newDepIds: Set<any>;
//   constructor(props: VueProps, node: Node, name: string, type: string) {
//     this.id = ++uid;
//     this.node = node;
//     this.type = type;
//     this.name = name;
//     this.props = props;
//     this.deps = [];
//     this.newDeps = [];
//     this.depIds = new Set();
//     this.newDepIds = new Set();
//     this.value = this.get();
//   }
//   update() {
//     this.get();
//     this.node[this.type] = this.value;
//   }
//   get() {
//     pushTarget(this);
//     this.value = this.props[this.name];
//     popTarget();
//     // this.cleanupDeps();
//   }
//   addDep(dep: Dep) {
//     const id = dep.id;
//     if (!this.newDepIds.has(id)) {
//       this.newDepIds.add(id);
//       this.newDeps.push(dep);
//       if (!this.depIds.has(id)) {
//         dep.addSub(this);
//       }
//     }
//   }
// }
