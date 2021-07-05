import Render from "./render";

class Image extends Render {
  constructor(ref: HTMLDivElement, url: string) {
    super();
    this.container = ref; // 传入的节点 => 挂载的节点
    this.url = url;
    // this.init();
  }
  init() {
    return new Promise<number>(async (res, rej) => {
      if (this.imgDom) return;
      this.renderDom();
      await this.renderImg().then(() => {
        if (this.imgDom) {
          const width = parseFloat(this.imgDom.style.width);
          res(width);
        }
      });
    })
  }
}
export default Image;
