import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';

class DeleteFoodPrice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: '',
            selectedFood: '',
            messageFromServer: '',
            modalIsOpen: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        // this.props.handleDeleteFoodUpdate();
    }

    componentDidMount() {
        // this.props.handleDeleteFoodUpdate();
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
        this.props.handleDeleteFoodUpdate();
        this.props.updateDropdownTitle();
    }

    onClick(ev) {
        this.deleteFoodPrice(this);
        this.props.updateDropdownTitle();
        this.props.handleDeleteFoodUpdate();
    }

    deleteFoodPrice(ev) {
        axios.delete('https://makanow.herokuapp.com/api/foodPrices/deleteFoodPrice', {
            params: {
                menuId: ev.props.selectedMenu,
                foodId: ev.props.selectedFood,
                foodCategoryId: ev.props.selectedFoodCategory,
                managerId: ev.props.manager,
                restaurantId: ev.props.restaurant
            }
        }).then(function (response) {
            ev.setState({
                messageFromServer: response.data
            });
        });
    }

    check() {
        console.log(this.props.selectedMenu);
        console.log(this.props.selectedFood);
        console.log(this.props.selectedFoodCategory);
    }

    render() {

        if (this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="danger" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-remove"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Food Price"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Delete Food Item "{this.props.foodName}" from Menu
                                "{this.props.menuName}"?</b></p>
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
                            contentLabel="Delete Food Price"
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
export default DeleteFoodPrice;