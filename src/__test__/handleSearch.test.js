// Import the js file to test
import { getTravelInfo } from '../client/js/handleSearch.js';

describe("Testing the submit functionality", () => {
    test("Testing the getTravelInfo() function", () => {
        expect(getTravelInfo).toBeDefined();
    });

    test('Should be a function', () => {
        expect(typeof getTravelInfo).toBe("function");
    });
});