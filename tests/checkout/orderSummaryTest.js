//INTEGRATION TEST - Tests many units/pieces of code working together

import { cart,loadFromStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
//Create a test Suite
describe('test suite: Render Order Summary', () => {
    //To check a pagewe have to check two things
    //1) How the page looks
    //2) How the page behaves

    //beforeEach function will run before each of our tests(Hooks)
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


    //To test with a backend
    //beforeAll runs a function before all of our tests
    beforeAll((done) => { //done is a feature of Jasmine to deal with asynchronous code, it will wait for this feature to run completely and then go to the next code
        loadProductsFetch().then(() => {
            done(); ///after this done method only, it will go onto the next code
        }); //this returns a promise, so we can add more steps to this promise using the method .then()
        
        //We wait until the backenc code, i.e loadProducts() is finished, then we use the done() function to know exactly when to go to the next step
    });

    //beforEach runs a function before each of our tests
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    //First we check how the page looks 
    it('displays the cart', () => {
        //we created the js-order-summary because we want to check the html of the page of the original orderSummary for that we need to have the js-order-summary section
        //To run the renderOrderSummary, we need the js-order-summary section
        

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2); //since we added two products, we added a class in the orderSummary.js page for products "js-cart-item-container" and checked if cart-item-containers is equal to 2 or not.

        //test to check the quantity of the product
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        //there was a lot of text inside that class, but we needed to check a specific text, so for that we used the toContain method, so in this case, inside teh js-product-quantity class it checks whether the text 'Quantity: 2' is present or not for the productId

        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = ''; //to clear up the html after test
    });


    //Now we check how the page behaves
    it('Removes a product', () => {

        document.querySelector(`.js-delete-link-${productId1}`).click(); //we click the delete button for the first product
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1); //after clicking we check the remaining quantity

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null); //we check whether after deleting the first product it is still present in the page or not

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null); //we check whether after deleting the first product, the second product is still present in the page or not, it should be present

        //now we check whether the cart array is getting updated or not
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = ''; //to clear up the html after test
    });
});