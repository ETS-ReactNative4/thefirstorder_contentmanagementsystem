import React, { Component } from "react";
import axios from "axios";
import "./MainPage.css";
import {Jumbotron, Grid, Row, Col} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import UpdateConversionRate from "./UpdateConversionRate";

class DisplayConversionRate extends Component {

    constructor(props){
        super(props);
        this.state={
            conversionRateData: [],
            pointsToCash: '',
            pointsToCash1: '1',
            cashToPoints: '',
            cashToPoints1: '1',
            redirect: false,
            managerId: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("userData")){
            this.setState({
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId
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
                managerId: JSON.parse(sessionStorage.getItem("userData")).managerId
            })
            this.getConversionRates(this);
        }
        else{
            this.setState({redirect: true});
        }
    }

    getConversionRates(ev){
        axios.get('http://makanow.herokuapp.com/api/restaurants/'+ this.props.restaurantId  +'/conversion_rates')
            .then(function(response) {
                ev.setState({
                    conversionRateData: response.data,
                    pointsToCash: response.data[0],
                    cashToPoints: response.data[1]
                });
            });
    }

    handleSelect(restaurantId) {
        this.setState({selectedRestaurant: restaurantId});
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
        return(
            <Jumbotron className='button-center'>
                <Grid>
                    <Row>
                        <label>Points to Cash: </label>
                    </Row>
                    <Row>
                        <input
                            required
                            type="number"
                            id="pointsToCash"
                            name="pointsToCash"
                            value={this.state.pointsToCash}
                            onChange={this.handleTextChange}>
                        </input>
                        <text> = </text>
                        <input
                            required
                            type="number"
                            id="pointsToCash1"
                            name="pointsToCash1"
                            value={this.state.pointsToCash1}
                            onChange={this.handleTextChange}>
                        </input>
                        <text> SGD (S$) </text>
                    </Row>
                    <Row>
                        <label>Cash to Points: </label>
                    </Row>
                    <Row>
                        <input
                            required
                            type="number"
                            id="cashToPoints"
                            name="cashToPoints"
                            value={this.state.cashToPoints}
                            onChange={this.handleTextChange}>
                        </input>
                        <text> = </text>
                        <input
                            required
                            type="number"
                            id="cashToPoints1"
                            name="cashToPoints1"
                            value={this.state.cashToPoints1}
                            onChange={this.handleTextChange}>
                        </input>
                        <text> POINT(S) </text>
                    </Row>
                    <Row>
                        <UpdateConversionRate restaurantId={this.props.restaurantId} pointsToCash={this.state.pointsToCash/this.state.pointsToCash1} cashToPoints={this.state.cashToPoints/this.state.cashToPoints1}/>
                    </Row>
                </Grid>
                {/*<div>*/}
                    {/*<label>Points to Cash: </label>*/}
                    {/*<input*/}
                        {/*required*/}
                        {/*type="number"*/}
                        {/*id="pointsToCash"*/}
                        {/*name="pointsToCash"*/}
                        {/*value={this.state.pointsToCash}*/}
                        {/*onChange={this.handleTextChange}>*/}
                    {/*</input>*/}
                    {/*<text> = </text>*/}
                    {/*<input*/}
                        {/*required*/}
                        {/*type="number"*/}
                        {/*id="pointsToCash1"*/}
                        {/*name="pointsToCash1"*/}
                        {/*value={this.state.pointsToCash1}*/}
                        {/*onChange={this.handleTextChange}>*/}
                    {/*</input>*/}
                    {/*<text> SGD (S$) </text>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<label>Cash to Points: </label>*/}
                    {/*<input*/}
                        {/*required*/}
                        {/*type="number"*/}
                        {/*id="cashToPoints"*/}
                        {/*name="cashToPoints"*/}
                        {/*value={this.state.cashToPoints}*/}
                        {/*onChange={this.handleTextChange}>*/}
                    {/*</input>*/}
                    {/*<text> = </text>*/}
                    {/*<input*/}
                        {/*required*/}
                        {/*type="number"*/}
                        {/*id="cashToPoints1"*/}
                        {/*name="cashToPoints1"*/}
                        {/*value={this.state.cashToPoints1}*/}
                        {/*onChange={this.handleTextChange}>*/}
                    {/*</input>*/}
                    {/*<text> POINT(S) </text>*/}
                {/*</div>*/}
                {/*<UpdateConversionRate restaurantId={this.props.restaurantId} pointsToCash={this.state.pointsToCash/this.state.pointsToCash1} cashToPoints={this.state.cashToPoints/this.state.cashToPoints1}/>*/}
                {/*<button onClick={this.check}>Check</button>*/}
            </Jumbotron>
        )
    }
}
export default DisplayConversionRate;