import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.productsList = [];
  }

  //With this method, I initialize the product list according to its category, displaying them in the interface based on the category selected by the user.

  async init() {
    this.productsList = await this.dataSource.getData(this.category);
    this.renderList(this.productsList);
    document.querySelector(".title").innerHTML = this.category;
  }

  renderList(list) {
    const productCards = list
      .map((product) => this.productCardTemplate(product))
      .join("");
    this.listElement.innerHTML = productCards;
  }

  //With this method, I sort the product list based on name or price and update the display in the user interface.
  sortProducts(criteria) {
    let sortedList;
    if (criteria === "name") {
      sortedList = this.productsList.sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand),
      );
    } else if (criteria === "price") {
      sortedList = this.productsList.sort(
        (a, b) => a.SuggestedRetailPrice - b.SuggestedRetailPrice,
      );
    }
    this.renderList(sortedList);
  }

  //Methods that generate HTML templates displaying the information of each product.
  productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
                <img class="divider" src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.SuggestedRetailPrice.toFixed(2)}</p>
            </a>
        </li>`;
  }

  productCardDiscountTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
                <img class="divider" src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <span class="product-card__price full-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
                <span class="product-card__price">$${product.ListPrice.toFixed(2)}</span>
            </a>
        </li>`;
  }
}

//dinamic footer and header
const initializeProductListing = async () => {
  loadHeaderFooter("../partials/header.html", "main-header");
  loadHeaderFooter("../partials/footer.html", "main-footer");

  //In this part of the code, I retrieve the product category from the URL, use the category to initialize the product list, and allow the user to sort the products by name or price

  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductListing(category, dataSource, element);

  await listing.init();

  const sortOptions = document.getElementById("sort-options");
  sortOptions.addEventListener("change", (event) => {
    listing.sortProducts(event.target.value);
  });
};

document.addEventListener("DOMContentLoaded", initializeProductListing);
