export function productDataWatcher(authParams, resolve, reject) {
  return { type: 'GET_PRODUCT_DATA', payload: authParams, resolve: resolve, reject: reject};
}

export function updateProductData(profile) {
  return { type: 'SET_PRODUCT_DATA', payload: profile };
}

export function updateCategoriesData(profile) {
  return { type: 'SET_CATEGORIES', payload: profile };
}

export function updateCartData(profile) {
  return { type: 'SET_CART_DATA', payload: profile };
}

export function updateCartCheckOutDetails(profile) {
  return { type: 'SET_CART_CHECKOUT_DETAILS', payload: profile };
}