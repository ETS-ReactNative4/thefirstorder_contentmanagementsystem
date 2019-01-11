import React, { Component } from "react";
import {Tab, Tabs} from 'react-bootstrap'
import axios from "axios";
import FoodPrices from "./FoodPrices";

class MenuTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuData: [],
            selectedMenu: "",
            handleAddFood: true,
            handleFoodPrices: true,
            restaurantId: this.props.restaurant.restaurantId
        };
        this.check = this.check.bind(this);
        this.handleUpdateFoodPrices = this.handleUpdateFoodPrices.bind(this);
    }

    componentWillMount() {
        this.getMenus(this, this.props.restaurant.restaurantId);
    }

    componentDidMount() {
        this.getMenus(this, this.props.restaurant.restaurantId);
    }

    componentWillUpdate(prevProps) {
        if (this.props.update === true || this.state.handleAddFood === true || this.state.handleFoodPrices === true) {
            this.getMenus(this, this.props.restaurant.restaurantId);
            this.props.handleStopUpdateMenuTab()
            this.setState({
                handleAddFood: false,
                handleFoodPrices: false
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.update === true || this.state.handleAddFood === true || this.state.handleFoodPrices === true) {
            this.getMenus(this, this.props.restaurant.restaurantId);
            this.props.handleStopUpdateMenuTab()
            this.setState({
                handleAddFood: false,
                handleFoodPrices: false
            });
        }
    }

    getMenus(ev, restaurantId){
        axios.get('https://makanow.herokuapp.com/api/menus/getMenusByRestaurantId/'+restaurantId)
            .then(function(response) {
                ev.setState({menuData: response.data});
            });
    }

    handleSelect(menuId) {
        this.setState({
            selectedMenu: menuId,
        });
    }

    handleUpdateFoodPrices(){
        this.setState({
            handleFoodPrices: true
        })
    }

    check(){
        console.log(this.state.menuData);
    }

    render(){

        return(
            <div>
                <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                    {this.state.menuData.map((menu, j) => <Tab eventKey={j} title={menu.menuName}>
                        <FoodPrices manager={this.props.manager} menu={this.state.menuData[j]} restaurant={this.props.restaurant.restaurantId} handleAddFood={this.handleAddFood} handleUpdateMenuTab={this.props.handleUpdateMenuTab} handleUpdateFoodPrices={this.handleUpdateFoodPrices}/></Tab>)}
                </Tabs>
                {/*<button onClick={this.check}>Check</button>*/}
            </div>
        )
    }
}

export default MenuTabs;
