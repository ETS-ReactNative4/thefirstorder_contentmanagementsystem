import React, {Component} from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import 'react-web-tabs/dist/react-web-tabs.css';
import makanow from './containers/images/makanow.png';
import activitylog from './containers/images/activitylog.png';
import logout from './containers/images/logout.png';
import menu from './containers/images/menu.png';
import conversion from './containers/images/conversion.png';
import orders from './containers/images/orders.png';
import Img from "react-image";

class App extends Component {

    constructor(){
        super();
        this.state={
            displayLogout: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.setItem("UserData", '');
        sessionStorage.clear();
        this.setState({displayLogout: false});
    }

    render() {

        if(sessionStorage.getItem("userData")){

            let user = JSON.parse(sessionStorage.getItem("userData"));

            if (user.managerId){
                return (
                    <div className="app_container">
                        <div class="sidenav">
                            <div class="logo">
                                <Img src={makanow} resizeMode="contain" />
                            </div>
                            <div class="nav_item">
                                <h3 align="center">Manager {user.firstName}</h3>
                            </div>
                                <div class="nav_item">
                                    <a href="/MainPage">
                                        <Img style = {{width: 20, height: 20}} src={menu} resizeMode="contain"/> Menu
                                    </a>
                                </div>
                                <div class="nav_item">
                                    <a href="/ActivityLog">
                                        <Img style = {{width: 20, height: 20}} src={activitylog} resizeMode="contain"/> Activity Log
                                    </a>
                                </div>
                            <div class="nav_item">
                                <a href="/Orders">
                                    <Img style = {{width: 20, height: 20}} src={orders} resizeMode="contain"/> Orders
                                </a>
                            </div>
                            <div class="nav_item">
                                <a href="" onClick={this.logout}>
                                    <Img style = {{width: 20, height: 20}} src={logout} resizeMode="contain" /> Logout
                                </a>
                            </div>
                        </div>

                        {/* <Navbar fluid collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Welcome, Manager {user.firstName}!
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem href="/MainPage">Home</NavItem>
                            <NavItem href="/ActivityLog">Activity Log</NavItem>
                            <LinkContainer to="/">
                                <NavItem onClick={this.logout}>Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>*/}

                        <Routes />
                    </div>
                );
            }

            if (user.adminId){
                return (
                    <div class="app_container">
                        <div class="sidenav">
                            <div class="logo">
                                <Img src={makanow} resizeMode="contain" />
                            </div>
                            <div class="nav_item">
                                <h3 align="center">Admin</h3>
                            </div>
                            <div class="nav_item">
                                <a href="/AdminMainPage">
                                    <Img style = {{width: 20, height: 20}} src={activitylog} resizeMode="contain"/>Manage Restaurants
                                </a>
                            </div>
                            <div class="nav_item">
                                <a href="/ConversionRate">
                                    <Img style = {{width: 20, height: 20}} src={conversion} resizeMode="contain"/>Conversion Rate
                                </a>
                            </div>
                            <div class="nav_item">
                                <a href="" onClick={this.logout}>
                                    <Img style = {{width: 20, height: 20}} src={logout} resizeMode="contain" /> Logout
                                </a>
                            </div>
                        </div>

                        {/* <Navbar fluid collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Welcome, Manager {user.firstName}!
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem href="/MainPage">Home</NavItem>
                            <NavItem href="/ActivityLog">Activity Log</NavItem>
                            <LinkContainer to="/">
                                <NavItem onClick={this.logout}>Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>*/}

                        <Routes />
                    </div>
                );
            }
        }

        return (
            <div class="app_container">
                <Routes />
            </div>
        );
    }
}


export default App;