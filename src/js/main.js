import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter("../partials/header.html", "main-header");
  loadHeaderFooter("../partials/footer.html", "main-footer");
});

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el envío del formulario

  const query = document.getElementById('search-input').value; // Obtiene el valor de búsqueda
  const apiUrl = `https://tu-api.com/search?query=${encodeURIComponent(query)}`; // Ajusta la URL de la API

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json(); 
      localStorage.setItem('searchResults', JSON.stringify(data));
      window.location.href = 'product_listing/index.html'; 
  } catch (error) {
      console.error('Error fetching search results:', error);
  }
});