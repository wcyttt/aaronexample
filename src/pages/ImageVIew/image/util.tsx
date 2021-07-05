export function setCss(dom: HTMLElement, attribute: {}) {
  for (const key in attribute) {
    if (Object.prototype.hasOwnProperty.call(attribute, key)) {
      dom.style[key] = attribute[key];
    }
  }
}

// canvas转dataURL：canvas对象、转换格式、图像品质
export function canvasToDataURL(
  canvas: HTMLCanvasElement,
  format: string,
  quality: string
) {
  return canvas.toDataURL(format || "image/jpeg", quality || 1.0);
}

// DataURL转canvas
function dataURLToCanvas(
  dataurl: string,
  cb: (arg0: HTMLCanvasElement) => void
) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    cb(canvas);
  };
  img.src = dataurl;
}
/*-----------------------------------------------------------------------*/
// image转canvas：图片地址
function imageToCanvas(
  src: string,
  cb: { (canvas: any): void; (canvas: any): void; (arg0: HTMLElement): void }
) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    cb(canvas);
  };
}
// canvas转image
function canvasToImage(canvas: {
  toDataURL: (arg0: string, arg1: number) => string;
}) {
  var img = new Image();
  img.src = canvas.toDataURL("image/jpeg", 1.0);
  return img;
}
/*-----------------------------------------------------------------------*/
// File/Blob对象转DataURL
function fileOrBlobToDataURL(
  obj: Blob,
  cb: {
    (dataurl: any): void;
    (dataurl: any): void;
    (arg0: string | ArrayBuffer | null): void;
  }
) {
  var a = new FileReader();
  a.readAsDataURL(obj);
  a.onload = function (e) {
    cb(e.target?.result);
  };
}
// DataURL转Blob对象
// function dataURLToBlob(dataurl: string) {
//   var arr = dataurl.split(",");
//   var mime = arr[0].match(/:(.*?);/)[1];
//   var bstr = atob(arr[1]);
//   var n = bstr.length;
//   var u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// }
/*-----------------------------------------------------------------------*/
// Blob转image
// function blobToImage(blob: any, cb: (arg0: HTMLImageElement) => void) {
//   fileOrBlobToDataURL(blob, function (dataurl: string) {
//     var img = new Image();
//     img.src = dataurl;
//     cb(img);
//   });
// }
// image转Blob
// function imageToBlob(src: string, cb: (arg0: Blob) => void) {
//   imageToCanvas(src, function (canvas: HTMLCanvasElement) {
//     cb(dataURLToBlob(canvasToDataURL(canvas)));
//   });
// }
// /*-----------------------------------------------------------------------*/
// // Blob转canvas
// function BlobToCanvas(blob: any, cb: (arg0: HTMLCanvasElement) => void) {
//   fileOrBlobToDataURL(blob, function (dataurl: string) {
//     dataURLToCanvas(dataurl, cb);
//   });
// }
// // canvas转Blob
// function canvasToBlob(canvas: HTMLCanvasElement, cb: (arg0: Blob) => void) {
//   cb(dataURLToBlob(canvasToDataURL(canvas)));
// }
// /*-----------------------------------------------------------------------*/
// // image转dataURL
// function imageToDataURL(src: string, cb: (arg0: string) => void) {
//   imageToCanvas(src, function (canvas: HTMLCanvasElement) {
//     cb(canvasToDataURL(canvas));
//   });
// }
// // dataURL转image，这个不需要转，直接给了src就能用
// function dataURLToImage(dataurl: any) {
//   var img = new Image();
//   img.src = d;
//   return img;
// }
