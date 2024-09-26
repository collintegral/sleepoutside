export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() {

    }

    addProductToCart(product) {
        let currentCart = getLocalStorage("so-cart");
        currentCart.push(product);
        setLocalStorage("so-cart", currentCart);
    }

    renderProductDetails() {

    }
}