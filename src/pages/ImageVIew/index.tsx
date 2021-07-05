import { usePersistFn } from "ahooks";
import React from "react";
import ImageView from "./image";
import classes from "./image-view.module.less";

const index = React.memo(() => {
  console.log("index");

  const Img = usePersistFn(() => {
    console.log(555);
    
    return <ImageView url={"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fr.sinaimg.cn%2Flarge%2Farticle%2F90560f6095b16925e7f53aedc18cac62&refer=http%3A%2F%2Fr.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627568396&t=47ce59c4b0e0d3934ee79319dd79d2b2"} />;
  })
  return (
    <div className={classes.root}>
      <Img />
    </div>
  );
});
export default index;
