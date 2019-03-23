import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';
import axios, { post } from 'axios';
import ReactFileReader from 'react-file-reader';

class ImportCSV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageFromServer: '',
            modalIsOpen: false,
            selectedFile: "No File Selected",
            csvData: ''
        };
        this.check = this.check.bind(this);
        this.onClick = this.onClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // this.handleSelectedFile = this.handleSelectedFile.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(){
        this.setState({
            modalIsOpen: false,
            messageFromServer: '',
            selectedFile: "No File Selected",
            csvData: ''
        });
        this.props.handleAddFoodUpdate();
    }

    onClick(e){
        this.fileUpload1(this);
        this.props.handleAddFoodUpdate();
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            var csv = reader.result;
            var lines = csv.split("\n");
            var result = [];
            var headers=lines[0].split(",");
            for(var i=1;i<lines.length;i++){
                var obj = {};
                var currentline=lines[i].split(",");
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            //return result; //JavaScript object
            // result= JSON.stringify(result); //JSON
            this.setState({
                selectedFile: files[0].name,
                csvData: result
            });
        }.bind(this)
        reader.readAsText(files[0]);
    }

    fileUpload1(e){
        axios.post('http://makanow.herokuapp.com/api/importCSV/'+this.props.selectedMenu.menuId+"/"+this.props.restaurant+"/"+this.props.manager, this.state.csvData, {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
        }).then(function(response){
            e.setState({
                messageFromServer: response.data
            })
        })
    }

    check(){
        console.log(this.state.selectedFile);
        console.log(this.state.csvData);
        console.log(this.state.messageFromServer);
    }

    render(){

        if(this.state.messageFromServer === '' || this.state.messageFromServer === 'Import Error. Ensure correct template is used.') {
            return (
                <div>
                    {/*<button onClick={this.check}>Check</button>*/}
                    <Button className="pull-right" bsStyle="info" onClick={this.openModal}><span
                        className="glyphicon glyphicon-open"></span> Import Menu </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Import Menu"
                        className="Modal">
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span
                            className="closebtn glyphicon glyphicon-remove"></span></Button>
                        <fieldset>
                            <p></p>
                            <p align="center">
                                <h3><b> Import New Menu </b></h3>
                            </p>
                            <p align="center" style={{color:"red"}}>{this.state.messageFromServer}</p>
                            {/*<p align="center" style={{color:"red"}}>This action will overwrite existing menu!</p>*/}
                            <hr />
                            <table align="center">
                                <tr>
                                    <td align="center">
                                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                            <button className='btn'> Choose File </button> <text><b>{this.state.selectedFile}</b></text>
                                        </ReactFileReader>
                                        {/*<Input type="file" name="" id="" onChange={this.handleSelectedFile} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>*/}
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                        <hr />
                        <div className='button-center'>
                            <Button bsStyle="danger" onClick={this.closeModal}><span
                                className="glyphicon glyphicon-remove"></span><b> Close </b></Button>
                            {" "}
                            <Button bsStyle="success" onClick={this.onClick}><span
                                className="glyphicon glyphicon-ok"></span><b> Import </b></Button>
                        </div>
                        {/*<button onClick={this.check}>Check</button>*/}
                    </Modal>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <Button className="pull-right" bsStyle="info" onClick={this.openModal}><span
                            className="glyphicon glyphicon-open"></span> Import Menu </Button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Add Menu"
                            className="Modal">
                            <div className='button-center'>
                                <h3>{this.state.messageFromServer}</h3>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}
export default ImportCSV;