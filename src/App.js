import React, {Component} from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import 'react-web-tabs/dist/react-web-tabs.css';
import makanow from './containers/images/makanow.png';
import activitylog from './containers/images/activitylog.png';
import logout from './containers/images/logout.png';
import menu from './containers/images/menu.png';
import conversion from './containers/images/conversion.png';
import orders from './containers/images/orders.png';
import Img from "react-image";
import ManageMenu from "./containers/ManageMenu";
import "./App.css";

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
                            <div class="sidenav-wrapper">
                                <div class="logo">
                                    <Img src={makanow} resizeMode="contain" />
                                </div>
                                <div class="nav_item">
                                    <h3>Manager {user.firstName}</h3>
                                </div>
                                <ul className="nav">
                                    <li>
                                        <a className="nav-link" href="/Dashboard">
                                            <i className="fas fa-chart-pie">
                                                {/*<Img style = {{width: 20, height: 20}} src={menu} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Dashboard</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "nav-link" href="/ManageMenu">
                                            <i className="fas fa-book-open">
                                                {/*<Img style = {{width: 20, height: 20}} src={menu} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Menu</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/ConversionRate">
                                            <i className="fas fa-money-bill">
                                                {/*<Img style = {{width: 20, height: 20}} src={activitylog} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Conversion Rates</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "nav-link" href="/ActivityLog">
                                            <i class="glyphicon glyphicon-list-alt">
                                                {/*<Img style = {{width: 20, height: 20}} src={activitylog} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Activity Log</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "nav-link" href="/Orders">
                                            <i class="glyphicon glyphicon-shopping-cart">
                                                {/*<Img style = {{width: 20, height: 20}} src={orders} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Orders</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="/ManagerProfile">
                                            <i className="fas fa-cog">
                                                {/*<Img style = {{width: 20, height: 20}} src={activitylog} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Profile</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "nav-link" href="" onClick={this.logout}>
                                            <i class="glyphicon glyphicon-off">
                                                {/*<Img style = {{width: 20, height: 20}} src={logout} resizeMode="contain" />*/}
                                            </i>
                                            <p>Logout</p>
                                        </a>
                                    </li>
                                </ul>
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
                        <div className="sidenav">
                            <div className="sidenav-wrapper">
                                <div className="logo">
                                    <Img src={makanow} resizeMode="contain"/>
                                </div>
                                <div className="nav_item">
                                    <h3 align="center">Admin</h3>
                                </div>
                                <ul className="nav">
                                    <li>
                                        <a className="nav-link" href="/AdminMainPage">
                                            <i className="fas fa-chart-pie">
                                                {/*<Img style = {{width: 20, height: 20}} src={menu} resizeMode="contain"/>*/}
                                            </i>
                                            <p>Restaurants</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="nav-link" href="" onClick={this.logout}>
                                            <i className="glyphicon glyphicon-off">
                                                {/*<Img style = {{width: 20, height: 20}} src={logout} resizeMode="contain" />*/}
                                            </i>
                                            <p>Logout</p>
                                        </a>
                                    </li>
                                </ul>
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