//Cart page functionality
export const cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2
}, {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
}]; //export is to let the cart variable be used outside of cart.js file

export function addToCart(productId) {
  //Steps to add an item in the cart
    // - First we check if the product is there or not
    // - If the product is already there, then we just increase the quantity instead of repeating the product
    // - if the product is not there, we add the item to the cart
  let matchingItem;
    //Check if the productName is already in the cartarray
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){ //if the product names matched, then that means the product is already in the cart
        matchingItem = cartItem;

      }
    });
    if(matchingItem){  //if the product is already there in the cart, then we just increase the quanitity by one instead of the repeating the name
      matchingItem.quantity++;
    }else{
      cart.push({ //this cart list is from cart.js file
      productId: productId,
      quantity: 1
    });
  }
}