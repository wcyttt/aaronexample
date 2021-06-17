import Method from "./method";
class Render extends Method {
  // 挂载节点
  renderDom() {
    if (!this.container) return;
    this.container.style.overflow = "hidden";
  }
  // 渲染图片dom
  renderImg() {
    // if (!this.container) return;
    this.imgDom = document.createElement("div");
    this.imgDom.style.backgroundImage = `url(${this.url})`;
    this.imgDom.style.backgroundSize = "cover";
    this.imgDom.style.width = this.width ?? "80%";
    this.imgDom.style.height = this.height ?? "80%";

    this.container?.appendChild(this.imgDom);
  }
}
export default Render;
