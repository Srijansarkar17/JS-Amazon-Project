import { addToCart, cart, loadFromStorage } from '../../data/cart.js';


describe('test suite: Add to Cart', () => {
    //we are testing the if-else statement inside the add to cart function

    //Now we are going to test and insert an existing product in the cart
    //For that we are gonna mock the localStorage again with an item in the cart
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]); //the getItem is returning empty array for the test
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//we are checking whether the productid of the first item of the cart is equal to the productId that we input above or not
        expect(cart[0].quantity).toEqual(2); //quantity should be one

    });

    it('adds a new product to the cart', () => {
        //Steps: 
        //1) We are creating a mock localStorage.getItem where we are returning an empty array so that the addToCart function can add an item and the length becomes 1.
        //2)Then we reload the cart using loadfromStorage function
        //3)Then we compare if after adding the product to the cart,if the length increases and becomes 1 or not.

        //We are also gonna mock the setItem method of localStorage, because we dont want our test code to modify the localStorage and mess with it
        spyOn(localStorage, 'setItem').and.callFake(() => {

        })


        //Creating a mock
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); //the getItem is returning empty array for the test
        }); //we are mocking the localStorage's getItem, so this will replace localStorage.getItem with a fake version and we can make this fake version do anything we want 

        loadFromStorage(); //we are reloading the cart so that it is empty 
        console.log(localStorage.getItem('cart'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1); //in this test case, we add a product and expect the cart length to be 1 after adding the product(this fails because in cart.js file we start the code by getting the cart from localStorage, so this test case will only pass when the localStorage is empty, otherwise it will fail(so it is called a flaky test))
        //For this problem jasmine provides us with Mocks = it lets us replace a method with a fake version
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); //this method checks how many times localStorage.setItem has been called(), it is written it will be called once.
        //So after mocking a method we can check how many times the method was called 
        //Each test can have multiple expectations and that will pass only if all of the expectations pass
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');//we are checking whether the productid of the first item of the cart is equal to the productId that we input above or not
        expect(cart[0].quantity).toEqual(1); //quantity should be one



    })
})