import Doms from "./Doms";
import Dep from "./Dep";
import Watcher from "./watcher";

export interface VueProps {
  el: string;
  data: any;
  methods: any;
  computed?: any;
  watch?: any;
}

export default class Vue {
  el: string;
  data: any;
  methods: any;
  computed: any;
  constructor(props: VueProps) {
    if (props.data) {
      this.data = this.observeData(props.data, props);
    }
    if (props.computed) {
      this.computed = this.observeComputed(props.computed, this.data);
    }
    if (props.methods) {
      this.methods = this.observeMethod(props.methods, this.data);
    }
    let element = document.getElementById(props.el);
    let dom = new Doms(element, this);
    element.appendChild(dom);
  }
  observeData(props, thisArg) {
    let dep = new Dep();
    let proxy = new Proxy(props, {
      get: function(obj, prop, receiver) {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        if (isFunction(Reflect.get(obj, prop, receiver))) {
          return Reflect.apply(Reflect.get(obj, prop, receiver), thisArg, []);
        } else {
          return Reflect.get(obj, prop, receiver);
        }
      },
      set: function(obj, prop, value, receiver) {
        if (value === Reflect.get(obj, prop, receiver)) {
          return;
        }
        if (isFunction(value)) {
          Reflect.apply(value, thisArg, null);
        } else {
          Reflect.set(obj, prop, value, receiver);
        }
        if (Reflect.has(obj, "watch") && Reflect.has(obj.watch, prop)) {
          Reflect.apply(obj.watch[prop], thisArg, value);
        }
        dep.notify();
        return true;
      }
    });
    for (let key in props) {
      if (Array.isArray(props[key])) {
        let p = new Proxy(props[key], {
          set: function(obj, prop, value, receiver) {
            Reflect.set(obj, prop, value, receiver);
            dep.notify();
            return true;
          }
        });
        proxy[key] = p;
      }
    }
    return proxy;
  }

  observeMethod(method, thisArg) {
    let p = new Proxy(method, {
      get: function(obj, prop, receiver) {
        return Reflect.get(obj, prop, receiver);
      }
    });
    return p;
  }

  observeComputed(computed, thisArg) {
    let p = new Proxy(computed, {
      get(obj, prop, receiver) {
        let callback = Reflect.get(obj, prop, receiver);
        let watcher = Watcher.watchers.filter(x => x.name === prop);
        watcher[0].value = Reflect.apply(callback, thisArg, []);
        return watcher[0].value;
      }
    });
    return p;
  }
}

function isFunction(obj) {
  return typeof obj === "function";
}
