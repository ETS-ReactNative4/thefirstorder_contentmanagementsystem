import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';
import {Input} from "reactstrap";

class EditFoodPrice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foodId: '',
            foodName: '',
            foodDescription: '',
            foodCategory: '',
            foodPrice: '',
            foodAvailability: true,
            messageFromServer: '',
            modalIsOpen: false,
            errorMessage:'',
            selectedCategory: this.props.foodCategoryId,
            selectedSubCategory: this.props.subCategoryId,
            foodImage: [this.props.foodImage]
        };
        this.onClick = this.onClick.bind(this);
        this.editFoodPriceItem = this.editFoodPriceItem.bind(this);
        this.check = this.check.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectSubCategory = this.selectSubCategory.bind(this);
    }

    componentWillMount(){
        this.setState({
            foodId: this.props.selectedFood,
            foodName: this.props.foodName,
            foodDescription: this.props.foodDescription,
            foodCategory: this.props.foodCategory,
            foodPrice: this.props.foodPrice,
            foodAvailability: this.props.foodAvailability,
            selectedCategory: this.props.foodCategoryId,
            selectedSubCategory: this.props.subCategoryId
        })
        // this.props.handleEditFoodUpdate();
    }

    componentDidMount(){
        this.setState({
            foodId: this.props.selectedFood,
            foodName: this.props.foodName,
            foodDescription: this.props.foodDescription,
            foodCategory: this.props.foodCategory,
            foodPrice: this.props.foodPrice,
            foodAvailability: this.props.foodAvailability,
            selectedCategory: this.props.foodCategoryId,
            selectedSubCategory: this.props.subCategoryId,
            images: []
        })
        // this.props.handleEditFoodUpdate();
    }

    openModal() {
        this.setState({
            foodId: this.props.selectedFood,
            foodName: this.props.foodName,
            foodDescription: this.props.foodDescription,
            foodCategory: this.props.foodCategory,
            foodPrice: this.props.foodPrice,
            foodAvailability: this.props.foodAvailability,
            selectedCategory: this.props.foodCategoryId,
            selectedSubCategory: this.props.subCategoryId,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            foodName: '',
            foodDescription: '',
            foodCategory: '',
            foodPrice: '',
            foodAvailability: true,
            modalIsOpen: false,
            messageFromServer: '',
            errorMessage:'',
            images: []
        });
        this.props.handleEditFoodUpdate();
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
        if (e.target.name === "foodCategory") {
            this.setState({
                foodCategory: e.target.value
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

    editFoodPriceItem(e){
        var foodItem = {
            foodName: e.state.foodName,
            foodDescription: e.state.foodDescription,
            oldFoodCategoryId: e.state.foodCategory,
            foodCategoryId: e.state.selectedCategory,
            subCategoryId: e.state.selectedSubCategory,
            foodPrice: e.state.foodPrice,
            foodAvailability: e.state.foodAvailability,
            restaurantId: e.props.restaurant,
            menuId: e.props.selectedMenu,
            managerId: e.props.manager,
            foodImg: e.state.foodImage[0]
        }
        axios.post('http://makanow.herokuapp.com/api/foodPrices/updateFoodPrice/'+this.props.selectedMenu + '/' + this.state.foodId, foodItem).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(e){

        if(this.state.foodName && this.state.foodDescription && this.state.foodCategory && this.state.selectedCategory && this.state.selectedSubCategory !== '' && this.state.foodPrice <= 0){
            this.setState({
                errorMessage: 'Food price must be more than zero'
            })
        }else if(this.state.foodName && this.state.foodDescription && this.state.foodPrice && this.state.selectedCategory && this.state.selectedSubCategory !== '') {
            this.editFoodPriceItem(this);
            this.props.handleEditFoodUpdate();
            this.setState({
                errorMessage: ''
            })
        }else{
            this.setState({
                errorMessage: 'All fields must be filled'
            })
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
                self.setState({ foodImage: self.state.images.concat(reader.result) });
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
        console.log(this.state.foodImage)
    }

    render(){

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span
                        className="glyphicon glyphicon-edit"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Update Food Price"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        {/*<button onClick={this.check}>Check</button>*/}
                        <p align="center">
                            <h2><b>Edit Food Item</b></h2>
                        </p>
                        <p align="center" style={{color:"red"}}>{this.state.errorMessage}</p>
                        <fieldset>
                            <label align="left">Food ID: </label><input type="text" id="foodId" name="foodId"
                                                                        placeholder="     Auto-Generated"
                                                                        disabled></input>
                            <label>Name: </label><input type="text" id="foodName" name="foodName"
                                                        value={this.state.foodName}
                                                        onChange={this.handleTextChange}></input>
                            <label>Description: </label><input type="text" id="foodDescription" name="foodDescription"
                                                               value={this.state.foodDescription}
                                                               onChange={this.handleTextChange}></input>
                            {/*<UpdateFoodCategory selectedMenu={this.props.selectedMenu} selectCategory={this.selectCategory} selectSubCategory={this.selectSubCategory} selectedCategory={this.state.selectedCategory} selectedSubCategory={this.state.selectedSubCategory} foodCategoryName={this.props.foodCategoryName} subCategoryName={this.props.subCategoryName} handleAddFoodUpdate={this.props.handleAddFoodUpdate}/>*/}
                            <label>Price($): </label><input type="number" id="foodPrice" name="foodPrice"
                                                            value={this.state.foodPrice}
                                                            onChange={this.handleTextChange}></input><br/>
                            <label>Availability:</label>
                            <input type="radio" id="foodAvailability1" value="true" name="foodAvailability"
                                   onChange={this.handleTextChange}></input>
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
                            {/*<label>Upload Image:</label><input type="file" name="foodImage" accept="image/*"></input>*/}
                            <div className='button-center'>
                                <br/>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Update Food
                                    Item</b></Button>
                            </div>
                        </fieldset>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        }else{
            return (
                <div>
                    <div>
                        <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-edit"></span></Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Update Food Price"
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
export default EditFoodPrice;