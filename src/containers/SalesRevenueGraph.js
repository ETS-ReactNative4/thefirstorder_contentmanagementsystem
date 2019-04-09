import React, { Component } from "react";
import {Line} from "react-chartjs-2";
import "./MainPage.css"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class SalesRevenueGraph extends Component {

    constructor(props){
        super(props);
        this.getTimePeriod = this.getTimePeriod.bind(this);
        this.state={
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    getTimePeriod(){
        var moment = require('moment');
        console.log(this.props.date);
        if (this.props.isMonthly){
            return moment(this.props.date).format("MMMM")
        }else{
            return moment(this.props.date).format("dddd")
        }
    }

    check(){
        console.log(this.props.date);
    }

    render(){
        var colorCodes = [
            'rgba(230, 25, 75, 0.2)',
            'rgba(60, 180, 75, 0.2)',
            'rgba(0, 130, 200, 0.2)',
            'rgba(245, 130, 48, 0.2)',
            'rgba(145, 30, 180, 0.2)',
            'rgba(70, 240, 240, 0.2)',
            'rgba(240, 50, 230, 0.2)',
            'rgba(210, 245, 60, 0.2)',
            'rgba(250, 190, 190, 0.2)',
            'rgba(0, 128, 128, 0.2)',

            'rgba(230, 190, 255, 0.2)',
            'rgba(170, 110, 40, 0.2)',
            'rgba(53, 106, 50, 0.2)',
            'rgba(105, 5, 125, 0.2)',
            'rgba(19, 154, 157, 0.2)',
            'rgba(95, 209, 193, 0.2)',
            'rgba(70, 50, 127, 0.2)',
            'rgba(167, 196, 3, 0.2)',
            'rgba(5, 63, 243, 0.2)',
            'rgba(170, 167, 234, 0.2)',

            'rgba( 129, 193, 138, 0.2)',
            'rgba( 129, 193, 138, 0.2)',
            'rgba(230, 190, 255, 0.2)',
            'rgba(170, 110, 40, 0.2)',
            'rgba(210, 245, 60, 0.2)',
            'rgba(250, 190, 190, 0.2)',
            'rgba(19, 154, 157, 0.2)',
            'rgba(95, 209, 193, 0.2)',
            'rgba(245, 130, 48, 0.2)',
            'rgba(145, 30, 180, 0.2)',
            'rgba(70, 240, 240, 0.2)',

        ]
        return(
            <Line
                id="saleRevenue"
                data={{
                    labels: this.props.labels,
                    datasets: [{
                        fill: true,
                        lineTension: 0,
                        showLines: true,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        label: 'Revenue (SGD $)',
                        data: this.props.data,
                        pointBackgroundColor: colorCodes,
                        borderColor: colorCodes,
                        borderWidth: 1
                    }]
                }}
                options={{
                    scales:{
                        xAxes:[{
                            scaleLabel:{
                                display:true,
                                labelString:this.getTimePeriod()
                            }
                        }],
                        yAxes:[{
                            scaleLabel:{
                                display:true,
                                labelString:"SGD $"
                            }
                        }]
                    }
                }}
            />
        )
    }

}