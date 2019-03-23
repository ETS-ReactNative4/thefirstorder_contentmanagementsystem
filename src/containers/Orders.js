import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import "./MainPage.css";
import {Redirect} from "react-router-dom";
import OrderTable from "./OrderTable";

class Orders extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            selectedRestaurant: '',
            managerId: '',
            redirect: false
        };
        this.check = this.check.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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

    getRestaurants(ev, managerId){
        axios.get('http://makanow.herokuapp.com/api/restaurants/getRestaurantsByManagerId/'+managerId)
            .then(function(response) {
                ev.setState({restaurantData: response.data});
                if(response.data.length !== 0){
                    ev.setState({selectedRestaurant: response.data[0].restaurantId})
                }
            });
    }

    handleSelect(restaurantId) {
        this.setState({selectedRestaurant: restaurantId});
    }

    check(){
        console.log(this.state.selectedRestaurant);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }
        return(
            <div className="MainPage">
                <div className="content">
                    <h2> Orders </h2>
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>
                            <OrderTable selectedRestaurant={this.state.restaurantData[i].restaurantId}/>
                        </Tab>)}
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default Orders;