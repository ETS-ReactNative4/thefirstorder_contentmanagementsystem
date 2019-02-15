import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton} from "react-bootstrap";
import Modal from 'react-modal';
import ChooseFoodCategory from "./ChooseFoodCategory";
import {Input} from "reactstrap";
import "./AddRestaurantModal.css";

class AddRestaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            restaurantName: '',
            restaurantDescription: '',
            contactNumber: '',
            building: '',
            street: '',
            postalCode: '',
            cuisine: '',
            operatingHours: '',
            operatingHours1: '',
            operatingHours2: '',
            affordability: '',
            messageFromServer: '',
            update: false,
            modalIsOpen: false,
            images: [],
            file: '',
            restaurantImgBlob: null
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(){
        this.setState({
            restaurantName: '',
            restaurantDescription: '',
            contactNumber: '',
            building: '',
            street: '',
            postalCode: '',
            cuisine: '',
            operatingHours: '',
            affordability: '',
            messageFromServer: '',
            modalIsOpen: false,
            errorMessage:'',
            images: []
        });
        this.props.handleRestaurantUpdate();
    }

    addRestaurant(e) {
        var newRestaurant = {
            restaurantName: e.state.restaurantName,
            restaurantDescription: e.state.restaurantDescription,
            contactNumber: e.state.contactNumber,
            building: e.state.building,
            street: e.state.street,
            postalCode: e.state.postalCode,
            cuisine: e.state.cuisine,
            operatingHours: e.state.operatingHours1 + " - " + e.state.operatingHours2,
            affordability: e.state.affordability,
            restaurantImg: e.state.images[0]

        }
        axios.post('https://makanow.herokuapp.com/api/restaurant/addRestaurant/'+this.props.adminId, newRestaurant).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(e){

        if(this.state.restaurantName && this.state.restaurantDescription && this.state.contactNumber && this.state.building && this.state.street && this.state.postalCode && this.state.cuisine && this.state.operatingHours1 && this.state.operatingHours2 && this.state.affordability) {
            this.addRestaurant(this);
            this.props.handleRestaurantUpdate();
            this.setState({
                errorMessage: ''
            })
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
        }

    }

    handleTextChange(e){
        if (e.target.name === "restaurantName") {
            this.setState({
                restaurantName: e.target.value
            });
        }
        if (e.target.name === "restaurantDescription") {
            this.setState({
                restaurantDescription: e.target.value
            });
        }
        if (e.target.name === "contactNumber") {
            this.setState({
                contactNumber: e.target.value
            });
        }
        if (e.target.name === "building") {
            this.setState({
                building: e.target.value
            });
        }
        if (e.target.name === "street") {
            this.setState({
                street: e.target.value
            });
        }
        if (e.target.name === "postalCode") {
            this.setState({
                postalCode: e.target.value
            });
        }
        if (e.target.name === "cuisine") {
            this.setState({
                cuisine: e.target.value
            });
        }
        if (e.target.name === "operatingHours1") {
            this.setState({
                operatingHours1: e.target.value
            });
        }
        if (e.target.name === "operatingHours2") {
            this.setState({
                operatingHours2: e.target.value
            });
        }
        if (e.target.name === "affordability") {
            this.setState({
                affordability: e.target.value
            });
        }
    }

    setImages = (e) => {
        e.preventDefault();
        let self = this;
        self.setState({ images: [] }); // empty out current images array
        const imageFiles = e.target.files; // document.getElementById("image"); // You may want to avoid querying the dom yourself, try and rely on react as much as possible
        const filesLength = imageFiles.length; // imageFiles.files.length;
        // const temp = null;

        for(var i = 0; i < filesLength; i++) {
            let reader = new FileReader();
            let file = imageFiles[i];

            reader.onloadend = () => {
                self.setState({ images: self.state.images.concat(reader.result) });
            }

            reader.readAsDataURL(file);
        }

        // fetch(this.state.images[0])
        //     .then(res => res.blob())
        //     .then(blob => self.setState({
        //         foodImgBlob: blob
        //     }))
    }

    check(){
        console.log(this.state.operatingHours1 + " - " + this.state.operatingHours2);
    }

    render(){

        if(this.state.messageFromServer === '') {

            return (
                <div>
                    <Button className="pull-left" bsStyle="success" bsSize="small" onClick={this.openModal}><span
                        className="glyphicon glyphicon-plus"></span> Add Restaurant</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Restaurant"
                        className="my-modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <p align="center">
                            <h3><b>Restaurant Details:</b></h3>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label align="left">Restaurant ID: </label><input type="text" id="restaurantId" name="restaurantId"
                                                                        placeholder="    Auto-Generated"
                                                                        disabled></input>
                            <label>Name: </label><input required type="text" id="restaurantName" name="restaurantName"
                                                        value={this.state.restaurantName}
                                                        onChange={this.handleTextChange}></input>
                            <label>Description: </label><input required type="text" id="restaurantDescription" name="restaurantDescription"
                                                               value={this.state.restaurantDescription}
                                                               onChange={this.handleTextChange}></input>
                            <label>Contact No: </label><input required type="text" id="contactNumber" name="contactNumber"
                                                              value={this.state.contactNumber}
                                                              onChange={this.handleTextChange}></input>
                            <label>Building: </label><input required type="text" id="building" name="building"
                                                                 value={this.state.building}
                                                                 onChange={this.handleTextChange}></input>
                            <label>Address: </label><input required type="text" id="street" name="street"
                                                           value={this.state.street}
                                                           onChange={this.handleTextChange}></input>
                            <label>Postal Code: </label><input required type="text" id="postalCode" name="postalCode"
                                                           value={this.state.postalCode}
                                                           onChange={this.handleTextChange}></input>
                            <label>Cuisine: </label><input required type="text" id="cuisine" name="cuisine"
                                                               value={this.state.cuisine}
                                                               onChange={this.handleTextChange}></input>
                            <label>Operating Hours: </label><input required type="time" id="operatingHours1" name="operatingHours1" onChange={this.handleTextChange}></input>
                            <text> to </text>
                            <input required type="time" id="operatingHours2" name="operatingHours2" onChange={this.handleTextChange}></input>
                            <label>Affordability: </label><input required type="text" id="affordability" name="affordability"
                                                               value={this.state.affordability}
                                                               onChange={this.handleTextChange}></input>
                            <table>
                                <tr>
                                    <td>
                                        <label>Upload Image: </label>
                                    </td>
                                    <td>
                                        <Input id="file-id" name="file_name" type="file" onChange={this.setImages} accept=".jpg, .png, .jpeg"/>
                                    </td>
                                </tr>
                            </table>
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Restaurant</b></Button>
                            </div>
                        </fieldset>
                        <br/>
                        <img src="" />
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <Button className="pull-left" bsStyle="success" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-plus"></span> Add Restaurant</Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Restaurant"
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
export default AddRestaurant;