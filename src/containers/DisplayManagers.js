import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, ButtonToolbar, Modal} from "react-bootstrap";
// import Modal from 'react-modal';
import ButtonGroup from "react-bootstrap/es/ButtonGroup";
import ModalDialog from 'react-bootstrap/lib/ModalDialog'
import DeleteCustomisationOption from "./DeleteCustomisationOption";
import UpdateCustomisationOption from "./UpdateCustomisationOption";
import DeleteCustomisation from "./DeleteCustomisation";
import AddCustomisationOption from "./AddCustomisationOption";
import AddCustomisation from "./AddCustomisation";
import DeleteManagerAllocation from "./DeleteManagerAllocation";
import AddManagerAllocation from "./AddManagerAllocation";

class DisplayManagers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            managerData: [],
            managerAllocationUpdate: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleManagerAllocationUpdate = this.handleManagerAllocationUpdate.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    componentDidUpdate(){
        if (this.state.managerAllocationUpdate === true){
            this.getManagers(this);
            this.setState({
                managerAllocationUpdate: false
            });
        }
    }

    getManagers(ev){
        axios.get('http://makanow.herokuapp.com/api/managers/getManagersByRestaurantId/'+this.props.restaurant.restaurantId)
            .then(function(response) {
                ev.setState({managerData: response.data});
            });
    }

    openModal() {
        this.getManagers(this);
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            managerData: []
        });
    }

    handleManagerAllocationUpdate(){
        this.setState({
            managerAllocationUpdate: true
        });
    }

    check(){
        console.log(this.state.managerData);
    }

    render(){

        return (
            <td align="left">
                <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span
                    className="glyphicon glyphicon-eye-open"></span> View / Update </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="View Managers"
                    className="Modal">
                    <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                        className="closebtn glyphicon glyphicon-remove"></span></Button>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <p align="center">
                        <h3><b> Manager Allocations:</b></h3>
                    </p>
                    <AddManagerAllocation restaurantId={this.props.restaurant.restaurantId} handleManagerAllocationUpdate={this.handleManagerAllocationUpdate}/>
                    <br/>
                    <fieldset>
                        {this.state.managerData.map((manager, k) =>
                            <div>
                                <label align="left"><span className="glyphicon glyphicon-asterisk"></span> Manager:</label>
                                <text><b>{manager.managerId}: {manager.firstName}</b></text>
                                <ButtonGroup className="pull-right">
                                    <DeleteManagerAllocation manager={manager} restaurantId={this.props.restaurant.restaurantId} handleManagerAllocationUpdate={this.handleManagerAllocationUpdate}/>
                                </ButtonGroup>
                                <hr />
                            </div>
                        )}
                        <div className='button-center'>
                            <Button bsStyle="success" bsSize="large" onClick={this.closeModal}><b>Done</b></Button>
                        </div>
                    </fieldset>
                </Modal>


                <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p align="center">
                                <h3>
                                    <b> Manager Allocations:</b>
                                </h3>
                            </p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddManagerAllocation restaurantId={this.props.restaurant.restaurantId} handleManagerAllocationUpdate={this.handleManagerAllocationUpdate}/>
                        <br/>
                        <fieldset>
                            {this.state.managerData.map((manager, k) =>
                                <div>
                                    <label align="left"><span className="glyphicon glyphicon-asterisk"></span> Manager:</label>
                                    <text>
                                        <b>{manager.managerId}: {manager.firstName}</b>
                                    </text>
                                    <ButtonGroup className="pull-right">
                                        <DeleteManagerAllocation manager={manager} restaurantId={this.props.restaurant.restaurantId} handleManagerAllocationUpdate={this.handleManagerAllocationUpdate}/>
                                    </ButtonGroup>
                                </div>
                            )}
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='button-center'>
                            <Button bsStyle="success" bsSize="large" onClick={this.closeModal}><b>Done</b></Button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </td>
        )
    }
}
export default DisplayManagers;