import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton} from "react-bootstrap";
import Modal from 'react-modal';
import ChooseFoodCategory from "./ChooseFoodCategory";
import FilterCategory from "./FilterCategory";
import ChooseFoodSubCategory from "./ChooseFoodSubCategory";

class AddCustomisation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customisationName: '',
            messageFromServer: '',
            errorMessage: ''
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addCustomisation = this.addCustomisation.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(){
        this.setState({
            customisationName: '',
            messageFromServer: '',
            modalIsOpen: false,
            errorMessage:''
        });
        this.props.handleCustomisationOptionUpdate()
    }

    addCustomisation(e) {
        var addedCustomisation = {
            customisationName: e.state.customisationName,
            categoryId: e.props.categoryId,
            menuId: e.props.menuId,
            foodId: e.props.foodId,
            managerId: e.props.managerId,
            restaurantId: e.props.restaurantId
        }
        axios.post('https://makanow.herokuapp.com/api/customisation/addCustomisation', addedCustomisation).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(e){

        if(this.state.customisationName) {
            this.addCustomisation(this);
            this.props.handleCustomisationOptionUpdate()
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
        }

    }

    handleTextChange(e){
        if (e.target.name === "customisationName") {
            this.setState({
                customisationName: e.target.value
            });
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
                            className="glyphicon glyphicon-plus"></span><b> Add Customisation</b></Button>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Customisation"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <p align="center">
                            <h2><b>Customisation Details: </b></h2>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label align="left">Customisation ID: </label><input type="text" id="customisationId" name="customisationId"
                                                                          placeholder="    Auto-Generated"
                                                                          disabled></input>
                            <label>Customisation Name: </label><input required type="text" id="customisationName" name="customisationName"
                                                               value={this.state.customisationName}
                                                               onChange={this.handleTextChange}></input>
                            <br/>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Customisation</b></Button>
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
                                className="glyphicon glyphicon-plus"></span><b> Add Customisation</b></Button>
                        </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Option"
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
export default AddCustomisation;