import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';

class UpdateConversionRate extends Component {

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
    }

    onClick(ev) {
        if(this.props.pointsToCash && this.props.cashToPoints){
            this.updateConversionRates(this);
        }else{
            window.location.reload();
        }
    }

    updateConversionRates(ev){
        axios.post('https://makanow.herokuapp.com/api/admin/updateConversionRates/'+ this.props.adminId + '/' +this.props.pointsToCash+'/'+this.props.cashToPoints)
            .then(function(response) {
                ev.setState({
                    messageFromServer: response.data});
            });
    }

    check() {
        console.log(this.props.selectedMenu);
    }

    render() {

        if (this.state.messageFromServer === '') {
            return (
                <div>
                    <Button className="submitButton" type="submit" bsStyle="primary" onClick={this.openModal}>UPDATE</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Update Conversion Rate"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Proceed to update conversion rates?</b></p>
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
                        <Button className="submitButton" type="submit" bsStyle="primary" onClick={this.openModal}>UPDATE</Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Update Conversion Rate"
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
export default UpdateConversionRate;