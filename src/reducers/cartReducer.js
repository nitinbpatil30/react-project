const iState = {
    cartData:[],
    checkOutDetails:{}
}

const cartReducer = (state=iState, action) => {
    switch (action.type){
        case 'SET_CART_DATA':
            return {
                ...state,
                cartData: action.payload
            };
        case 'SET_CART_CHECKOUT_DETAILS':
            return {
                ...state,
                checkOutDetails: action.payload
            };
        default:
            return state;
    }
}

export default cartReducer;