import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import "./MainPage.css";
import {Redirect} from "react-router-dom";
import ActivityLogTable from "./ActivityLogTable";

class ManagerProfile extends Component {

    constructor(props){
        super(props);
        this.state={
            managerId: '',
            managerData: [],
            newManagerData: [],
            firstName: '',
            lastName: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            messageFromServer: '',
            errorMessage: '',
            redirect: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId,
                managerData: JSON.parse(sessionStorage.getItem("userData")),
                firstName: JSON.parse(sessionStorage.getItem("userData")).firstName,
                lastName: JSON.parse(sessionStorage.getItem("userData")).lastName
            })
            // this.getManagerProfile(this, this.state.managerId);
        }
        else{
            this.setState({redirect: true});
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId,
                managerData: JSON.parse(sessionStorage.getItem("userData")),
                firstName: JSON.parse(sessionStorage.getItem("userData")).firstName,
                lastName: JSON.parse(sessionStorage.getItem("userData")).lastName
            })
        }
        else{
            this.setState({redirect: true});
        }
    }

    updateManagerProfile(e){
        var updateManager = {
            firstName: e.state.firstName,
            lastName: e.state.lastName,
            newPassword: e.state.newPassword,
        }
        axios.post('http://makanow.herokuapp.com/api/managers/updateManagerProfile/'+this.state.managerId, updateManager).then(function(response) {
            e.setState({
                newManagerData: JSON.stringify(response.data)
            });
            sessionStorage.setItem('userData', JSON.stringify(response.data));
        });
    }

    onClick(e){

        if(this.state.firstName && this.state.lastName && this.state.oldPassword === JSON.parse(sessionStorage.getItem("userData")).password && this.state.newPassword && this.state.confirmPassword && this.state.newPassword === this.state.confirmPassword){
            this.updateManagerProfile(this);
            this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                messageFromServer: 'Profile updated successfully'
            });
        }else if(this.state.firstName === '' || this.state.lastName === '' || this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === ''){
            this.setState({
                messageFromServer: '',
                errorMessage: 'All fields must be filled.'
            })
        }else if(this.state.newPassword !== this.state.confirmPassword) {
            this.setState({
                messageFromServer: '',
                errorMessage: 'New password do not match. Please try again.'
            })
        }else{
            this.setState({
                messageFromServer: '',
                errorMessage: 'Invalid password.'
            })
        }
    }

    handleTextChange(e){
        if (e.target.name === "firstName") {
            this.setState({
                firstName: e.target.value
            });
        }
        if (e.target.name === "lastName") {
            this.setState({
                lastName: e.target.value
            });
        }
        if (e.target.name === "oldPassword") {
            this.setState({
                oldPassword: e.target.value
            });
        }
        if (e.target.name === "newPassword") {
            this.setState({
                newPassword: e.target.value
            });
        }
        if (e.target.name === "confirmPassword") {
            this.setState({
                confirmPassword: e.target.value
            });
        }
    }

    displayMessage(){
        if(this.state.messageFromServer){
            return(
                <p align="left" style={{color:"green"}}>{this.state.messageFromServer}</p>
            )
        }else{
            return(
                <p align="left" style={{color:"red"}}>{this.state.errorMessage}</p>
            )
        }
    }

    check(){
        console.log(this.state.newManagerData);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }
        return(
            <div className="MainPage">
                <div className="content">
                    <h2>Your Profile</h2>
                    <form>
                        {this.displayMessage()}
                        <div className="form-group">
                            <label align="left">Manager ID: </label><input type="text" id="managerId1" name="managerId1" value={this.state.managerId} disabled></input>
                        </div>
                        <div className="form-group">
                            <label>First Name: </label><input required type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleTextChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label><input required type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleTextChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Old Password: </label><input required type="password" id="oldPassword" name="oldPassword" value={this.state.oldPassword} onChange={this.handleTextChange}></input>
                        </div>
                        <div className="form-group">
                            <label>New Password: </label><input required type="password" min="0" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.handleTextChange}></input>
                        </div>
                        <div className="form-group">
                            <label>Re-type New Password: </label><input required type="password" min="0" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleTextChange}></input>
                        </div>
                        {/*<Button onClick={this.check}>Check</Button>*/}
                        <Button bsStyle="info" onClick={this.onClick}>Update Profile</Button>
                    </form>
                </div>
            </div>
        )
    }
}
export default ManagerProfile;