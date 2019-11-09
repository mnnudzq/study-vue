class Compile {
    constructor(el, vm) {
        // 要遍历的宿主节点
        this.$el = document.querySelector(el);

        this.$vm = vm;

        if (this.$el) {
            // 将节点内部内容转换成片段
            this.$fragment = this.node2Fragment(this.$el);

            // 执行编译
            this.compile(this.$fragment);

            // 将编译完的html结果追加至$el
            this.$el.appendChild(this.$fragment);
        }
    }

    // 将宿主元素中的代码片段拿出来遍历，会更高效
    node2Fragment(el) {
        const frag = document.createDocumentFragment();

        // 将el元素全部搬家至frag
        let child;
        while((child = el.firstChild)) {
            frag.appendChild(child);
        }
        return frag;
    }

    compile(frag) {
        const childNodes = frag.childNodes;
        Array.from(childNodes).forEach(node => {
            // 类型判断
            if (this.isElement(node)) {
                // 元素
                const nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    const attrName = attr.name; //属性名
                    const exp = attr.value; // 属性值
                    if (this.isDirective(attrName)) {
                        // k-text
                        const dir = attrName.substring(2);
                        // 执行指令
                        this[dir] && this[dir](node, this.$vm, exp);
                    }
                    if (this.isEvent(attrName)) {
                        const dir = attrName.substring(1); // @click
                        this.eventHandler(node, this.$vm, exp, dir);
                    }
                });
            }else if (this.isInterpolation(node)) {
                // 文本
                this.compileText(node);
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        });
    }

    compileText(node) {
        node.textContent = this.$vm.$data[RegExp.$1];
    }

    // 事件处理器
    eventHandler(node, vm, exp, dir) {
        // @click="onClick"
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }

    isDirective(attr) {
        return attr.indexOf("k-") == 0;
    }
    isEvent(attr) {
        return attr.indexOf("@") == 0;
    }
    isElement(node) {
        return node.nodeType === 1;
    }
    // 是否是插值表达式
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}