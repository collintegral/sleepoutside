import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage,removeAllAlerts,alertMessage } from './utils.mjs';

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  return jsonObject;
}

function packageItems(items) {
  return items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity,
    };
  });
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key; 
    this.outputSelector = outputSelector; 
    this.list = []; 
    this.itemTotal = 0;
    this.shipping = 0; 
    this.tax = 0; 
    this.orderTotal = 0; 
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {

    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
    
    document.getElementById('subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.shipping = 10 + 2 * (this.list.length - 1)
    
    this.tax = this.itemTotal * 0.06;
 
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
  
    this.displayOrderTotals();
  }

  calculateShipping(zipCode) {
    zipCode = String(zipCode);
    
    if (zipCode.startsWith('9')) {
      return 20.00; 
    } else if (zipCode.startsWith('8')) {
      return 18.00; 
    } else if (zipCode.startsWith('7')) {
      return 15.00; 
    } else if (zipCode.startsWith('6')) {
      return 12.00; 
    } else if (zipCode.startsWith('5')) {
      return 10.00; 
    } else if (zipCode.startsWith('4')) {
      return 8.00; 
    } else if (zipCode.startsWith('3')) {
      return 7.00; 
    } else if (zipCode.startsWith('2')) {
      return 5.00; 
    } else if (zipCode.startsWith('1')) {
      return 4.00; 
    } else {
      return 10.00; 
    }
  }

  async checkout() {
    const formElement = document.forms["checkout-form"];
    const json = formDataToJSON(formElement);

    
    console.log(json);

    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    
    console.log("Objeto JSON final:", json);
    
    try {
      const res = await this.externalServices.checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      alertMessage(err.message);
      console.log(err);
    }
}

  displayOrderTotals() {
 
    document.getElementById('shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${this.tax.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${this.orderTotal.toFixed(2)}`;
  }
}
