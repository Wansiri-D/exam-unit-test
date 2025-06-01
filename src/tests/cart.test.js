// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue, removeFromCart, editCart } from "../cart";
import { isCartItem } from "../validation";

describe("getCartItemCount", () => { // Group tests for cart item counting functionality
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("should return zero when cart is empty", () => { // Test empty cart scenario
        const expected = 0; // Expected count for empty cart
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that actual matches expected
    });

    test("should return one when you add one product", () => { // Test single product addition
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }
        addToCart(product) // Add product to cart

        const expected = 1; // Expected count after adding one product
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that count is 1
    });

    test("should return correct count after adding multiple products", () => { // Test multiple products addition
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 }

        addToCart(product)
        addToCart(product2)

        const expected = 2; // Expected count after adding two products
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that count is 2
    });

    test("should return correct count after removing products", () => { // Test product removal effect on count
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }
        addToCart(product)
        
        const cartItem = getItem(0) // Get cart item at index 0
        removeFromCart(cartItem.id) // Remove cart item by its ID

        expect(getCartItemCount()).toBe(0); // Assert that count is 0 after removal
    });
})

describe("addToCart", () => { // Group tests for adding products to cart
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("adds new product to cart", () => { // Test basic product addition
        const itemCountBefore = getCartItemCount(); // Get count before adding
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(input); // Add product to cart
        const itemCountAfter = getCartItemCount(); // Get count after adding

        expect(itemCountAfter).toBe(itemCountBefore + 1); // Assert count increased by 1
    });

    test("adds correct product", () => { // Test that correct product is added
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(input); // Add product to cart

        expect(getItem(0).item.id).toBe(5001); // Assert that added product has correct ID
    });

    test("adds multiple new products to cart", () => { // Test adding multiple different products
        const itemCountBefore = getCartItemCount(); // Get initial count
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 };
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 }
        addToCart(input1);
        addToCart(input2);

        const itemCountAfter = getCartItemCount(); // Get final count
        expect(itemCountAfter).toBe(itemCountBefore + 2); // Assert count increased by 2
    });

    test("increases amount when adding existing product", () => { // Test duplicate product handling
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product

        addToCart(input); // Add product first time
        addToCart(input); // Add same product again

        expect(getItem(0).amount).toBe(2); // Assert amount increased to 2
    });

    test("converts to valid cart object", () => { // Test that added product becomes valid cart item
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(input);

        const addedCartItem = getItem(0) // Get the added cart item
        expect(isCartItem(addedCartItem)).toBe(true); // Assert it's a valid cart item
    });

    test("returns false when trying to add invalid product", () => { // Test invalid product rejection
        const input = { id: 5001, name: "Gaming Mouse", price: "75" }; // Create invalid product (price as string)
        expect(addToCart(input)).toBe(false) // Assert function returns false for invalid input
    });

    test("skips adding invalid product", () => { // Test that invalid products don't get added
        const input = { id: 5001, name: "Gaming Mouse", price: "75" }; // Create invalid product
        addToCart(input); // Attempt to add invalid product

        expect(getCartItemCount()).toBe(0); // Assert cart remains empty
    });
});

describe("getItem", () => { // Group tests for getting items by index
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("returns null when cart is empty", () => { // Test empty cart behavior
        expect(getItem(0)).toBe(null) // Assert that getting item from empty cart returns null
    })

    test("returns correct object with valid index", () => { // Test valid index retrieval
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
        addToCart(input)
        expect(getItem(0).item.name).toBe("Gaming Mouse") // Assert correct product name at index 0
    })

    test("returns multiple objects correctly with valid indices", () => { // Test multiple items retrieval
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const input2 = { id: 5002, name: "Wireless Headset", price: 120 } // Create second product
        addToCart(input1)
        addToCart(input2)
        expect(getItem(0).item.name).toBe("Gaming Mouse") // Assert first item name
        expect(getItem(1).item.name).toBe("Wireless Headset") // Assert second item name
    })

    test("returns null when index is too high", () => { // Test out of bounds index
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
        addToCart(input)
        expect(getItem(1)).toBe(null) // Assert that index 1 returns null (only index 0 exists)
    })

    const invalidIndexCases = [ // Array of invalid index test cases
        -1, // Negative index
        0.5, // Decimal index
        NaN, // Not a Number
        undefined, // Undefined value
        null, // Null value
        "zero" // String value
    ]
    test.each(invalidIndexCases)('returns null with invalid input: (%s)', (input) => { // Test each invalid index case
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 })
        expect(getItem(input)).toBe(null) // Assert that invalid index returns null
    })
})

describe("getTotalCartValue", () => { // Group tests for calculating total cart value
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("returns zero when cart is empty", () => { // Test empty cart total value
        expect(getTotalCartValue()).toBe(0) // Assert that empty cart has total value of 0
    })

    test("returns sum of single item", () => { // Test single item total calculation
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product with price 75
        expect(getTotalCartValue()).toBe(75) // Assert total equals product price
    })

    test("returns sum of multiple items with different amounts", () => { // Test multiple items total calculation
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product (price 75)
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product (price 150)

        addToCart(input1) // Add first product (amount 1)
        addToCart(input1) // Add same product again (amount becomes 2)
        addToCart(input2) // Add second product (amount 1)
        expect(getTotalCartValue()).toBe(300) // Assert total: (75*2) + (150*1) = 300
    })

    test("returns correct sum after editCart changed amount", () => { // Test total after editing amount
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create product with price 75
        addToCart(input)
        
        const cartItem = getItem(0) // Get cart item at index 0
        editCart(cartItem.id, { amount: 4 }) // Change amount to 4
        expect(getTotalCartValue()).toBe(300) // Assert total: 75 * 4 = 300
    })
})

