import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "./MainPage.css"
import axios from 'axios';
import {Button, Tab, Tabs, Grid, Row, Col, Table} from 'react-bootstrap';
// import { Card } from 'reactstrap'
import MenuTabs from "./MenuTabs";
import AddMenu from "./AddMenu";
import ActivityLogTable from "./ActivityLogTable";
import Analytics from "./Analytics";
import { Doughnut, Line } from 'react-chartjs-2';
import Header from "./Header";
import TopItem from "./TopItem";
import ToggleButton from 'react-toggle-button';
import ChartistGraph from 'react-chartist';
// import { Card } from "../components/Card/Card.jsx";
import {
    dataPie2,
    dataPie,
    legendPie2,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,

    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from "../variables/Variables.jsx";


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            restaurantData: [],
            managerId: "",
            //JUST IN CASE: JSON.parse(sessionStorage.getItem("userData")).managerAllocations[0].managerAllocationPK.restaurantId,
            selectedRestaurant: "0",
            selectedMenu: "",
            update: false,
            redirect: false,
            graph1Data: [],
            graph1XAxis: "",
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
        console.log(this.state.managerId);
    }

    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    render(){
        console.log("DASHBOARD")
        console.log(this.state)

        if(this.state.redirect){
            return (<Redirect to={'/'}/>)
        }

        return(

            <div className="MainPage">

                <Header title={"Dashboard"}/>

                <div className="content">
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>
                            <Analytics selectedRestaurant={this.state.restaurantData[i].restaurantId}/>
                        </Tab>)}
                    </Tabs>
                </div>
                {/*<Button onClick={this.check}>Check</Button>*/}
            </div>
        );

    }
}

export default Dashboard;

