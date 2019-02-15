import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import ManagerNameId from "./ManagerNameId";
import DisplayCustomerOrder from "./DisplayCustomerOrder";

class OrderTable extends Component {

    constructor(props){
        super(props);
        this.state={
            pendingOrderData: [],
            confirmedOrderData: [],
            managerName: ''
        };
        this.check = this.check.bind(this);
        this.getPendingOrders = this.getPendingOrders.bind(this);
        this.getSentOrders = this.getSentOrders.bind(this);
    }

    componentWillMount() {
        this.getPendingOrders(this);
        this.getSentOrders(this);
    }

    // componentDidMount() {
    //     this.getPendingOrders(this);
    // }

    getPendingOrders(ev){
        axios.get('https://makanow.herokuapp.com/api/orders/restaurant/'+this.props.selectedRestaurant+'/retrieve_new_orders/')
            .then(function(response) {
                ev.setState({pendingOrderData: response.data});
            });
    }

    getSentOrders(ev){
        axios.get('https://makanow.herokuapp.com/api/orders/restaurant/'+this.props.selectedRestaurant+'/retrieve_sent_orders/')
            .then(function(response) {
                ev.setState({confirmedOrderData: response.data});
            });
    }

    check(){
        console.log(this.state.pendingOrderData);
    }

    render(){
        if(this.state.pendingOrderData.length === 0){
            return(
                <div>
                    <br/>
                    <p><h3><b>Pending Orders: </b></h3></p>
                    <Table striped condensed hover>
                        <thead>
                            <tr>
                                <th align="center">No Pending Orders</th>
                            </tr>
                        </thead>
                    </Table>
                    <p><h3><b>Confirmed Orders: </b></h3></p>
                    <Table striped condensed hover>
                        <thead>
                        <tr>
                            <th align="center">S/N</th>
                            <th align="center">Order ID:</th>
                            <th align="center">Order Summary:</th>
                            <th align="center">Total Amount:</th>
                            <th align="center">Mode of Payment:</th>
                            <th align="center">Payment Status:</th>
                            <th align="center">Date & Time:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.confirmedOrderData.map((confirmedOrder, k) =>
                            <tr index={k}>
                                <td align="left">{k+1}</td>
                                <td align="left">{confirmedOrder.orderId}</td>
                                <DisplayCustomerOrder orderId={confirmedOrder.orderId}/>
                                <td align="left">S${confirmedOrder.orderSummary.totalAmount}</td>
                                <td align="left">{confirmedOrder.orderSummary.modeOfPayment}</td>
                                <td align="left">{confirmedOrder.orderSummary.paymentStatus}</td>
                                <td align="left">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(confirmedOrder.orderSummary.orderSummaryDate))}</td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </div>
            )
        }else{
            return(
                <div>
                    <br/>
                    <p><h3><b>Pending Orders: </b></h3></p>
                    <Table striped condensed hover>
                        <thead>
                        <tr>
                            <th align="center">S/N</th>
                            <th align="center">Order ID:</th>
                            <th align="center">Order Summary:</th>
                            <th align="center">Total Amount:</th>
                            <th align="center">Mode of Payment:</th>
                            <th align="center">Payment Status:</th>
                            <th align="center">Date & Time:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pendingOrderData.map((pendingOrder, k) =>
                            <tr index={k}>
                                <td align="left">{k+1}</td>
                                <td align="left">{pendingOrder.orderId}</td>
                                <DisplayCustomerOrder orderId={pendingOrder.orderId}/>
                                <td align="left">{pendingOrder.orderSummary.totalAmount}</td>
                                <td align="left">{pendingOrder.orderSummary.modeOfPayment}</td>
                                <td align="left">{pendingOrder.orderSummary.paymentStatus}</td>
                                <td align="left">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(pendingOrder.orderSummary.orderSummaryDate))}</td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                    <hr/>
                    <p><h3><b>Confirmed Orders: </b></h3></p>
                    <Table striped condensed hover>
                        <thead>
                        <tr>
                            <th align="center">S/N</th>
                            <th align="center">Order ID:</th>
                            <th align="center">Order Summary:</th>
                            <th align="center">Total Amount:</th>
                            <th align="center">Mode of Payment:</th>
                            <th align="center">Payment Status:</th>
                            <th align="center">Date & Time:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.confirmedOrderData.map((confirmedOrder, k) =>
                            <tr index={k}>
                                <td align="left">{k+1}</td>
                                <td align="left">{confirmedOrder.orderId}</td>
                                <DisplayCustomerOrder orderId={confirmedOrder.orderId}/>
                                <td align="left">{confirmedOrder.orderSummary.totalAmount}</td>
                                <td align="left">{confirmedOrder.orderSummary.modeOfPayment}</td>
                                <td align="left">{confirmedOrder.orderSummary.paymentStatus}</td>
                                <td align="left">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(confirmedOrder.orderSummary.orderSummaryDate))}</td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </div>
            )
         }
    }
}
export default OrderTable;