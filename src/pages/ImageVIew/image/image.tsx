import Render from "./render";

class Image extends Render {
  constructor(ref: HTMLDivElement, url: string) {
    super();
    this.container = ref; // 传入的节点 => 挂载的节点
    this.url = url;
    this.init();
  }
  init() {
    this.renderDom();
    this.renderImg();
    if (this.zoom === true) this.zoomTo();
  }
}
export default Image;
