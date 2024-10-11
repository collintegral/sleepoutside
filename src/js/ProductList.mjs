import { renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product, isDiscounted) {
  if (!isDiscounted) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img
            class="divider"
            src="${product.Images.PrimaryMedium}"
            alt="${product.Name}"
          />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.SuggestedRetailPrice.toFixed(2)}</p>
      </a>
    </li>`
  }
  else {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img
            class="divider"
            src="${product.Images.PrimaryMedium}"
            alt="${product.Name}"
          />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <span class="product-card__price full-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
        <span class="product-card__price">$${product.ListPrice.toFixed(2)}</span>
      </a>
    </li>`
  }
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list)
  }
  
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", false, true)
  }
}
