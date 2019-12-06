import { VueProps } from "./vue";
import Dep from "./Dep";
// import Dep, { pushTarget, popTarget } from "./Dep";

let uid = 0;

interface WatcherConfig {
  isComputed?: boolean;
  callback: Function;
}

export default class Watcher {
  node: Node;
  type: string;
  name: string;
  props: VueProps;
  value: any;
  config: WatcherConfig;
  static watchers: Array<Watcher>;
  constructor(props, node, name, type) {
    Dep.target = this;
    Watcher.watchers = [];
    this.name = name;
    this.props = props;
    this.type = type;
    this.node = node;
    Watcher.watchers.push(this);
    this.update();
    Dep.target = null;
  }
  update() {
    this.get();
    this.node[this.type] = this.value; //订阅者执行响应操作
  }
  get() {
    this.value = this.props[this.name];
  }
}
