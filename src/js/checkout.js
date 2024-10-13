import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter("../partials/header.html", "main-header");
  loadHeaderFooter("../partials/footer.html", "main-footer");
});


const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document
  .querySelector("#zipCode")
  .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  checkout.checkout();


  const checkoutForm = document.getElementById("checkout-form");
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("event.preventDefault() ha sido llamado");
  checkout.checkout(checkoutForm);
});
});
