// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
      cartCountElement.textContent = cartItems.length;
  }
}

export async function loadHeaderFooter(path, element) {
  let elementTemplate = await fetch(path);
if (!elementTemplate.ok) {
    console.error(`Error ${elementTemplate.status}: No se pudo cargar ${path}`);
    return;
}
  let elementTemplateText = await elementTemplate.text();
  let elementLoc = document.getElementById(element);

  renderWithTemplate(elementTemplateText, elementLoc, updateCartCount);
}

export function renderWithTemplate(templateFn, parentElement, callback) {  
    parentElement.insertAdjacentHTML("afterbegin", templateFn);

  if (callback)
  {
    callback();
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false, discounted = false) {
  let htmlString = "";
  if (discounted) {
    list.forEach(element => {
      if (element.IsClearance) {
        htmlString += templateFn(element, true);
      }
      else {
        htmlString += templateFn(element, false);
      }
    });
  }

  else {
    htmlString = list.map(templateFn).join('');
  }
  
  if (clear) {
    parentElement.innerHTML = '';
  }

  parentElement.insertAdjacentHTML(position, htmlString);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add("alert");

  // Verificar si el mensaje es un objeto
  if (typeof message === 'object') {
    // Convertir el objeto en un string legible
    const formattedMessage = Object.keys(message).map(key => `${key}: ${message[key]}`).join('<br>');
    alert.innerHTML = `<p>${formattedMessage}</p><span>X</span>`;
  } else {
    // Si no es un objeto, simplemente mostrar el mensaje
    alert.innerHTML = `<p>${message}</p><span>X</span>`;
  }

  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}


export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
