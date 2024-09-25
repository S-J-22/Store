// Global variables
let cart = [];
let wishlist = [];

// Utility Functions
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function updateTotalAmount() {
    let totalAmount = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}

// Add to Cart Function
function addToCart(productId) {
    let product = getProductById(productId);
    cart.push(product);
    updateCartCount();
    alert(`${product.name} has been added to the cart.`);
}

// Add to Wishlist Function
function addToWishlist(productId) {
    let product = getProductById(productId);
    wishlist.push(product);
    alert(`${product.name} has been added to the wishlist.`);
}

// Get Product by ID (Sample Function to Simulate Products)
function getProductById(productId) {
    // Example product list - you will replace this with actual product data
    const products = [
        { id: 1, name: 'Stylish Dress', price: 50 },
        { id: 2, name: 'Trendy Top', price: 30 },
        { id: 3, name: 'Comfy Pants', price: 40 },
    ];
    
    return products.find(product => product.id === productId);
}

// Display Cart Items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotalAmount();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCartItems();
    updateCartCount();
}

// Display Wishlist Items
function displayWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    wishlistItemsContainer.innerHTML = ''; // Clear previous items

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.innerHTML = `<span>${item.name}</span>`;
        wishlistItemsContainer.appendChild(wishlistItem);
    });
}

// Search Products
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const productList = document.getElementById('product-list');
    const products = productList.getElementsByClassName('product');

    Array.from(products).forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter by Category
function filterByCategory() {
    const category = document.getElementById('category-filter').value;
    const productList = document.getElementById('product-list');
    const products = productList.getElementsByClassName('product');

    Array.from(products).forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sort by Price
function sortByPrice() {
    const sortBy = document.getElementById('price-filter').value;
    const productList = document.getElementById('product-list');
    const products = Array.from(productList.getElementsByClassName('product'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('p').innerText.replace('$', ''));
        const priceB = parseFloat(b.querySelector('p').innerText.replace('$', ''));
        return sortBy === 'low-to-high' ? priceA - priceB : priceB - priceA;
    });

    products.forEach(product => productList.appendChild(product));
}

// Apply Coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    let discount = 0;

    if (couponCode === 'SAVE10') {
        discount = 0.1;
    } else if (couponCode === 'SAVE20') {
        discount = 0.2;
    } else {
        alert('Invalid coupon code.');
        return;
    }

    let totalAmount = cart.reduce((total, item) => total + item.price, 0);
    totalAmount = totalAmount - totalAmount * discount;
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);

    alert(`Coupon applied! You saved ${(discount * 100)}%.`);
}

// Form Validation for Login and Signup
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return false;
    }

    // Additional validation can be added here
    alert('Login successful!');
    return true;
}

function validateSignupForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return false;
    }

    // Additional validation can be added here
    alert('Signup successful!');
    return true;
}

// Email Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Event Listeners
document.getElementById('category-filter').addEventListener('change', filterByCategory);
document.getElementById('price-filter').addEventListener('change', sortByPrice);
document.getElementById('search-button').addEventListener('click', searchProducts);
document.getElementById('apply-coupon').addEventListener('click', applyCoupon);

// Event Listeners for Cart and Wishlist Buttons (Adjust as necessary)
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => addToCart(parseInt(button.getAttribute('data-product-id'))));
});

document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => addToWishlist(parseInt(button.getAttribute('data-product-id'))));
});

// Event Listeners for Form Submissions
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    validateLoginForm();
});

document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    validateSignupForm();
});
