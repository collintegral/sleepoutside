import ProductData from './ProductData.js';
import ProductListing from './ProductList.mjs';


const productData = new ProductData('./src/data/tents.json');

const productListElement = document.querySelector('#product-list');

const productListing = new ProductListing('tents', productData, productListElement);

productListing.renderProductList();
