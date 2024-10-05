import ProductData from './ProductData.mjs';
import ProductListing from '../js/ProductList.mjs';
import { getParams, loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => { 
    loadHeaderFooter("../partials/header.html", "main-header")
    loadHeaderFooter("../partials/footer.html", "main-footer")
});

const category = getParams('category');
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productListing = new ProductListing(category, dataSource, element);

const titleElement = document.querySelector(".product-title");
const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

titleElement.innerHTML += ` - ${categoryTitle}`;

productListing.init();