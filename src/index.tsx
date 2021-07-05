import React from "react";
import ReactDOM from "react-dom";
import Route from "routes/index";
import "./index.less";
import 'antd/dist/antd.less';

ReactDOM.render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>,
  document.getElementById("root")
);
