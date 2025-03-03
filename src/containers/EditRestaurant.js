import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton, Modal} from "react-bootstrap";
// import Modal from 'react-modal';
import {Input} from "reactstrap";
import "./AddRestaurantModal.css";

class EditRestaurant extends Component {

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
            modalIsOpen: false,
            errorMessage:'',
            images: [],
            file: '',
            restaurantImgBlob: null,
            restaurantImage: [this.props.restaurant.restaurantImg],
            dropdownTitle: this.props.restaurant.affordability
        };
        this.onClick = this.onClick.bind(this);
        this.check = this.check.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        this.setState({
            restaurantName: this.props.restaurant.restaurantName,
            restaurantDescription: this.props.restaurant.restaurantDescription,
            contactNumber: this.props.restaurant.contactNumber,
            building: this.props.restaurant.building,
            street: this.props.restaurant.street,
            postalCode: this.props.restaurant.postalCode,
            operatingHours: this.props.restaurant.operatingHours,
            cuisine: this.props.restaurant.cuisine,
            affordability: this.props.restaurant.affordability,
            dropdownTitle: this.props.restaurant.affordability
        })
    }

    componentDidMount(){
        this.setState({
            restaurantName: this.props.restaurant.restaurantName,
            restaurantDescription: this.props.restaurant.restaurantDescription,
            contactNumber: this.props.restaurant.contactNumber,
            building: this.props.restaurant.building,
            street: this.props.restaurant.street,
            postalCode: this.props.restaurant.postalCode,
            operatingHours: this.props.restaurant.operatingHours,
            cuisine: this.props.restaurant.cuisine,
            affordability: this.props.restaurant.affordability,
            images: [],
            dropdownTitle: this.props.restaurant.affordability
        })
    }

    openModal() {
        this.setState({
            restaurantName: this.props.restaurant.restaurantName,
            restaurantDescription: this.props.restaurant.restaurantDescription,
            contactNumber: this.props.restaurant.contactNumber,
            building: this.props.restaurant.building,
            street: this.props.restaurant.street,
            postalCode: this.props.restaurant.postalCode,
            operatingHours: this.props.restaurant.operatingHours,
            cuisine: this.props.restaurant.cuisine,
            affordability: this.props.restaurant.affordability,
            dropdownTitle: this.props.restaurant.affordability,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            restaurantName: '',
            restaurantDescription:'',
            contactNumber: '',
            building: '',
            street: '',
            postalCode: '',
            operatingHours:'',
            cuisine: '',
            affordability:'',
            modalIsOpen: false,
            messageFromServer: '',
            errorMessage:'',
            images: [],
            dropdownTitle: ''
        });
        this.props.handleRestaurantUpdate();
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
        if (e.target.name === "operatingHours") {
            this.setState({
                operatingHours: e.target.value
            });
        }
        // if (e.target.name === "operatingHours1") {
        //     this.setState({
        //         operatingHours1: e.target.value
        //     });
        // }
        // if (e.target.name === "operatingHours2") {
        //     this.setState({
        //         operatingHours2: e.target.value
        //     });
        // }
        // if (e.target.name === "affordability") {
        //     this.setState({
        //         affordability: e.target.value
        //     });
        // }
    }

    editRestaurant(e){
        var updatedRestaurant = {
            restaurantName: e.state.restaurantName,
            restaurantDescription: e.state.restaurantDescription,
            contactNumber: e.state.contactNumber,
            building: e.state.building,
            street: e.state.street,
            postalCode: e.state.postalCode,
            cuisine: e.state.cuisine,
            operatingHours: e.state.operatingHours,
            // operatingHours: e.state.operatingHours1 + " - " + e.state.operatingHours2,
            affordability: e.state.affordability,
            restaurantImg: e.state.restaurantImage[0]
        }
        axios.post('http://makanow.herokuapp.com/api/restaurants/updateRestaurant/'+this.props.restaurant.restaurantId, updatedRestaurant).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
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
                self.setState({ restaurantImage: self.state.images.concat(reader.result) });
            }

            reader.readAsDataURL(file);
        }

        // fetch(this.state.images[0])
        //     .then(res => res.blob())
        //     .then(blob => self.setState({
        //         restaurantImgBlob: blob
        //     }))
    }

    onClick(e){
        if(this.state.postalCode.length !== 6){
            this.setState({
                errorMessage: 'Invalid postal code'
            })
        }else if(this.state.contactNumber.length !== 8){
            this.setState({
                errorMessage: 'Invalid contact number'
            })
        }else if(this.state.restaurantName && this.state.restaurantDescription && this.state.contactNumber && this.state.building && this.state.street && this.state.postalCode.length === 6 && this.state.cuisine && this.state.operatingHours && this.state.affordability !== "Not Selected") {
            this.editRestaurant(this);
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

    onSelect1(){
        this.setState({
            dropdownTitle: "Low",
            affordability: "Low"
        });
    }

    onSelect2(){
        this.setState({
            dropdownTitle: "Medium",
            affordability: "Medium"
        });
    }

    onSelect3(){
        this.setState({
            dropdownTitle: "High",
            affordability: "High"
        });
    }

    check(){
        console.log(this.props.restaurant)
    }

    render(){

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span
                        className="glyphicon glyphicon-edit"></span></Button>
                    {/*<Modal*/}
                        {/*isOpen={this.state.modalIsOpen}*/}
                        {/*onRequestClose={this.closeModal}*/}
                        {/*contentLabel="Update Restaurant"*/}
                        {/*className="my-modal">*/}
                        {/*<Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span*/}
                            {/*className="closebtn glyphicon glyphicon-remove"></span></Button>*/}
                        {/*/!*<button onClick={this.check}>Check</button>*!/*/}
                        {/*<p align="center">*/}
                            {/*<h2><b>Edit Restaurant Details:</b></h2>*/}
                        {/*</p>*/}
                        {/*<p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>*/}
                        {/*<fieldset>*/}
                            {/*<label align="left">Restaurant ID: </label><input type="text" id="restaurantId" name="restaurantId"*/}
                                                                              {/*placeholder="    Auto-Generated"*/}
                                                                              {/*disabled></input>*/}
                            {/*<label>Name: </label><input required type="text" id="restaurantName" name="restaurantName"*/}
                                                        {/*value={this.state.restaurantName}*/}
                                                        {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Description: </label><input required type="text" id="restaurantDescription" name="restaurantDescription"*/}
                                                               {/*value={this.state.restaurantDescription}*/}
                                                               {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Contact No: </label><input required type="text" id="contactNumber" name="contactNumber"*/}
                                                              {/*value={this.state.contactNumber}*/}
                                                              {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Building: </label><input required type="text" id="building" name="building"*/}
                                                            {/*value={this.state.building}*/}
                                                            {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Address: </label><input required type="text" id="street" name="street"*/}
                                                           {/*value={this.state.street}*/}
                                                           {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Postal Code: </label><input required type="text" id="postalCode" name="postalCode"*/}
                                                               {/*value={this.state.postalCode}*/}
                                                               {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Cuisine: </label><input required type="text" id="cuisine" name="cuisine"*/}
                                                           {/*value={this.state.cuisine}*/}
                                                           {/*onChange={this.handleTextChange}></input>*/}
                            {/*<label>Operating Hours: </label><input required type="text" id="operatingHours" name="operatingHours"*/}
                                                                   {/*value={this.state.operatingHours}*/}
                                                                   {/*onChange={this.handleTextChange}></input>*/}
                            {/*/!*<input required type="time" id="operatingHours1" name="operatingHours1" onChange={this.handleTextChange}></input>*!/*/}
                            {/*/!*<text> to </text>*!/*/}
                            {/*/!*<input required type="time" id="operatingHours2" name="operatingHours2" onChange={this.handleTextChange}></input>*!/*/}
                            {/*<label>Affordability: </label>*/}
                            {/*<SplitButton title={<b>{this.state.dropdownTitle}</b>}>*/}
                                {/*<MenuItem onClick={() => this.onSelect1()}>Low</MenuItem>*/}
                                {/*<MenuItem onClick={() => this.onSelect2()}>Medium</MenuItem>*/}
                                {/*<MenuItem onClick={() => this.onSelect3()}>High</MenuItem>*/}
                            {/*</SplitButton>*/}
                            {/*/!*<input required type="text" id="affordability" name="affordability"*!/*/}
                                                                 {/*/!*value={this.state.affordability}*!/*/}
                                                                 {/*/!*onChange={this.handleTextChange}></input>*!/*/}
                            {/*<table>*/}
                                {/*<tr>*/}
                                    {/*<td>*/}
                                        {/*<label>Upload Image: </label>*/}
                                    {/*</td>*/}
                                    {/*<td>*/}
                                        {/*<Input id="file-id" name="file_name" type="file" onChange={this.setImages} accept=".jpg, .png, .jpeg"/>*/}
                                    {/*</td>*/}
                                {/*</tr>*/}
                            {/*</table>*/}
                            {/*<div className='button-center'>*/}
                                {/*<br/>*/}
                                {/*<Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Update Restaurant</b></Button>*/}
                            {/*</div>*/}
                        {/*</fieldset>*/}
                        {/*<br/>*/}
                        {/*/!*<button onClick={this.check}>Check</button>*!/*/}
                    {/*</Modal>*/}

                    <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p align="center">
                                    <h2>
                                        <b>Edit Restaurant Details:</b>
                                    </h2>
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <fieldset>
                                <label align="left">Restaurant ID: </label>
                                <input
                                    className="center"
                                    type="text"
                                    id="restaurantId"
                                    name="restaurantId"
                                    placeholder="Auto-Generated"
                                    disabled>
                                </input>
                                <label>Name: </label>
                                <input
                                    required
                                    type="text"
                                    id="restaurantName"
                                    name="restaurantName"
                                    value={this.state.restaurantName}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Description: </label>
                                <input
                                    required
                                    type="text"
                                    id="restaurantDescription"
                                    name="restaurantDescription"
                                    value={this.state.restaurantDescription}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Contact No: </label>
                                <input
                                    required
                                    type="text"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={this.state.contactNumber}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Building: </label>
                                <input
                                    required
                                    type="text"
                                    id="building"
                                    name="building"
                                    value={this.state.building}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Address: </label>
                                <input
                                    required
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={this.state.street}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Postal Code: </label>
                                <input
                                    required
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={this.state.postalCode}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Cuisine: </label>
                                <input
                                    required
                                    type="text"
                                    id="cuisine"
                                    name="cuisine"
                                    value={this.state.cuisine}
                                    onChange={this.handleTextChange}>
                                </input>
                                <label>Operating Hours: </label>
                                <input
                                    required
                                    type="text"
                                    id="operatingHours"
                                    name="operatingHours"
                                    value={this.state.operatingHours}
                                    onChange={this.handleTextChange}>
                                </input>
                                {/*<input required type="time" id="operatingHours1" name="operatingHours1" onChange={this.handleTextChange}></input>*/}
                                {/*<text> to </text>*/}
                                {/*<input required type="time" id="operatingHours2" name="operatingHours2" onChange={this.handleTextChange}></input>*/}
                                <label>Affordability: </label>
                                <SplitButton title={<b>{this.state.dropdownTitle}</b>}>
                                    <MenuItem onClick={() => this.onSelect1()}>Low</MenuItem>
                                    <MenuItem onClick={() => this.onSelect2()}>Medium</MenuItem>
                                    <MenuItem onClick={() => this.onSelect3()}>High</MenuItem>
                                </SplitButton>
                                {/*<input required type="text" id="affordability" name="affordability"*/}
                                {/*value={this.state.affordability}*/}
                                {/*onChange={this.handleTextChange}></input>*/}
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
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                            <div className='button-center'>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}>
                                    <b>Update Restaurant</b>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-edit"></span></Button>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onAfterOpen={this.afterOpenModal}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Update Restaurant"*/}
                            {/*className="Modal">*/}
                            {/*<div className='button-center'>*/}
                                {/*<h3>{this.state.messageFromServer}</h3>*/}
                                {/*<Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>*/}
                            {/*</div>*/}
                        {/*</Modal>*/}

                        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                {/*<Modal.Title>Modal heading</Modal.Title>*/}
                            </Modal.Header>
                            <Modal.Body>
                                <div className='button-center'>
                                    <h3>{this.state.messageFromServer}</h3>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className='button-center'>
                                    <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )
        }
    }

}
export default EditRestaurant;