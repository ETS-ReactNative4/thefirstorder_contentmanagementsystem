import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';
import ButtonGroup from "react-bootstrap/es/ButtonGroup";

class DeleteManagerAllocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageFromServer: '',
            modalIsOpen: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount() {
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            messageFromServer: ''
        });
        this.props.handleManagerAllocationUpdate();
    }

    onClick(ev) {
        this.deleteManagerAllocation(this);
        this.props.handleManagerAllocationUpdate();
    }

    deleteManagerAllocation(ev){
        axios.delete('https://makanow.herokuapp.com/api/manager/deleteManagerAllocation/'+this.props.manager.managerId+'/'+this.props.restaurantId).then(function(response) {
            ev.setState({
                messageFromServer: response.data
            });
        });
    }

    check() {
        console.log(this.state.update);
    }

    render() {

        if (this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="danger" bsSize="xsmall" onClick={this.openModal}><span
                        className="glyphicon glyphicon-remove"></span> Delete </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Manager Allocation"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Delete allocated manager?</b></p>
                            <div className='button-center'>
                                <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}><span
                                    className="glyphicon glyphicon-remove"></span></Button>
                                {" "}
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><span
                                    className="glyphicon glyphicon-ok"></span></Button>
                            </div>
                        </fieldset>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Button bsStyle="danger" bsSize="xsmall" onClick={this.openModal}><span
                            className="glyphicon glyphicon-remove"></span> Delete </Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Delete Manager Allocation"
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
export default DeleteManagerAllocation;