describe("removeFromCart", () => { // Group tests for removing items from cart
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("returns false when itemID doesn't exist in cart", () => { // Test removing non-existent item
        expect(removeFromCart(9999)).toBe(false) // Assert that removing non-existent ID returns false
    })

    test("removes product by ItemID", () => { // Test successful product removal
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(input);
        
        const cartItem = getItem(0) // Get cart item at index 0
        const itemCountBefore = getCartItemCount(); // Get count before removal
        const result = removeFromCart(cartItem.id) // Remove item by ID
        const itemCountAfter = getCartItemCount(); // Get count after removal
        
        expect(result).toBe(true) // Assert removal function returns true
        expect(itemCountAfter).toBe(itemCountBefore - 1); // Assert count decreased by 1
    })

    test("removes product from middle of list by ItemID", () => { // Test removing middle item from multiple items
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create first product
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 }; // Create second product
        const input3 = { id: 5003, name: "Monitor Stand", price: 80 }; // Create third product
        
        addToCart(input1);
        addToCart(input2);
        addToCart(input3);
        
        const item1 = getItem(0) // Get first cart item
        const item2 = getItem(1) // Get second cart item
        const item3 = getItem(2) // Get third cart item
        
        const itemCountBefore = getCartItemCount(); // Get count before removal
        removeFromCart(item2.id) // Remove middle item (second product)
        const itemCountAfter = getCartItemCount(); // Get count after removal
        
        expect(itemCountAfter).toBe(itemCountBefore - 1); // Assert count decreased by 1
        expect(getItem(0).id).toBe(item1.id); // Assert first item unchanged
        expect(getItem(1).id).toBe(item3.id); // Assert third item moved to index 1
    })

    const invalidInputCases = [ // Array of invalid input test cases
        -1, // Negative number
        0.5, // Decimal number
        NaN, // Not a Number
        undefined, // Undefined value
        null, // Null value
        "invalid" // String value
    ]
    test.each(invalidInputCases)('returns false with invalid input: (%s)', (input) => { // Test each invalid input case
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product to cart first
        expect(removeFromCart(input)).toBe(false) // Assert that invalid input returns false
    })
})

describe("editCart", () => { // Group tests for editing cart items
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("changes amount of product in cart", () => { // Test successful amount change
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(product); // Add product to cart
        
        const cartItem = getItem(0) // Get cart item at index 0
        const result = editCart(cartItem.id, { amount: 3 }); // Change amount to 3

        expect(result).toBe(true) // Assert edit function returns true
        expect(getItem(0).amount).toBe(3); // Assert amount changed to 3
    });

    test("returns false when product doesn't exist", () => { // Test editing non-existent product
        expect(editCart(9999, { amount: 3 })).toBe(false) // Assert that editing non-existent ID returns false
    });

    const invalidObjectCases = [ // Array of invalid newValues test cases
        null, // Null value
        7, // Number value
        "invalid" // String value
    ]
    test.each(invalidObjectCases)('returns false when newValues is not an object: (%s)', (input) => { // Test each invalid newValues case
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product to cart first
        const cartItem = getItem(0) // Get cart item
        expect(editCart(cartItem.id, input)).toBe(false) // Assert that invalid newValues returns false
    })

    const invalidAmountCases = [ // Array of invalid amount test cases
        0, // Zero amount
        -3, // Negative amount
        "invalid", // String amount
        undefined, // Undefined amount
        null, // Null amount
        NaN // Not a Number amount
    ]
    test.each(invalidAmountCases)('returns false when amount is not a positive number: (%s)', (input) => { // Test each invalid amount case
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product to cart first
        const cartItem = getItem(0) // Get cart item
        expect(editCart(cartItem.id, { amount: input })).toBe(false) // Assert that invalid amount returns false
    })

    test("only changes amount property, not others", () => { // Test that only amount property is modified
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(product); // Add product to cart
        
        const cartItem = getItem(0) // Get cart item
        editCart(cartItem.id, { amount: 2, name: "Different Name" }); // Try to change amount and name
        
        expect(getItem(0).amount).toBe(2); // Assert amount changed
        expect(getItem(0).item.name).toBe("Gaming Mouse"); // Assert name unchanged
    });
})

describe("clearCart", () => { // Group tests for clearing cart functionality
    test("should make getCartItemCount return zero", () => { // Test that clear cart resets count to zero
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product

        addToCart(product) // Add first product
        addToCart(product2) // Add second product
        clearCart() // Clear all items from cart
        
        const expected = 0; // Expected count after clearing
        const actual = getCartItemCount(); // Get actual count
        expect(actual).toBe(expected); // Assert count is 0
    });

    test("should make getTotalCartValue return zero", () => { // Test that clear cart resets total value to zero
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product

        addToCart(product) // Add first product
        addToCart(product2) // Add second product
        clearCart() // Clear all items from cart
        
        const expected = 0; // Expected total value after clearing
        const actual = getTotalCartValue(); // Get actual total value
        expect(actual).toBe(expected); // Assert total value is 0
    });

    test("should work when cart is already empty", () => { // Test clearing already empty cart
        clearCart() // Clear cart that's already empty
        expect(getCartItemCount()).toBe(0); // Assert count remains 0
    })
})