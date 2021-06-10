import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import ImageVIew from "pages/ImageVIew";

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={ImageVIew}></Route>
        <Route exact path={"/imageview"} component={ImageVIew}></Route>
      </Switch>
    </BrowserRouter>
  );
};
export default index;
