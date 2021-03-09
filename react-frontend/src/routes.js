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
    <Route path="/" component={Home} />{" "}
    <Route path="/items/" component={ItemList} />{" "}
    <Route path="/items/:itemID/" component={ItemDetail} />{" "}
    <Route path="/order-summary/" component={OrderSummary} />{" "}
    <Route path="/login/" component={Login} />{" "}
    <Route path="/profile/" component={Profile} />{" "}
    <Route path="/signup/" component={Signup} />{" "}
    <Route path="/checkout/" component={Checkout} />{" "}
  </Hoc>
);

export default BaseRouter;
