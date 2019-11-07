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
        const frag = document.createDocumentFragment;

        // 将el元素全部搬家至frag
        let child;
        while(child = el.firstChild) {
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

    isElement(node) {
        return node.nodeType === 1;
    }
    // 是否是插值表达式
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
}