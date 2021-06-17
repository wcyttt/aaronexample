import ImageView from "./image";
import classes from "./image-view.module.less";

const index = () => {
  return (
    <div className={classes.root}>
      <ImageView url={"image/girl.jpg"} />
    </div>
  );
};
export default index;
