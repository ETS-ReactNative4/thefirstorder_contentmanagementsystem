import React, {Component} from "react";
import axios from "axios";
import {Col, Grid, Row, Table} from "react-bootstrap";
import TopItem from "./TopItem";
import "./MainPage.css"
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import SaleRevenueGraph from "./SalesRevenueGraph";
import FoodItemGraph from "./FoodItemGraph";

class Analytics extends Component {

    constructor(props){
        super(props);
        this.state={
            date: "",
            dateTest: "",
            focused: false,
            isMonthly: true,
            graph1Data: [],
            graph1XAxis: [],
            graph2Data: [],
            graph2Label: [],
            transactions: [],
            totalItems: 0,
            totalRevenue: "",
            revenueDifference:"",
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
        this.handleDate = this.handleDate.bind(this);
        this.getMonthlyTotalRevenue = this.getMonthlyTotalRevenue.bind(this);
        this.getDailyTotalRevenue = this.getDailyTotalRevenue.bind(this);
        this.getMonthlyDifference = this.getMonthlyDifference.bind(this);
        this.getDailyDifference = this.getDailyDifference.bind(this);
        this.apiFunctions = this.apiFunctions.bind(this);
        this.getRevenuePeriod = this.getRevenuePeriod.bind(this);
        this.getRevenueDifference = this.getRevenueDifference.bind(this);

    }

    componentWillMount() {
    }

    componentDidMount() {
        if (this.state.isMonthly){
            this.getMonthlyRevenue(this);
            this.getMonthlyTransactions(this);
            this.getMonthlyFoodItems(this);
            this.getMonthlyTotalItems(this);
            this.getMonthlyTotalRevenue(this);
            this.getMonthlyDifference(this);
        }else{
            this.getDailyRevenue(this);
            this.getDailyTransactions(this);
            this.getDailyFoodItems(this);
            this.getDailyTotalItems(this);
            this.getDailyTotalRevenue(this);
            this.getDailyDifference(this);
        }
    }

    componentDidUpdate(){
    }

    apiFunctions(){
        if (this.state.isMonthly){
            console.log(">>>>> Date: Monthly <<<<<");
            this.getMonthlyRevenue(this);
            this.getMonthlyTransactions(this);
            this.getMonthlyFoodItems(this);
            this.getMonthlyTotalItems(this);
            this.getMonthlyTotalRevenue(this);
            this.getMonthlyDifference(this);
        }else{
            console.log(">>>>> Date: Daily <<<<<");
            this.getDailyRevenue(this);
            this.getDailyTransactions(this);
            this.getDailyFoodItems(this);
            this.getDailyTotalItems(this);
            this.getDailyTotalRevenue(this);
            this.getDailyDifference(this);
        }
    }

    handleDate(newDate){
        console.log(newDate);
        this.setState({date : newDate}, () => this.apiFunctions());

    }

    handleChecked(e) {
        if (e.target.checked){
            console.log(">>>>> Boolean: Monthly <<<<<")
            this.setState({isMonthly: true});
            this.getMonthlyRevenue(this);
            this.getMonthlyTransactions(this);
            this.getMonthlyFoodItems(this);
            this.getMonthlyTotalItems(this);
            this.getMonthlyTotalRevenue(this);
            this.getMonthlyDifference(this);
        }else{
            console.log(">>>>> Boolean: Daily <<<<<")
            this.setState({isMonthly: false});
            this.getDailyRevenue(this);
            this.getDailyTransactions(this);
            this.getDailyFoodItems(this);
            this.getDailyTotalItems(this);
            this.getDailyTotalRevenue(this);
            this.getDailyDifference(this);
        }
    }

    generateDailyXAxis(number){
        var result = []
        for(var i = 0; i < number; i++){
            result.push(i)
        }
        this.setState({graph1XAxis: result});
    }

    generateMonthlyXAxis(number){
        var result = []
        for(var i = 1; i <= number; i++){
            result.push(i)
        }
        this.setState({graph1XAxis: result});
    }

    getDate(){
        var moment = require('moment');
        if (this.state.date === ""){
            return moment().format("YYYY-MM-DD")
        }else{
            return moment(this.state.date).format("YYYY-MM-DD")
        }
    }

    getMonthlyRevenue(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyRevenueBreakdownByDays/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph1Data: Object.values(response.data)});
                ev.generateMonthlyXAxis(Object.values(response.data).length);
            });
    }

    getDailyRevenue(ev){

        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyRevenueBreakdownByHour/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph1Data: Object.values(response.data)});
                ev.generateDailyXAxis(Object.values(response.data).length);
            });
    }

    getMonthlyTransactions(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyTransactions/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({transactions: response.data});
            });
    }

    getDailyTransactions(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyTransactions/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({transactions: response.data});
            });
    }

    getMonthlyFoodItems(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyRevenueBreakdownByFoodItem/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph2Label: Object.keys(response.data).slice(0,3)});
                ev.setState({graph2Data: Object.values(response.data).slice(0,3)});
            });
    }

    getDailyFoodItems(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyRevenueBreakdownByFoodItem/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({graph2Label: Object.keys(response.data).slice(0,3)});
                ev.setState({graph2Data: Object.values(response.data).slice(0,3)});
            });
    }

    getMonthlyTotalItems(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyTotalOfFoodItemsSold/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({totalItems: response.data});
            });
    }

    getDailyTotalItems(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyTotalOfFoodItemsSold/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({totalItems: response.data});
            });
    }

    getMonthlyTotalRevenue(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getMonthlyRevenue/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({totalRevenue: response.data});
            });

    }

    getDailyTotalRevenue(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getDailyRevenue/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({totalRevenue: response.data});
            });

    }

    getMonthlyDifference(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getPercentageMonthlyRevenueCompareToPreviousMonth/'+this.props.selectedRestaurant+'/'+this.getDate().substring(0, 7);

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({revenueDifference: response.data});
            });

    }

    getDailyDifference(ev){
        var site = 'http://makanow.herokuapp.com/api/analytics/getPercentageDailyRevenueCompareToPreviousDate/'+this.props.selectedRestaurant+'/'+this.getDate();

        // console.log(site);

        axios.get(site)
            .then(response => {
                // console.log("success");
                // console.log(response.data)

                ev.setState({revenueDifference: response.data});
            });

    }

    revenueDifference(){
        if (this.state.revenueDifference > 0) {
            return (
                <span className="amt">{this.state.revenueDifference}% <i className="fas fa-long-arrow-alt-up green"></i></span>
            )
        }else if(this.state.revenueDifference < 0){
            return(
                <span className="amt">{this.state.revenueDifference}% <i className="fas fa-long-arrow-alt-down red"></i></span>
            )
        }else{
            return(
                <span className="amt">{this.state.revenueDifference}% <i className="fas fa-minus"></i></span>
            )
        }
    }

    getRevenuePeriod(){
        var moment = require('moment');
        if (this.state.isMonthly){
            return "for " + moment(this.getDate()).format("MMMM YY")
        }else{
            return "for " + moment(this.getDate()).format("D MMMM YY")
        }
    }

    getRevenueDifference(){
        var moment = require('moment');
        if (this.state.isMonthly){
            return "from " + moment(this.getDate()).subtract(1, 'month').format("MMMM YY")
        }else{
            return "from " + moment(this.getDate()).subtract(1, 'day').format("D MMMM YY")
        }
    }

    formatDatetime(datetime){
        var moment = require('moment');
        return moment(datetime).format("YYYY-MM-DD, HH:mm:ss")
    }

    check(){
        console.log(this.state);
    }



    render(){
        console.log("ANALYTICS")
        // console.log(this.state)
        // console.log(this.props)
        return(
            <div className="main_content">
                <Grid fluid>
                    <Row>
                        {/*<Button onClick={this.getMonthlyFoodItems}>Check Monthly</Button>*/}
                        {/*<Button onClick={this.getDailyTransactions}>Check Daily</Button>*/}
                        {/*<Button onClick={this.check}>Check</Button>*/}
                        {/**/}
                        <Col md={6} className="float_left">
                            <div className="items">
                                <div>
                                    <div>
                                        <span className="title">Total revenue: </span>
                                        <span className="revenue">${this.state.totalRevenue}</span>
                                        <span className="difference">{this.getRevenuePeriod()}</span>
                                    </div>
                                    <div>
                                        <span className="title">Difference: </span>
                                        {this.revenueDifference()}
                                        <span className="difference">{this.getRevenueDifference()}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="right-graph">
                                <TopItem ranking={1} food_name={this.state.graph2Label[0]} revenue={this.state.graph2Data[0]}/>
                                <TopItem ranking={2} food_name={this.state.graph2Label[1]} revenue={this.state.graph2Data[1]}/>
                                <TopItem ranking={3} food_name={this.state.graph2Label[2]} revenue={this.state.graph2Data[2]}/>
                            </div>
                        </Col>
                        <div className="float_right">
                            <div>
                                <SingleDatePicker
                                    date={this.state.date} // momentPropTypes.momentObj or null
                                    onDateChange={date => this.handleDate(date)} // PropTypes.func.isRequired
                                    focused={this.state.focused} // PropTypes.bool
                                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                    id="datePicker" // PropTypes.string.isRequired,
                                    placeholder="       Today"
                                    small={true}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                    showDefaultInputIcon
                                    inputIconPosition="after"
                                    // withPortal={true}
                                />
                            </div>
                            <div className="selector">

                                <div className="label_left">Daily</div>
                                <div>
                                    <label className="switch">
                                        <input type="checkbox" onChange={this.handleChecked} checked={this.state.isMonthly}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <div className="label_right">Monthly</div>
                            </div>
                        </div>


                    </Row>
                    <Row>
                        <Col md={7}>
                            <div className="items">
                                <h3 className="header" align="center">Sales Revenue</h3>
                                <SaleRevenueGraph data={this.state.graph1Data} labels={this.state.graph1XAxis} isMonthly={this.state.isMonthly} date={this.getDate()}/>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="items">
                                <h3 className="header" align="center">Food Items</h3>
                                    <FoodItemGraph data={this.state.graph2Data} labels={this.state.graph2Label}/>
                                <div className="left-graph">
                                    <div className="description">
                                        <span id="number">{this.state.totalItems}</span>
                                        <span> number of items sold</span>
                                    </div>
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
                                    <td>{this.formatDatetime(items.transactionDateTime)}</td>
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