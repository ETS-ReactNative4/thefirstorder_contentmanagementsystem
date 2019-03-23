import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, ButtonToolbar} from "react-bootstrap";
import Modal from 'react-modal';
import ButtonGroup from "react-bootstrap/es/ButtonGroup";
import ModalDialog from 'react-bootstrap/lib/ModalDialog'
import DeleteCustomisationOption from "./DeleteCustomisationOption";
import UpdateCustomisationOption from "./UpdateCustomisationOption";
import DeleteCustomisation from "./DeleteCustomisation";
import AddCustomisationOption from "./AddCustomisationOption";
import AddCustomisation from "./AddCustomisation";

class DisplayCustomerOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerOrderData: []
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    getCustomerOrders(ev){
        axios.get('http://makanow.herokuapp.com/api/customerOrder/getCustomerOrderByOrderId/'+this.props.orderId)
            .then(function(response) {
                ev.setState({customerOrderData: response.data});
            });
    }

    getOrderCustomisations(k){
        return(
            <p>{this.state.customerOrderData[k].customisations.map((orderCustomisation, x) =>
                <div>
                    <label align="left">Customisation {x+1}: </label>
                    <text>{orderCustomisation}</text>
                </div>
            )}</p>
        )
    }

    getCustomerRemarks(k){
        if (this.state.customerOrderData[k].remarks !== ""){
            return(
                <div>
                    <label align="left"> Remarks: </label>
                    <text> {this.state.customerOrderData[k].remarks} </text>
                </div>
            )
        }else{
            return(
                <div>
                    <label align="left"> Remarks: </label>
                    <text> NIL </text>
                </div>
            )
        }
    }

    openModal() {
        this.getCustomerOrders(this);
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            customerOrderData: []
        });
    }

    check(){
        console.log(this.state.customerOrderData);
    }

    render(){

        return (
            <td align="left">
                <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span
                    className="glyphicon glyphicon-eye-open"></span> View </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="View Customer Orders"
                    className="Modal">
                    <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                        className="closebtn glyphicon glyphicon-remove"></span></Button>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <p align="center">
                        <h3><b> Order Summary </b></h3>
                    </p>
                    <br/>
                    <fieldset>
                        {this.state.customerOrderData.map((customerOrder, k) =>
                            <div>
                                <label align="left"><span className="glyphicon glyphicon-asterisk"></span> Food Name: </label>
                                <text><b> {customerOrder.foodName} </b></text>
                                <label align="left"> Quantity: </label>
                                <text> {customerOrder.customerOrderQuantity} </text>
                                <label align="left"> Subtotal: </label>
                                <text> S${customerOrder.customerOrderPrice} </text>
                                <text>{this.getCustomerRemarks(k)}</text>
                                <text>{this.getOrderCustomisations(k)}</text>
                                <hr />
                            </div>
                        )}
                        <div className='button-center'>
                            <Button bsStyle="success" bsSize="large" onClick={this.closeModal}><b>Done</b></Button>
                        </div>
                    </fieldset>
                </Modal>
            </td>
        )
    }
}
export default DisplayCustomerOrder;