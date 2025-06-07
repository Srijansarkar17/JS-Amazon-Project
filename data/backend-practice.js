//To send HTTP message, we are gonna use a class called XMLHttpRequest, its a built in class 

//The frontend sends the order request to the backend using HTTP messages

const xhr = new XMLHttpRequest(); //creates a new HTTP message to send to the backend

xhr.open('GET', 'https://supersimplebackend.dev/products/first'); //set up the message, we give it two parameters, first is 'Type of HTTP Request' to send('GET' = get some information from the backend, 'POST' , 'PUT' and 'DELETE'), the second parameter tells where to send the message, in this we send to https://supersimplebackend.dev's computer , /products/first is the URL Path, we can send request to different URL paths and we will get different responses from the backend


//The backend can respond with different types of data(text, images, JSON, HTML)

xhr.addEventListener('load', () => {
    console.log(xhr.response);
}); //this method is used to resolve the issue of getting the response after the message is sent. You can read the issue in the following lines, we give it two parameters, first is 'load' which means the response is loaded, second parameter is a function that we want to run after the response is loaded happens.

//we send a request to the backend, when the backend sees our request, it will send a response back(1 request gets 1 response, this is called the request-response cycle)

xhr.send(); //Sends the message
//xhr.send() is an asynchronous code, meaning it does not wait for send to finish, it just sends the message and immediately goes to the next line, so it takes time to send the message, but we don't get the response immediately, so the response is undefined at first
//So in this situation, we need to wait for the response to come back first and then we can access .response(), for that we used xhr.addEventListener above.
//xhr.response -> will be undefined here, because this code runs before the xhr loads the response