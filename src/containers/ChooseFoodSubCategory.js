// import React, { Component } from "react";
// import axios from "axios";
// import {Button, DropdownButton, MenuItem, SplitButton} from "react-bootstrap";
// import Modal from "react-modal";
//
// class ChooseFoodSubCategory extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             subCategoryData: [],
//             selectedSubCategory:'',
//             messageFromServer: '',
//             subCategoryName: '',
//             errorMessage: '',
//             dropdownTitle: "Select Sub Category"
//         };
//         this.getSubCategoriesByCategoryId = this.getSubCategoriesByCategoryId.bind(this);
//         this.check = this.check.bind(this);
//     }
//
//     componentWillMount(){
//         // this.props.handleAddFoodUpdate();
//         this.getSubCategoriesByCategoryId(this);
//     }
//
//     componentDidMount(){
//         // this.props.handleAddFoodUpdate();
//         this.getSubCategoriesByCategoryId(this);
//     }
//
//     getSubCategoriesByCategoryId(ev){
//         axios.post('http://localhost:8080/api/subCategories/getSubCategoriesByCategoryId/'+this.props.selectCategory)
//             .then(function(response) {
//                 ev.setState({
//                     subCategoryData: response.data});
//             });
//     }
//
//     check() {
//         console.log(this.state.subCategoryData);
//     }
//
//     render() {
//
//         return(
//             <div>
//                 <SplitButton>
//                     {this.state.subCategoryData.map((subCategory, k) =>
//                         <MenuItem eventKey={k}>{subCategory.subCategoryName}</MenuItem>
//                     )
//                     }
//                 </SplitButton>
//                 <button onClick={this.check}>Check</button>
//             </div>
//         )
//     }
// }
// export default ChooseFoodSubCategory;