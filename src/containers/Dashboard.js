import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "./MainPage.css"
import axios from 'axios';
import {Button, Tab, Tabs} from 'react-bootstrap';
import MenuTabs from "./MenuTabs";
import AddMenu from "./AddMenu";
import ActivityLogTable from "./ActivityLogTable";
import Analytics from "./Analytics";


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            managerId: "",
            //JUST IN CASE: JSON.parse(sessionStorage.getItem("userData")).managerAllocations[0].managerAllocationPK.restaurantId,
            selectedRestaurant: "",
            selectedMenu: "",
            update: false,
            redirect: false
        };
        this.check = this.check.bind(this);
        this.getRestaurants = this.getRestaurants.bind(this);
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
        axios.get('https://makanow.herokuapp.com/api/restaurants/getRestaurantsByManagerId/'+managerId)
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
        console.log(JSON.parse(sessionStorage.getItem("userData")).managerId);
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }

        return(

            <div className="MainPage">
                <div className="content">
                    <h2>Dashboard</h2>
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>
                            <Analytics selectedRestaurant={this.state.restaurantData[i].restaurantId}/>
                        </Tab>)}
                    </Tabs>
                </div>
            </div>
        );

    }
}

export default Dashboard;