import { getLocalStorage, setLocalStorage } from "./utils.mjs"; 

document.addEventListener("DOMContentLoaded", () => { 
    renderCartContents();
});

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];


  cartItems = cartItems.map(item => {
      if (!item.Quantity) item.Quantity = 1;
      return item;
  });

  updateCartCount(cartItems.length);

  if (cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
      return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", () => removeItem(button.dataset.id));
  });

  if (htmlItems.length) {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.FinalPrice;
    });
    document.querySelector(".cart-summary").classList.remove("hide");
    document.querySelector(".cart-total-value").textContent = `$${totalPrice.toFixed(2)}`;
  }
}



function cartItemTemplate(item) {
    return `
        <li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img src="${item.Image}" alt="${item.Name}" />
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <p class="cart-card__quantity">qty: ${item.Quantity}</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
            <button class="cart-card__remove" data-id="${item.Id}">X</button> <!--Delete -->
        </li>
    `;
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
}
function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;;
    }
}

renderCartContents();