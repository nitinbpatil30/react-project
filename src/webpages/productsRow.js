import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react'
import { updateCartData } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';

class ProductsRow extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            itemData: this.checkProductExistsInCart(this.props.itemData)
        };
	}

    /***** checking product already added into cart *****/
    checkProductExistsInCart = (item) => {
        item.quantity = 1;
        item.existsInCart = false;
        for (const [index, value] of this.props.cartData.entries()) {
            if(value.id === item.id){
                item.quantity = value.quantity;
                item.existsInCart = true;
                break;
            }
        }
        return item;
    }

    /***** Add product into cart *****/
    addToCart = (item) => {
        let vItem = JSON.parse(JSON.stringify(item));
        let cartDataG = JSON.parse(JSON.stringify(this.props.cartData));
        let flagAdd = true;
        /***** Check if product already added into cart, if added then increase quantity *****/
        for (const [index, value] of cartDataG.entries()) {
            if(value.id === vItem.id){
                value.quantity++;
                vItem.quantity = value.quantity;
                flagAdd = false;
                break;
            }
        }
        /***** Add only into cart if not added already *****/
        if(flagAdd){
            cartDataG.push(vItem);
        }

        vItem.existsInCart = true;
        this.setState({itemData: vItem});

        /***** set global cache *****/
        this.props.updateCartData(cartDataG);
    }

    /***** Remove product from cart *****/
    removeFromCart = (item) => {
        let vItem = JSON.parse(JSON.stringify(item));
        vItem.quantity = 1;
        vItem.existsInCart = false;
        this.setState({itemData: vItem});

        let cartDataG = [];
        for (const [index, value] of this.props.cartData.entries()) {
            if(value.id !== vItem.id){
                cartDataG.push(value);
            }
        }

        /***** set global cache *****/
        this.props.updateCartData(cartDataG);
    }

    render() {
        const vState = this.state.itemData;
        return (
            <Table.Row>
                <Table.Cell>{vState.name}</Table.Cell>
                <Table.Cell>{vState.type}</Table.Cell>
                <Table.Cell style={{textAlign: "right"}}>${formatNumber(vState.price)}</Table.Cell>
                <Table.Cell><button style={{width:"80px"}} onClick={() => this.addToCart(vState)}>{(vState.quantity === 1 && !vState.existsInCart) ? 'Add' : 'Add more'}</button></Table.Cell>
                <Table.Cell><button style={{width:"80px"}} disabled={!vState.existsInCart} onClick={() => this.removeFromCart(vState)}>Remove</button></Table.Cell>
            </Table.Row>
        );
    }
}

//======================
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsRow);