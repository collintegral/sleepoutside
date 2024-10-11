
import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key; // clave para obtener los artículos del carrito en localStorage
    this.outputSelector = outputSelector; // selector del contenedor donde se mostrarán los totales
    this.list = []; // lista de artículos del carrito
    this.itemTotal = 0; // total de los artículos
    this.shipping = 0; // costo de envío
    this.tax = 0; // impuestos
    this.orderTotal = 0; // total del pedido
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    // Calcula el total de los artículos en el carrito.
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
    
    // Muestra el subtotal en la página
    document.getElementById('subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal(zipCode) {
    // Estimación de los costos de envío según el código postal
    this.shipping = this.calculateShipping(zipCode);
    
    // Estimación de impuestos (supongamos un 10% de impuestos)
    this.tax = this.itemTotal * 0.10;
    
    // Calcula el total del pedido
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // Muestra los totales en la página
    this.displayOrderTotals();
  }

  calculateShipping(zipCode) {
    // Ejemplo de cálculo de envío basado en el código postal (puedes cambiar esta lógica)
    if (zipCode.startsWith('9')) {
      return 20.00; // Envío más caro para códigos que comienzan con 9 (Ej: costa oeste)
    } else if (zipCode.startsWith('8')) {
      return 18.00; // Costo de envío medio para códigos que comienzan con 8
    } else if (zipCode.startsWith('7')) {
      return 15.00; // Costo más bajo para códigos que comienzan con 7
    } else if (zipCode.startsWith('6')) {
      return 12.00; // Precio económico para códigos que comienzan con 6
    } else if (zipCode.startsWith('5')) {
      return 10.00; // Precio aún más económico para códigos que comienzan con 5
    } else if (zipCode.startsWith('4')) {
      return 8.00; // Costo bajo para códigos que comienzan con 4
    } else if (zipCode.startsWith('3')) {
      return 7.00; // Costo reducido para códigos que comienzan con 3
    } else if (zipCode.startsWith('2')) {
      return 5.00; // Envío muy barato para códigos que comienzan con 2
    } else if (zipCode.startsWith('1')) {
      return 4.00; // El envío más económico para códigos que comienzan con 1 (costa este)
    } else {
      return 10.00; // Valor predeterminado para otros códigos
    }
  }

  displayOrderTotals() {
    // Muestra los totales en la página
    document.getElementById('shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${this.tax.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${this.orderTotal.toFixed(2)}`;
  }
}
