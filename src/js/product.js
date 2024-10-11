import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter("/partials/header.html", "main-header");
  loadHeaderFooter("../partials/footer.html", "main-footer");
});
