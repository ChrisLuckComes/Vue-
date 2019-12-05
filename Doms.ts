import { VueProps } from "./vue";
import Watcher from "./watcher";
export default function Doms(node: Element, vueInstance: VueProps): void {
  this.nodeToFragment = function(node: Element, vueInstance) {
    let frag = document.createDocumentFragment();
    let child = null;
    while ((child = node.firstChild)) {
      this.compileElement(child, vueInstance);
      frag.appendChild(child);
    }
    return frag;
  };
  this.compileElement = function(node: Element, vueInstance: VueProps) {
    let reg = new RegExp(/\{\{(.*)\}\}/); //匹配mustache语法模板
    if (node.nodeType === 1) {
      //如果是element元素
      let attr = node.attributes;
      for (let i = 0; i < attr.length; i++) {
        if (attr[i].nodeName === "v-model") {
          let name = attr[i].nodeValue;
          node.addEventListener("input", function(e: any) {
            vueInstance.data[name] = (e.target as any).value;
          });
          new Watcher(vueInstance.data, node, name, "value");
        } else if (attr[i].nodeName.includes("@")) {
          let eventType = attr[i].nodeName.split("@")[1];
          let callback = vueInstance.methods
            ? vueInstance.methods[attr[i].nodeValue]
            : null;
          if (eventType && callback) {
            node.addEventListener(
              eventType,
              callback.bind(vueInstance.data),
              false
            );
          }
        }
      }
      if (node.hasChildNodes()) {
        [...node.childNodes].forEach(childNode =>
          this.compileElement(childNode, vueInstance)
        );
      }
    }
    if (node.nodeType == 3) {
      if (reg.test(node.nodeValue)) {
        let name = RegExp.$1;
        name = name.trim();
        new Watcher(vueInstance.data, node, name, "nodeValue");
      }
    }
  };

  if (node) {
    this.$frag = this.nodeToFragment(node, vueInstance);
    return this.$frag;
  }
}
