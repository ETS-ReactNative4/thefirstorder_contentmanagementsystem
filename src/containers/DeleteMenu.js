import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';

class DeleteMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: this.props.selectedMenu.menuId,
            messageFromServer: '',
            modalIsOpen: false
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
    }

    componentWillMount(){
        // this.props.handleDeleteMenuUpdate();
    }

    componentDidMount(){
        // this.props.handleDeleteMenuUpdate();
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(){
        // this.props.handleDeleteMenuUpdate();
        this.setState({
            modalIsOpen: false,
            messageFromServer: ''
        });
    }

    closeModal1(){
        // this.props.handleDeleteMenuUpdate();
        this.setState({
            modalIsOpen: false,
            messageFromServer: ''
        });
        window.location.reload();
    }

    onClick(ev){
        this.deleteMenu(this);
        // this.props.handleDeleteMenuUpdate();
    }


    deleteMenu(ev){
        axios.delete('http://makanow.herokuapp.com/api/menus',{params: {menuId: ev.props.selectedMenu.menuId, restaurantId: ev.props.restaurant, managerId:ev.props.manager}}).then(function(response) {
            ev.setState({
                messageFromServer: response.data
            });
        });
    }

    check(){
        console.log(this.props.selectedMenu);
    }

    render(){

        if(this.state.messageFromServer === '') {
            return (
                <div>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <Button className="pull-right" bsStyle="danger" bsSize="medium" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-remove"></span> Delete "{this.props.selectedMenu.menuName}"
                    </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Delete Menu"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center"><b>Delete Menu "{this.props.selectedMenu.menuName}" and all of its food items?</b>
                            </p>
                        </fieldset>
                        <div className='button-center'>
                            <Button bsStyle="danger" bsSize="large" onClick={this.closeModal}><span
                                className="glyphicon glyphicon-remove"></span></Button>
                            {" "}
                            <Button bsStyle="success" bsSize="large" onClick={this.onClick}><span
                                className="glyphicon glyphicon-ok"></span></Button>
                        </div>
                    </Modal>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <Button className="pull-right" bsStyle="danger" bsSize="small" onClick={this.openModal}><span
                            className="glyphicon glyphicon-plus"></span> Add Menu</Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Menu"
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
export default DeleteMenu;