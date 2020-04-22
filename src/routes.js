import React from "react";
import { Route } from "react-router-dom";

import ItemList from "./containers/ItemListView";
import ItemDetail from "./containers/ItemDetailView";
import OrderSummary from "./containers/OrderSummary";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Checkout from "./containers/Checkout";
import Profile from "./containers/Profile";

const Hoc = props => props.children;

const BaseRouter = () => (
  <Hoc>
    <Route path={process.env.PUBLIC_URL + "/FurnitureService"} component={Home} />{" "}
    <Route exact path="/items/" component={ItemList} />{" "}
    <Route exact path="/items/:itemID/" component={ItemDetail} />{" "}
    <Route exact path="/order-summary/" component={OrderSummary} />{" "}
    <Route exact path="/login/" component={Login} />{" "}
    <Route exact path="/profile/" component={Profile} />{" "}
    <Route exact path="/signup/" component={Signup} />{" "}
    <Route exact path="/checkout/" component={Checkout} />{" "}
  </Hoc>
); 

export default BaseRouter;
