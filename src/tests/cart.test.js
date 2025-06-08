import { addToCart, getCartItemCount, clearCart, getItem, getCartValue, removeFromCart, editCart } from "../cart";
import { isCartItem } from "../validation";

const products = {
    laptop: { id: 1001, name: "Gaming Laptop", price: 1200 },
    mouse: { id: 1002, name: "Wireless Mouse", price: 45 },
    keyboard: { id: 1003, name: "RGB Keyboard", price: 89 }
};

const invalidProducts = {
    stringPrice: { id: 2001, name: "Invalid Item", price: "100" },
    negativePrice: { id: 2002, name: "Bad Item", price: -50 },
    missingId: { name: "Incomplete", price: 25 }
};

describe("getCartItemCount", () => {
    beforeEach(() => clearCart());

    test("returns zero when cart is empty", () => {
        expect(getCartItemCount()).toBe(0);
    });

    test("returns correct count for single and multiple products", () => {
        addToCart(products.laptop);
        expect(getCartItemCount()).toBe(1);
        
        addToCart(products.mouse);
        addToCart(products.keyboard);
        expect(getCartItemCount()).toBe(3);
    });

    test("returns correct count after removal", () => {
        addToCart(products.laptop);
        removeFromCart(getItem(0).id);
        expect(getCartItemCount()).toBe(0);
    });
});

describe("addToCart", () => {
    beforeEach(() => clearCart());

    test("adds new product correctly", () => {
        const before = getCartItemCount();
        addToCart(products.laptop);
        
        expect(getCartItemCount()).toBe(before + 1);
        expect(getItem(0).item.id).toBe(products.laptop.id);
        expect(isCartItem(getItem(0))).toBe(true);
    });

    test("increases amount for duplicate product", () => {
        addToCart(products.mouse);
        addToCart(products.mouse);
        expect(getItem(0).amount).toBe(2);
    });

    test("rejects invalid products", () => {
        const before = getCartItemCount();
        
        expect(addToCart(invalidProducts.stringPrice)).toBe(false);
        expect(addToCart(invalidProducts.negativePrice)).toBe(false);
        expect(addToCart(invalidProducts.missingId)).toBe(false);
        expect(addToCart(null)).toBe(false);
        
        expect(getCartItemCount()).toBe(before);
    });
});

describe("getItem", () => {
    beforeEach(() => clearCart());

    test("throws error when cart is empty", () => {
        expect(() => getItem(0)).toThrow('Invalid cart index');
    });

    test("returns correct items with valid indices", () => {
        addToCart(products.laptop);
        addToCart(products.mouse);
        
        expect(getItem(0).item.name).toBe("Gaming Laptop");
        expect(getItem(1).item.name).toBe("Wireless Mouse");
    });

    test("throws error for invalid indices", () => {
        addToCart(products.keyboard);
        
        expect(() => getItem(5)).toThrow('Invalid cart index');
        expect(() => getItem(-1)).toThrow('Invalid cart index');
        expect(() => getItem("invalid")).toThrow('Invalid cart index');
    });
});

describe("getCartValue", () => {
    beforeEach(() => clearCart());

    test("returns zero for empty cart", () => {
        expect(getCartValue()).toBe(0);
    });

    test("calculates values correctly", () => {
        addToCart(products.laptop); // 1200
        expect(getCartValue()).toBe(1200);
        
        addToCart(products.mouse);   // 45 * 1
        addToCart(products.mouse);   // 45 * 2 = 90
        expect(getCartValue()).toBe(1290); // 1200 + 90
    });

    test("updates after editing amount", () => {
        addToCart(products.keyboard); // 89
        editCart(getItem(0).id, { amount: 3 });
        expect(getCartValue()).toBe(267); // 89 * 3
    });
});

