import React, { useCallback, useRef } from "react";
import Image from "./image";
import classes from "./index.module.less";

interface Props {
  url: string;
}
const index: React.FC<Props> = React.memo((props) => {
  const _ref = useRef<any>(null);
  const render = (ref: HTMLDivElement) => {
    console.log(2312312);

    _ref.current = new Image(ref, props.url);
  };
  const ref = useCallback(render, [props.url]);
  return <div ref={ref} className={classes.root}></div>;
});
export default index;
