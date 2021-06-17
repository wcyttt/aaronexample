import { BrowserRouter, Switch, Route } from "react-router-dom";
import ImageView from "pages/ImageView";

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={ImageView}></Route>
        <Route exact path={"/imageview"} component={ImageView}></Route>
      </Switch>
    </BrowserRouter>
  );
};
export default index;
