// ======= PRODUCTS DATA =======
const products = [
    { id: 1, name: "Naruto Figure", price: "$30", img: "assets/naruto.jpg" },
    { id: 2, name: "Sailor Moon Poster", price: "$15", img: "assets/sailor.jpg" },
    { id: 3, name: "One Piece Keychain", price: "$8", img: "assets/onepiece.jpg" }
];

const preOrders = [
    { id: 101, name: "Dragon Ball Z Statue", price: "$50", img: "assets/dbz.jpg" }
];

// ======= CART =======
let cart = [];

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function addToCart(product) {
    cart.push(product);
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    let message = "I want to buy:\n";
    cart.forEach(item => {
        message += `${item.name} - ${item.price}\n`;
    });
    const messengerLink = `https://www.facebook.com/messages/t/737804756085179?text=${encodeURIComponent(message)}`;
    window.open(messengerLink, "_blank");
});

// ======= DISPLAY PRODUCTS =======
function renderProducts(containerId, productArray) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    productArray.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.price}</p>
            <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
            <button onclick="buyNow(${JSON.stringify(product)})">Buy Now</button>
        `;
        container.appendChild(card);
    });
}

function buyNow(product) {
    const message = `I want to buy: ${product.name} - ${product.price}`;
    const messengerLink = `https://www.facebook.com/messages/t/737804756085179?text=${encodeURIComponent(message)}`;
    window.open(messengerLink, "_blank");
}

// ======= SHUFFLE PRODUCTS =======
function shuffleProducts() {
    products.sort(() => Math.random() - 0.5);
    renderProducts("products-container", products);
    renderProducts("preorders-container", preOrders);
}

// Initial render
shuffleProducts();

// Shuffle every 10 seconds
setInterval(shuffleProducts, 10000);
