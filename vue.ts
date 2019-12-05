import Doms from "./Doms";
import Dep from "./Dep";

export interface VueProps {
  el: string;
  data: any;
  methods: any;
  computed?: any;
  watch?: any;
}

export default function Vue(props: VueProps) {
  this.observeData = function(props, thisArg) {
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
    return proxy;
  };

  this.observeMethod = function(method, thisArg) {
    let p = new Proxy(method, {
      get: function(obj, prop, receiver) {
        // Reflect.apply(obj[prop], thisArg, []);
        return Reflect.get(obj, prop, receiver);
      }
    });
    return p;
  };

  if (props.data) {
    this.data = this.observeData(props.data, props);
  }
  if (props.computed) {
    this.computed = this.observeData(props.computed, props);
  }
  if (props.methods) {
    this.methods = this.observeMethod(props.methods, props);
  }
  //   this.data = this.observe(props);
  let element = document.getElementById(props.el);
  let dom = new Doms(element, this);
  element.appendChild(dom);
}

function isFunction(obj) {
  return typeof obj === "function";
}
