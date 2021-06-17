/**
 * @name States
 * @description 定义图片的所有属性
 */
class States {
  container?: HTMLElement; // 挂载的节点
  imgDom?: HTMLElement; // 生成的图片节点
  url?: string; // url

  width?: string = "80%"; // 宽度
  height?: string = "80%"; // 高度

  waterMark?: boolean = true; //   是否开启水印
  rotate?: boolean = true; // 是否开启旋转
  zoom?: boolean = true; // 是否开启缩放
  move?: boolean = true; // 是否开启移动
  export?: boolean = true; // 是否开启导出功能
  share?: boolean = true; // 是否开启分享
}
export default States;
