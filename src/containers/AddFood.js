import React, { Component } from "react";
import axios from "axios";
import {Button, MenuItem, SplitButton} from "react-bootstrap";
import Modal from 'react-modal';
import ChooseFoodCategory from "./ChooseFoodCategory";
import {Input} from "reactstrap";

class AddFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foodId: '',
            foodName: '',
            foodDescription: '',
            foodCategory: '',
            foodPrice: '',
            foodAvailability: true,
            imageURL: '',
            messageFromServer: '',
            selectedMenu: '',
            update: false,
            modalIsOpen: false,
            selectedCategory: "1",
            selectedSubCategory: "1",
            errorMessage: '',
            images: [],
            file: '',
            foodImgBlob: null
        };
        this.check = this.check.bind(this);
        this.addNewFood = this.addNewFood.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSubCategory = this.selectSubCategory.bind(this);
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
            foodName: '',
            foodDescription: '',
            foodCategory: '',
            foodPrice: '',
            selectedCategory: "1",
            selectedSubCategory: '1',
            foodAvailability: true,
            messageFromServer: '',
            modalIsOpen: false,
            errorMessage:'',
            images: []
        });
        this.props.handleAddFoodUpdate();
    }

    addNewFood(e) {
        var addedFoodItem = {
            foodName: e.state.foodName,
            foodDescription: e.state.foodDescription,
            foodCategoryId: e.state.selectedCategory,
            subCategoryId: e.state.selectedSubCategory,
            foodPrice: e.state.foodPrice,
            foodAvailability: e.state.foodAvailability,
            restaurantId: e.props.restaurant,
            menuId: e.props.selectedMenu,
            managerId: e.props.manager,
            foodImg: e.state.images[0]

        }
        axios.post('http://makanow.herokuapp.com/api/foodPrices/addFoodPrice/'+this.props.selectedMenu, addedFoodItem).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    selectCategory(categoryId){
        this.setState({
            selectedCategory: categoryId
        })
    }

    selectSubCategory(subCategoryId){
        this.setState({
            selectedSubCategory: subCategoryId
        })
    }

    onClick(e){

        if(this.state.foodName && this.state.foodDescription && this.state.selectedCategory !== "1" && this.state.foodPrice <= 0){
            this.setState({
                errorMessage: 'Food price must be more than zero'
            })
        }else if(this.state.foodName && this.state.foodDescription && this.state.selectedCategory !== "1" && this.state.foodPrice) {
            this.addNewFood(this);
            this.props.handleAddFoodUpdate();
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
        }

    }

    handleTextChange(e){
        if (e.target.name === "foodName") {
            this.setState({
                foodName: e.target.value
            });
        }
        if (e.target.name === "foodDescription") {
            this.setState({
                foodDescription: e.target.value
            });
        }
        if (e.target.name === "foodPrice") {
            this.setState({
                foodPrice: e.target.value
            });
        }
        if (e.target.name === "foodAvailability") {
            this.setState({
                foodAvailability: e.target.value
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
        console.log(this.state.images[0]);
    }

    render(){

        if(this.state.messageFromServer === '') {

            return (
                <div>
                    <div ref={el => (this.instance = el)} />
                    <Button className="pull-left" bsStyle="success" onClick={this.openModal}><span
                        className="glyphicon glyphicon-plus"></span> Add Food Item</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Food"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <p align="center">
                            <h3><b>Food Item Details</b></h3>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label align="left">Food ID: </label><input type="text" id="foodId" name="foodId"
                                                                        placeholder="    Auto-Generated"
                                                                        disabled></input>
                            <label>Name: </label><input required type="text" id="foodName" name="foodName"
                                                        value={this.state.foodName}
                                                        onChange={this.handleTextChange}></input>
                            <label>Description: </label><input required type="text" id="foodDescription" name="foodDescription"
                                                               value={this.state.foodDescription}
                                                               onChange={this.handleTextChange}></input>
                            <ChooseFoodCategory selectedMenu={this.props.selectedMenu} selectCategory={this.selectCategory} selectSubCategory={this.selectSubCategory} selectedCategory={this.state.selectedCategory} handleAddFoodUpdate={this.props.handleAddFoodUpdate}/>

                            <label>Price($): </label><input required type="number" min="0" id="foodPrice" name="foodPrice"
                                                            value={this.state.foodPrice}
                                                            onChange={this.handleTextChange}></input><br/>
                            <label>Availability:</label>
                            <input type="radio" id="foodAvailability1" value="true" name="foodAvailability"
                                   onChange={this.handleTextChange} checked></input>
                            <text> Available</text>
                            {"  "}
                            <input type="radio" id="foodAvailability2" value="false" name="foodAvailability"
                                   onChange={this.handleTextChange}></input>
                            <text> Not Available</text>
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
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Food
                                    Item</b></Button>
                            </div>
                        </fieldset>
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
                            className="glyphicon glyphicon-plus"></span> Add Food Item</Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Food"
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
export default AddFood;