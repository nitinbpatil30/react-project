const iState = {
    cartData:[]
}

const cartReducer = (state=iState, action) => {
    switch (action.type){
        case 'SET_CART_DATA':
            return {
                ...state,
                cartData: action.payload
            };
        default:
            return state;
    }
}

export default cartReducer;