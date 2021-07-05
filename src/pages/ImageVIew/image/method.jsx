import States from "./state";
import { canvasToDataURL } from 'util';
import QRCode from 'qrcode';

class Method extends States {

    // 缩放
    zoomToWheel() {
        if (!this.container) return;
        // onWheel => 滚轮、触控板事件
        this.container.addEventListener("wheel", (e) => {
            const _zoom = e.deltaY > 0; // true => 放大 false => 缩小
            const width = parseFloat(this.imgDom.style.width);
            const height = parseFloat(this.imgDom.style.height);

            if (_zoom === true) {
                this.imgDom.style.width = `${width * 1.05}%`;
                this.imgDom.style.height = `${height * 1.05}%`;
            } else {
                this.imgDom.style.width = `${width * .95}%`;
                this.imgDom.style.height = `${height * .95}%`;
            }
        })
    }
    // 放大
    zoomToEnlarge() {
        return new Promise((resolve, reject) => {
            const width = parseFloat(this.imgDom.style.width);
            this.imgDom.style.width = `${width * 1.05}%`;
            resolve(width * 1.05)
        })
    }
    // 缩小
    zoomToShrink() {
        return new Promise((resolve, reject) => {
            const width = parseFloat(this.imgDom.style.width);
            this.imgDom.style.width = `${width * .95}%`;
            resolve(width * .95)
        })
    }
    // 原始尺寸
    zoomToInitSize() {
        return new Promise((resolve, reject) => {
            // 居中，放大到100%
            this.imgDom.style.top = `50%`;
            this.imgDom.style.left = `50%`;
            this.imgDom.style.width = `100%`;
            this.imgDom.style.transform = `translate3d(-50%,-50%, 1px)`;

            resolve(100);
        })
    }
    // 平移
    moveTo() {
        /**
         * @name sX => 鼠标按下时X坐标
         * @name sY => 鼠标按下时Y坐标
         * @name tX => 鼠标按下时translateX
         * @name tY => 鼠标按下时translateY
         */
        let sX, sY, tX, tY;

        // 移动事件
        const mousemove = (e) => {
            this.imgDom.style.transform = `translate3d(${tX - (sX - e.clientX)}px,${tY - (sY - e.clientY)}px,1px)`
        }

        // 按下事件
        const mousedown = (e) => {
            sX = e.clientX;
            sY = e.clientY;
            const transform = document.defaultView.getComputedStyle(this.imgDom, null).transform.split(",");
            tX = parseFloat(transform[transform.length - 4]);
            tY = parseFloat(transform[transform.length - 3]);
            this.container.addEventListener("mousemove", mousemove)
        }

        this.imgDom.addEventListener("mousedown", mousedown)

        // 鼠标抬起卸载绑定的事件
        // 因为鼠标可能移除图片，所以绑定在document上
        document.addEventListener("mouseup", (e) => {
            this.container.removeEventListener("mousedown", mousedown);
            this.container.removeEventListener("mousemove", mousemove);
            // this.exportImg();
        })
    }

    // 全屏
    fullScreen() {
        this.imgDom.style.width = document.documentElement.clientWidth;
        return document.documentElement.requestFullscreen();
    }

    //下载
    download() {
        let a = document.createElement("a"),
            event = new MouseEvent("click");
        a.href = this.imgDom.src;
        a.download = this.imgDom.title;
        a.dispatchEvent(event);
    }

    // 二维码扫描到手机
    toQrcode() {
        return new Promise(async (res, rej) => {
            const qrcode = await QRCode.toDataURL(this.imgDom);
            res(qrcode);
            new QRCode(this.imgDom, {
                text: `42412412}`, // url or text
                width: 100, // 二维码宽度
                height: 100, // 二维码高度
                colorDark: "red",  // 二维码颜色
                colorLight: "blue", //二维码背景底色
                correctLevel: QRCode.CorrectLevel.H, //层级等级
            });
        })
    }

    // 导出图片格式
    exportImg() {
        console.log(this.container);
        const _canvas = document.createElement("canvas");
        let canvas = _canvas.getContext("2d");
        canvas.drawImage(this.imgDom, 0, 0);
        const _canvasToDataURL = canvasToDataURL(canvas,);
        canvas.toBlob(function (blob) {

            var a = document.createElement("a");
            var body = document.getElementsByTagName("body");
            document.body.appendChild(a);
            a.download = "img" + ".jpg";
            a.href = window.URL.createObjectURL(blob);

            a.click();
            body.removeChild("a");

        });
    }
}
export default Method;