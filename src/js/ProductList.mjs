import { renderListWithTemplate } from './utils.mjs';


function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.id}">
        <img src="${product.image}" alt="Image of ${product.name}">
        <h3 class="card__brand">${product.brand}</h3>
        <h2 class="card__name">${product.name}</h2>
        <p class="product-card__price">$${product.price}</p>
      </a>
    </li>
  `;
}

export default class ProductListing {
  constructor(Category, dataSource, listElement) {
    this.Category = Category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async renderProductList() {
    const data = await this.dataSource.loadData();
    const filteredProducts = this.filterByCategory(data);
   
    const topProducts = this.getTopProducts(filteredProducts);
    
    this.clearList();
    this.renderList(topProducts);
  }

  filterByCategory(products) {
    return products.filter(product => product.category === this.Category);
  }

  getTopProducts(products) {
    return products.slice(0, 4);
  }

  clearList() {
    this.listElement.innerHTML = '';
  }

  renderList(products) {
    
    renderListWithTemplate(productCardTemplate, this.listElement, products, 'beforeend', true);
  }
}
