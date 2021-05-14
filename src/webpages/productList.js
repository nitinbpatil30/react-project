import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown,Input,Button } from 'semantic-ui-react'
import { productDataWatcher, updateProductData, updateCategoriesData } from '../utilities/actionCreators';
import { sampleData } from '../utilities/sampleData';
import Products from "./products";

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            searchedName: '',
            selectedCategory: []
        };
    }

    componentDidMount() {
        if(!this.props.productData || this.props.productData.length === 0){
            /***** redux-saga api call get product list *****/
            new Promise((resolve, reject) => {
                this.props.productDataWatcher({}, resolve, reject);
            }).then((result) => {
                this.setState({isLoaded: true});
            }).catch((error) => {
                this.setState({ isLoaded: true, error });
            });
        }else{
            /***** Load from already store data *****/
            this.loadResultToState(this.props.productData);
        }

        /***** static product list for testing *****/
        //this.loadResultToState(sampleData.products);
    }

    /***** static product list for testing *****/
    loadResultToState = (result) => {
        let itemsV = result;
        let categoryArr = [];
        let categoryArrDup = [];
        for (const [index, value1] of itemsV.entries()) {
            //get categories
            if(categoryArrDup.indexOf(value1.type) === -1){
                categoryArrDup.push(value1.type);
                categoryArr.push({key: categoryArrDup.length, text: value1.type, value: value1.type});
            }
        }
        this.setState({isLoaded: true});

        //Set global cache
        this.props.updateProductData(itemsV);
        this.props.updateCategoriesData(categoryArr);
    }

    handleChangeCategory = (event, {value}) => {
        //this.setState({selectedCategory: event.target.value});
        this.setState({selectedCategory: value});
    }

    handleChangeName = (event) => {
        this.setState({searchedName: event.target.value});
    }

    /***** search products button click *****/
    searchProducts = () => {
        const {searchedName, selectedCategory} = this.state;

        this.setState({searchedName1: searchedName, selectedCategory1: selectedCategory});
    }

    /***** reset filters button click *****/
    resetFilters = () => {
        this.setState({
            searchedName: '',
            searchedName1: '',
            selectedCategory: [],
            selectedCategory1: []
        });
    }

    /***** filter products as per on inputs *****/
	filteredProducts = () => {
		let prodName = this.state.searchedName1;
		let categoryName = this.state.selectedCategory1;
		if (!prodName && (!categoryName || categoryName.length === 0)) {
			return this.props.productData;
		}
		let targetShip = this.props.productData.filter((ship) => (!prodName || ship.name.toLowerCase().includes(prodName.toLowerCase())) && (!categoryName || categoryName.includes(ship.type)) );

		return targetShip;
    };

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/***** Search control bar - start *****/}
                    <div style={{margin:"10px 10px 10px 20px"}}>
                        <div style={{float:"left",paddingRight:"20px"}}>
                            <div>Categories</div>
                            <div style={{paddingTop:"5px"}}>
                                {/*<select value={this.state.selectedCategory} onChange={this.handleChangeCategory} style={{height:"22px"}} >
                                    <option key="-1" value="">All</option>
                                    {this.props.categories.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })}
                                </select>*/}
                                  <Dropdown
                                    placeholder='Select categories'
                                    multiple
                                    search
                                    selection
                                    value={this.state.selectedCategory}
                                    onChange={this.handleChangeCategory}
                                    options={this.props.categories}
                                  />
                            </div>
                        </div>
                        <div style={{float:"left",paddingRight:"20px"}}>
                            <div>Product name</div>
                            <div style={{paddingTop:"5px"}}>
                                {/*<input type="text" value={this.state.searchedName} onChange={this.handleChangeName} placeholder="Enter product name" />*/}
                                <Input value={this.state.searchedName} onChange={this.handleChangeName} placeholder='Enter product name' />
                            </div>
                        </div>
                        <div style={{float:"left",paddingRight:"20px"}}>
                            <div>&nbsp;</div>
                            <div style={{paddingTop:"5px"}}>
                                <Button onClick={this.searchProducts}>Search</Button>
                                <Button onClick={this.resetFilters}>Reset</Button>
                            </div>
                        </div>
                        <div style={{clear:"both"}} ></div>
                    </div>
                    {/***** Search control bar - end *****/}
                    {/***** products binding - start *****/}
                    <div style={{margin:"10px"}}>
                        {this.filteredProducts().map(item => (
                            /***** Child product component *****/
                            <Products key={item.id} itemData={item} />
                        ))}
                        <div style={{clear:"both"}} ></div>
                    </div>
                    {/***** products binding - end *****/}

                </div>
            );
        }
    }
  
}

// ================================
//get store
const mapStateToProps = (state) =>{
    return {
        productData: state.rProdList.productData,
        categories: state.rProdList.categories
    }
}
//set store
const mapDispatchToProps = (dispatch) =>{
    /*return {
        setProductData:(productData) => {dispatch({type:'SET_PRODUCT_DATA', payload:productData})},
        setCategoryData:(categoryData) => {dispatch({type:'SET_CATEGORIES', payload:categoryData})}
    }*/
    return bindActionCreators({
        productDataWatcher,updateProductData,updateCategoriesData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);