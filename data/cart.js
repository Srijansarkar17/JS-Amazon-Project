//Cart page functionality
export let cart = JSON.parse(localStorage.getItem('cart'));
//getting the cart from localStorage, we used JSON.parse because localStorage gives us value in string format, we need to convert into object

//this will happen if the cart does not have any value in localStorage(we give the cart a default value)
if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];

}

//export is to let the cart variable be used outside of cart.js file

//we also have to store the cart to localStorage, otherwise everytime we refresh the page, the whole page starts fresh
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))//since the local storage can only store strings, so we converted into string using JSON.stringify. The name is 'cart' for reference
}

export function addToCart(productId) {
  //Steps to add an item in the cart
  // - First we check if the product is there or not
  // - If the product is already there, then we just increase the quantity instead of repeating the product
  // - if the product is not there, we add the item to the cart
  let matchingItem;
  //Check if the productName is already in the cartarray
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { //if the product names matched, then that means the product is already in the cart
      matchingItem = cartItem;

    }
  });
  if (matchingItem) {  //if the product is already there in the cart, then we just increase the quanitity by one instead of the repeating the name
    matchingItem.quantity++;
  } else {
    cart.push({ //this cart list is from cart.js file
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1' //refers to the delivery option id in the delivery-options.js page
    });
  }

  saveToStorage(); //function above(to store in localStorage)
}

export function removeFromCart(productId) {
  //To remove the product from the cart, we are gonna some steps
  //Step1:
  //Create a new array
  //Step2:
  //Loop through the cart
  //Step3:
  //Add each product to the new array, except the productId that should be deleted

  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage(); //function above(to store in localStorage)
}