import { isCartItem, isProduct } from "../validation.js"

const exampleProduct = {
    id: 1001,
    name: 'Badanka',
    price: 500
}

const exampleCartObject = {
    id: 2001,
    amount: 1,
    item: exampleProduct
}

// Essential test data (focused on core equivalence classes)
const testData = {
    validProducts: [
        { id: 2001, name: "Laptop Computer", price: 899 },
        { id: 2002, name: "Free Sample", price: 0 }, // Edge: free item
        { id: 2003, name: "Premium Software", price: 2500 }
    ],
    
    validCartItems: [
        { id: 3001, amount: 1, item: { id: 2001, name: "Laptop", price: 899 } },
        { id: 3002, amount: 5, item: { id: 2002, name: "Smartphone", price: 650 } }
    ],

    nonObjectInputs: [null, undefined, "string", 42, true, []],

    // Core invalid products (key equivalence classes only)
    invalidProducts: [
        { data: {}, description: 'empty object' },
        { data: { name: "Missing ID", price: 100 }, description: 'missing id' },
        { data: { id: 3001, price: 100 }, description: 'missing name' },
        { data: { id: 3002, name: "Missing Price" }, description: 'missing price' },
        { data: { id: "3003", name: "String ID", price: 100 }, description: 'non-number id' },
        { data: { id: 3004, name: 123, price: 100 }, description: 'non-string name' },
        { data: { id: 3005, name: "String Price", price: "100" }, description: 'non-number price' },
        { data: { id: 3006, name: "Negative", price: -50 }, description: 'negative price' },
        { data: { id: 3007, name: "", price: 100 }, description: 'empty name' }
    ],

    // Core invalid cart items (key equivalence classes only)
    invalidCartItems: [
        { data: {}, description: 'empty object' },
        { data: { amount: 1, item: exampleProduct }, description: 'missing id' },
        { data: { id: 4001, item: exampleProduct }, description: 'missing amount' },
        { data: { id: 4002, amount: 1 }, description: 'missing item' },
        { data: { id: "4003", amount: 1, item: exampleProduct }, description: 'non-number id' },
        { data: { id: 4004, amount: "one", item: exampleProduct }, description: 'non-number amount' },
        { data: { id: 4005, amount: 0, item: exampleProduct }, description: 'zero amount' },
        { data: { id: 4006, amount: -1, item: exampleProduct }, description: 'negative amount' },
        { data: { id: 4007, amount: 1, item: null }, description: 'null item' },
        { data: { id: 4008, amount: 1, item: { name: "Invalid" } }, description: 'invalid product' }
    ]
};

describe('Validation cartObject', () => {
    test("isCartItem should return true with valid object", () => {
        expect(isCartItem(exampleCartObject)).toBe(true);
    });

    test.each(testData.nonObjectInputs)(
        'should return false for non-object input: %p',
        (input) => {
            expect(isCartItem(input)).toBe(false);
        }
    );

    testData.validCartItems.forEach((cartItem, index) => {
        test(`should return true for valid cart item #${index + 1}`, () => {
            expect(isCartItem(cartItem)).toBe(true);
        });
    });

    testData.invalidCartItems.forEach(({ data, description }) => {
        test(`should return false for ${description}`, () => {
            expect(isCartItem(data)).toBe(false);
        });
    });
});

describe('Validation product', () => {
    test("isProduct should return true with valid product", () => {
        expect(isProduct(exampleProduct)).toBe(true);
    });

    test.each(testData.nonObjectInputs)(
        'should return false for non-object input: %p',
        (input) => {
            expect(isProduct(input)).toBe(false);
        }
    );

    testData.validProducts.forEach((product, index) => {
        test(`should return true for valid product #${index + 1}`, () => {
            expect(isProduct(product)).toBe(true);
        });
    });

    testData.invalidProducts.forEach(({ data, description }) => {
        test(`should return false for ${description}`, () => {
            expect(isProduct(data)).toBe(false);
        });
    });

    test("should accept products with price 0 (free items)", () => {
        const freeProduct = testData.validProducts.find(p => p.price === 0);
        expect(isProduct(freeProduct)).toBe(true);
    });
});