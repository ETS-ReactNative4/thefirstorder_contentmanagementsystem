import React, { Component } from "react";
import axios from "axios";
import {Tab, Tabs} from "react-bootstrap";
import "./MainPage.css";
import {Redirect} from "react-router-dom";
import DisplayConversionRate from "./DisplayConversionRates";

class ConversionRate extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            selectedRestaurant: '',
            redirect: false,
            managerId: ""
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.check = this.check.bind(this);
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
        console.log(this.state.pointsToCash);
        console.log(this.state.pointsToCash1);
        console.log(this.state.cashToPoints);
        console.log(this.state.cashToPoints1);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }
        return(
            <div className="MainPage">
                <div className="content">
                    <h2> Conversion Rate </h2>
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>
                            <DisplayConversionRate restaurantId={this.state.restaurantData[i].restaurantId}/>
                        </Tab>)}
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default ConversionRate;