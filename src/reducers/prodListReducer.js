const iState = {
    productData: [],
    categories: []
}

const reducer = (state=iState, action) => {
    switch (action.type){
        case 'SET_PRODUCT_DATA':
            return {
                ...state,
                productData: action.payload
            };
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            };
        default:
            return state;
    }
}

export default reducer;