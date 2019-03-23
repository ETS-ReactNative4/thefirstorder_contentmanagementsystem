import React, { Component } from "react";
import axios from "axios";
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import ManagerNameId from "./ManagerNameId";

class ActivityLogTable extends Component {

    constructor(props){
        super(props);
        this.state={
            activityLogData: [],
            managerName: ''
        };
        this.check = this.check.bind(this);
        this.getActivityLogs = this.getActivityLogs.bind(this);
    }

    componentWillMount() {
        this.getActivityLogs(this);
    }

    componentDidMount() {
        this.getActivityLogs(this);
    }

    getActivityLogs(ev){
        axios.post('http://makanow.herokuapp.com/api/activityLogs/'+this.props.selectedRestaurant)
            .then(function(response) {
                ev.setState({activityLogData: response.data});
            });
    }

    check(){
            console.log(this.state.activityLogData);
    }

    render(){
        return(
            <div>
                <Table striped condensed hover>
                    <thead>
                    <tr>
                        <th align="center">S/N</th>
                        <th align="center">Activity Log ID:</th>
                        <th align="center">Change Description:</th>
                        <th align="center">Changed By (Name, Manager ID):</th>
                        <th align="center">Date & Time of Change:</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.activityLogData.map((activityLog, k) =>
                            <tr index={k}>
                                <td align="left">{k+1}</td>
                                <td align="left">{activityLog.activityLogId}</td>
                                <td align="left">{activityLog.description}</td>
                                <ManagerNameId managerId={activityLog.managerId}/>
                                <td align="left">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(activityLog.changeTimeStamp))}</td>
                            </tr>
                        )
                        }
                </tbody>
                </Table>
            </div>
        )
    }

}
export default ActivityLogTable;