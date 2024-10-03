import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs"; 
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", () => { 
    renderCartContents();
    loadHeaderFooter("../partials/header.html", "main-header")
    loadHeaderFooter("../partials/footer.html", "main-footer")    
});


function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  cartItems = cartItems.map(item => {
      if (!item.Quantity) item.Quantity = 1;
      return item;
  });

  updateCartCount(cartItems.length);

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty</p>";
      return;
  }

  const cartView = new ShoppingCart(cartItems, productList);
  cartView.init();

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", () => removeItem(button.dataset.id));
  });

  updateCartTotal();
}
    

function updateCartTotal() {
    let cartItems = getLocalStorage("so-cart") || [];
    
    if (cartItems.length) {
        let totalPrice = 0;
        cartItems.forEach(item => {
        totalPrice += item.FinalPrice;
        });
        document.querySelector(".cart-summary").classList.remove("hide");
        document.querySelector(".cart-total-value").textContent = `$${totalPrice.toFixed(2)}`;
    }
    else {
        document.querySelector(".cart-summary").classList.add("hide");
    }
}

function removeItem(id) {
  let cartItems = getLocalStorage("so-cart") || [];
  const itemIndex = cartItems.findIndex(item => item.Id === id);

  if (itemIndex > -1) {
      if (cartItems[itemIndex].Quantity > 1) {
          cartItems[itemIndex].Quantity -= 1;
      } else {
          cartItems.splice(itemIndex, 1);
      }
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); 

  updateCartTotal();
}

function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;;
    }
}

renderCartContents();