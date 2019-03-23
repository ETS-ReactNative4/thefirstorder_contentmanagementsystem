import React, { Component } from "react";
import { PostData } from "../components/PostData";
import {Redirect} from 'react-router-dom';
// import "./Login.css";
import {Button, Image} from "react-bootstrap";
import Img from 'react-image';
import makanow from './images/makanow.png';

import "./css/style.css";
// import "./js/index.js"

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            managerId: "",
            password: "",
            redirect: false,
            adminRedirect: false,
            loginFailed: ""
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount () {

        // this.setState({redirect: true});

        const script = document.createElement("script");

        //script.src = "http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";

        //Updated font-awesome

        script.src = "http://maxcdn.bootstrapcdn.com/font-awesome/5.7.2/css/font-awesome.min.css";

        //script.src = "https://use.fontawesome.com/releases/v5.7.2/css/all.css";

        script.async = true;

        document.body.appendChild(script);
    }

    login(){

        if(this.state.managerId && this.state.password){
            console.log("Processing...");
                PostData('managers/authenticate', this.state).then ((result) => {
                let responseJSON = result;
                const status =  responseJSON.status;
                if (status === 500){
                    console.log("Invalid ID or Password");
                    this.setState({
                        loginFailed: "Invalid ID or Password!"
                    })
                }
                else if (responseJSON) {
                    sessionStorage.setItem('userData', JSON.stringify(responseJSON));
                    if(JSON.parse(sessionStorage.getItem("userData")).managerId){
                        if(JSON.parse(sessionStorage.getItem("userData")).managerId.substring(0,2) === "MA"){
                            this.setState({redirect: true});
                        }
                    }else if(JSON.parse(sessionStorage.getItem("userData")).adminId){
                        if(JSON.parse(sessionStorage.getItem("userData")).adminId.substring(0,2) === "AD"){
                            this.setState({adminRedirect: true});
                        }
                    }
                }
                else {
                    console.log("Invalid ID or Password");
                    this.setState({
                        loginFailed: "Invalid ID or Password!"
                    })
                }
            });
        }else{
            this.setState({
                loginFailed: "Please do not leave empty fields!"
            })
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if(this.state.redirect){
            return (<Redirect to={'/Dashboard'}/>)
        }

        if(this.state.adminRedirect){
            return (<Redirect to={'/AdminMainPage'}/>)
        }

        // if(sessionStorage.getItem("userData")){
        //     return (<Redirect to={'/ManageMenu'}/>)
        // }
        console.log("LOGIN PAGE")
        console.log(this.state)
        return (
            <div className="container_login">
                <div className = "login-form">
                    <div>
                        <Img style = {{width: 200, height: 200, marginLeft: 45}} src={makanow} resizeMode="contain" />
                    </div>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" name="managerId"
                                   placeholder="Manager ID" id="UserName" onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" name="password"
                                   placeholder="Password" id="Passwod" onChange={this.onChange}/>
                        </div>
                        <span className="alert">{this.state.loginFailed}</span>
                        <button type="button" className="log-btn" onClick={this.login}>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}
