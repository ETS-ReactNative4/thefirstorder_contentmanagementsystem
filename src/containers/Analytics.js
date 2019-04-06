import React, { Component } from "react";
import axios from "axios";
import {Button, Col, Grid, Row, Tab, Table, Tabs} from "react-bootstrap";
import ManagerNameId from "./ManagerNameId";
import {Doughnut, Line} from "react-chartjs-2";
import TopItem from "./TopItem";
import "./MainPage.css"
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import SaleRevenueGraph from "./SalesRevenueGraph";
import FoodItemGraph from "./FoodItemGraph";
import DisplayFoodCustomisation from "./DisplayFoodCustomisation";
import EditFoodPrice from "./EditFoodPrice";
import DeleteFoodPrice from "./DeleteFoodPrice";

class Analytics extends Component {

    constructor(props){
        super(props);
        this.state={
            date: "",
            focused: false,
            isMonthly: true,
            graph1Data: [],
            graph1XAxis: [],
            graph2Data: [],
            graph2Label: [],
            transactions: [],
            totalItems: 0,
        };
        this.check = this.check.bind(this);
        this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox
        this.getMonthlyRevenue = this.getMonthlyRevenue.bind(this);
        this.getDailyRevenue = this.getDailyRevenue.bind(this);
        this.getMonthlyTransactions = this.getMonthlyTransactions.bind(this);
        this.getDailyTransactions = this.getDailyTransactions.bind(this);
        this.getMonthlyFoodItems = this.getMonthlyFoodItems.bind(this);
        this.getDailyFoodItems = this.getDailyFoodItems.bind(this);
        this.getMonthlyTotalItems = this.getMonthlyTotalItems.bind(this);
        this.getDailyTotalItems = this.getDailyTotalItems.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (this.state.isMonthly){
            this.getMonthlyRevenue(this);
            this.getMonthlyTransactions(this);
            this.getMonthlyFoodItems(this);
            this.getMonthlyTotalItems(this);
        }else{
            this.getDailyRevenue(this);
            this.getDailyTransactions(this);
            this.getDailyFoodItems(this);
            this.getDailyTotalItems(this);
        }
    }

    componentDidUpdate(){
    }


    handleChecked(e) {
        if (e.target.checked){
            this.setState({isMonthly: true});
            this.getMonthlyRevenue(this);
            this.getMonthlyTransactions();
            this.getMonthlyFoodItems();
            this.getMonthlyTotalItems();
        }else{
            this.setState({isMonthly: false});
            this.getDailyRevenue(this);
            this.getDailyTransactions();
            this.getDailyFoodItems();
            this.getDailyTotalItems();
        }
    }


    getMonthlyRevenue(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyRevenueBreakdownByDays/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph1Data: Object.values(response.data)});
                ev.generateXAxis(Object.values(response.data).length);
            });
    }

    getDailyRevenue(ev){

        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyRevenueBreakdownByHour/'+this.props.selectedRestaurant+'/'+this.getDate();

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph1Data: Object.values(response.data)});
                ev.generateXAxis(Object.values(response.data).length);
            });
    }

    generateXAxis(number){
        var result = []
        for(var i = 1; i <= number; i++){
            result.push(i)
        }
        this.setState({graph1XAxis: result});
    }

    getDate(){
        var moment = require('moment');
        if (this.state.date === ""){
            return  moment().format("YYYY-MM-DD")
        }else{
            return moment(this.state.date).format("YYYY-MM-DD")
        }
    }

    getMonthlyTransactions(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyTransactions/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({transactions: response.data});
            });
    }

    getDailyTransactions(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyTransactions/'+this.props.selectedRestaurant+'/'+this.getDate();

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({transactions: response.data});
            });
    }

    getMonthlyFoodItems(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyRevenueBreakdownByFoodItem/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({graph2Label: Object.keys(response.data).slice(0,3)});
                this.setState({graph2Data: Object.values(response.data).slice(0,3)});
            });
    }

    getDailyFoodItems(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyRevenueBreakdownByFoodItem/'+this.props.selectedRestaurant+'/'+this.getDate();

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({graph2Label: Object.keys(response.data).slice(0,3)});
                this.setState({graph2Data: Object.values(response.data).slice(0,3)});
            });
    }

    getMonthlyTotalItems(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyTotalOfFoodItemsSold/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({totalItems: response.data});
            });
    }

    getDailyTotalItems(){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyTotalOfFoodItemsSold/'+this.props.selectedRestaurant+'/'+this.getDate();

        console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                console.log(response.data)

                this.setState({totalItems: response.data});
            });
    }




    check(){
        console.log(this.state);
    }



    render(){
        console.log("ANALYTICS")
        console.log(this.state)
        // console.log(this.props)
        return(
            <div className="main_content">
                <Grid fluid>
                    <Row>
                        {/*<Button onClick={this.getMonthlyFoodItems}>Check Monthly</Button>*/}
                        {/*<Button onClick={this.getDailyTransactions}>Check Daily</Button>*/}
                        {/*<Button onClick={this.check}>Check</Button>*/}

                        <div className="float_right">

                            <div>
                                <SingleDatePicker
                                    date={this.state.date} // momentPropTypes.momentObj or null
                                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                    focused={this.state.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                    id="datePicker" // PropTypes.string.isRequired,
                                    placeholder="Select Date"
                                    small={true}
                                    withPortal={true}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                />
                            </div>

                            <span>Daily</span>

                            <label className="switch">
                                <input type="checkbox" onChange={this.handleChecked} checked={this.state.isMonthly}/>
                                <span className="slider round"></span>
                            </label>

                            <span>Monthly</span>

                        </div>


                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="items">
                                <h3 align="center">Sales Revenue</h3>
                                <SaleRevenueGraph data={this.state.graph1Data} labels={this.state.graph1XAxis}/>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="items">
                                <h3 align="center">Food Items</h3>
                                <div className="left-graph">
                                    <FoodItemGraph data={this.state.graph2Data} labels={this.state.graph2Label}/>
                                    <div className="description">
                                        <span id="number">{this.state.totalItems}</span>
                                        <span> number of items sold</span>
                                    </div>
                                </div>

                                <div className="right-graph">
                                    <TopItem ranking={1} food_name={this.state.graph2Label[0]} revenue={this.state.graph2Data[0]}/>
                                    <TopItem ranking={2} food_name={this.state.graph2Label[1]} revenue={this.state.graph2Data[1]}/>
                                    <TopItem ranking={3} food_name={this.state.graph2Label[2]} revenue={this.state.graph2Data[2]}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            <h3>Transactions</h3>
                        </div>
                        <Table condensed responsive hover>
                            <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Seating Table</th>
                                <th>Total Amount</th>
                                <th>Payment Mode</th>
                                <th>Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.transactions.map((items, k) =>
                                <tr className="transactionTableItem" index={k} key={k}>
                                    <td>{items.orderId}</td>
                                    <td>{items.seatingTable}</td>
                                    <td>{items.totalAmount}</td>
                                    <td>{items.modeOfPayment}</td>
                                    <td>{items.transactionDateTime}</td>
                                </tr>
                            )
                            }
                            </tbody>
                        </Table>
                    </Row>
                </Grid>
            </div>
        )
    }

}
export default Analytics;