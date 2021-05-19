import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { calculateTotals, formatNumber } from '../utilities/utility';

class Header extends React.Component {
    render() {
        const {tItems, tPrice} = calculateTotals(this.props.cartData);
        return (
            <div>
                <div style={{backgroundColor:"grey",padding:"10px"}}>
                    <div style={{float:"left",padding:"5px 10px" }} >
                        <Link to={{pathname: "/shopping"}} style={{color: "white",textDecoration: "underline"}}>Shopping</Link>
                    </div>
                    <div style={{float:"right",color:"blue",cursor:"pointer",backgroundColor:"white",border:"1px black solid",padding:"5px 10px" }} >
                        <Link to={{pathname: "/cart"}} style={{textDecoration:"none"}}>Cart products: ({this.props.cartData.length}), Total: ({tItems ? tItems : 0 })</Link>
                    </div>
                    <div style={{clear:"both"}} ></div>
                </div>
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

export default connect(mapStateToProps, null)(Header);
