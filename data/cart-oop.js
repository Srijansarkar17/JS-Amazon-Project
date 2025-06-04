// All the data and the functions are organized into objects

//function that generates objects
function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
        //we also have to store the cart to localStorage, otherwise everytime we refresh the page, the whole page starts fresh
        loadFromStorage() { //this gives us the outer object that is cart in this case and we get cartItems
            //Cart page functionality
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            //getting the cart from localStorage, we used JSON.parse because localStorage gives us value in string format, we need to convert into object

            //this  will happen if the cart does not have any value in localStorage(we give the cart a default value)
            if (!this.cartItems) {
                this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];

            }
        },

        saveToStorage(localStorage) {
            localStorage.setItem(localStorageKey , JSON.stringify(this.cartItems))//since the local storage can only store strings, so we converted into string using JSON.stringify. The name is 'cart' for reference
        },

        addToCart(productId) {
            //Steps to add an item in the cart
            // - First we check if the product is there or not
            // - If the product is already there, then we just increase the quantity instead of repeating the product
            // - if the product is not there, we add the item to the cart
            let matchingItem;
            //Check if the productName is already in the cartarray
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) { //if the product names matched, then that means the product is already in the cart
                    matchingItem = cartItem;

                }
            });
            if (matchingItem) {  //if the product is already there in the cart, then we just increase the quanitity by one instead of the repeating the name
                matchingItem.quantity++;
            } else {
                this.cartItems.push({ //this cart list is from cart.js file
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1' //refers to the delivery option id in the delivery-options.js page
                });
            }

            this.saveToStorage(); //function above(to store in localStorage)(Since the saveToStorage function was also moved inside objet, so to access the function we use this.saveToStorage)
        },
        removeFromCart(productId) {
            //To remove the product from the cart, we are gonna some steps
            //Step1: 
            //Create a new array
            //Step2:
            //Loop through the cart
            //Step3:
            //Add each product to the new array, except the productId that should be deleted

            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage(); //function above(to store in localStorage)
        },

        updateDeliveryOption(productId, deliveryOptionId) {
            //Steps
            //1)Loop through the cart and find the product through the productId
            //2)Update the deliveryOptionId of the product

            let matchingItem;
            //Check if the productName is already in the cartarray
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) { //if the product names matched, then that means the product is already in the cart
                    matchingItem = cartItem;

                }
            });
            //this gives us the cart item that matches the productId and save it in matchingItem variable

            matchingItem.deliveryOptionId = deliveryOptionId;
            //we are getting the deliveryOptionId for the product we have chosen 

            this.saveToStorage();
            //now the deliveryOptionId and the productId are stored
        }

    };
    return cart;
};

//we created two seperate types of carts using objects, so using the Cart() function we generate objects
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');




cart.loadFromStorage();

console.log(cart);







