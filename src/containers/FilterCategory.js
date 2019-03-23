import React, { Component } from "react";
import axios from "axios";
import {Button, DropdownButton, MenuItem, SplitButton} from "react-bootstrap";
import ChooseFoodCategory from "./ChooseFoodCategory";
import Modal from "react-modal";

class FilterCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
            selectedCategory:"",
            dropdownTitle: "View All"
        };
        this.getCategories = this.getCategories.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
        this.getCategories(this);
    }

    componentDidMount(){
        this.getCategories(this);
    }

    getCategories(ev){
        axios.post('http://makanow.herokuapp.com/api/categories/getCategoriesByMenuId/'+this.props.selectedMenu)
            .then(function(response) {
                ev.setState({
                    categoryData: response.data});
            });
    }

    onSelect(k, num){
        this.setState({
            dropdownTitle: this.state.categoryData[k].foodCategoryName
        })
        this.props.selectCategory(num)
    }

    onSelect1(){
        this.setState({
            dropdownTitle: "View All"
        })
        this.props.selectCategory("")
    }

    check() {
        console.log(this.state.categoryData[0].categoryName);
    }

    render() {
        return (
            <div>
                Filter Categories:
                <text> </text>
                <SplitButton title={this.state.dropdownTitle}>
                    <MenuItem onClick={() => this.onSelect1()}>View All</MenuItem>
                    {this.state.categoryData.map((category, k) =>
                        <MenuItem eventKey={k}
                                  onClick={() => this.onSelect(k, category.foodCategoryId)}>{category.foodCategoryName}</MenuItem>
                    )
                    }
                </SplitButton>
                {/*<button onClick={this.check}>Check</button>*/}
            </div>
        )
    }
}
export default FilterCategory;