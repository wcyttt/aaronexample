/**
 * @name States
 * @description 定义图片的所有属性
 */
class States {
  container?: HTMLElement; // 挂载的节点
  imgDom?: HTMLImageElement; // 生成的图片节点
  url?: string; // url

  initWidth?: number; // 图片初始宽度
  initHeight?: number; // 图片初始高度
  width?: string = "100%"; // 宽度(用户改变)
  height?: string = "100%"; // 高度(用户改变)

  waterMark?: boolean = true; //   是否开启水印
  rotate?: boolean = true; // 是否开启旋转
  zoom?: boolean = true; // 是否开启缩放
  move?: boolean = true; // 是否开启移动
  export?: boolean = true; // 是否开启导出功能
  share?: boolean = true; // 是否开启分享
}
export default States;
