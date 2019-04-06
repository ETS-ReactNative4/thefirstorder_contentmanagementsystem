import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import "./Header.css"
import ManageProfile from "./ManageProfile";


class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Navbar className="Header">
                <div className="Content">

                    <div className="Title">
                        <span>{this.props.title}</span>
                    </div>

                    <ManageProfile/>
                </div>
            </Navbar>
        )
    }
}

export default Header;