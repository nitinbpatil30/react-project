import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react'
import { updateCartData } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';

class CartItemsRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		    cartProduct: this.props.itemData
		};
	}

    /***** Increase product quantity *****/
    increaseQuantity = (item) => {
        let vItem = JSON.parse(JSON.stringify(item));
        let vCartData = JSON.parse(JSON.stringify(this.props.cartData));
        for (const [index, value] of vCartData.entries()) {
            if(value.id === item.id){
                value.quantity++;
                vItem.quantity = value.quantity;
                break;
            }
        }

        this.setState({cartProduct:vItem});
        /***** set global cache *****/
        this.props.updateCartData(vCartData);
    }

    /***** Decrease product quantity *****/
    decreaseQuantity = (item) => {
        let vItem = JSON.parse(JSON.stringify(item));
        let vCartData = JSON.parse(JSON.stringify(this.props.cartData));
        for (const [index, value] of vCartData.entries()) {
            if(value.id === item.id && value.quantity > 1){
                value.quantity--;
                vItem.quantity = value.quantity;
                break;
            }
        }

        this.setState({cartProduct:vItem});
        /***** set global cache *****/
        this.props.updateCartData(vCartData);
    }

    /***** Remove product from cart *****/
    removeFromCart = (item) => {
        let vItem = JSON.parse(JSON.stringify(item));
        vItem.quantity = 1;
        vItem.existsInCart = false;
        this.setState({itemData: vItem});

        let newList = [];
        for (const [index, value] of this.props.cartData.entries()) {
            if(value.id !== item.id){
                newList.push(value);
            }
        }

        /***** set global cache *****/
        this.props.updateCartData(newList);
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.state.cartProduct.name}</Table.Cell>
                <Table.Cell>{this.state.cartProduct.type}</Table.Cell>
                <Table.Cell style={{fontWeight:"bold", textAlign:"Right"}}>${formatNumber(this.state.cartProduct.price)}</Table.Cell>
                <Table.Cell><button disabled={this.state.cartProduct.quantity <= 1} onClick={() => this.decreaseQuantity(this.state.cartProduct)}>-</button>  {this.state.cartProduct.quantity}  <button onClick={() => this.increaseQuantity(this.state.cartProduct)}>+</button></Table.Cell>
                <Table.Cell style={{fontWeight:"bold", textAlign:"Right"}}>${formatNumber(this.state.cartProduct.price * this.state.cartProduct.quantity)}</Table.Cell>
                <Table.Cell><button onClick={() => this.removeFromCart(this.state.cartProduct)}>Remove product</button></Table.Cell>
            </Table.Row>
        );
    }
}

// ========================================
//get store
const mapStateToProps = (state) =>{
    return {
        cartData: state.rCart.cartData
    }
}
//set store
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        updateCartData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemsRow);
