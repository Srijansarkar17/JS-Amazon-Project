//we will create a function to fetch the money of the products(this code will be used from here to checkout.js and amazon.js) to reduce the repeating code because the money code was being used both in checkout.js and amazon.js
export function formatCurrency(priceCents) {
    return (Math.round(priceCents)/100).toFixed(2);
}