import React, { Component } from "react";
import {Button, ButtonToolbar, MenuItem, SplitButton, Tab, Table} from 'react-bootstrap'
import axios from "axios";
import DeleteMenu from "./DeleteMenu";
import DeleteFoodPrice from "./DeleteFoodPrice";
import AddFood from "./AddFood";
import EditFoodPrice from "./EditFoodPrice";
import ChangeMenuName from "./ChangeMenuName";
import ButtonGroup from "react-bootstrap/es/ButtonGroup";
import DisplayFoodCustomisation from "./DisplayFoodCustomisation";
import {CSVLink, CSVDownload} from 'react-csv';
import ImportCSV from "./ImportCSV";
import no_image_icon from './images/no-image-icon.png';

class FoodPrices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuData: [],
            foodData: [],
            foodDataCSV: [],
            selectedCategory: "1",
            selectedSubCategory: "1",
            foodUpdate: false,
            categoryData: [],
            subCategoryData: [],
            dropdownTitle: "View All",
        };
        this.check = this.check.bind(this);
        this.getFoods = this.getFoods.bind(this);
        this.getFoodsByCategory = this.getFoodsByCategory.bind(this);
        this.handleDeleteMenuUpdate = this.handleDeleteMenuUpdate.bind(this);
        this.checkFoodAvailability = this.checkFoodAvailability.bind(this);
        this.handleDeleteFoodUpdate = this.handleDeleteFoodUpdate.bind(this);
        this.handleAddFoodUpdate = this.handleAddFoodUpdate.bind(this);
        this.handleEditFoodUpdate = this.handleEditFoodUpdate.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getSubCategoriesByMenuId = this.getSubCategoriesByMenuId.bind(this);
        this.getFoodsBySubCategory = this.getFoodsBySubCategory.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelect1 = this.onSelect1.bind(this);
        this.onSelect2 = this.onSelect2.bind(this);
        this.updateDropdownTitle = this.updateDropdownTitle.bind(this);
    }


    componentWillMount(){
        if(this.state.selectedCategory === "1"){
            this.getCategories(this);
            this.getSubCategoriesByMenuId(this);
            this.getFoods(this);
        }
        // else{
        //     this.getCategories(this);
        //     this.getFoodsByCategory(this);
        // }
    }

    // componentDidMount(){
    //     if(this.state.selectedCategory === "1"){
    //         this.getCategories(this);
    //         this.getFoods(this);
    //     }else{
    //         this.getCategories(this);
    //         this.getFoodsByCategory(this);
    //     }
    // }

    // componentWillUpdate(){
    //     if (this.state.foodUpdate === true && this.state.selectedCategory === "1"){
    //         this.getCategories(this);
    //         this.getFoods(this);
    //         this.setState({
    //             foodUpdate: false,
    //             // selectedCategory: "1"
    //         });
    //     }else if (this.state.selectedCategory === ""){
    //         this.getCategories(this);
    //         this.getFoods(this);
    //         this.setState({
    //             foodUpdate: false,
    //             selectedCategory: "1"
    //         });
    //     }else if(this.state.selectedCategory !== "1"){
    //         console.log(this.state.foodData)
    //         console.log(this.state.selectedCategory)
    //         this.getCategories(this);
    //         this.getFoodsByCategory(this);
    //         this.setState({
    //             foodUpdate: false,
    //             selectedCategory: "1"
    //         });
    //     }
    // }


    componentDidUpdate(){
        if (this.state.selectedCategory === ""){
            this.getCategories(this);
            this.getSubCategoriesByMenuId(this);
            this.getFoods(this);
            this.setState({
                foodUpdate: false,
                selectedCategory: "1",
                selectedSubCategory: "1"
            });
        }else if(this.state.selectedCategory !== "1"){
            this.getCategories(this);
            this.getSubCategoriesByMenuId(this);
            this.getFoodsByCategory(this);
            this.setState({
                foodUpdate: false,
                selectedCategory: "1",
                selectedSubCategory: "1"
            });
        }else if(this.state.selectedSubCategory !== "1"){
            this.getCategories(this);
            this.getSubCategoriesByMenuId(this);
            this.getFoodsBySubCategory(this);
            this.setState({
                foodUpdate: false,
                selectedCategory: "1",
                selectedSubCategory: "1"
            });
        }else if (this.state.foodUpdate === true){
            this.getCategories(this);
            this.getSubCategoriesByMenuId(this);
            this.getFoods(this);
            this.setState({
                foodUpdate: false,
                selectedCategory: "1",
                selectedSubCategory: "1"
            });
        }
    }

    selectCategory(categoryId){
        this.setState({
            selectedCategory: categoryId
        })
    }

    handleDeleteMenuUpdate(){
        this.setState({
            foodUpdate: true
        })
    }

    handleDeleteFoodUpdate(){
        this.setState({
            foodUpdate: true
        })
    }

    handleAddFoodUpdate(){
        this.setState({
            foodUpdate: true
        })
    }

    handleEditFoodUpdate(){
        this.setState({
            foodUpdate: true
        })
    }

    getFoods(ev){
        axios.get('http://makanow.herokuapp.com/api/foods/'+this.props.menu.menuId)
            .then(function(response) {
                ev.setState({
                    foodData: response.data[0],
                    foodDataCSV: response.data[1]
                });
            });
    }

    getFoodsByCategory(ev){
        axios.get('http://makanow.herokuapp.com/api/foods/getFoodsByCategory/'+this.props.menu.menuId+'/'+this.state.selectedCategory)
            .then(function(response) {
                ev.setState({
                    foodData: response.data[0],
                    foodDataCSV: response.data[1]
                });
            });
    }

    getCategories(ev){
        axios.post('http://makanow.herokuapp.com/api/categories/getCategoriesByMenuId/'+this.props.menu.menuId)
            .then(function(response) {
                ev.setState({
                    categoryData: response.data});
            });
    }

    getSubCategoriesByMenuId(ev){
        axios.post('http://makanow.herokuapp.com/api/subCategories/'+this.props.menu.menuId)
            .then(function(response) {
                ev.setState({
                    subCategoryData: response.data});
            });
    }

    getFoodsBySubCategory(ev){
        axios.get('http://makanow.herokuapp.com/api/foods/getFoodsBySubCategory/'+this.props.menu.menuId+'/'+this.state.selectedSubCategory)
            .then(function(response) {
                ev.setState({
                    foodData: response.data[0],
                    foodDataCSV: response.data[1]
                });
            });
    }

    onSelect(k, num){
        this.setState({
            dropdownTitle: this.state.categoryData[k].foodCategoryName,
            selectedCategory: num
        })
    }

    updateDropdownTitle(){
        this.setState({
            dropdownTitle: "View All"
        })
    }

    onSelect1(){
        this.setState({
            dropdownTitle: "View All",
            selectedCategory: ""
        })
    }

    onSelect2(k, num){
        this.setState({
            dropdownTitle: this.state.subCategoryData[k].subCategoryName,
            selectedSubCategory: num
        })
    }

    checkFoodAvailability(k){
        if (this.state.foodData[k].foodAvailability === true){
            return (
                <span className="glyphicon glyphicon-ok"></span>
            )
        }
        return <span className="glyphicon glyphicon-remove"></span>
    }

    displayFoodImage(k){
        if (this.state.foodData[k].foodImg){
            return (
                <img src={this.state.foodData[k].foodImg} width="50" height="50"/>
            )
        }
        return <img src={no_image_icon} width="50" height="50"/>
    }

    check(){
        console.log(this.state.foodData);
    }

    // Delete when complete (Keith)
    // componentDidMount(){
    //     console.log(this.props);
    // }

    render(){

        return (
            <div>
                <ButtonToolbar className="toolbar">
                    <ButtonGroup className="pull-left">
                        <DeleteMenu manager={this.props.manager} selectedMenu={this.props.menu} restaurant={this.props.restaurant} handleUpdateMenuTab={this.props.handleUpdateMenuTab} handleDeleteMenuUpdate={this.handleDeleteMenuUpdate} handleUpdateFoodPrices={this.props.handleUpdateFoodPrices} />
                        {/*<Button className="pull-right" bsStyle="danger" bsSize="small" onClick={this.onClick}><span className="glyphicon glyphicon-remove"></span> Delete Menu {this.props.menu.menuId}</Button>*/}
                    </ButtonGroup>
                    <ButtonGroup className="pull-left">
                        <ChangeMenuName handleUpdateMenuTab={this.props.handleUpdateMenuTab} manager={this.props.manager} selectedMenu={this.props.menu} restaurant={this.props.restaurant}/>
                    </ButtonGroup>
                </ButtonToolbar>
                <ButtonToolbar className="toolbar">
                    <SplitButton title={<b>{this.state.dropdownTitle}</b>}>
                        <MenuItem onClick={() => this.onSelect1()}><b>View All</b></MenuItem>
                        {this.state.categoryData.map((category, k) =>
                            <MenuItem eventKey={k}
                                      onClick={() => this.onSelect(k, category.foodCategoryId)}><b>All {category.foodCategoryName}</b></MenuItem>
                        )}
                        <MenuItem divider/>
                        <MenuItem header><b>Sub Categories</b></MenuItem>
                        {this.state.subCategoryData.map((subCategory, k) =>
                            <MenuItem eventKey={k}
                                      onClick={() => this.onSelect2(k, subCategory.subCategoryId)}><b>{subCategory.subCategoryName}</b></MenuItem>
                        )}
                    </SplitButton>

                    <ButtonGroup className="pull-right">
                        <CSVLink filename={this.props.menu.menuName+"_"+this.state.dropdownTitle+".csv"} data={this.state.foodDataCSV}>
                            <Button className="pull-right" bsStyle="info">
                                <span className="glyphicon glyphicon-save"></span> Export Menu </Button>
                        </CSVLink>
                    </ButtonGroup>
                    <ButtonGroup className="pull-right">
                        <ImportCSV manager={this.props.manager} selectedMenu={this.props.menu} restaurant={this.props.restaurant} handleAddFoodUpdate={this.handleAddFoodUpdate}/>
                    </ButtonGroup>

                    <ButtonGroup className="pull-right">
                        <AddFood manager={this.props.manager} selectedMenu={this.props.menu.menuId} restaurant={this.props.restaurant} handleAddFoodUpdate={this.handleAddFoodUpdate}/>
                        {/*<Button className="pull-left" bsStyle="success" bsSize="small"><span className="glyphicon glyphicon-plus"></span> Add Food Item</Button>*/}
                    </ButtonGroup>
                </ButtonToolbar>
                {/*<FilterCategory selectedMenu={this.props.menu.menuId} selectCategory={this.selectCategory} selectedCategory={this.state.selectedCategory}/>*/}
                {/*<p></p>*/}
                {/*<p align="right">*/}
                    {/*<span className="glyphicon glyphicon-time"></span> Last Updated:  {this.props.menu.dateOfCreation}*/}
                {/*</p>*/}
                {/*<p></p>*/}

                <Table striped hover>
                    <thead>
                        <tr>
                            <th align="center">S/N</th>
                            <th align="center">Food ID</th>
                            <th align="center"></th>
                            <th align="center">Name</th>
                            <th align="center">Description</th>
                            <th align="center">Customisations</th>
                            <th align="center">Price ($)</th>
                            {/*<th align="center">Customisations</th>*/}
                            <th align="center">Availability</th>
                            <th align="center">Edit</th>
                            <th align="center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.foodData.map((food, k) =>
                            <tr className="table_items" index={k}>
                                <td align="center">{k+1}</td>
                                <td align="center">{food.foodId}</td>
                                <td align="center">{this.displayFoodImage(k)}</td>
                                <td align="left">{food.foodName}</td>
                                <td align="left" word-wrap="break-word"><p>{food.foodDescription}</p></td>
                                <DisplayFoodCustomisation managerId={this.props.manager} restaurantId={this.props.restaurant} menuId={this.props.menu.menuId} foodId={food.foodId} categoryId={food.foodCategory} foodData={this.state.foodData}/>
                                <td align="center">{food.foodPrice}</td>
                                <td align="center">{this.checkFoodAvailability(k)}</td>
                                {/*<td align="center">{this.props.menu.foodPrices[k].price}</td>*/}
                                {/*<td align="center">{this.checkFoodAvailability(k)}</td>*/}
                                {/*<td align="center"><Button bsStyle="info" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-eye-open"></span> View </Button></td>*/}
                                <td align="left"><EditFoodPrice manager={this.props.manager} selectedMenu={this.props.menu.menuId} menuName={this.props.menu.menuName} restaurant={this.props.restaurant} selectedFood={food.foodId} foodName={food.foodName} foodCategoryId={food.foodCategory} subCategoryId={food.foodSubCategory} foodCategoryName={food.foodCategoryName} subCategoryName={food.subCategoryName} handleEditFoodUpdate={this.handleEditFoodUpdate} foodName={food.foodName} foodDescription={food.foodDescription} foodCategory={food.foodCategory} foodPrice={food.foodPrice} foodImage={food.foodImg} foodAvailability={food.foodAvailability} handleAddFoodUpdate={this.handleFoodUpdate}/></td>
                                {/*<td align="center"><Button bsStyle="danger" bsSize="small" onClick={this.onClick}><span className="glyphicon glyphicon-remove"></span></Button></td>*/}
                                <td align="left"><DeleteFoodPrice manager={this.props.manager} selectedMenu={this.props.menu.menuId} menuName={this.props.menu.menuName} restaurant={this.props.restaurant} selectedFood={food.foodId} foodName={food.foodName} selectedFoodCategory={food.foodCategory} handleDeleteFoodUpdate={this.handleDeleteFoodUpdate} handleFoodData={this.handleFoodData} updateDropdownTitle={this.updateDropdownTitle}/></td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                {/*<Button onClick={this.check}>Check</Button>*/}
            </div>

        )
    }
}

export default FoodPrices;

