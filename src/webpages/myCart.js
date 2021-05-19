import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react'
import { updateCartData } from '../utilities/actionCreators';
import { calculateTotals, formatNumber } from '../utilities/utility';
//import CartItems from './cartItems';
import CartItemsRow from './cartItemsRow';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		
		const varMyData = this.props.cartData;
		this.state = {
		    cartData: varMyData
		};
	}

    /***** Clear all cart Items *****/
    clearCart = () =>{
        this.props.updateCartData([]);
    }

    render() {
        const {tItems, tPrice} = calculateTotals(this.props.cartData);
        return (
            <div style={{margin:"10px"}}>
                {/***** Cart product details - start *****/}
                <div style={{float:"left",width:"82%" }} >
                    {this.props.cartData.length > 0 ?
                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Product name</Table.HeaderCell>
                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Product(s) total price</Table.HeaderCell>
                                    <Table.HeaderCell>Remove from cart</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.cartData.map(item => (
                                    /***** Child product component *****/
                                    <CartItemsRow key={item.id} itemData={item} />
                                ))}
                            </Table.Body>
                        </Table>
                    :
                        /***** Show message cart is empty *****/
                        <div style={{backgroundColor:"white",textAlign:"center",minHeight:"125px" }} >Your cart is empty <br/><Link to={{pathname: "/shopping"}} style={{textDecoration: "underline"}}>Continue shopping</Link></div>
                    }
                </div>
                {/***** Cart product details - end *****/}
                {/***** Checkout details - start *****/}
                <div style={{float:"right",backgroundColor:"white",border:"1px black solid",padding:"10px",width:"15%"  }} >
                    <div>Total products</div>
                    <div style={{fontWeight:"bold"}}>{tItems}</div>
                    <div style={{marginTop:"10px"}}>Checkout Price</div>
                    <div style={{fontWeight:"bold"}}>${tPrice}</div>
                    <div style={{marginTop:"10px"}}>
                        <Link to={{pathname: "/checkOut"}}>
                            <button disabled={this.props.cartData.length === 0} onClick={()=>this.clearCart()}>Checkout</button>
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
        cartData: state.rCart.cartData
    }
}
//set store
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        updateCartData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
