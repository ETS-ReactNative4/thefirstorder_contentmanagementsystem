import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import EditFoodPrice from "./EditFoodPrice";
import DeleteFoodPrice from "./DeleteFoodPrice";

class ManagerNameId extends Component {

    constructor(props){
        super(props);
        this.state = {
            managerName: ""
        };
    }

    componentWillMount() {
        this.getManager(this);
    }

    componentDidMount() {
        this.getManager(this);
    }

    getManager(ev){
        axios.post('http://makanow.herokuapp.com/api/managers/'+this.props.managerId)
            .then(function(response) {
                ev.setState({
                    managerName: response.data});
            });
    }

    render(){
        return(
            <td align="left">{this.state.managerName}, {this.props.managerId}</td>
        )
    }

}
export default ManagerNameId;