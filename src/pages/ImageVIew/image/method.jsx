import States from "./state";
class Method extends States {

    // 缩放
    zoomTo() {
        if (!this.container) return;
        // onWheel => 滚轮、触控板事件
        this.container.addEventListener("wheel", (e) => {
            const _zoom = e.deltaY > 0; // true => 放大 false => 缩小
            const width = parseFloat(this.imgDom.style.width);
            const height = parseFloat(this.imgDom.style.height);
            console.log(width, height);
            if (_zoom === true) {
                this.imgDom.style.width = `${width * 1.05}%`;
                this.imgDom.style.height = `${height * 1.05}%`;
            } else {
                this.imgDom.style.width = `${width * .95}%`;
                this.imgDom.style.height = `${height * .95}%`;
            }
            console.log(e.deltaY, 123);
        })
    }
    // 平移、导出...
}
export default Method;