import React from "react";
import { Route } from "react-router-dom";

import ItemList from "./containers/ItemListView";
// import ItemDetail from "./containers/ItemDetailView";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />{" "}
    <Route exact path="/items/" component={ItemList} />{" "}
    {/* <Route exact path="/items/:itemID/" component={ItemDetail} />{" "} */}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
  </div>
);

export default BaseRouter;
