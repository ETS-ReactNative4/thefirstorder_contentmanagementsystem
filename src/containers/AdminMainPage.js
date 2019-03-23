import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "./MainPage.css"
import axios from 'axios';
import {Button, Tab, Table, Tabs} from 'react-bootstrap';
import MenuTabs from "./MenuTabs";
import AddMenu from "./AddMenu";
import DisplayFoodCustomisation from "./DisplayFoodCustomisation";
import EditFoodPrice from "./EditFoodPrice";
import DeleteFoodPrice from "./DeleteFoodPrice";
import EditRestaurant from "./EditRestaurant";
import DeleteRestaurant from "./DeleteRestaurant";
import AddRestaurant from "./AddRestaurant";
import DisplayManagers from "./DisplayManagers";
import no_image_icon from "./images/no-image-icon.png";

class AdminMainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            adminId: "",
            update: false,
            redirect: false,
            restaurantUpdate: false
        };
        this.check = this.check.bind(this);
        this.getRestaurants = this.getRestaurants.bind(this);
        this.handleRestaurantUpdate = this.handleRestaurantUpdate.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                adminId: JSON.parse(sessionStorage.getItem("userData")).adminId
            })
            this.getRestaurants(this);
        }
        else{
            this.setState({redirect: true});
        }
    }

    componentDidMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                adminId: JSON.parse(sessionStorage.getItem("userData")).adminId
            })
            this.getRestaurants(this);
        }
        else{
            this.setState({redirect: true});
        }
    }

    componentDidUpdate(){
        if (this.state.restaurantUpdate === true){
            this.getRestaurants(this);
            this.setState({
                restaurantUpdate: false
            });
        }
    }

    getRestaurants(ev){
        axios.get('http://makanow.herokuapp.com/api/restaurants/getAllRestaurantsByAdminId/'+this.state.adminId)
            .then(function(response) {
                ev.setState({restaurantData: response.data});
            });
    }

    handleRestaurantUpdate(){
        this.setState({
            restaurantUpdate: true
        })
    }

    displayRestaurantImage(k){
        if (this.state.restaurantData[k].restaurantImg){
            return (
                <img src={this.state.restaurantData[k].restaurantImg} width="75" height="75"/>
            )
        }
        return <img src={no_image_icon} width="75" height="75"/>
    }

    check(){
        console.log(this.state.restaurantData);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }

        return(
            <div className="MainPage">
                <div className="content">
                    <h2>Restaurant Manager</h2>
                    <hr/>
                    <AddRestaurant adminId={this.state.adminId} handleRestaurantUpdate={this.handleRestaurantUpdate}/>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <Table striped condensed hover>
                        <thead>
                        <tr>
                            <th align="center">S/N</th>
                            <th align="center">Restaurant ID</th>
                            <th align="center"></th>
                            <th align="center">Name</th>
                            <th align="center">Description</th>
                            <th align="center">Contact Details</th>
                            <th align="center">Manager(s)</th>
                            <th align="center">Edit</th>
                            <th align="center">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.restaurantData.map((restaurant, k) =>
                            <tr index={k}>
                                <td align="'center">{k+1}</td>
                                <td align="'center">{restaurant.restaurantId}</td>
                                <td align="center">{this.displayRestaurantImage(k)}</td>
                                <td align="left">{restaurant.restaurantName}</td>
                                <td align="left">{restaurant.restaurantDescription}</td>
                                <td align="left">{restaurant.building},<br/>
                                    {restaurant.street}<br/>
                                    Singapore {restaurant.postalCode}<br/>
                                    Contact: {restaurant.contactNumber}<br/>
                                    Operating Hours:<br/>
                                    {restaurant.operatingHours}</td>
                                <td align="left"><DisplayManagers restaurant={restaurant}/></td>
                                <td align="left"><EditRestaurant restaurant={restaurant} handleRestaurantUpdate={this.handleRestaurantUpdate}/></td>
                                <td align="left"><DeleteRestaurant restaurant={restaurant} handleRestaurantUpdate={this.handleRestaurantUpdate}/></td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );

    }
}

export default AdminMainPage;