describe("removeFromCart", () => {
    beforeEach(() => clearCart());

    test("returns false for non-existent item", () => {
        expect(removeFromCart(9999)).toBe(false);
    });

    test("throws error for invalid itemID types", () => {
        expect(() => removeFromCart("string")).toThrow('Item ID must be a number');
        expect(() => removeFromCart(null)).toThrow('Item ID must be a number');
    });

    test("successfully removes existing item", () => {
        addToCart(products.laptop);
        const itemId = getItem(0).id;
        
        expect(removeFromCart(itemId)).toBe(true);
        expect(getCartItemCount()).toBe(0);
    });

    test("removes correct item from multiple items", () => {
        addToCart(products.laptop);
        addToCart(products.mouse);
        addToCart(products.keyboard);
        
        const mouseId = getItem(1).id;
        removeFromCart(mouseId);
        
        expect(getCartItemCount()).toBe(2);
        expect(getItem(0).item.name).toBe("Gaming Laptop");
        expect(getItem(1).item.name).toBe("RGB Keyboard");
    });
});

describe("editCart", () => {
    beforeEach(() => clearCart());

    test("successfully changes item amount", () => {
        addToCart(products.laptop);
        const itemId = getItem(0).id;
        
        expect(editCart(itemId, { amount: 3 })).toBe(true);
        expect(getItem(0).amount).toBe(3);
    });

    test("returns false for non-existent item", () => {
        expect(editCart(9999, { amount: 2 })).toBe(false);
    });

    test("throws error for invalid types", () => {
        addToCart(products.mouse);
        const itemId = getItem(0).id;
        
        // Invalid itemID types
        expect(() => editCart("string", { amount: 2 })).toThrow('Item ID must be a number');
        expect(() => editCart(null, { amount: 2 })).toThrow('Item ID must be a number');
        
        // Invalid newValues types
        expect(() => editCart(itemId, "string")).toThrow('New values must be an object');
        expect(() => editCart(itemId, null)).toThrow('New values must be an object');
        
        // Invalid amount values
        expect(() => editCart(itemId, { amount: 0 })).toThrow('Amount must be a positive number');
        expect(() => editCart(itemId, { amount: -1 })).toThrow('Amount must be a positive number');
        expect(() => editCart(itemId, { amount: "string" })).toThrow('Amount must be a positive number');
    });

    test("only modifies allowed properties", () => {
        addToCart(products.keyboard);
        const itemId = getItem(0).id;
        
        editCart(itemId, { amount: 2, name: "Hacked", price: 999 });
        
        const item = getItem(0);
        expect(item.amount).toBe(2);
        expect(item.item.name).toBe("RGB Keyboard"); // unchanged
        expect(item.item.price).toBe(89); // unchanged
    });
});

describe("clearCart", () => {
    beforeEach(() => clearCart());

    test("empties cart and resets value", () => {
        addToCart(products.laptop);
        addToCart(products.mouse);
        
        expect(getCartItemCount()).toBe(2);
        expect(getCartValue()).toBeGreaterThan(0);
        
        clearCart();
        
        expect(getCartItemCount()).toBe(0);
        expect(getCartValue()).toBe(0);
    });

    test("works on already empty cart", () => {
        clearCart();
        expect(getCartItemCount()).toBe(0);
        expect(getCartValue()).toBe(0);
    });
});

describe("Cart Integration", () => {
    beforeEach(() => clearCart());

    test("complete shopping workflow", () => {
        // Add items
        addToCart(products.laptop);  // 1200
        addToCart(products.mouse);   // 45
        addToCart(products.mouse);   // amount = 2
        
        expect(getCartItemCount()).toBe(2);
        expect(getCartValue()).toBe(1290); // 1200 + (45*2)
        
        // Edit quantity
        const mouseId = getItem(1).id;
        editCart(mouseId, { amount: 3 });
        expect(getCartValue()).toBe(1335); // 1200 + (45*3)
        
        // Remove item
        removeFromCart(mouseId);
        expect(getCartItemCount()).toBe(1);
        expect(getCartValue()).toBe(1200);
        
        // Clear all
        clearCart();
        expect(getCartItemCount()).toBe(0);
        expect(getCartValue()).toBe(0);
    });

    test("handles mixed valid and invalid operations", () => {
        addToCart(products.keyboard);
        
        // Valid operation
        expect(addToCart(products.laptop)).toBe(true);
        expect(getCartItemCount()).toBe(2);
        
        // Invalid operations
        expect(addToCart(invalidProducts.stringPrice)).toBe(false);
        expect(() => removeFromCart("invalid")).toThrow('Item ID must be a number');
        
        // Cart state unchanged by invalid operations
        expect(getCartItemCount()).toBe(2);
    });
});