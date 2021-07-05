import Method from "./method";
import { setCss } from "./util";
class Render extends Method {
  // 挂载节点
  renderDom() {
    if (!this.container) return;
    setCss(this.container, {
      position: "relative",
      boxSizing: "border-box",
      width: document.body.clientWidth + "px",
      height: "100%",
      overflow: "hidden",
    });
  }
  // 渲染图片dom
  renderImg() {
    return new Promise<void>((res, rej) => {

      let img = new Image();

      // drag
      img.setAttribute("draggable", "false");

      // 载入图片
      img.src = this.url ?? "";
      console.log(this.url);

      // 监听img载入完成
      let _this = this;
      img.onerror = function () { };
      img.onload = function (e) {
        if (!img) return;
        _this.initWidth = img.width;
        _this.initHeight = img.height;

        _this.container?.appendChild(img);
        _this.imgDom = img;
        if (_this.zoom === true) _this.zoomToWheel();
        if (_this.move === true) _this.moveTo();
        res();
      };
      // css
      setCss(img, {
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundSize: "contain",
        width: "70%",

        // 开启gpu渲染，居中
        transform: `translate3d(-50%,-50%, 1px)`,
      });
    })
  }
}
export default Render;
