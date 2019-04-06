import React, { Component } from "react";
import axios from "axios";
import { Button, Tab, Tabs, Modal } from "react-bootstrap";
// import Modal from 'react-modal';

class AddMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: this.props.selectedRestaurant,
            messageFromServer: '',
            updateMenuTab: '',
            menuName: '',
            errorMessage: '',
            needToUpdate: false,
            modalIsOpen: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        this.props.handleUpdateMenuTab()
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
            selectedRestaurant: this.props.selectedRestaurant,
        });
    }

    closeModal(){
        this.setState({
            modalIsOpen: false,
            messageFromServer: '',
            errorMessage: '',
            menuName: ''
        });
        this.props.handleUpdateMenuTab()
    }

    onClick(ev){
        if(this.state.menuName) {
            this.props.handleUpdateMenuTab()
            this.addMenu(this);
        }else{
            this.setState({
                errorMessage: 'Please enter a menu name.'
            })
        }
    }

    handleTextChange(e){
        if (e.target.name === "menuName") {
            this.setState({
                menuName: e.target.value
            });
        }
    }

    addMenu(e){
        axios.post('http://makanow.herokuapp.com/api/menus/addMenu/'+this.props.manager+'/'+this.state.selectedRestaurant+'/'+this.state.menuName).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    check(){
        console.log(this.props.manager);
    }

    render(){

        if(this.state.messageFromServer === '') {

            return (
                <div>
                    <Button className="pull-right" bsStyle="success" bsSize="medium" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span> Add Menu</Button>

                    <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <p align="center">
                                <h3>
                                    <b>Add Menu to "{this.props.selectedRestaurantName}"?</b>
                                </h3>
                            </p>
                        </Modal.Header>
                        <Modal.Body>
                            <fieldset>
                                <label>Menu Name: </label>
                                <input
                                    required type="text"
                                    id="menuName"
                                    name="menuName"
                                    value={this.state.menuName}
                                    onChange={this.handleTextChange}>
                                </input>
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                            <div className='button-center'>
                                <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </Button>
                                {" "}
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}>
                                    <span className="glyphicon glyphicon-ok"></span>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <Button className="pull-right" bsStyle="success" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-plus"></span> Add Menu</Button>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onAfterOpen={this.afterOpenModal}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Add Menu"*/}
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
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}
export default AddMenu;