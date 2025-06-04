import { formatCurrency } from "../../scripts/utils/money.js";

//To create a test suite we use a function called descibe in Jasmine
//first parameter is the name of the test suite and second is a function for the test
describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95'); //expects lets us compare one value to another, .toEqual compares whether both of them are equal or not and then displays them on the page
    }); //it is a function provided by Jasmine to create tests, first parameter is the name of the test

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});
