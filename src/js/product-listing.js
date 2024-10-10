import { loadHeaderFooter, getParam, renderWithTemplate } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Clase ProductListing
export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.productsList = []; // Propiedad para almacenar la lista de productos
    }

    async init() {
        this.productsList = await this.dataSource.getData(this.category);
        console.log(this.productsList); // Inspeccionar la lista de productos
        this.renderList(this.productsList);
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {
        console.log(list); // Verificar que se está llamando a renderList
        const productCards = list.map(product => this.productCardTemplate(product)).join('');
        this.listElement.innerHTML = productCards; // Asignar las tarjetas de producto al contenedor
    }

    sortProducts(criteria) {
        console.log(`Sorting by: ${criteria}`); // Verificar que se llama a esta función
        let sortedList;
        if (criteria === "name") {
            sortedList = this.productsList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        } else if (criteria === "price") {
            sortedList = this.productsList.sort((a, b) => a.SuggestedRetailPrice - b.SuggestedRetailPrice);
        }
        this.renderList(sortedList);
    }

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

// Función para inicializar el listado de productos
const initializeProductListing = async () => {
    loadHeaderFooter("../partials/header.html", "main-header");
    loadHeaderFooter("../partials/footer.html", "main-footer");

    const category = getParam("category");
    const dataSource = new ProductData();
    const element = document.querySelector(".product-list");
    const listing = new ProductListing(category, dataSource, element); // Asegúrate de que se esté creando la instancia correcta

    await listing.init(); // Inicializar el listado

    // Añadir el evento al select después de inicializar
    const sortOptions = document.getElementById("sort-options");
    sortOptions.addEventListener("change", (event) => {
        console.log(event.target.value); // Para ver si el evento se activa
        listing.sortProducts(event.target.value); // Ahora debe funcionar
    });
};

// Llamar a la función para inicializar
document.addEventListener("DOMContentLoaded", initializeProductListing);
