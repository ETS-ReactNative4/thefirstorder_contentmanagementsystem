import React, { Component } from "react";
import {Doughnut} from "react-chartjs-2";
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
            <Doughnut
                id="foodItems"
                data={{
                    labels: this.props.labels,
                    datasets: [{
                        label: '# of Votes',
                        data: this.props.data,
                        backgroundColor: [
                            'rgba(230, 25, 75, 0.2)',
                            'rgba(60, 180, 75, 0.2)',
                            'rgba(0, 130, 200, 0.2)',
                        ],
                        borderColor: [
                            'rgba(230, 25, 75, 0.2)',
                            'rgba(60, 180, 75, 0.2)',
                            'rgba(0, 130, 200, 0.2)',
                        ],
                        borderWidth: 1
                    }]
                }}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: false,
                        text: 'Best Sellers',
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                    }
                }}
                legend={{
                    display: true,
                    position: "top",
                }}

            />

        )
    }

}