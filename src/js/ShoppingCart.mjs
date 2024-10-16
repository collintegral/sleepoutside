import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `
        <li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img src="${item.Image}" alt="${item.Name}" />
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <label for="cart-qty-${item.Id}">Quantity:</label>
<input type="number" id="cart-qty-${item.Id}" class="cart-card__quantity" value="${item.Quantity}" min="1" data-id="${item.Id}">

            <p class="cart-card__price">$${item.FinalPrice}</p>
            <button class="cart-card__remove" data-id="${item.Id}">X</button> <!--Delete -->
        </li>
    `;
}

export default class ShoppingCart {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    init() {
        this.renderList(this.dataSource);
    }

    renderList(list) {
        console.log('test');
        renderListWithTemplate(cartItemTemplate, this.listElement, list, 'beforeend', true);
    }
}