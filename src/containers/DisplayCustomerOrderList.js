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

class DisplayCustomerOrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerOrderData: []
        };
        this.check = this.check.bind(this);
    }

    componentWillMount(){
        this.getCustomerOrders(this);
    }

    componentDidMount(){
        this.getCustomerOrders(this);
    }

    componentWillUpdate(){
        if(this.props.updateAcknowledgedOrders === true){
            this.getCustomerOrders(this);
        }
    }

    getCustomerOrders(ev){
        axios.get('https://makanow.herokuapp.com/api/customerOrder/getCustomerOrderByOrderId/'+this.props.orderId)
            .then(function(response) {
                ev.setState({customerOrderData: response.data});
            });
    }

    getOrderCustomisations(k){
        return(
            <p>{this.state.customerOrderData[k].customisations.map((orderCustomisation, x) =>
                <div>
                    <text> Customisation {x+1}: </text>
                    <text> {orderCustomisation} </text>
                </div>
            )}</p>
        )
    }

    getCustomerRemarks(k){
        if (this.state.customerOrderData[k].remarks !== ""){
            return(
                <div>
                    <text> Remarks: </text>
                    <text> {this.state.customerOrderData[k].remarks} </text>
                </div>
            )
        }else{
            return(
                <div>
                    <text> Remarks: </text>
                    <text> NIL </text>
                </div>
            )
        }
    }

    check(){
        console.log(this.state.customerOrderData);
    }

    render(){

        return (
            <td>
                {this.state.customerOrderData.map((customerOrder, k) =>
                    <div>
                        <text><span className="glyphicon glyphicon-asterisk"></span><b> {customerOrder.foodName} </b></text>
                        <text> X {customerOrder.customerOrderQuantity} </text>
                        <text>{this.getOrderCustomisations(k)}</text>
                        <text>{this.getCustomerRemarks(k)}</text>
                        <hr/>
                    </div>
                )}
            </td>
            // <td align="left">
            //     <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span
            //         className="glyphicon glyphicon-eye-open"></span> View </Button>
            //     <Modal
            //         isOpen={this.state.modalIsOpen}
            //         onRequestClose={this.closeModal}
            //         contentLabel="View Customer Orders"
            //         className="Modal">
            //         <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
            //             className="closebtn glyphicon glyphicon-remove"></span></Button>
            //         {/*<button onClick={this.check}>Check</button>*/}
            //         <p align="center">
            //             <h3><b> Order Summary </b></h3>
            //         </p>
            //         <br/>
            //         <fieldset>
            //             {this.state.customerOrderData.map((customerOrder, k) =>
            //                 <div>
            //                     <label align="left"><span className="glyphicon glyphicon-asterisk"></span> Food Name: </label>
            //                     <text><b> {customerOrder.foodName} </b></text>
            //                     <label align="left"> Quantity: </label>
            //                     <text> {customerOrder.customerOrderQuantity} </text>
            //                     <label align="left"> Subtotal: </label>
            //                     <text> S${customerOrder.customerOrderPrice} </text>
            //                     <text>{this.getCustomerRemarks(k)}</text>
            //                     <text>{this.getOrderCustomisations(k)}</text>
            //                     <hr />
            //                 </div>
            //             )}
            //             <div className='button-center'>
            //                 <Button bsStyle="success" bsSize="large" onClick={this.closeModal}><b>Done</b></Button>
            //             </div>
            //         </fieldset>
            //     </Modal>
            // </td>
        )
    }
}
export default DisplayCustomerOrderList;