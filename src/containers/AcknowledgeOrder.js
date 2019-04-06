import React, { Component } from "react";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from 'react-modal';


class AcknowledgeOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageFromServer: '',
            messageFromServer1: '',
            modalIsOpen: false,
            modalIsOpen1: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickCancelOrder = this.onClickCancelOrder.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
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

    openModal1() {
        this.setState({
            modalIsOpen1: true
        });
    }

    closeModal1() {
        this.setState({
            modalIsOpen1: false,
            messageFromServer1: ''
        });
        this.props.handleAcknowledgedOrderUpdate();
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            messageFromServer: ''
        });
        this.props.handleAcknowledgedOrderUpdate();
    }

    onClick(ev) {
        this.stripeChargeCall(this.props.sentOrder.token);
        this.props.handleAcknowledgedOrderUpdate();
    }

    onClickCancelOrder(ev) {
        this.cancelOrder(this);
        this.closeModal1();
        this.props.handleAcknowledgedOrderUpdate();
    }

    acknowledgeOrder(e) {
        axios.post('http://makanow.herokuapp.com/api/orders/acknowledge/'+this.props.restaurantId+'/'+this.props.orderId+'/').then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    successfulPaymentOfOrder(e) {
        axios.post('http://makanow.herokuapp.com/api/orders/successfulPaymentOfOrder/'+this.props.restaurantId+'/'+this.props.orderId+'/').then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    failedPaymentOfOrder(e) {
        axios.post('http://makanow.herokuapp.com/api/orders/failedPaymentOfOrder/'+this.props.restaurantId+'/'+this.props.orderId+'/').then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    cancelOrder(e) {
        axios.post('http://makanow.herokuapp.com/api/orders/cancelOrder/'+this.props.restaurantId+'/'+this.props.orderId+'/').then(function(response) {
            e.setState({
                messageFromServer1: response.data
            });
        });
    }

    addChargesParams(token){
        let output = '';
        output += 'amount=' + parseInt(this.props.sentOrder.totalAmount*100, 10);
        output += '&currency=' + 'sgd';
        output += '&source=' + token;
        output += '&description=' + 'test';

        return output;
    }

    stripeChargeCall(token){
        let request = "https://api.stripe.com/v1/" + "charges?" + this.addChargesParams(token);
        console.log('REQUEST:');
        console.log(request);

        let config = {
            headers: {
                'Authorization': `Bearer ` + this.props.restaurant.admin.stripeToken
            }
        }

        axios.post(request, {}, config)
            .then(response=>{
                console.log(response)
                this.successfulPaymentOfOrder(this);
                this.acknowledgeOrder(this);
            }).catch(error => {
                console.log("Charges Call Failed");
                console.log(error);
                this.failedPaymentOfOrder(this);
            })
    }

    displayAcknowledgeOrCancelOrderButton(){
        if(this.props.sentOrder.paymentStatus === "READY" && this.state.messageFromServer === ''){
            return(
                <div>
                    <ButtonToolbar>
                    <Button bsStyle="danger" bsSize="small" onClick={this.openModal1}><span
                        className="glyphicon glyphicon-remove"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen1}
                        onRequestClose={this.closeModal1}
                        contentLabel="Cancel Order"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal1}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Cancel Order?</b></p>
                            <div className='button-center'>
                                <Button bsStyle="danger" bsSize="large" onClick={this.closeModal1}><span
                                    className="glyphicon glyphicon-remove"></span></Button>
                                {" "}
                                <Button bsStyle="success" bsSize="large" onClick={this.onClickCancelOrder}><span
                                    className="glyphicon glyphicon-ok"></span></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-ok"></span></Button>
                    </ButtonToolbar>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Acknowledge Order"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Acknowledge Order?</b></p>
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
        }else if(this.props.sentOrder.paymentStatus === "READY" && this.state.messageFromServer !== ''){
            return (
                <div>
                    <div>
                        <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-ok"></span></Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Acknowledge Order"
                            className="Modal">
                            <div className='button-center'>
                                <h3>{this.state.messageFromServer}</h3>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }else {
            return (
                <div>
                    <ButtonToolbar>
                    <Button bsStyle="danger" bsSize="small" onClick={this.openModal1}><span
                        className="glyphicon glyphicon-remove"></span></Button>
                    </ButtonToolbar>
                    <Modal
                        isOpen={this.state.modalIsOpen1}
                        onRequestClose={this.closeModal1}
                        contentLabel="Cancel Order"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal1}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Cancel Order?</b></p>
                            <div className='button-center'>
                                <Button bsStyle="danger" bsSize="large" onClick={this.closeModal1}><span
                                    className="glyphicon glyphicon-remove"></span></Button>
                                {" "}
                                <Button bsStyle="success" bsSize="large" onClick={this.onClickCancelOrder}><span
                                    className="glyphicon glyphicon-ok"></span></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        }
    }

    check() {
        console.log(this.props.sentOrder);
    }

    render() {
        return(
            <div>
                {this.displayAcknowledgeOrCancelOrderButton()}
            </div>
        )

        // if (this.state.messageFromServer === '') {
        //     return (
        //         <div>
        //             <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-ok"></span></Button>
        //             <Modal
        //                 isOpen={this.state.modalIsOpen}
        //                 onRequestClose={this.closeModal}
        //                 contentLabel="Acknowledge Order"
        //                 className="Modal">
        //                 <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
        //                     className="closebtn glyphicon glyphicon-remove"></span></Button>
        //                 <fieldset>
        //                     <p></p>
        //                     <p align="center"><b>Acknowledge Order?</b></p>
        //                     <div className='button-center'>
        //                         <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}><span
        //                             className="glyphicon glyphicon-remove"></span></Button>
        //                         {" "}
        //                         <Button bsStyle="success" bsSize="large" onClick={this.onClick}><span
        //                             className="glyphicon glyphicon-ok"></span></Button>
        //                     </div>
        //                 </fieldset>
        //                 {/*<button onClick={this.check}>Check</button>*/}
        //             </Modal>
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div>
        //             <div>
        //                 <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-ok"></span></Button>
        //                 <Modal
        //                     isOpen={this.state.modalIsOpen}
        //                     onAfterOpen={this.afterOpenModal}
        //                     onRequestClose={this.closeModal}
        //                     contentLabel="Acknowledge Order"
        //                     className="Modal">
        //                     <div className='button-center'>
        //                         <h3>{this.state.messageFromServer}</h3>
        //                         <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
        //                     </div>
        //                 </Modal>
        //             </div>
        //         </div>
        //     )
        // }
    }
}
export default AcknowledgeOrder;