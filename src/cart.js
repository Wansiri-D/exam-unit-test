import { isCartItem, isProduct } from "./validation.js" // Import validation functions from validation module

let cart = [] // Initialize empty array to store cart items
let idCounter = 2002 // Initialize counter for generating unique cart item IDs

// Error handling: throw errors for invalid inputs (for VG requirement)
function getItem(index) {
    // Input validation with error throwing for invalid cases
    if (index === null || // Check if index is null
        typeof index !== "number" || // Check if index is not a number
        !Number.isInteger(index) || // Check if index is not an integer
        isNaN(index) || // Check if index is NaN (Not a Number)
        index < 0 || // Check if index is negative
        index >= cart.length) { // Check if index exceeds cart array bounds
        throw new Error('Invalid cart index') // Throw error for any invalid index input
    }
    return cart[index] // Return cart item at specified index
}

function getCartItemCount() {
    return cart.length // Return the number of items in cart array
}

// Renamed from getTotalCartValue to match requirements
function getCartValue() {
    return cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.amount, 0) // Calculate total by multiplying price * amount for each item and summing
}

// Consistent return type (always boolean) for valid/invalid operations
function addToCart(newItem) {
    if (!isProduct(newItem)) { // Validate that newItem is a proper product using isProduct function
        return false // Return false if product validation fails
    }
    
    // Check if product already exists in cart
    const existing = cart.find(cartItem => cartItem.item.id === newItem.id) // Search for existing item with same product ID
    if (existing) { // If product already exists in cart
        existing.amount++ // Increment the amount of existing item
        return true // Return true for successful addition
    } else { // If product doesn't exist in cart yet
        const newCartItem = { id: idCounter, amount: 1, item: newItem } // Create new cart item with unique ID, amount 1, and the product
        idCounter++ // Increment ID counter for next cart item
        cart.push(newCartItem) // Add new cart item to cart array
        return true // Return true for successful addition
    }
}

// Mixed error handling: return false for not found, throw for invalid input types
function removeFromCart(itemId) {
    // Input validation - throw error for wrong type
    if (typeof itemId !== 'number') { // Check if itemId parameter is a number
        throw new Error('Item ID must be a number') // Throw error if itemId is not a number
    }
    
    const itemIndex = cart.findIndex(item => item.id === itemId) // Find index of cart item with matching ID
    if (itemIndex === -1) { // If no item found with that ID
        return false // Return false indicating removal failed (item not found)
    }
    
    cart.splice(itemIndex, 1) // Remove item from cart array at found index
    return true // Return true for successful removal
}

// Mixed error handling: throw for invalid input, return false for not found
function editCart(itemId, newValues) {
    // Input validation - throw errors for invalid input types
    if (typeof itemId !== 'number') { // Check if itemId parameter is a number
        throw new Error('Item ID must be a number') // Throw error if itemId is not a number
    }
    
    if (typeof newValues !== "object" || newValues === null) { // Check if newValues is a valid object
        throw new Error('New values must be an object') // Throw error if newValues is not an object
    }
    
    const cartItem = cart.find(item => item.id === itemId) // Find cart item with matching ID
    if (!cartItem) { // If no cart item found with that ID
        return false // Return false indicating edit failed (item not found)
    }
    
    // Validate amount if provided
    if ('amount' in newValues) { // Check if amount property exists in newValues object
        if (typeof newValues.amount !== "number" || // Check if amount is a number
            isNaN(newValues.amount) || // Check if amount is not NaN
            newValues.amount <= 0) { // Check if amount is positive
            throw new Error('Amount must be a positive number') // Throw error if amount validation fails
        }
        cartItem.amount = newValues.amount // Update cart item amount with new value
    }
    
    return true // Return true indicating successful edit
}

function clearCart() {
    cart = []
}

export { getCartItemCount, addToCart, clearCart, getItem, getCartValue, removeFromCart, editCart }