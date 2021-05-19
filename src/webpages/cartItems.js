import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCartData } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';

class CartItems extends React.Component {
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
            <div style={{padding:"20px",backgroundColor:"white",borderBottom:"1px black solid"}}>
                <div style={{float:"left",marginRight:"10px"}}>
                    <img src="../images/no_image.svg" style={{width:"50px",height:"50px"}} alt="Loading" />
                </div>
                <div style={{float:"left",marginRight:"10px",width:"50%"}}>
                    <div>{this.state.cartProduct.name}</div>
                    <div>{this.state.cartProduct.type}</div>
                    <div style={{fontWeight:"bold"}}>${formatNumber(this.state.cartProduct.price)}</div>
                </div>
                <div style={{float:"left",marginRight:"10px"}}>
                    <div>Qty: <button disabled={this.state.cartProduct.quantity <= 1} onClick={() => this.decreaseQuantity(this.state.cartProduct)}>-</button>  {this.state.cartProduct.quantity}  <button onClick={() => this.increaseQuantity(this.state.cartProduct)}>+</button></div>
                    <div style={{marginTop:"10px"}}>Product(s) total price: <span style={{fontWeight:"bold"}}>${formatNumber(this.state.cartProduct.price * this.state.cartProduct.quantity)}</span></div>
                </div>
                <div style={{float:"right"}}>
                    <button onClick={() => this.removeFromCart(this.state.cartProduct)}>Remove product</button>
                </div>
                <div style={{clear:"both"}}></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
