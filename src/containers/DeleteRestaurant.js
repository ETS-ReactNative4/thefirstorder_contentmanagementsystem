import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';

class DeleteRestaurant extends Component {

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
        this.props.handleRestaurantUpdate();
    }

    onClick(ev) {
        this.deleteRestaurant(this);
        this.props.handleRestaurantUpdate();
    }

    deleteRestaurant(ev) {
        axios.delete('https://makanow.herokuapp.com/api/restaurants/' + this.props.restaurant.restaurantId, {
        }).then(function (response) {
            ev.setState({
                messageFromServer: response.data
            });
        });
    }

    check() {
        console.log(this.props.restaurant);
    }

    render() {

        if (this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="danger" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-remove"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Restaurant"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Delete Restaurant "{this.props.restaurant.restaurantName}"?</b></p>
                            <div className='button-center'>
                                <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}><span
                                    className="glyphicon glyphicon-remove"></span></Button>
                                {" "}
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><span
                                    className="glyphicon glyphicon-ok"></span></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Button bsStyle="danger" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-remove"></span></Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Delete Restaurant"
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
export default DeleteRestaurant;