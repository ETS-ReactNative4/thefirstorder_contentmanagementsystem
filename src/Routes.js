import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ManageMenu from "./containers/ManageMenu";
import ActivityLog from "./containers/ActivityLog";
import Orders from "./containers/Orders";
import AdminMainPage from "./containers/AdminMainPage";
import ConversionRate from "./containers/ConversionRate";
import Dashboard from "./containers/Dashboard";
import ManagerProfile from "./containers/ManagerProfile";

export default () =>
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/Dashboard" exact component={Dashboard}/>
        <Route path="/ManageMenu" exact component={ManageMenu}/>
        <Route path="/AdminMainPage" exact component={AdminMainPage}/>
        <Route path="/ActivityLog" exact component={ActivityLog}/>
        <Route path="/Orders" exact component={Orders}/>
        <Route path="/ConversionRate" exact component={ConversionRate}/>
        <Route path="/ManagerProfile" exact component={ManagerProfile}/>
        {/*<Route path="/MenuTabs" exact component={MenuTabs}/>*/}
        {/*<Route path="/FoodPrices" exact component={FoodPrices}/>*/}
        {/*<Route path="/DeleteMenu" exact component={DeleteMenu}/>*/}
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
    </Switch>;