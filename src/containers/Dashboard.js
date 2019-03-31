import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import "./MainPage.css"
// import "./css/light-bootstrap-dashboard.css";
import axios from 'axios';
import {Button, Tab, Tabs, Grid, Row, Col} from 'react-bootstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container } from 'reactstrap'
import MenuTabs from "./MenuTabs";
import AddMenu from "./AddMenu";
import ActivityLogTable from "./ActivityLogTable";
import Analytics from "./Analytics";
import ChartistGraph from 'react-chartist';
import { Card } from "../components/Card/Card.jsx";
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
// import "./css/css/all.css";
import { Doughnut, Line, Bar } from 'react-chartjs-2';


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
                <div className="content">
                    <h2>Dashboard</h2>
                    <Tabs defaultActiveKey={0} onSelect={index => {this.handleSelect(index)}}>
                        {this.state.restaurantData.map((restaurant, i) => <Tab eventKey={i} title={restaurant.restaurantName}>
                            <Analytics selectedRestaurant={this.state.restaurantData[i].restaurantId}/>
                        </Tab>)}
                    </Tabs>
                    <div className="main_content">
                        <Grid fluid>
                            <Row>
                                <Col md={6}>
                                    <Line
                                        id="saleRevenue"
                                        data={{
                                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', "Nov", 'Dec'],
                                            datasets: [{
                                                label: '# of Votes',
                                                data: [12, 19, 3, 5, 2, 3],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                    'rgba(255, 206, 86, 1)',
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(153, 102, 255, 1)',
                                                    'rgba(255, 159, 64, 1)'
                                                ],
                                                borderWidth: 1
                                            }]
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Col md={7}>
                                        <Doughnut
                                            id="foodItems"
                                            data={{
                                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                                datasets: [{
                                                    label: '# of Votes',
                                                    data: [12, 19, 3, 5, 2, 3],
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                        'rgba(255, 206, 86, 0.2)',
                                                        'rgba(75, 192, 192, 0.2)',
                                                        'rgba(153, 102, 255, 0.2)',
                                                        'rgba(255, 159, 64, 0.2)'
                                                    ],
                                                    borderColor: [
                                                        'rgba(255, 99, 132, 1)',
                                                        'rgba(54, 162, 235, 1)',
                                                        'rgba(255, 206, 86, 1)',
                                                        'rgba(75, 192, 192, 1)',
                                                        'rgba(153, 102, 255, 1)',
                                                        'rgba(255, 159, 64, 1)'
                                                    ],
                                                    borderWidth: 1
                                                }]
                                            }}
                                            legend={{
                                                display: false
                                            }}
                                        />
                                    </Col>
                                    <Col md={5}>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </Grid>
                    </div>
                </div>
                {/*<Button onClick={this.check}>Check</Button>*/}
            </div>
        );

    }
}

export default Dashboard;

