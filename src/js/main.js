import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getLocalStorage } from "./utils.mjs";


const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productListing = new ProductListing("tents", dataSource, element);

document.addEventListener("DOMContentLoaded", () => { 
    updateCartCount();
});

function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

productListing.init();
