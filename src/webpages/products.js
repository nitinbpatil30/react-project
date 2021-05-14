import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCartData, updateCartCheckOutDetails } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';

class Products extends React.Component {
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

        /***** calculate checkout details, like total quantity, total price to show on header *****/
        let vCheckOutDetails = calculateTotals(cartDataG);
        this.setState({cartData:cartDataG, checkOutDetails: vCheckOutDetails});
        /***** set global cache *****/
        this.props.updateCartData(cartDataG);
        this.props.updateCartCheckOutDetails(vCheckOutDetails);
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

        /***** calculate checkout details, like total quantity, total price to show on header *****/
        let vCheckOutDetails = calculateTotals(cartDataG);
        this.setState({cartData:cartDataG, checkOutDetails: vCheckOutDetails});
        /***** set global cache *****/
        this.props.updateCartData(cartDataG);
        this.props.updateCartCheckOutDetails(vCheckOutDetails);
    }

    render() {
        const vState = this.state.itemData;
        return (
            <div style={{float:"left",width:"200px",margin:"10px 2px",padding:"10px",backgroundColor:"white",border:"1px black solid"}}>
                <div style={{height:"140px"}}>
                    <div style={{textAlign:"center"}}><img src="../images/no_image.svg" style={{width:"50px",height:"50px"}} alt="Loading" /></div>
                    <div><span style={{color: "silver"}}>Name: </span>{vState.name}</div>
                    <div><span style={{color: "silver"}}>Category: </span>{vState.type}</div>
                    <div style={{textAlign: "right",paddingTop:"10px"}}>${formatNumber(vState.price)}</div>
                </div>
                <div style={{paddingTop:"10px"}}>
                    <button style={{marginRight:"5px",width:"80px"}} onClick={() => this.addToCart(vState)}>{(vState.quantity === 1 && !vState.existsInCart) ? 'Add' : 'Add more'}</button>
                    <button style={{width:"80px"}} disabled={!vState.existsInCart} onClick={() => this.removeFromCart(vState)}>Remove</button>
                </div>
            </div>
        );
    }
}

//======================
//get store
const mapStateToProps = (state) =>{
    return {
        cartData: state.rCart.cartData,
        checkOutDetails: state.rCart.checkOutDetails
    }
}
//set store
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        updateCartData, updateCartCheckOutDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);