import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productListing = new ProductListing("tents", dataSource, element);

document.addEventListener("DOMContentLoaded", () => { 
    loadHeaderFooter("../partials/header.html", "main-header")
    loadHeaderFooter("../partials/footer.html", "main-footer")
});


productListing.init();