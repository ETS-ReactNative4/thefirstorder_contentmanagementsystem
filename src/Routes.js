import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import MainPage from "./containers/MainPage";
import ActivityLog from "./containers/ActivityLog";
import Orders from "./containers/Orders";
import AdminMainPage from "./containers/AdminMainPage";
import ConversionRate from "./containers/ConversionRate";

export default () =>
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/MainPage" exact component={MainPage}/>
        <Route path="/AdminMainPage" exact component={AdminMainPage}/>
        <Route path="/ActivityLog" exact component={ActivityLog}/>
        <Route path="/Orders" exact component={Orders}/>
        <Route path="/ConversionRate" exact component={ConversionRate}/>
        {/*<Route path="/MenuTabs" exact component={MenuTabs}/>*/}
        {/*<Route path="/FoodPrices" exact component={FoodPrices}/>*/}
        {/*<Route path="/DeleteMenu" exact component={DeleteMenu}/>*/}
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;