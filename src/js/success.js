import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter("../partials/header.html", "main-header");
    loadHeaderFooter("../partials/footer.html", "main-footer");
  });

setLocalStorage("so-cart", [])