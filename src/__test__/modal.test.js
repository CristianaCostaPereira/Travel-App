import { openModal } from '../client/js/modal.js';

describe("Testing the modal open with the information wanted functionality", () => {
    test("Testing the openModal() function", () => {
        expect(openModal).toBeDefined();
    });

    test("Should be a function", () => {
        expect(typeof openModal).toBe("function");
    });
});