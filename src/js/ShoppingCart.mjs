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
            <p class="cart-card__quantity">qty: ${item.Quantity}</p>
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