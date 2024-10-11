import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.Name}</h2>

        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />

        <p class="product-card__price">$${product.ListPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
        </div>
      </section>`
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    //This code searches for and retrieves a product based on its ID. It displays the product details on the page. It sets up the "Add to Cart" button to function correctly when the user clicks on it.
    async init() {
        
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document.getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
      let cartItems = getLocalStorage("so-cart") || [];
      const existingItemIndex = cartItems.findIndex(item => item.id === this.product.Id);
      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].Quantity += 1;
    } else {
      this.product.Quantity = 1;
        cartItems.push(this.product);
    }

    setLocalStorage("so-cart", cartItems);
    updateCartCount();
}

renderProductDetails(selector) {
  const element = document.querySelector(selector);
  if (!element) {
      console.error(`Element with selector "${selector}" not found.`);
      return;
  }
  element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
}

}