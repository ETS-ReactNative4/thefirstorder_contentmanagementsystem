import React, { Component } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
// import Modal from 'react-modal';
import DeleteMenu from "./DeleteMenu";

class UpdateCustomisationOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionDescription:'',
            optionPrice:'',
            messageFromServer: '',
            errorMessage:''
        };
        this.onClick = this.onClick.bind(this);
        this.check = this.check.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateCustomisationOption = this.updateCustomisationOption.bind(this);
    }

    componentWillMount(){
        this.setState({
            optionDescription: this.props.optionDescription,
            optionPrice: this.props.optionPrice,
        })
    }

    componentDidMount(){

    }

    openModal() {
        this.setState({
            optionDescription:this.props.optionDescription,
            optionPrice:this.props.optionPrice,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            optionDescription:this.props.optionDescription,
            optionPrice:this.props.optionPrice,
            modalIsOpen: false,
            messageFromServer: '',
            errorMessage:''
        });
        this.props.handleCustomisationOptionUpdate()
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

    updateCustomisationOption(e){
        var updatedCustomisationOption = {
            customisationOptionId: e.props.customisationOptionId,
            optionDescription: e.state.optionDescription,
            optionPrice: e.state.optionPrice,
            restaurantId: e.props.restaurantId,
            menuId: e.props.menuId,
            managerId: e.props.managerId
        }
        axios.post('http://makanow.herokuapp.com/api/customisationOption/updateCustomisationOption', updatedCustomisationOption).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(e){

        if(this.state.optionDescription && this.state.optionPrice < 0){
            this.setState({
                errorMessage: 'Customisation option price must be more than or equal to zero'
            })
        }else if(this.state.optionDescription && (this.state.optionPrice || this.state.optionPrice === 0)){
            this.updateCustomisationOption(this);
            this.props.handleCustomisationOptionUpdate()
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
        }
    }

    check(){
        console.log(this.props.customisationOptionId);
        console.log(this.state.optionDescription);
        console.log(this.state.optionPrice);
        console.log(this.props.restaurantId);
        console.log(this.props.menuId);
        console.log(this.props.managerId);
    }

    render(){

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="warning" bsSize="xsmall" onClick={this.openModal}><span
                        className="glyphicon glyphicon-edit"></span></Button>
                    {/*<Modal*/}
                        {/*isOpen={this.state.modalIsOpen}*/}
                        {/*onRequestClose={this.closeModal}*/}
                        {/*contentLabel="Update Customisation Option"*/}
                        {/*className="Modal">*/}
                        {/*<Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span*/}
                            {/*className="closebtn glyphicon glyphicon-remove"></span></Button>*/}
                        {/*/!*<button onClick={this.check}>Check</button>*!/*/}
                        {/*<p align="center">*/}
                            {/*<h2><b>Update Customisation Option</b></h2>*/}
                        {/*</p>*/}
                        {/*<p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>*/}
                        {/*<fieldset>*/}
                            {/*<label>Option Description: </label><input type="text" id="optionDescription" name="optionDescription"*/}
                                                               {/*value={this.state.optionDescription}*/}
                                                               {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Option Price ($): </label><input type="number" id="optionPrice" name="optionPrice"*/}
                                                            {/*value={this.state.optionPrice}*/}
                                                            {/*onChange={this.handleTextChange}></input><br/>*/}
                            {/*/!*<label>Upload Image:</label><input type="file" name="foodImage" accept="image/*"></input>*!/*/}
                            {/*<div className='button-center'>*/}
                                {/*<br/>*/}
                                {/*<Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Update Customisation*/}
                                    {/*Option</b></Button>*/}
                            {/*</div>*/}
                        {/*</fieldset>*/}
                        {/*/!*<button onClick={this.check}>Check</button>*!/*/}
                    {/*</Modal>*/}

                    <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p align="center">
                                    <h2>
                                        <b>Update Customisation Option</b>
                                    </h2>
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <fieldset>
                                <label>Option Description: </label>
                                <input
                                    type="text"
                                    id="optionDescription"
                                    name="optionDescription"
                                    value={this.state.optionDescription}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Option Price ($): </label>
                                <input
                                    type="number"
                                    id="optionPrice"
                                    name="optionPrice"
                                    value={this.state.optionPrice}
                                    onChange={this.handleTextChange}>

                                </input>
                                {/*<label>Upload Image:</label><input type="file" name="foodImage" accept="image/*"></input>*/}
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                            <div className='button-center'>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}>
                                    <b>Update CustomisationOption</b>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <Button bsStyle="warning" bsSize="xsmall" onClick={this.openModal}><span
                            className="glyphicon glyphicon-edit"></span></Button>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onAfterOpen={this.afterOpenModal}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Update Customisation Option"*/}
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
export default UpdateCustomisationOption;