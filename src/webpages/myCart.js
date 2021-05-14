import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCartData, updateCartCheckOutDetails } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		
		const varMyData = this.props.cartData;
		this.state = {
		    cartData: varMyData,
		    checkOutDetails: calculateTotals(varMyData)
		};
	}

    /***** Increase product quantity *****/
    increaseQuantity = (key) => {
        let vCartData = this.state.cartData;
        for (const [index, value] of vCartData.entries()) {
            if(value.id === key){
                value.quantity++;
                break;
            }
        }

        /***** calculate checkout details, like total quantity, total price *****/
        let vCheckOutDetails = calculateTotals(vCartData);
        this.setState({cartData:vCartData, checkOutDetails: vCheckOutDetails});
        /***** set global cache *****/
        this.props.updateCartData(vCartData);
        this.props.updateCartCheckOutDetails(vCheckOutDetails);
    }

    /***** Decrease product quantity *****/
    decreaseQuantity = (key) => {
        let vCartData = this.state.cartData;
        for (const [index, value] of vCartData.entries()) {
            if(value.id === key && value.quantity > 1){
                value.quantity--;
                break;
            }
        }

        /***** calculate checkout details, like total quantity, total price *****/
        let vCheckOutDetails = calculateTotals(vCartData);
        this.setState({cartData:vCartData, checkOutDetails: vCheckOutDetails});
        /***** set global cache *****/
        this.props.updateCartData(vCartData);
        this.props.updateCartCheckOutDetails(vCheckOutDetails);
    }

    /***** Remove product from cart *****/
    removeFromCart = (item) => {
        let newList = [];
        for (const [index, value] of this.state.cartData.entries()) {
            if(value.id !== item.id){
                newList.push(value);
            }
        }

        /***** calculate checkout details, like total quantity, total price *****/
        let vCheckOutDetails = calculateTotals(newList);
        this.setState({cartData:newList, checkOutDetails: vCheckOutDetails});
        /***** set global cache *****/
        this.props.updateCartData(newList);
        this.props.updateCartCheckOutDetails(vCheckOutDetails);
    }

    /***** Clear all cart Items *****/
    clearCart = () =>{
        this.props.updateCartData([]);
        this.props.updateCartCheckOutDetails({});
    }

    render() {
        return (
            <div style={{margin:"10px"}}>
                {/***** Cart product details - start *****/}
                <div style={{float:"left",width:"82%" }} >
                    {this.state.cartData.length > 0 ? this.state.cartData.map(item => (
                        /***** Bind cart products *****/
                        <div key={item.id} style={{padding:"20px",backgroundColor:"white",borderBottom:"1px black solid"}}>
                            <div style={{float:"left",marginRight:"10px"}}>
                                <img src="../images/no_image.svg" style={{width:"50px",height:"50px"}} alt="Loading" />
                            </div>
                            <div style={{float:"left",marginRight:"10px",width:"50%"}}>
                                <div>{item.name}</div>
                                <div>{item.type}</div>
                                <div style={{fontWeight:"bold"}}>${formatNumber(item.price)}</div>
                            </div>
                            <div style={{float:"left",marginRight:"10px"}}>
                                <div>Qty: <button disabled={item.quantity <= 1} onClick={() => this.decreaseQuantity(item.id)}>-</button>  {item.quantity}  <button onClick={() => this.increaseQuantity(item.id)}>+</button></div>
                                <div style={{marginTop:"10px"}}>Product(s) total price: <span style={{fontWeight:"bold"}}>${formatNumber(item.price * item.quantity)}</span></div>
                            </div>
                            <div style={{float:"right"}}>
                                <button onClick={() => this.removeFromCart(item)}>Remove product</button>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                    ))
                    :
                        /***** Show message cart is empty *****/
                        <div style={{backgroundColor:"white",textAlign:"center",minHeight:"125px" }} >Your cart is empty <br/><Link to={{pathname: "/shopping"}} style={{textDecoration: "underline"}}>Continue shopping</Link></div>
                    }
                </div>
                {/***** Cart product details - end *****/}
                {/***** Checkout details - start *****/}
                <div style={{float:"right",backgroundColor:"white",border:"1px black solid",padding:"10px",width:"15%"  }} >
                    <div>Total products</div>
                    <div style={{fontWeight:"bold"}}>{this.state.checkOutDetails.tItems}</div>
                    <div style={{marginTop:"10px"}}>Checkout Price</div>
                    <div style={{fontWeight:"bold"}}>${this.state.checkOutDetails.tPrice}</div>
                    <div style={{marginTop:"10px"}}>
                        <Link to={{pathname: "/checkOut"}}>
                            <button disabled={this.state.cartData.length === 0} onClick={()=>this.clearCart()}>Checkout</button>
                        </Link>
                    </div>
                </div>
                {/***** Checkout details - end *****/}
                <div style={{clear:"both"}}></div>
            </div>
        );
    }
}

// ========================================
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
