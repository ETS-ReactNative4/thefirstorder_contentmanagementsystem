import React, { Component } from "react";
import {Image} from 'react-bootstrap'
import "./css/style.css";
import activitylog from './images/activitylog.png';
import first from './images/006-first.png';
import second from './images/001-second.png';
import third from './images/004-third-1.png';
import first2 from './images/005-best.png';
import second2 from './images/002-second-1.png';
import third2 from './images/003-third.png';

class TopItem extends Component {
    constructor(props){
        super(props);
    }

    selectRanking(rank){
        if (rank === 1) {
            return first2;
        }else if(rank === 2){
            return second2;
        }else{
            return third2;
        }
    }

    render(){
        var amt = 0;
        var fName = "N.A";
        if(this.props.revenue != 0){
            amt = this.props.revenue;
            fName = this.props.food_name;
        }
        if(this.props.ranking === 1){
            return(
                <div className="TopItem First">
                <span className="rank">
                    <img src={this.selectRanking(this.props.ranking)} height="35" width="35"/>
                </span>

                    <span className="name">{fName}</span>

                    <p>${amt}</p>
                </div>
            )
        }else if(this.props.ranking === 2){
            return(
                <div className="TopItem Second">
                <span className="rank">
                    <img src={this.selectRanking(this.props.ranking)} height="35" width="35"/>
                </span>

                    <span className="name">{fName}</span>

                    <p>${amt}</p>
                </div>
            )
        }else{
            return(
                <div className="TopItem Third">
                <span className="rank">
                    <img src={this.selectRanking(this.props.ranking)} height="35" width="35"/>
                </span>

                    <span className="name">{fName}</span>

                    <p>${amt}</p>
                </div>
            )
        }
    }
}

export default TopItem;