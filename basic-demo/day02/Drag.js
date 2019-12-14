class Drag {
    startMouse = {};
    #el = null; // 私有属性
    cloneBox = null;
    constructor(el) {
        this.#el = el;
        this.start(); //为元素添加监听
    }
    start() {
        // 移动函数
        let move = (e) => {
            this.move(e);
        };

        this.#el.addEventListener('mousedown', (e) => {
            // 当前鼠标位置
            this.startMouse = {
                x: e.clientX,
                y: e.clientY
            };

            // 如果type存在，则原位置添加一个相同的box
            this.type && this.cloneEl(e);

            // 监听移动,此处绑定在document上，防止绑定在box上手速太快时脱落
            document.addEventListener('mousemove', move);
            // 监听鼠标抬起
            document.addEventListener('mouseup', () => {
                // 移除移动监听
                document.removeEventListener('mousemove', move);

                this.type && this.removeClone(e);
            }, {once: true});
        });
    }
    move(e) {
        // 计算鼠标移动的距离
        let disMouse = {
            x: e.clientX - this.startMouse.x,
            y: e.clientY - this.startMouse.y
        };
        // 移动元素
        this.#el.style.top  = parseFloat(getComputedStyle(this.#el)['top']) + disMouse.x;
        this.#el.style.left = parseFloat(getComputedStyle(this.#el)['left']) + disMouse.y;
    }
    cloneEl() {
        this.cloneBox = this.#el.cloneNode(true);
        document.body.appendChild(this.cloneBox);
        this.#el.style.opacity = .5;
    }
    removeClone() {
        document.body.removeChild(this.cloneBox);
        this.#el.style.opacity = 1;
        this.cloneBox = null;
    }
}