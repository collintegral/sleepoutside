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

export function renderWithTemplate(templateFn, parentElement, item, callback) {  
  if (parentElement && (typeof templateFn) == 'function') {
    parentElement.insertAdjacentHTML("afterbegin", templateFn(item));
  }
  if (callback)
  {
    callback();
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlString = list.map(templateFn).join('');
  
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlString);
}

/* export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.reduce((total, item) => total + item.Quantity, 0);
  const cartCountElement = qs("#cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  } 
}*/
