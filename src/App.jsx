import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./components/homescreen/homescreen";
import Products from "./components/homescreen/product/products";
import Resources from "./components/homescreen/resources/resources";
import Pricing from "./components/homescreen/pricing/pricing";

import Sidebar from "./components/homescreen/projectSidebar/Sidebar";
import Header from "./components/homescreen/projectHeader/header";

import { UserContext } from "./context/userContext/userContext";

const App = () => {
  const [user, setUser] = useContext(UserContext).user;
  return (
    <>
      {user === null ? (
        <Switch>
          <Route exact path="/" component={HomeScreen} />

          <Route path="/product" component={Products} />
          <Route path="/resource" component={Resources} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/signin" />
        </Switch>
      ) : (
        <div>pokemon</div>
      )}
    </>
  );
};

export default App;
