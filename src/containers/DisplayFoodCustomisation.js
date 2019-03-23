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

class DisplayFoodCustomisation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuId: this.props.menuId,
            foodId: this.props.foodId,
            categoryId: this.props.categoryId,
            foodCustomisationData: [],
            customisationOptionId: '',
            messageFromServer: '',
            customisationOptionUpdate: false
        };
        this.getFoodCustomisations = this.getFoodCustomisations.bind(this);
        this.getCustomisationOptions = this.getCustomisationOptions.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.check = this.check.bind(this);
        this.handleCustomisationOptionUpdate = this.handleCustomisationOptionUpdate.bind(this);
    }

    componentWillMount(){
        // this.getFoodCustomisations(this);
    }

    componentDidMount(){
        // this.getFoodCustomisations(this);
    }

    componentDidUpdate(){
        if (this.state.customisationOptionUpdate === true){
            this.getFoodCustomisations(this);
            this.setState({
                customisationOptionUpdate: false
            });
        }
    }

    handleCustomisationOptionUpdate(){
        this.setState({
            customisationOptionUpdate: true
        });
    }

    getFoodCustomisations(ev){
        axios.get('http://makanow.herokuapp.com/api/customisation/menu/'+this.props.menuId+'/food/'+this.props.foodId+'/category/'+this.props.categoryId)
            .then(function(response) {
                ev.setState({
                    foodCustomisationData: response.data});
            });
    }

    getCustomisationOptions(k){
        return(
            <p>{this.state.foodCustomisationData[k].customisationOptions.map((customisationOption, x) =>
                <div>
                    <label align="left">Options: </label>
                    <text>{customisationOption.optionDescription}</text>
                    <text> ($</text><text>{customisationOption.optionPrice}</text><text>)</text>
                    <ButtonGroup className="pull-right">
                        <DeleteCustomisationOption customisationOptionId={customisationOption.customisationOptionId} menuId={this.props.menuId} managerId={this.props.managerId} restaurantId={this.props.restaurantId} handleCustomisationOptionUpdate={this.handleCustomisationOptionUpdate}/>
                    </ButtonGroup>
                        {/*<text> {" "}</text>*/}
                    <ButtonGroup className="pull-right">
                        <UpdateCustomisationOption customisationOptionId={customisationOption.customisationOptionId} menuId={this.props.menuId} managerId={this.props.managerId} restaurantId={this.props.restaurantId} optionDescription={customisationOption.optionDescription} optionPrice={customisationOption.optionPrice} handleCustomisationOptionUpdate={this.handleCustomisationOptionUpdate}/>
                    </ButtonGroup>
                </div>
            )}</p>
        )
    }

    openModal() {
        this.getFoodCustomisations(this);
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            modalIsOpen1: false,
            customisationOptionId: ''
        });
    }

    check(){
        console.log(this.props.foodId);
        console.log(this.props.categoryId);
        console.log(this.state.foodCustomisationData);
    }

    render(){

        return (
            <td align="left">
                <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span
                    className="glyphicon glyphicon-eye-open"></span> View / <span
                    className="glyphicon glyphicon-edit"></span> Update </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="View Customisations"
                    className="Modal">
                    <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                        className="closebtn glyphicon glyphicon-remove"></span></Button>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <p align="center">
                        <h3><b>View / Update Customisations: </b></h3>
                    </p>
                    <AddCustomisation categoryId={this.props.categoryId} foodId={this.props.foodId} menuId={this.props.menuId} managerId={this.props.managerId} restaurantId={this.props.restaurantId} handleCustomisationOptionUpdate={this.handleCustomisationOptionUpdate}/>
                    <br/>
                    <fieldset>
                        {this.state.foodCustomisationData.map((foodCustomisation, k) =>
                            <div>
                                <label align="left">Customisation {k+1}: </label>
                                <span className="glyphicon glyphicon-asterisk"></span><text><b> {foodCustomisation.customisationName} </b></text>
                                <text> </text>
                                <ButtonGroup className="pull-right">
                                    <DeleteCustomisation customisationId={foodCustomisation.customisationId} foodId={this.props.foodId} menuId={this.props.menuId} managerId={this.props.managerId} restaurantId={this.props.restaurantId} handleCustomisationOptionUpdate={this.handleCustomisationOptionUpdate}/>
                                </ButtonGroup>
                                <ButtonGroup className="pull-right">
                                    <AddCustomisationOption customisationId={foodCustomisation.customisationId} foodId={this.props.foodId} menuId={this.props.menuId} managerId={this.props.managerId} restaurantId={this.props.restaurantId} handleCustomisationOptionUpdate={this.handleCustomisationOptionUpdate}/>
                                </ButtonGroup>
                                <text>{this.getCustomisationOptions(k)}</text>
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
export default DisplayFoodCustomisation;