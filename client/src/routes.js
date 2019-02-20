import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "./src/App";

export default (
  <Switch>
    {/* <Route path='/rent' component={} /> */}
    <Route path="/" component={App} />
  </Switch>
);
