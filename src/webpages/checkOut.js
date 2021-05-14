import React from 'react';
import { Link } from "react-router-dom";
import '../index.css';

class CheckOut extends React.Component {

  render() {

    return (
      <div>
		<div style={{margin:"10px",textAlign:"center"}}>
			<div>Thank you for shopping</div>
			<div><Link to={{pathname: "/shopping"}} style={{textDecoration: "underline"}}>Continue shopping</Link></div>
		</div>
		
	  </div>
    );
  }
}

// ========================================

export default CheckOut;
