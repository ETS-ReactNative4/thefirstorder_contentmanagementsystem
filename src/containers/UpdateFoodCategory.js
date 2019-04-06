import React, { Component } from "react";
import axios from "axios";
import {Button, DropdownButton, MenuItem, SplitButton, Modal} from "react-bootstrap";
// import Modal from "react-modal";

class UpdateFoodCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
            subCategoryData: [],
            selectedCategory:'',
            selectedSubCategory: '',
            messageFromServer: '',
            foodCategoryName: '',
            subCategoryName: '',
            errorMessage: '',
            errorMessage1: '',
            dropdownTitle: this.props.foodCategoryName,
            subDropdownTitle: this.props.subCategoryName,
        };
        this.getCategories = this.getCategories.bind(this);
        this.getSubCategoriesByCategoryId = this.getSubCategoriesByCategoryId.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelect1 = this.onSelect1.bind(this);
        this.check = this.check.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.addSubCategory = this.addSubCategory.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClick1 = this.onClick1.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
    }

    componentWillMount(){
        // this.props.handleAddFoodUpdate();
        this.getCategories(this);
        this.getSubCategoriesByCategoryId(this, this.props.selectedCategory)
    }

    componentDidMount(){
        // this.props.handleAddFoodUpdate();
        this.getCategories(this);
    }

    getCategories(ev){
        axios.post('http://makanow.herokuapp.com/api/categories/getCategoriesByMenuId/'+this.props.selectedMenu)
            .then(function(response) {
                ev.setState({
                    categoryData: response.data});
            });
    }

    addCategory(ev){
        var addedFoodCategory = {
            foodCategoryName: ev.state.foodCategoryName
        }
        axios.post('http://makanow.herokuapp.com/api/categories/addCategory/'+this.props.selectedMenu, addedFoodCategory)
            .then(function(response) {
                ev.setState({
                    selectedCategory: response.data,
                    messageFromServer: "Food Category Added Successfully."});
            });
    }

    getSubCategoriesByCategoryId(ev, num){
        axios.post('http://makanow.herokuapp.com/api/subCategories/getSubCategoriesByCategoryId/'+num)
            .then(function(response) {
                ev.setState({
                    subCategoryData: response.data});
            });
    }

    addSubCategory(ev){
        var addedSubCategory = {
            subCategoryName: ev.state.subCategoryName
        }
        axios.post('http://makanow.herokuapp.com/api/subCategories/addSubCategory/'+this.props.selectedCategory, addedSubCategory)
            .then(function(response) {
                ev.setState({
                    selectedSubCategory: response.data,
                    messageFromServer: "Sub Category Added Successfully."});
            });
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

    closeModal(){
        this.props.selectCategory(this.state.selectedCategory);
        this.props.handleAddFoodUpdate();
        this.setState({
            messageFromServer: '',
            foodCategoryName: '',
            selectedCategory:'',
            modalIsOpen: false,
            errorMessage:''
        });
    }

    closeModal1(){
        this.props.selectSubCategory(this.state.selectedSubCategory);
        this.props.handleAddFoodUpdate();
        this.setState({
            messageFromServer: '',
            subCategoryName: '',
            selectedSubCategory:'',
            modalIsOpen1: false,
            errorMessage1:''
        });
    }

    handleTextChange(e){
        if (e.target.name === "foodCategoryName") {
            this.setState({
                foodCategoryName: e.target.value
            });
        }else if(e.target.name === "subCategoryName"){
            this.setState({
                subCategoryName: e.target.value
            });
        }
    }

    onClick(e){

        if(this.state.foodCategoryName) {
            this.addCategory(this);
            this.setState({
                dropdownTitle: this.state.foodCategoryName,
                subDropdownTitle: "Select Sub Category",
                subCategoryData: [],
            });
            this.props.handleAddFoodUpdate();
            this.props.selectCategory(this.state.selectedCategory);
        }else{
            this.setState({
                errorMessage: 'Please enter a food category name.'
            })
        }
    }

    onClick1(e){

        if(this.state.subCategoryName) {
            this.addSubCategory(this);
            this.setState({
                subDropdownTitle: this.state.subCategoryName,
            });
            this.props.handleAddFoodUpdate();
            this.props.selectSubCategory(this.state.selectedSubCategory);
        }else{
            this.setState({
                errorMessage: 'Please enter a sub category name.'
            })
        }
    }

    onSelect(k, num){
        this.getSubCategoriesByCategoryId(this, num);
        this.setState({
            dropdownTitle: this.state.categoryData[k].foodCategoryName,
            subDropdownTitle: "Select Sub Category",
        })
        this.props.selectSubCategory('');
        this.props.selectCategory(num);
    }

    onSelect1(k, num){
        this.setState({
            subDropdownTitle: this.state.subCategoryData[k].subCategoryName
        })
        this.props.selectSubCategory(num);
    }


    check() {
        console.log(this.props.selectedCategory);
    }

    render() {

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    <label> Category: </label>
                    <SplitButton title={this.state.dropdownTitle}>
                        {this.state.categoryData.map((category, k) =>
                            <MenuItem eventKey={k}
                                      onClick={() => this.onSelect(k, category.foodCategoryId)}>{category.foodCategoryName}</MenuItem>
                        )
                        }
                        <MenuItem divider/>
                        <MenuItem onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span> Add
                            Category</MenuItem>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Add Category"*/}
                            {/*className="Modal">*/}
                            {/*<Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span*/}
                                {/*className="closebtn glyphicon glyphicon-remove"></span></Button>*/}
                            {/*<p align="center">*/}
                                {/*<h2><b>Add Category</b></h2>*/}
                            {/*</p>*/}
                            {/*<p align="center" style={{color: "red"}}>{this.state.errorMessage}</p>*/}
                            {/*<fieldset>*/}
                                {/*<label align="left">Food Category ID: </label><input type="text" id="foodCategoryId"*/}
                                                                                     {/*name="foodCategoryId"*/}
                                                                                     {/*placeholder="    Auto-Generated"*/}
                                                                                     {/*disabled></input>*/}
                                {/*<label>Name: </label><input required type="text" id="foodCategoryName"*/}
                                                            {/*name="foodCategoryName"*/}
                                                            {/*value={this.state.foodCategoryName}*/}
                                                            {/*onChange={this.handleTextChange}></input>*/}
                                {/*<div className='button-center'>*/}
                                    {/*<br/>*/}
                                    {/*<Button bsStyle="success" bsSize="large" onClick={this.onClick}><b>Add Category</b></Button>*/}
                                {/*</div>*/}
                            {/*</fieldset>*/}
                        {/*</Modal>*/}

                        <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <p align="center">
                                        <h2><b>Add Category</b></h2>
                                    </p>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <fieldset>
                                    <label align="left">Food Category ID: </label>
                                    <input
                                        className="center"
                                        type="text"
                                        id="foodCategoryId"
                                        name="foodCategoryId"
                                        placeholder="Auto-Generated"
                                        disabled
                                    >
                                    </input>
                                    <label>Name: </label>
                                    <input
                                        required
                                        type="text"
                                        id="foodCategoryName"
                                        name="foodCategoryName"
                                        value={this.state.foodCategoryName}
                                        onChange={this.handleTextChange}
                                    >
                                    </input>
                                </fieldset>
                            </Modal.Body>
                            <Modal.Footer>
                                <p align="center" style={{color: "red"}}>{this.state.errorMessage}</p>
                                <div className='button-center'>
                                    <Button bsStyle="success" bsSize="large" onClick={this.onClick}>
                                        <b>Add Category</b>
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>

                    </SplitButton>
                    <label>Sub Category: </label><SplitButton title={this.state.subDropdownTitle}>
                    {this.state.subCategoryData.map((subCategory, k) =>
                        <MenuItem eventKey={k} onClick={() => this.onSelect1(k, subCategory.subCategoryId)}>{subCategory.subCategoryName}</MenuItem>
                    )
                    }
                    <MenuItem divider/>
                    <MenuItem onClick={this.openModal1}><span className="glyphicon glyphicon-plus"></span> Add Sub
                        Category</MenuItem>
                    {/*<Modal*/}
                        {/*isOpen={this.state.modalIsOpen1}*/}
                        {/*onRequestClose={this.closeModal1}*/}
                        {/*contentLabel="Add Sub Category"*/}
                        {/*className="Modal">*/}
                        {/*<Button bsStyle="danger" bsSize="mini" onClick={this.closeModal1}><span*/}
                            {/*className="closebtn glyphicon glyphicon-remove"></span></Button>*/}
                        {/*<p align="center">*/}
                            {/*<h2><b>Add Sub Category to {this.state.dropdownTitle}</b></h2>*/}
                        {/*</p>*/}
                        {/*<p align="center" style={{color: "red"}}>{this.state.errorMessage1}</p>*/}
                        {/*<fieldset>*/}
                            {/*<label align="left">Sub Category ID: </label><input type="text" id="subCategoryId"*/}
                                                                                {/*name="subCategoryId"*/}
                                                                                {/*placeholder="    Auto-Generated"*/}
                                                                                {/*disabled></input>*/}
                            {/*<label>Name: </label><input required type="text" id="subCategoryName"*/}
                                                        {/*name="subCategoryName"*/}
                                                        {/*value={this.state.subCategoryName}*/}
                                                        {/*onChange={this.handleTextChange}></input>*/}
                            {/*<div className='button-center'>*/}
                                {/*<br/>*/}
                                {/*<Button bsStyle="success" bsSize="large" onClick={this.onClick1}><b>Add Sub Category</b></Button>*/}
                            {/*</div>*/}
                        {/*</fieldset>*/}
                    {/*</Modal>*/}

                    <Modal show={this.state.modalIsOpen1} onHide={this.closeModal1}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <p align="center">
                                    <h2><b>Add Sub Category to {this.state.dropdownTitle}</b></h2>
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <fieldset>
                                <label align="left">Sub Category ID: </label>
                                <input
                                    className="center"
                                    type="text"
                                    id="subCategoryId"
                                    name="subCategoryId"
                                    placeholder="Auto-Generated"
                                    disabled
                                >
                                </input>
                                <label>Name: </label>
                                <input
                                    required
                                    type="text"
                                    id="subCategoryName"
                                    name="subCategoryName"
                                    value={this.state.subCategoryName}
                                    onChange={this.handleTextChange}
                                >
                                </input>
                            </fieldset>
                        </Modal.Body>
                        <Modal.Footer>
                            <p align="center" style={{color: "red"}}>{this.state.errorMessage1}</p>
                            <div className='button-center'>
                                <Button bsStyle="success" bsSize="large" onClick={this.onClick1}>
                                    <b>Add Sub Category</b>
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                </SplitButton>
                </div>
            )
        }else{
            return(
                <div>
                    <label> Category: </label>
                    <SplitButton title={this.state.dropdownTitle}>
                        {this.state.categoryData.map((category, k) =>
                            <MenuItem eventKey={k}
                                      onClick={() => this.onSelect(k, category.foodCategoryId)}>{category.foodCategoryName}</MenuItem>
                        )
                        }
                        <MenuItem divider/>
                        <MenuItem onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span> Add
                            Category</MenuItem>
                        {/*<Modal*/}
                            {/*isOpen={this.state.modalIsOpen}*/}
                            {/*onAfterOpen={this.afterOpenModal}*/}
                            {/*onRequestClose={this.closeModal}*/}
                            {/*contentLabel="Add Category"*/}
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

                    </SplitButton>
                    <label>Sub Category: </label><SplitButton title={this.state.subDropdownTitle}>
                    {this.state.subCategoryData.map((subCategory, k) =>
                        <MenuItem eventKey={k} onClick={() => this.onSelect1(k, subCategory.subCategoryId)}>{subCategory.subCategoryName}</MenuItem>
                    )
                    }
                    <MenuItem divider/>
                    <MenuItem onClick={this.openModal1}><span className="glyphicon glyphicon-plus"></span> Add Sub
                        Category</MenuItem>
                    {/*<Modal*/}
                        {/*isOpen={this.state.modalIsOpen1}*/}
                        {/*onAfterOpen={this.afterOpenModal}*/}
                        {/*onRequestClose={this.closeModal1}*/}
                        {/*contentLabel="Add Category"*/}
                        {/*className="Modal">*/}
                        {/*<div className='button-center'>*/}
                            {/*<h3>{this.state.messageFromServer}</h3>*/}
                            {/*<Button bsStyle="success" bsSize="mini" onClick={this.closeModal1}>Close</Button>*/}
                        {/*</div>*/}
                    {/*</Modal>*/}

                    <Modal show={this.state.modalIsOpen1} onHide={this.closeModal1}>
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
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal1}>Close</Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                    {/*<button onClick={this.check}>Check</button>*/}
                </SplitButton>
                </div>
            )
        }
    }
}
export default UpdateFoodCategory;