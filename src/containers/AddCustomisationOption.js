import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton, Modal} from "react-bootstrap";
// import Modal from 'react-modal';
import ChooseFoodCategory from "./ChooseFoodCategory";
import FilterCategory from "./FilterCategory";
import ChooseFoodSubCategory from "./ChooseFoodSubCategory";

class AddCustomisationOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionDescription: '',
            optionPrice: '',
            messageFromServer: '',
            errorMessage: ''
        };
        this.check = this.check.bind(this);
        this.addCustomisationOption = this.addCustomisationOption.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            optionDescription: '',
            optionPrice: '',
            messageFromServer: '',
            modalIsOpen: false,
            errorMessage:''
        });
        this.props.handleCustomisationOptionUpdate()
    }

    addCustomisationOption(e) {
        var addedCustomisationOption = {
            customisationId: e.props.customisationId,
            optionDescription: e.state.optionDescription,
            optionPrice: e.state.optionPrice,
            menuId: e.props.menuId,
            managerId: e.props.managerId,
            restaurantId: e.props.restaurantId
        }
        axios.post('http://makanow.herokuapp.com/api/customisationOption/addCustomisationOption', addedCustomisationOption).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(e){

        if(this.state.optionDescription && this.state.optionPrice < 0){
            this.setState({
                errorMessage: 'Option price must be more than or equals to zero'
            })
        }else if(this.state.optionDescription && this.state.optionPrice) {
            this.addCustomisationOption(this);
            this.props.handleCustomisationOptionUpdate()
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
        }

    }

    handleTextChange(e){
        if (e.target.name === "optionDescription") {
            this.setState({
                optionDescription: e.target.value
            });
        }
        if (e.target.name === "optionPrice") {
            this.setState({
                optionPrice: e.target.value
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
                    <Button bsStyle="success" bsSize="xsmall" onClick={this.openModal}><span
                        className="glyphicon glyphicon-plus"></span> Option </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Option"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <p align="center">
                            <h2><b>Customisation Option Details: </b></h2>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label align="left">Option ID: </label><input type="text" id="optionId" name="optionId"
                                                                        placeholder="    Auto-Generated"
                                                                        disabled></input>
                            <label>Option Name: </label><input required type="text" id="optionDescription" name="optionDescription"
                                                        value={this.state.optionDescription}
                                                        onChange={this.handleTextChange}></input>
                            <label>Option Price($): </label><input required type="number" min="0" id="optionPrice" name="optionPrice"
                                                            value={this.state.optionPrice}
                                                            onChange={this.handleTextChange}></input><br/>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Option</b></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>

                    <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p align="center">
                                    <h2><b>Customisation Option Details: </b></h2>
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <fieldset>
                                <label align="left">Option ID: </label>
                                <input
                                    className="center"
                                    type="text"
                                    id="optionId"
                                    name="optionId"
                                    placeholder="Auto-Generated"
                                    disabled></input>
                                <label>Option Name: </label>
                                <input
                                    required
                                    type="text"
                                    id="optionDescription"
                                    name="optionDescription"
                                    value={this.state.optionDescription}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Option Price($): </label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    id="optionPrice"
                                    name="optionPrice"
                                    value={this.state.optionPrice}
                                    onChange={this.handleTextChange}>
                                </input>
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Option</b></Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <Button bsStyle="success" bsSize="xsmall" onClick={this.openModal}><span
                            className="glyphicon glyphicon-plus"></span> Option </Button>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onAfterOpen={this.afterOpenModal}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Add Option"*/}
                            {/*className="Modal">*/}
                            {/*<div className='button-center'>*/}
                                {/*<h3>{this.state.messageFromServer}</h3>*/}
                                {/*<Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>*/}
                            {/*</div>*/}
                        {/*</Modal>*/}

                        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                {/*<Modal.Title>Modal heading</Modal.Title>*/}
                            </Modal.Header>
                            <Modal.Body>
                                <div className='button-center'>
                                    <h3>{this.state.messageFromServer}</h3>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className='button-center'>
                                    <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
            )
        }
    }

}
export default AddCustomisationOption;