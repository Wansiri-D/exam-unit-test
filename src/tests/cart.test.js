// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getCartValue, removeFromCart, editCart } from "../cart";
import { isCartItem } from "../validation";

describe("getCartItemCount", () => {
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("should return zero when cart is empty", () => { // Test empty cart scenario
        const expected = 0; // Expected count for empty cart
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that actual matches expected
    });

    test("should return one when you add one product", () => { // Test single product addition
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product object
        addToCart(product)

        const expected = 1; // Expected count after adding one product
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that count is 1
    });

    test("should return correct count after adding multiple products", () => { // Test multiple products addition
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first test product
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second test product

        addToCart(product)
        addToCart(product2)

        const expected = 2; // Expected count after adding two products
        const actual = getCartItemCount(); // Get actual count from function
        expect(actual).toBe(expected); // Assert that count is 2
    });

    test("should return correct count after removing products", () => { // Test product removal effect on count
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
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
        addToCart(input);

        expect(getItem(0).item.id).toBe(5001); // Assert that added product has correct ID
    });

    test("adds multiple new products to cart", () => { // Test adding multiple different products
        const itemCountBefore = getCartItemCount(); // Get initial count
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create first product
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product
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

    test("throws error when cart is empty", () => { // Test empty cart behavior (VG requirement)
        expect(() => getItem(0)).toThrow('Invalid cart index') // Assert that getting item from empty cart throws error
    })

    test("returns correct object with valid index", () => { // Test valid index retrieval
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
        addToCart(input) // Add product to cart
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

    test("throws error when index is too high", () => { // Test out of bounds index (VG requirement)
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
        addToCart(input)
        expect(() => getItem(1)).toThrow('Invalid cart index') // Assert that index 1 throws error (only index 0 exists)
    })

    const invalidIndexCases = [ // Array of invalid index test cases
        -1, // Negative index
        0.5, // Decimal index
        NaN, // Not a Number
        undefined, // Undefined value
        null, // Null value
        "zero" // String value
    ]
    test.each(invalidIndexCases)('throws error with invalid input: (%s)', (input) => { // Test each invalid index case (VG requirement)
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product to cart first
        expect(() => getItem(input)).toThrow('Invalid cart index') // Assert that invalid indices throw error
    })
})

describe("getCartValue", () => { // Group tests for cart value calculation (renamed from getTotalCartValue)
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("returns zero when cart is empty", () => { // Test empty cart value
        expect(getCartValue()).toBe(0) // Assert empty cart has value 0
    })

    test("returns sum of single item", () => { // Test single item value calculation
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add single product
        expect(getCartValue()).toBe(75) // Assert value equals product price
    })

    test("returns sum of multiple items with different amounts", () => { // Test multiple items calculation
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product

        addToCart(input1) // Add first product (amount = 1)
        addToCart(input1) // Add same product again (amount = 2)
        addToCart(input2) // Add second product (amount = 1)
        expect(getCartValue()).toBe(300) // Assert total value: (75*2) + 150 = 300
    })

    test("returns correct sum after editCart changed amount", () => { // Test value after editing
        const input = { id: 5001, name: "Gaming Mouse", price: 75 } // Create test product
        addToCart(input)
        
        const cartItem = getItem(0) // Get cart item
        editCart(cartItem.id, { amount: 4 }) // Change amount to 4
        expect(getCartValue()).toBe(300) // Assert new value: 75 * 4 = 300
    })
})

describe("removeFromCart", () => { // Group tests for removing products from cart
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("returns false when itemID doesn't exist in cart", () => { // Test non-existent item removal
        expect(removeFromCart(9999)).toBe(false) // Assert that removing non-existent ID returns false
    })

    test("throws error when itemID is not a number", () => { // Test invalid input type (VG requirement)
        expect(() => removeFromCart("invalid")).toThrow('Item ID must be a number') // Assert that string ID throws error
        expect(() => removeFromCart(null)).toThrow('Item ID must be a number') // Assert that null ID throws error
        expect(() => removeFromCart(undefined)).toThrow('Item ID must be a number') // Assert that undefined ID throws error
    })

    test("removes product by ItemID", () => { // Test successful product removal
        const input = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(input);
        
        const cartItem = getItem(0) // Get cart item
        const itemCountBefore = getCartItemCount(); // Get count before removal
        const result = removeFromCart(cartItem.id) // Remove item by ID
        const itemCountAfter = getCartItemCount(); // Get count after removal
        
        expect(result).toBe(true) // Assert removal was successful
        expect(itemCountAfter).toBe(itemCountBefore - 1); // Assert count decreased by 1
    })

    test("removes product from middle of list by ItemID", () => { // Test removing middle item from list
        const input1 = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create first product
        const input2 = { id: 5002, name: "Mechanical Keyboard", price: 150 }; // Create second product
        const input3 = { id: 5003, name: "Monitor Stand", price: 80 }; // Create third product
        
        addToCart(input1);
        addToCart(input2);
        addToCart(input3);
        
        const item1 = getItem(0) // Get first item reference
        const item2 = getItem(1) // Get second item reference
        const item3 = getItem(2) // Get third item reference
        
        const itemCountBefore = getCartItemCount(); // Get count before removal
        removeFromCart(item2.id) // Remove middle item
        const itemCountAfter = getCartItemCount(); // Get count after removal
        
        expect(itemCountAfter).toBe(itemCountBefore - 1); // Assert count decreased by 1
        expect(getItem(0).id).toBe(item1.id); // Assert first item still in position 0
        expect(getItem(1).id).toBe(item3.id); // Assert third item moved to position 1
    })
})

describe("editCart", () => { // Group tests for editing cart items
    beforeEach(() => { // Run before each test in this group
        clearCart(); // Clear cart to ensure clean state for each test
    });

    test("changes amount of product in cart", () => { // Test successful amount editing
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(product);
        
        const cartItem = getItem(0)
        const result = editCart(cartItem.id, { amount: 3 }); // Edit amount to 3

        expect(result).toBe(true) // Assert edit was successful
        expect(getItem(0).amount).toBe(3); // Assert amount was changed to 3
    });

    test("returns false when product doesn't exist", () => { // Test editing non-existent item
        expect(editCart(9999, { amount: 3 })).toBe(false) // Assert that editing non-existent ID returns false
    });

    test("throws error when itemID is not a number", () => { // Test invalid itemID type (VG requirement)
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product first
        expect(() => editCart("invalid", { amount: 2 })).toThrow('Item ID must be a number') // Assert string ID throws error
        expect(() => editCart(null, { amount: 2 })).toThrow('Item ID must be a number') // Assert null ID throws error
    })

    test("throws error when newValues is not an object", () => { // Test invalid newValues type (VG requirement)
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product first
        const cartItem = getItem(0) // Get cart item
        expect(() => editCart(cartItem.id, "invalid")).toThrow('New values must be an object') // Assert string newValues throws error
        expect(() => editCart(cartItem.id, null)).toThrow('New values must be an object') // Assert null newValues throws error
        expect(() => editCart(cartItem.id, 7)).toThrow('New values must be an object') // Assert number newValues throws error
    })

    test("throws error when amount is not a positive number", () => { // Test invalid amount values (VG requirement)
        addToCart({ id: 5001, name: "Gaming Mouse", price: 75 }) // Add product first
        const cartItem = getItem(0) // Get cart item
        expect(() => editCart(cartItem.id, { amount: 0 })).toThrow('Amount must be a positive number') // Assert zero amount throws error
        expect(() => editCart(cartItem.id, { amount: -3 })).toThrow('Amount must be a positive number') // Assert negative amount throws error
        expect(() => editCart(cartItem.id, { amount: "invalid" })).toThrow('Amount must be a positive number') // Assert string amount throws error
        expect(() => editCart(cartItem.id, { amount: NaN })).toThrow('Amount must be a positive number') // Assert NaN amount throws error
    })

    test("only changes amount property, not others", () => { // Test that only specified properties are changed
        const product = { id: 5001, name: "Gaming Mouse", price: 75 }; // Create test product
        addToCart(product);
        
        const cartItem = getItem(0) // Get cart item
        editCart(cartItem.id, { amount: 2, name: "Different Name" }); // Try to edit amount and name
        
        expect(getItem(0).amount).toBe(2); // Assert amount was changed
        expect(getItem(0).item.name).toBe("Gaming Mouse"); // Assert product name was not changed
    });
})

describe("clearCart", () => { // Group tests for clearing cart
    test("should make getCartItemCount return zero", () => { // Test that clear empties the cart
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product

        addToCart(product)
        addToCart(product2)
        clearCart()
        
        const expected = 0; // Expected count after clearing
        const actual = getCartItemCount(); // Get actual count
        expect(actual).toBe(expected); // Assert cart is empty
    });

    test("should make getCartValue return zero", () => { // Test that clear resets cart value
        const product = { id: 5001, name: "Gaming Mouse", price: 75 } // Create first product
        const product2 = { id: 5002, name: "Mechanical Keyboard", price: 150 } // Create second product

        addToCart(product)
        addToCart(product2)
        clearCart()
        
        const expected = 0; // Expected value after clearing
        const actual = getCartValue(); // Get actual value
        expect(actual).toBe(expected); // Assert cart value is 0
    });

    test("should work when cart is already empty", () => { // Test clearing already empty cart
        clearCart()
        expect(getCartItemCount()).toBe(0); // Assert cart remains empty
    })
})