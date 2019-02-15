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
            cashToPoints: '',
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
        if (e.target.name === "cashToPoints") {
            this.setState({
                cashToPoints: e.target.value
            });
        }
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
                <h3><b>Conversion Rate</b></h3>
                <hr/>
                <p>
                <label>Points to Cash: </label><input required type="number" id="pointsToCash" name="pointsToCash"
                                                      value={this.state.pointsToCash}
                                                      onChange={this.handleTextChange}></input><text> = S$1 </text>
                </p>
                <p>
                <label>Cash to Points: </label><input required type="number" id="cashToPoints" name="cashToPoints"
                                                      value={this.state.cashToPoints}
                                                      onChange={this.handleTextChange}></input><text> = 1 Point </text>
                </p>
                <UpdateConversionRate adminId={this.state.adminId} pointsToCash={this.state.pointsToCash} cashToPoints={this.state.cashToPoints}/>
            </div>
        )
    }
}
export default ConversionRate;