import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import "./MainPage.css";
import {Redirect} from "react-router-dom";
import ActivityLogTable from "./ActivityLogTable";
import UpdateConversionRate from "./UpdateConversionRate";

class ConversionRate extends Component {

    constructor(props){
        super(props);
        this.state={
            conversionRateData: [],
            pointsToCash: '',
            pointsToCash1: '1',
            cashToPoints: '',
            cashToPoints1: '1',
            redirect: false,
            adminId: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                adminId: JSON.parse(sessionStorage.getItem("userData")).adminId
            })
            this.getConversionRates(this);
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
            this.getConversionRates(this);
        }
        else{
            this.setState({redirect: true});
        }
    }

    getConversionRates(ev){
        axios.get('https://makanow.herokuapp.com/api/admins/'+ this.state.adminId  +'/conversion_rates')
            .then(function(response) {
                ev.setState({
                    conversionRateData: response.data,
                    pointsToCash: response.data[0],
                    cashToPoints: response.data[1]
                });
            });
    }

    handleTextChange(e){
        if (e.target.name === "pointsToCash") {
            this.setState({
                pointsToCash: e.target.value
            });
        }
        if (e.target.name === "pointsToCash1") {
            this.setState({
                pointsToCash1: e.target.value
            });
        }
        if (e.target.name === "cashToPoints") {
            this.setState({
                cashToPoints: e.target.value
            });
        }
        if (e.target.name === "cashToPoints1") {
            this.setState({
                cashToPoints1: e.target.value
            });
        }
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
                    <h2>Conversion Rate</h2>
                    <hr/>
                    <div>
                    <label>Points to Cash: </label>
                        <input required type="number" id="pointsToCash" name="pointsToCash"
                                                          value={this.state.pointsToCash}
                                                          onChange={this.handleTextChange}></input>
                        <text> = </text>
                        <input required type="number" id="pointsToCash1" name="pointsToCash1"
                               value={this.state.pointsToCash1}
                               onChange={this.handleTextChange}></input>
                        <text> SGD (S$) </text>
                    </div>
                    <div>
                    <label>Cash to Points: </label>
                        <input required type="number" id="cashToPoints" name="cashToPoints"
                                                          value={this.state.cashToPoints}
                                                          onChange={this.handleTextChange}></input>
                        <text> = </text>
                        <input required type="number" id="cashToPoints1" name="cashToPoints1"
                               value={this.state.cashToPoints1}
                               onChange={this.handleTextChange}></input>
                        <text> POINT(S) </text>
                    </div>
                    <UpdateConversionRate adminId={this.state.adminId} pointsToCash={this.state.pointsToCash/this.state.pointsToCash1} cashToPoints={this.state.cashToPoints/this.state.cashToPoints1}/>
                    {/*<button onClick={this.check}>Check</button>*/}
                </div>
            </div>
        )
    }
}
export default ConversionRate;