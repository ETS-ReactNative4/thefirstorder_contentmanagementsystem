import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton} from "react-bootstrap";
import Modal from 'react-modal';
import ChooseFoodCategory from "./ChooseFoodCategory";
import FilterCategory from "./FilterCategory";
import ChooseFoodSubCategory from "./ChooseFoodSubCategory";

class AddManagerAllocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            managerData: [],
            selectedManagerId: '',
            dropdownTitle: "Not Selected",
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            messageFromServer: '',
            errorMessage: ''
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.getManagers(this)
    }

    componentDidMount() {
        this.getManagers(this)
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(){
        this.setState({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            dropdownTitle: "Not Selected",
            modalIsOpen: false,
            messageFromServer: '',
            errorMessage: ''
        });
        this.props.handleManagerAllocationUpdate();
    }

    getManagers(e) {
        axios.post('https://makanow.herokuapp.com/api/managers').then(function(response) {
            e.setState({
                managerData: response.data
            });
        });
    }

    addManagerAllocation(e, managerId){
        axios.post('https://makanow.herokuapp.com/api/manager/addManagerAllocation/'+managerId+'/'+this.props.restaurantId).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    createAndAllocateManager(e){
        axios.post('https://makanow.herokuapp.com/api/manager/createAndAllocateManager/'+this.props.restaurantId+'/'+this.state.firstName+'/'+this.state.lastName+'/'+this.state.password).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onSelect(k){
        this.setState({
            dropdownTitle: this.state.managerData[k].managerId + " - " + this.state.managerData[k].lastName + ", " + this.state.managerData[k].firstName,
            selectedManagerId: this.state.managerData[k].managerId
        });
    }

    onSelect1(k){
        this.setState({
            dropdownTitle: "Not Selected"
        });
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
        if (e.target.name === "password") {
            this.setState({
                password: e.target.value
            });
        }
        if (e.target.name === "confirmPassword") {
            this.setState({
                confirmPassword: e.target.value
            });
        }
    }

    onClick(e){
        if(this.state.dropdownTitle !== "Not Selected" && this.state.firstName && this.state.lastName){
            this.setState({
                errorMessage: 'Please select an existing manager OR create a new manager.'
            })
        }else if(this.state.dropdownTitle !== "Not Selected" && this.state.firstName){
            this.setState({
                errorMessage: 'Please select an existing manager OR create a new manager.'
            })
        }else if(this.state.dropdownTitle !== "Not Selected" && this.state.lastName){
            this.setState({
                errorMessage: 'Please select an existing manager OR create a new manager.'
            })
        }else if(this.state.password !== this.state.confirmPassword){
            this.setState({
                errorMessage: 'Password do not match!'
            })
        } else if(this.state.dropdownTitle !== "Not Selected"){
            this.addManagerAllocation(this, this.state.selectedManagerId);
            this.props.handleManagerAllocationUpdate();
        }else if(this.state.firstName && this.state.lastName){
            this.createAndAllocateManager(this);
            this.props.handleManagerAllocationUpdate();
        }else{
            this.setState({
                errorMessage: 'Please select an existing manager OR create a new manager.'
            })
        }
    }

    check(){
        console.log();
    }

    render(){

        if(this.state.messageFromServer === '') {

            return (
                <div>
                    <div className='button-center'>
                        <Button bsStyle="success" bsSize="default" onClick={this.openModal}><span
                            className="glyphicon glyphicon-plus"></span><b> New Allocation </b></Button>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Manager Allocation"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <p align="center">
                            <h2><b>New Manager Allocation: </b></h2>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label>Existing Manager: </label>
                            <SplitButton title={<b>{this.state.dropdownTitle}</b>}>
                                <MenuItem onClick={() => this.onSelect1()}>Not Selected</MenuItem>
                                {this.state.managerData.map((manager, k) =>
                                    <MenuItem eventKey={k}
                                              onClick={() => this.onSelect(k, manager.managerId)}>{manager.managerId} - {manager.lastName}, {manager.firstName}</MenuItem>
                                )
                                }
                            </SplitButton>
                            <p align="center">
                                <h3><b> OR </b></h3>
                            </p>
                            <p align="center">
                                <h3><b> Create Manager </b></h3>
                            </p>
                            <label>First Name: </label><input required type="text" min="0" id="firstName" name="firstName"
                                                              value={this.state.firstName}
                                                              onChange={this.handleTextChange}></input>
                            <label>Last Name: </label><input required type="text" min="0" id="lastName" name="lastName"
                                                              value={this.state.lastName}
                                                              onChange={this.handleTextChange}></input>
                            <label>Password: </label><input required type="password" min="0" id="password" name="password"
                                                             value={this.state.password}
                                                             onChange={this.handleTextChange}></input>
                            <label>Confirm Password: </label><input required type="password" min="0" id="confirmPassword" name="confirmPassword"
                                                            value={this.state.confirmPassword}
                                                            onChange={this.handleTextChange}></input>
                            <br/>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b> Allocate </b></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <div className='button-center'>
                            <Button bsStyle="success" bsSize="default" onClick={this.closeModal}><span
                                className="glyphicon glyphicon-plus"></span><b> Allocate </b></Button>
                        </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Manager Allocation"
                            className="Modal">
                            <div className='button-center'>
                                <h3>{this.state.messageFromServer}</h3>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }
    }

}
export default AddManagerAllocation;