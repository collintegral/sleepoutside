import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter("../partials/header.html", "main-header");
  loadHeaderFooter("../partials/footer.html", "main-footer");
});

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart", ".order-summary");
  checkout.init();

  checkout.calculateOrderTotal();
  document.getElementById("zipCode").addEventListener("change", (/*event*/) => {
    // const zipCode = event.target.value;
    checkout.calculateOrderTotal();
  });

  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkout.checkout(checkoutForm);
  });
});
