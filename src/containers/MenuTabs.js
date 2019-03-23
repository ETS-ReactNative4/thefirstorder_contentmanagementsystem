import "./css/style.css"
import React, { Component } from "react";
import {Tab, Tabs, Button} from 'react-bootstrap'
import axios from "axios";
import FoodPrices from "./FoodPrices";

import ChangeMenuName from "./ChangeMenuName";
import DeleteMenu from "./DeleteMenu";

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
        axios.get('http://makanow.herokuapp.com/api/menus/getMenusByRestaurantId/'+restaurantId)
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
        console.log(this.state);
    }

    render(){

        return(
            <div>
                <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                    {this.state.menuData.map((menu, j) =>
                        <Tab
                            eventKey={j}
                            title={
                                <span>{menu.menuName}
                                    <span className="menu-controls">
                                        {/*<button  class="btn-simple btn btn-xs btn-warning"  type="button" onClick={ChangeMenuName}>            /!*Edit Menu Name*!/*/}
                                            {/*<span class="glyphicon glyphicon-edit"></span>*/}
                                        {/*</button>*/}

                                        {/*<ChangeMenuName handleUpdateMenuTab={this.props.handleUpdateMenuTab} manager={this.props.manager} selectedMenu={this.state.menuData[this.state.selectedMenu]} restaurant={this.props.restaurant}/>*/}

                                        {/*<button className="btn-simple btn btn-xs btn-danger" type="button"onClick={ChangeMenuName}>            /!*Delete Menu*!/*/}
                                            {/*<span className="glyphicon glyphicon-remove"></span>*/}
                                        {/*</button>*/}

                                        {/*<DeleteMenu manager={this.props.manager} selectedMenu={this.props.menu} restaurant={this.props.restaurant} handleUpdateMenuTab={this.props.handleUpdateMenuTab} handleDeleteMenuUpdate={this.handleDeleteMenuUpdate} handleUpdateFoodPrices={this.props.handleUpdateFoodPrices} />*/}

                                        </span>
                                    </span>
                            }>
                            <FoodPrices manager={this.props.manager}
                                    menu={this.state.menuData[j]}
                                    restaurant={this.props.restaurant.restaurantId}
                                    handleAddFood={this.handleAddFood}
                                    handleUpdateMenuTab={this.props.handleUpdateMenuTab}
                                    handleUpdateFoodPrices={this.handleUpdateFoodPrices}/>
                    </Tab>)}
                    {/*<Tab eventKey="contact" title={<span className="add_menu">Add Menu</span>}></Tab>*/}
                </Tabs>
                {/*<Button onClick={this.check}>Check</Button>*/}
            </div>
        )
    }
}

export default MenuTabs;
