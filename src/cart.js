import { isCartItem, isProduct } from "./validation.js"

let cart = [] // Initialize empty array to store cart items
let idCounter = 2002 // Initialize counter for generating unique cart item IDs

// Consistent error handling: return null instead of throwing errors
function getItem(index) {
    // Input validation with null return instead of error throwing
    if (index === null || // Check if index is null
        typeof index !== "number" || // Check if index is not a number
        !Number.isInteger(index) || // Check if index is not an integer
        isNaN(index) || // Check if index is NaN
        index < 0 || // Check if index is negative
        index >= cart.length) { // Check if index exceeds cart array bounds
        return null // Return null for any invalid index input
    }
    return cart[index] // Return cart item at specified index
}

function getCartItemCount() {
    return cart.length // Return the number of items in cart array
}

function getTotalCartValue() {
    return cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.amount, 0) // Calculate total by multiplying price * amount for each item and summing
}

// Fixed: Consistent return type (always boolean)
function addToCart(newItem) {
    if (!isProduct(newItem)) { // Validate that newItem is a proper product using isProduct function
        return false // Return false if product validation fails
    }
    
    // Check if product already exists in cart
    const existing = cart.find(cartItem => cartItem.item.id === newItem.id) // Search for existing item with same product ID
    if (existing) { // If product already exists in cart
        existing.amount++ // Increment the amount of existing item
        return true // Fixed: Now always returns boolean - return true for successful addition
    } else { // If product doesn't exist in cart yet
        const newCartItem = { id: idCounter, amount: 1, item: newItem } // Create new cart item with unique ID, amount 1, and the product
        idCounter++ // Increment ID counter for next cart item
        cart.push(newCartItem) // Add new cart item to cart array
        return true // Fixed: Consistent return type - return true for successful addition
    }
}

function removeFromCart(itemId) {
    // Input validation
    if (typeof itemId !== 'number') { // Check if itemId parameter is a number
        return false // Return false if itemId is not a number
    }
    
    const itemIndex = cart.findIndex(item => item.id === itemId) // Find index of cart item with matching ID
    if (itemIndex === -1) { // If no item found with that ID
        return false // Return false indicating removal failed
    }
    
    cart.splice(itemIndex, 1) // Remove item from cart array at found index
    return true // Fixed: Always return boolean - return true for successful removal
}

// Fixed: Consistent error handling with return instead of throw
function editCart(itemId, newValues) {
    // Input validation
    if (typeof itemId !== 'number') { // Check if itemId parameter is a number
        return false // Return false if itemId is not a number
    }
    
    if (typeof newValues !== "object" || newValues === null) { // Check if newValues is a valid object
        return false // Return false if newValues is not an object
    }
    
    const cartItem = cart.find(item => item.id === itemId) // Find cart item with matching ID
    if (!cartItem) { // If no cart item found with that ID
        return false // Return false indicating edit failed
    }
    
    // Validate amount if provided
    if ('amount' in newValues) { // Check if amount property exists in newValues object
        if (typeof newValues.amount !== "number" || // Check if amount is a number
            isNaN(newValues.amount) || // Check if amount is not NaN
            newValues.amount <= 0) { // Check if amount is positive
            return false // Return false if amount validation fails
        }
        cartItem.amount = newValues.amount // Update cart item amount with new value
    }
    
    return true // Return true indicating successful edit
}

function clearCart() {
    cart = [] // Reset cart to empty array
}

export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue, removeFromCart, editCart }