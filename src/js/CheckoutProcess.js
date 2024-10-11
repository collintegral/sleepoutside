import ExternalServices from './ExternalServices.mjs';

function packageItems(items) {
  return items.map(item => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });
}

export default class CheckoutProcess {
  constructor() {
    this.externalServices = new ExternalServices();
  }

  //I convert the form data into a JSON object, retrieve the cart items stored in localStorage and I prepare the cart items for submission.
  async checkout(form) {
    const formData = formDataToJSON(form);
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const packagedItems = packageItems(cartItems);
    
    //It creates an object that contains the order details.
    const dataObject = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      items: packagedItems,
      total: this.calculateTotal(cartItems),
    };

    try {
      const response = await this.externalServices.checkout(dataObject);
      console.log('Order sent successfully:', response);
    } catch (error) {
      console.error('Error sending order:', error);
    }
  }

  calculateTotal(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  
  return convertedJSON;
}


//This code helps manage the form submission, and if the form is not found, it will log an error message.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const checkoutProcess = new CheckoutProcess(); 
  
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await checkoutProcess.checkout(form);
      });
    } else {
      console.error('Form not found.');
    }
  });