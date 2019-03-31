import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "./MainPage.css"
import axios from 'axios';
import {Button, Tab, Tabs} from 'react-bootstrap';
import MenuTabs from "./MenuTabs";
import AddMenu from "./AddMenu";
import AddMenu2 from "./AddMenu2";
import Img from "react-image";
import activitylog from "./images/activitylog.png";


class ManageMenu extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            menuData: [],
            managerId: "",
            //JUST IN CASE: JSON.parse(sessionStorage.getItem("userData")).managerAllocations[0].managerAllocationPK.restaurantId,
            selectedRestaurant: "",
            selectedMenu: "",
            update: false,
            redirect: false
        };
        this.check = this.check.bind(this);
        this.getRestaurants = this.getRestaurants.bind(this);
        this.handleUpdateMenuTab = this.handleUpdateMenuTab.bind(this);
        this.handleStopUpdateMenuTab = this.handleStopUpdateMenuTab.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId
            })
            this.getRestaurants(this, this.state.managerId);
        }
        else{
            this.setState({redirect: true});
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId
            })
            this.getRestaurants(this, this.state.managerId);
        }
        else{
            this.setState({redirect: true});
        }
    }

    handleSelect(restaurantId) {
        this.setState({selectedRestaurant: restaurantId});
    }

    getRestaurants(ev, managerId){
        axios.get('http://makanow.herokuapp.com/api/restaurants/getRestaurantsByManagerId/'+managerId)
            .then(function(response) {
                ev.setState({restaurantData: response.data});
                if(response.data.length !== 0){
                    ev.setState({selectedRestaurant: response.data[0].restaurantId})
                }
        });
    }

    handleUpdateMenuTab(){
        this.setState({
            update: true
        })
    }

    handleStopUpdateMenuTab(){
        this.setState({
            update: false
        })
    }

    check(){
        console.log(JSON.parse(sessionStorage.getItem("userData")).managerId);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }

        return(

            <div class="MainPage">
                <div class="content">
                    <h2>Menu Manager</h2>
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>

                            <AddMenu manager={this.state.managerId} selectedRestaurant={this.state.restaurantData[i].restaurantId} selectedRestaurantName={this.state.restaurantData[i].restaurantName} handleUpdateMenuTab={this.handleUpdateMenuTab}/>

                            <AddMenu2 manager={this.state.managerId} selectedRestaurant={this.state.restaurantData[i].restaurantId} selectedRestaurantName={this.state.restaurantData[i].restaurantName} handleUpdateMenuTab={this.handleUpdateMenuTab}/>

                            <MenuTabs manager={this.state.managerId} restaurant={this.state.restaurantData[i]} update={this.state.update} handleUpdateMenuTab={this.handleUpdateMenuTab} handleStopUpdateMenuTab={this.handleStopUpdateMenuTab}/>

                            </Tab>
                        )}


                        {/*<button onClick={this.check}>Check</button>*/}
                    </Tabs>
                </div>
            </div>
        );

    }
}

export default ManageMenu;