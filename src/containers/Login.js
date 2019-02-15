import React, { Component } from "react";
import { PostData } from "../components/PostData";
import {Redirect} from 'react-router-dom';
import "./Login.css";
import {Button} from "react-bootstrap";
import Img from 'react-image';
import makanow from './images/makanow.png';

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

    login(){

        if(this.state.managerId && this.state.password){
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
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if(this.state.redirect){
            return (<Redirect to={'/MainPage'}/>)
        }

        if(this.state.adminRedirect){
            return (<Redirect to={'/AdminMainPage'}/>)
        }

        // if(sessionStorage.getItem("userData")){
        //     return (<Redirect to={'/MainPage'}/>)
        // }

        return (
            <div className="row small-up-2 medium-up-3 large-up-4">
                <div data-reactroot>
                    <div className="container">
                        <div className="title_img">
                            <Img style = {{width: 500, height: 500}} src={makanow} resizeMode="contain" />
                        </div>
                        <br/><br/>
                        <p align="center" style={{color:"red"}}>{this.state.loginFailed}</p>
                        <br/>
                        <div  className = "formName">
                            <form>
                                <div className = "sideBySide">

                                    <label>Manager ID:</label>

                                    <div>
                                        <input type="text" name="managerId" placeholder="Eg. MA000" onChange={this.onChange}/>
                                    </div>
                                </div>
                                <br/><br/>
                                <div className = "sideBySide">

                                    <label>Password:</label>

                                    <div>
                                        <input type="password" name="password" onChange={this.onChange}/>
                                    </div>
                                </div>
                                <br/>
                            </form>
                            <Button className="submitButton" type="submit" bsStyle="primary" onClick={this.login}>LOGIN</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}