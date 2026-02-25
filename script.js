let cartCount = 0;

// Load Categories
const loadCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();

  const container = document.getElementById("category-container");

  data.forEach(category => {
    const btn = document.createElement("button");
    btn.innerText = category;
    btn.className =
      "bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700";
    btn.onclick = () => loadProductsByCategory(category);

    container.appendChild(btn);
  });
};

// Load Products by Category
const loadProductsByCategory = async (category) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await res.json();

  showProducts(data);
};

// Show Products
const showProducts = (products) => {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 shadow rounded text-center";

    card.innerHTML = `
      <img src="${product.image}" class="h-40 mx-auto object-contain mb-4">
      <h3 class="font-semibold">${product.title.slice(0, 30)}...</h3>
      <p class="text-indigo-600 font-bold">$${product.price}</p>
      <p class="text-sm bg-gray-200 inline-block px-2 rounded">${product.category}</p>
      <p class="text-yellow-500">⭐ ${product.rating.rate}</p>

      <div class="mt-4 flex justify-center gap-2">
        <button onclick="showDetails(${product.id})"
          class="bg-gray-200 px-3 py-1 rounded">Details</button>

        <button onclick="addToCart()"
          class="bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
      </div>
    `;

    container.appendChild(card);
  });
};

// Show Product Details Modal
const showDetails = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <button onclick="closeModal()" class="absolute top-2 right-2">✖</button>
    <img src="${product.image}" class="h-40 mx-auto object-contain mb-4">
    <h2 class="font-bold">${product.title}</h2>
    <p class="text-sm my-2">${product.description}</p>
    <p class="font-bold text-indigo-600">$${product.price}</p>
    <p>⭐ ${product.rating.rate}</p>
    <button onclick="addToCart()" 
      class="bg-indigo-600 text-white px-4 py-2 rounded mt-4 w-full">
      Buy Now
    </button>
  `;

  modal.classList.remove("hidden");
};

// Close Modal
const closeModal = () => {
  document.getElementById("modal").classList.add("hidden");
};

// Add To Cart
const addToCart = () => {
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;
};

// Load default products
const loadAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  showProducts(data);
};

// Initial Load
loadCategories();
loadAllProducts();