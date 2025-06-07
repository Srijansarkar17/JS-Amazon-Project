import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
import '../data/backend-practice.js';


renderOrderSummary();
//this time, to update the page, instead of using DOM, we are just gonna re-run all of the above code and re-generate all the html(this technique of updating the data and regenerating all the HTML is called MVC- (Model-View-Controller))
renderPaymentSummary();

