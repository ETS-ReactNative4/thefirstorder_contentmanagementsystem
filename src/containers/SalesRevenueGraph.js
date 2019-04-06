import React, { Component } from "react";
import {Line} from "react-chartjs-2";
import "./MainPage.css"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class SalesRevenueGraph extends Component {

    constructor(props){
        super(props);
        this.state={
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render(){
        return(
            <Line
                id="saleRevenue"
                data={{
                    labels: this.props.labels,
                    datasets: [{
                        fill: 'false',
                        lineTension: 0,
                        showLines: 'true',
                        pointRadius: 5,
                        pointHitRadius: 10,
                        label: 'Revenue ($SGD)',
                        data: this.props.data,
                        pointBackgroundColor: [
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
                        ],
                        borderColor: [
                            'rgba(230, 25, 75, 1)',
                            'rgba(60, 180, 75, 1)',
                            'rgba(0, 130, 200, 1)',
                            'rgba(245, 130, 48, 1)',
                            'rgba(145, 30, 180, 1)',
                            'rgba(70, 240, 240, 1)',
                            'rgba(240, 50, 230, 1)',
                            'rgba(210, 245, 60, 1)',
                            'rgba(250, 190, 190, 1)',
                            'rgba(0, 128, 128, 1)',
                            'rgba(230, 190, 255, 1)',
                            'rgba(170, 110, 40, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
            />

        )
    }

}