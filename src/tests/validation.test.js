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

describe('Validation cartObject', () => {
    test("isCartItem should return true with valid object", () => { // Test that valid cart item returns true
        const expected = true; // Expected result for valid cart item
        const actual = isCartItem(exampleCartObject); // Call function with valid cart object
        expect(actual).toBe(expected); // Assert that result matches expected value
    });

    const nonObjectCases = [
        [false, 'string value'],
        [false, null],
        [false, 42],
        [false, undefined]
    ]
    test.each(nonObjectCases)('should return false when cartItem is not an object (expect %s, value %s)', (expected, input) => { // Test each non-object case
        const actual = isCartItem(input) // Call function with non-object input
        expect(actual).toBe(expected) // Assert that result is false for non-objects
    })

    const malformedCartCases = [
        [{}],
        [{ amount: 2, item: exampleProduct }], // Missing id property
        [{ id: 3001, item: exampleProduct }], // Missing amount property
        [{ id: 3001, amount: 2 }], // Missing item property
        [{ id: 3001, amount: 2, item: { name: "Broken product" } }], // Invalid item object
        [{ id: 3001, amount: "two", item: exampleProduct }], // Amount is string instead of number
        [{ id: NaN, amount: 2, item: exampleProduct }], // ID is NaN
        [{ id: 3001, amount: NaN, item: exampleProduct }], // Amount is NaN
        [{ id: 3001, amount: 0, item: exampleProduct }], // Amount is zero (invalid)
        [{ id: 3001, amount: -5, item: exampleProduct }], // Amount is negative (invalid)
    ]
    test.each(malformedCartCases)('should return false when cartItem is object but invalid format (%s)', (input) => { // Test each malformed cart case
        expect(isCartItem(input)).toBe(false) // Assert that malformed objects return false
    })
})

describe('Validation product', () => {
    test("isProduct should return true with valid product", () => { // Test that valid product returns true
        const expected = true; // Expected result for valid product
        const actual = isProduct(exampleProduct); // Call function with valid product
        expect(actual).toBe(expected); // Assert that result matches expected value
    })

    const nonObjectCases = [
        [false, 'string value'],
        [false, null],
        [false, 42],
        [false, undefined],
    ]
    test.each(nonObjectCases)('should return false when product is not an object (expect %s, value %s)', (expected, input) => { // Test each non-object case
        const actual = isProduct(input) // Call function with non-object input
        expect(actual).toBe(expected) // Assert that result is false for non-objects
    })

    const malformedProductCases = [
        [{}],
        [{ name: "Keyboard", price: 250 }], // Missing id property
        [{ id: 2001, price: 250 }], // Missing name property
        [{ id: 2001, name: "Keyboard" }], // Missing price property
        [{ id: 2001, name: "Keyboard", price: "250kr" }], // Price is string instead of number
        [{ id: 2001, name: 999, price: 250 }], // Name is number instead of string
        [{ id: NaN, name: "Keyboard", price: 250 }], // ID is NaN 
        [{ id: 2001, name: "Keyboard", price: NaN }], // Price is NaN
        [{ id: 2001, name: "Keyboard", price: -25 }], // Price is negative (invalid)
        [{ id: 2001, name: "", price: 250 }], // Name is empty string
        [{ id: 2001, name: "   ", price: 250 }] // Name is only whitespace
    ]
    test.each(malformedProductCases)('should return false when product is object but invalid format (%s)', (input) => { // Test each malformed product case
        expect(isProduct(input)).toBe(false) // Assert that malformed objects return false
    })

    // Test edge cases that should be valid
    test("should accept free products (price = 0)", () => { // Test that price 0 is acceptable
        const freeProduct = { id: 2002, name: "Free Sample", price: 0 }
        expect(isProduct(freeProduct)).toBe(true) // Assert that free products are valid
    })

    test("should accept budget products (price = 1)", () => { // Test that price 1 is acceptable
        const budgetProduct = { id: 2003, name: "Dollar Item", price: 1 }
        expect(isProduct(budgetProduct)).toBe(true) // Assert that budget products are valid
    })
})