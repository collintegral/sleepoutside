import ProductListing from "./ProductListing.mjs"
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productListElement = document.querySelector(".product-list");
const listing = new ProductListing("Tents", dataSource, productListElement);
listing.init();