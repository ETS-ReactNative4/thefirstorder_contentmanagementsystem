import React, { Component } from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import Modal from "react-modal";


class ChangeMenuName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            messageFromServer: '',
            newMenuName: '',
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
        this.changeMenuName = this.changeMenuName.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.check = this.check.bind(this);
    }

    componentWillMount(){
        // this.props.handleUpdateMenuTab()
    }

    componentDidMount(){
        this.props.handleUpdateMenuTab()
    }

    openModal() {
        console.log(this.state);
        this.setState({
            modalIsOpen: true,
        });
    }

    closeModal(){
        this.props.handleUpdateMenuTab();
        this.setState({
            modalIsOpen: false,
            messageFromServer: '',
            newMenuName: '',
        });
    }

    closeModal1(){
        this.props.handleUpdateMenuTab();
        this.setState({
            modalIsOpen: false,
            messageFromServer: '',
            newMenuName: '',
        });
        window.location.reload();
    }

    handleTextChange(e){
        if (e.target.name === "menuName") {
            this.setState({
                newMenuName: e.target.value
            });
        }
    }

    changeMenuName(e){
        console.log(this.props);
        axios.post('http://makanow.herokuapp.com/api/menus/changeMenuName/'+this.props.manager+'/'+this.props.restaurant+'/'+this.props.selectedMenu.menuId+'/'+this.state.newMenuName).then(function(response) {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    onClick(ev){
        this.changeMenuName(this);
        this.props.handleUpdateMenuTab();
    }

    check() {
        console.log(this.props.restaurant);
    }

    render() {

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    <Button className="pull-right" bsStyle="warning" bsSize="medium" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-edit"></span> Change Menu Name</Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Change Menu Name"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}>
                            <span className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center">
                                <h3><b>Change Menu Name?</b></h3>
                            </p>
                            <hr />
                            <label>New Menu Name: </label><input required type="text" id="menuName" name="menuName"
                                                                 onChange={this.handleTextChange}></input>
                            <p></p>
                        </fieldset>
                        <hr />
                        <div className='button-center'>
                            <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}><span
                                className="glyphicon glyphicon-remove"></span></Button>
                            {" "}
                            <Button bsStyle="success" bsSize="large" onClick={this.onClick}><span
                                className="glyphicon glyphicon-ok"></span></Button>
                        </div>
                    </Modal>
                    {/*<button onClick={this.check}>Check</button>*/}
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <Button className="pull-right" bsStyle="warning" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-edit"></span> Change Menu Name </Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Change Menu Name"
                            className="Modal">
                            <div className='button-center'>
                                <h3>{this.state.messageFromServer}</h3>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal1}>Close</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}
export default ChangeMenuName;