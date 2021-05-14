export const formatNumber = (number) => {
    //return new Intl.NumberFormat('en-US', { }).format(number);
    let maxDecimalCount = 2;
    let localNumberFormat = parseFloat(number).toLocaleString(undefined, {maximumFractionDigits:maxDecimalCount, minimumFractionDigits:maxDecimalCount});
    return localNumberFormat;
}

export const calculateTotals = (items) => {
    let totalItem = 0;
    let totalPrice = 0;
    for (const [index, value] of items.entries()) {
        totalItem = totalItem + value.quantity;
        totalPrice = totalPrice + (value.quantity * value.price);
    }

    return {tItems: totalItem, tPrice: formatNumber(totalPrice)};
}