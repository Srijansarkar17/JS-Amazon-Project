import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//async returns a promise, await lets us wait for a promise to finish, before going to the next line
async function loadPage() { //async = makes a function return a promise
    try { //we do error handling in async await using try and catch blocks

        //throw 'error1'; //using throw we manually create an error which is going to be caught by .catch()

        await loadProductsFetch() //instead of using .then() for this function to finish, we use await(await waits for loadProductsFetch() to finish and get the response from the backend before going to the next line)
        await new Promise((resolve, reject) => { //we run the function and wait for it to finish, reject function is used to manually create an error in the future
            loadCart(() => {
                //reject('error3');
                resolve();
            });
        });
    }catch(error) {
        console.log('Unexpected Error. Please try again');
    }


    //after both loadProductsFetch() and loadCart() have run, we run these codes
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()

//we can only use await when we are inside an async function

/*
//PROMISES(it is a class)
 //1) better way to handle asynchronous code
 //2) similar to Jasmine's done() function
 //3) lets us wait for some code to finish, before going to the next function

//FLOW OF THE PROMISE
//First loadProducts()[asynchronous code] is called, then we wait for it to finish, then we run the resolve function which tells us to go to the next code, after that we run the functions inside .then().

//New Promise code flow is that first loadProducts runs, then after that we wait for it to finish, then we hit resolve and go to the next code which is again a new Promise in which loadCart() function is completed, then after both are run, we go to renderOrderSummary() and renderPaymentSummary().

//Right now the two promises to loadProducts() and loadCart() are not running together, for example loadProducts() is running first, then loadCart() is running. But using Promise.all(), we can run both the functions together and wait for all of them to finish
//In Promise.all, we give an array of promises and both of the promises run at the same time instead of running each promise one by one
Promise.all([
    loadProductsFetch(), //since loadProductsFetch() in the products.js returns a promise, so now we can use it directly
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });   
    })

]).then((values) => {
    console.log(values); //gives an array of values passed by the resolves
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    console.log('Start Promise')
    loadProducts(() => {
        resolve('value1'); //Since loadProducts() has some asynchronous code, it will first finish loadProducts(), after that only the resolve() function will run to go to the next step : we can also give parameters to resolve() and it will be saved inside .then() function, for eg. if we give a parameter 'value1' to resolve, it can be used by .then
        console.log('finished Loading')
    });
    
}).then((value) => { //now in the .then function also loadCart() runs first, then we hit resolve which tells us to go to the next step, after that we go to the .then() code which renders OrderSummary and renderPaymentSummary().
    console.log(value); //this value is passed by resolve
    console.log("NextStep");
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });   
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
}) //when we create a promise, its going to run the function immediately, we are gonna pass a parameter called resolve to this function
//Resolve is a function, works very similar to jasmine's done function -> it lets us control when to go to the next step(this next step is seperate from the rest of the code .then(function) is the next step that is going to run after resolve().)

//The next step is not the function below, the function below is already running. Promises are designed so that multiple pieces of code run together. The Promise() is running sepearately and the loadProducts() is running seperately. Diagram given in Obsidian
*/

/*
loadProducts(() => { //it means it will run renderOrderSummary() and renderPaymentSummary() after loadProducts() is finished
    renderOrderSummary();
    //this time, to update the page, instead of using DOM, we are just gonna re-run all of the above code and re-generate all the html(this technique of updating the data and regenerating all the HTML is called MVC- (Model-View-Controller))
    renderPaymentSummary();
});
//this is an explaination of callback();
*/
