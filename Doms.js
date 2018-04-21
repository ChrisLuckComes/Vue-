class Doms {
    constructor(node, vm) {
        if (node) {
            this.$frag = this.nodeToFragment(node, vm)
            return this.$frag
        }
    }
    nodeToFragment(node, vm) {//将dom转换成fragment
        var frag = document.createDocumentFragment()
        var child;
        while (child = node.firstChild) {
            this.compileElement(child, vm)
            frag.appendChild(child)
        }
        return frag
    }
    compileElement(node, vm) {//获取v-model属性,给dom赋值
        var reg = /\{\{(.*)\}\}/ //匹配双括号里面的任何字符
        if (node.nodeType === 1) {//element元素
            var attr = node.attributes;
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].nodeName == 'v-model') {
                    var name = attr[i].nodeValue//获取绑定的key
                    node.addEventListener('input', function (e) {
                        vm[name] = e.target.value//触发set方法
                    })
                    // node.value = vm[name]//data里的值赋给node
                    new Watcher(vm, node, name, 'value')
                } else if (attr[i].nodeName.includes(':')) {
                    var eventType = attr[i].nodeName.split(':')[1]//事件名
                    var cb = vm.methods && vm.methods[attr[i].nodeValue]
                    if (eventType && cb) {
                        node.addEventListener(eventType, cb.bind(vm), false)
                    }
                }
            }
            if (node.childNodes && node.childNodes.length) {//如果还有子节点 递归
                [...node.childNodes].forEach(n => this.compileElement(n, vm))
            }
        }
        if (node.nodeType === 3) {//text
            if (reg.test(node.nodeValue)) {
                var name = RegExp.$1
                name = name.trim()
                new Watcher(vm, node, name, 'nodeValue')
            }
        }
    }
}
