
const cart = [];

const product = [
    { id: 1, title: 'chanadal',  price: 199, image: 'img/chanadal.png' },
    { id: 2, title: 'Soya', price: 147, image: 'img/chavali.png' },
    { id: 3, title: 'coffee', price: 248, image: 'img/coffee.jpg' },
    { id: 4, title: 'edible-oil', price: 196, image: 'img/edible-oil.jpg' },
    { id: 5, title: 'washingsoda',  price: 143, image: 'img/washingsoda.png' },
    { id: 6, title: 'wheat',  price: 242, image: 'img/wheat.jpg' },
    { id: 7, title: 'pulses', price: 169, image: 'img/pulses.jpg' },
    { id: 8, title: 'rice', price: 195, image: 'img/rice.png' },
    { id: 9, title: 'Eggs(each)',  price: 7, image: 'img/eggs.jpg' },
    { id: 10, title: 'Orange Juice',  price: 90, image: 'img/orage-juice.jpg' },
    { id: 11, title: 'pulses', price: 169, image: 'img/pulses.jpg' },
    { id: 12, title: 'rice', price: 195, image: 'img/rice.png' },
];

function createproductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" width="150" height="200">
        <h2><a href="#" onclick="openModal(${product.id}); return false;">${product.title}</a></h2>
        <p>Price: Rs.${product.price}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;

    const addToCartButton =productDiv.querySelector('.add-to-cart-btn');
    addToCartButton.addEventListener('click', function () {
        addToCart(product.id);
    });


    return productDiv;
}

function displayproduct() {
    var productList = document.getElementById('product-list');
        productList.innerHTML = '';
        for (var i = 0; i < product.length; i++) {
            var productElement = createproductElement(product[i]);
            productList.appendChild(productElement);
        }
    } 


function addToCart(productId) {
    let selectedproduct = null;
    for (let i = 0; i < product.length; i++) {
        if (product[i].id === productId) {
            selectedproduct = product[i];
            break;
        }
    }
    if (selectedproduct) {
        cart.push(selectedproduct);
        alert(`Added "${selectedproduct.title}" to the cart.`);
    } else {
        alert('product not found.');
    }
}

function viewCart() {
    // Convert the cart array to a JSON string
    var cartJson = JSON.stringify(cart);

    // Store the JSON string in localStorage with the key 'cart'
    localStorage.setItem('cart', cartJson);

    // Change the current page's URL to 'cart.html'
    window.location.href = 'cart.html';
}

function openModal(productId) {
    var selectedproduct = null;
    for (var i = 0; i < product.length; i++) {
        if (product[i].id === productId) {
            selectedproduct = product[i];
            break;
        }
    }
    if (selectedproduct) {
        const modalContent = document.getElementById('product-details-content');
        modalContent.innerHTML = `
            <h2>${selectedproduct.title}</h2>
            <img src="${selectedproduct.image}" alt="${selectedproduct.title}" width="150" height="200">
      
            <p>Price: Rs${selectedproduct.price}</p>
            <p>Description:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus ligula in ante feugiat, eu ullamcorper justo 
            fringilla. Aenean sit amet lectus at sapien faucibus vulputate. In hac habitasse platea dictumst. Fusce et feugiat nulla. Suspendisse
             potenti. Nullam euismod erat in mauris hendrerit, vel varius urna congue. Phasellus hendrerit aliquam sem, non vulputate mi blandit
              ac. Vestibulum malesuada sapien et neque suscipit, eu mattis purus dignissim. Aliquam erat volutpat. Cras vel lectus vel quam 
              elementum malesuada. Nullam nec ex eget urna pellentesque dictum. Quisque in felis justo. Vestibulum blandit ante id metus elementum.
              </p>
        `;
        const modal = document.getElementById('product-details-modal');
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('product-details-modal');
    modal.style.display = 'none';
}
displayproduct();
