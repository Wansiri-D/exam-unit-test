// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(maybeCartItem) {
    // Verify it's an object and not null
    if (typeof maybeCartItem !== 'object' || maybeCartItem === null) { // Check if input is object type and not null value
        return false
    }
    
    // Validate required properties exist with correct types
    if (typeof maybeCartItem.id !== 'number' || isNaN(maybeCartItem.id)) { // Check if id property exists and is a valid number
        return false // Return false if id is missing or not a number
    }
    
    if (typeof maybeCartItem.amount !== 'number' || isNaN(maybeCartItem.amount) || maybeCartItem.amount <= 0) { // Check if amount is number and positive
        return false // Return false if amount is invalid or zero/negative
    }
    
    if (typeof maybeCartItem.item !== 'object' || maybeCartItem.item === null) { // Check if item property is a valid object
        return false // Return false if item is not an object
    }
    
    // Verify item is a valid product
    if (!isProduct(maybeCartItem.item)) { // Call isProduct function to validate the item property
        return false // Return false if item is not a valid product
    }
    
    return true // Return true if all validations pass
}

function isProduct(maybeProduct) {
    // Verify it's an object and not null
    if (typeof maybeProduct !== 'object' || maybeProduct === null) { // Check if input is object type and not null value
        return false // Return false if input is not a valid object
    }
    
    // Validate all required properties exist with correct types
    if (typeof maybeProduct.id !== 'number' || isNaN(maybeProduct.id)) { // Check if id property exists and is a valid number
        return false // Return false if id is missing or not a number
    }
    
    if (typeof maybeProduct.name !== 'string' || maybeProduct.name.trim() === '') { // Check if name is string and not empty after trimming
        return false // Return false if name is invalid or empty
    }
    
    // Allow price 0 and above
    if (typeof maybeProduct.price !== 'number' || isNaN(maybeProduct.price) || maybeProduct.price < 0) { // Check if price is valid number and not negative
        return false // Return false if price is invalid or negative
    }
    
    return true // Return true if all validations pass
}

export { isCartItem, isProduct }