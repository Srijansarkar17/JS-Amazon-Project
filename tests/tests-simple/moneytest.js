// In this file, we will write some code to test formatCurrency function from money.js file.


//this is called automated Testing where we use code to test code 
import { formatCurrency } from "../scripts/utils/money.js";


//We are gonna group related tests together - its called test suite
console.log('test suite: formatCurrency');


//Test Case1
console.log('converting cents to dollars'); //giving the test case name so that we can identify in the console
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
}else {
    console.log('failed')
}

//Test Case 2
console.log('works with 0');
if(formatCurrency(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

//Test Case 3
console.log('rounds up to the nearest cent');
if(formatCurrency(2000.5) === '20.01'){ 
    console.log('passed');
}else{
    console.log('failed');
}



//There are two types of test cases:
  //1) Basic Test Cases(Tests if the code is working or not)
  //2) Edge Test Cases(Tests with values that are tricky)
