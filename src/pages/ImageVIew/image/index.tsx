import { usePersistFn } from "ahooks";
import React, { useCallback, useRef, useState } from "react";
import Image from "./image";
import classes from "./index.module.less";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  FullscreenOutlined,
  ExpandOutlined,
  VerticalAlignBottomOutlined,
  UpOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import Icon from "../component/icon";
import { Popover } from "antd";
import QRCode from 'qrcode.react';

interface Props {
  url: string;
}
const index: React.FC<Props> = React.memo((props) => {
  const [percent, setPercent] = useState<string | number>("");
  const _ref = useRef<any>(null);
  const render = usePersistFn((ref: HTMLDivElement) => {

    _ref.current = new Image(ref, props.url);
    _ref.current.init().then((width: number) => {
      setPercent(width.toFixed(0));
    });
    document.addEventListener("wheel", (e) => {
      setPercent(parseFloat(_ref.current.imgDom.style.width).toFixed(0));
    })
  });

  const ref = useCallback(render, [props.url]);

  return (
    <div className={classes.root}>
      <div ref={ref} className={classes.img}></div>
      <div className={classes.tools}>
        {enlarge()}
        <div className={classes.percent}>{percent}%</div>
        {shrink()}
        {expanded()}
        {fullScreen()}
        {download()}
        {allImages()}
        <QrcodeForPhone />
      </div>
    </div>
  );

  // 放大图片
  function enlarge() {
    console.log("放大");

    return <Icon children={<PlusCircleOutlined onClick={() => {
      _ref.current.zoomToEnlarge().then((width: number) => {
        setPercent(width.toFixed(0));
      })
    }} />} />;
  }
  // 缩小图片
  function shrink() {
    return <Icon children={<MinusCircleOutlined onClick={() => {
      _ref.current.zoomToShrink().then((width: number) => {
        setPercent(width.toFixed(0));
      })
    }} />} />;
  }
  //原始尺寸
  function expanded() {
    return <Icon children={<ExpandOutlined onClick={() => {
      _ref.current.zoomToInitSize().then((width: number) => {
        setPercent(width.toFixed(0));
      })
    }} />} />
  }
  // 全屏
  function fullScreen() {
    return <Icon children={<FullscreenOutlined onClick={() => {
      _ref.current.fullScreen()
    }} />} />;
  }
  // 下载
  function download() {
    return <Icon children={<VerticalAlignBottomOutlined onClick={() => {
      _ref.current.download();
    }} />} />;
  }
  // 图片列表
  function allImages() {
    return <Icon children={<UpOutlined />} />;
  }
  // 扫描到手机
  function QrcodeForPhone() {
    const [visible, setVisible] = React.useState(false);
    const [url, setUrl] = React.useState("");

    return <Popover
      visible={visible}
      title={"用手机二维码扫描器打开图片"}
      content={<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <QRCode value={url} />
      </div>}
    >
      <Icon children={<QrcodeOutlined onClick={() => {
        console.log(_ref.current.imgDom.src);
        setVisible(!visible);
        setUrl(_ref.current.imgDom.src);
        // _ref.current.toQrcode().then((res: any) => {
        //   console.log(res);
        // });
      }} />} />
    </Popover>;
  }
});
export default index;