let totalAmountForForm;
const buyAllButton = document.getElementById('buy-all-btn');
var closeModalButton = document.getElementById('close-modal');
const purchaseForm = document.getElementById('purchase-form');
const checkoutButton = document.getElementById('checkout-btn');
const purchasedproductsList = document.getElementById('purchased-products-list');


function calculateCartTotal(cart) {
    let cartTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        cartTotal += cart[i].price;
    }
    return cartTotal;
}

// Function to retrieve cart data from local storage
function getCartData() {
    var cartData = localStorage.getItem('cart');

    // Parse it from JSON format to a JavaScript array
    if (cartData) {
        return JSON.parse(cartData);
    } else {
        // Return an empty array
        return [];
    }
}

function displayCartedproducts() {
    var cartedproductsList = document.getElementById('carted-products-list');
    var cart = getCartData();
    console.log(cart)
    cartedproductsList.innerHTML = '';

    for (var index = 0; index < cart.length; index++) {
        var product = cart[index];
        var cartedproductDiv = document.createElement('div');
        cartedproductDiv.classList.add('carted-product');

        var img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.width = 100;
        img.height = 150;

        var h3 = document.createElement('h3');
        h3.textContent = product.title;

        var authorPara = document.createElement('p');
        authorPara.textContent = 'Author: ' + product.author;

        var pricePara = document.createElement('p');
        pricePara.textContent = 'Price: Rs.' + product.price;

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.setAttribute('data-product-index', index);
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function () {
            var productIndex = this.getAttribute('data-product-index');
            removeFromCart(productIndex);
        });

        cartedproductDiv.appendChild(img);
        cartedproductDiv.appendChild(h3);
        cartedproductDiv.appendChild(authorPara);
        cartedproductDiv.appendChild(pricePara);
        cartedproductDiv.appendChild(deleteButton);
        cartedproductsList.appendChild(cartedproductDiv);
    }
    // Update the total amount display in the purchase form modal
    const totalAmountSpanModal = document.getElementById('total-amount-modal');
    let totalAmount = calculateCartTotal(cart);
    totalAmountSpanModal.textContent = `Rs.${totalAmount.toFixed(2)}`;
}

function removeFromCart(productIndex) {
    var cart = getCartData();
    if (productIndex >= 0 && productIndex < cart.length) {
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartedproducts();
    } else {
        alert('Invalid product index.');
    }
}



// Add a new function to display carted product titles
function displayCartedproductTitles(cart) {
    var cartedproductsList = document.getElementById('carted-products-list');
    cartedproductsList.innerHTML = '';

    for (var index = 0; index < cart.length; index++) {
        var product = cart[index];
        
        var cartedproductTitle = document.createElement('div');
        cartedproductTitle.textContent = product.title;
        cartedproductsList.appendChild(cartedproductTitle);

        var cartedproductPrice = document.createElement('p');
        cartedproductPrice.textContent = product.price;
        cartedproductsList.appendChild(cartedproductPrice); // Append price to the list
    }
}

// Add an event listener for the checkout button
checkoutButton.addEventListener('click', function () {
    const cart = getCartData();
    displayCartedproductTitles(cart);
});


buyAllButton.addEventListener('click', function () {
    // Display the purchase form
    const modal = document.getElementById('buy-modal');
    modal.style.display = 'block';

    // Calculate the total price for all products in the cart
    totalAmountForForm = calculateCartTotal(cart); // Store the total amount for the form
    
    // Display the total amount in the form
    const totalAmountSpan = document.getElementById('total-amount');
    totalAmountSpan.textContent = `Rs.${totalAmountForForm.toFixed(2)}`;
});

closeModalButton.addEventListener('click', function () {
    var modal = document.getElementById('buy-modal');
    modal.style.display = 'none';
    // Reset the form when the modal is closed
    var purchaseForm = document.getElementById('purchase-form');
    purchaseForm.reset();
});

purchaseForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
   
    // Recalculate the total amount based on the current state of the cart
    const cart = getCartData();
    let totalAmount = calculateCartTotal(cart);
  
    // Display the total amount in the modal
    const totalAmountSpanModal = document.getElementById('total-amount-modal');
    totalAmountSpanModal.textContent = `Rs.${totalAmount.toFixed(2)}`;

    // Show an alert message with the total amount
    let confirmationMessage = `Purchase confirmed!\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nContact: ${contact}\nTotal Amount: Rs.${totalAmount.toFixed(2)}`;
    alert(confirmationMessage);

    // Reset the form
    purchaseForm.reset();

    // Close the purchase form modal
    const modal = document.getElementById('buy-modal');
    modal.style.display = 'none';

    // Update the total amount in the cart summary div
    const cartTotalAmountSpan = document.getElementById('cart-total-amount');
    cartTotalAmountSpan.textContent = `Rs.${totalAmount.toFixed(2)}`; // Update the cart total amount

});

displayCartedproducts();

// checkoutButton.addEventListener('onmouseover', function (){
   
// })


checkoutButton.addEventListener('click', function() {
    document.querySelector('.confirmed-order').classList.remove('hidden')
    document.querySelector('.overlay').classList.remove('hidden')
    // var googlePayUrl = 'https://pay.google.com';

    // window.open(googlePayUrl, '_blank');

});


document.querySelector('.overlay').addEventListener('click', function(){
    document.querySelector('.confirmed-order').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
})
