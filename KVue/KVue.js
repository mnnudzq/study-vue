// new KVue()

class KVue {

    // 构造器
    constructor(options) {
        this.$options = options; // 加入缓存

        // 数据响应化
        this.$data = options.data;

        this.observe(this.$data);

        new Compile(options.el, this);

        // created 钩子
        if (options.created) {}
    }

    observe(obj) {
        if (!obj || typeof obj !== 'object') { // 判断是否是对象 且 不为空
            return;
        }

        // 遍历对象
        Object.keys(obj).forEach(key => {
            this.defineReactive(obj, key, obj[key]);
        });
    }

    // 数据响应化函数
    defineReactive(obj, key, val) {

        // 递归解决数据嵌套的作用
        this.observe(val);

        const dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                return val;
            },
            set(newValue) {
                if (newValue == val) {
                    return;
                }
                val = newValue;
                console.log(`${key}属性值变更为：${val}`);
                dep.notify();
            }
        });
    }
}

// Dep 用来管理 Watcher
class Dep {

    constructor() {
        this.deps = []; // 用来存放依赖（watcher）
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    // 用来通知所有的依赖
    notify() {
        this.deps.forEach(dep => dep.update());
    }
}

// 实现更新
class Watcher {

    constructor() {
        // 将当前 watcher 实例指定到Dep静态属性target
        Dep.target = this;
    }

    update() {
        console.log('更新啦');
    }
}