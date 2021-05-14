import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Header from "./webpages/header";
import ProductList from "./webpages/productList";
import Cart from "./webpages/myCart";
import CheckOut from "./webpages/checkOut";

class App extends React.Component {

    constructor(props){
        super(props);
    }

	render() {
		return (
			<BrowserRouter>
			    <Header />
				<div style={{backgroundColor:"#F8F6FF",width:"100%",height:"calc(100vh - 50px)",overflow:"auto"}}>
					<Switch>
						<Route path="/" render={(props) => (<ProductList {...props} isShopping={true} />)} exact />
						<Route path="/shopping" render={(props) => (<ProductList {...props} isShopping={true} />)} />
						<Route path="/cart" component={Cart} />
						<Route path="/checkOut" component={CheckOut} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

// ========================================

export default App;
