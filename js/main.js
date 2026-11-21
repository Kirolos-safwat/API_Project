let grid = document.querySelector(".grid-products");
fetch("https://dummyjson.com/products")
  .then(function (products) {
    return products.json();
  })
  .then(function (productsJson) {
    console.log(productsJson.products);
    for (let i = 0; i < productsJson.products.length; i++) {
      let product = productsJson.products[i];
      // Helper to render filled/unfilled stars based on product.rating
      const fullStars = Math.round(product.rating);
      const starsHTML = Array.from(
        { length: 5 },
        (_, i) => `
  <svg class="w-7 h-7; ${i < fullStars ? "text-blue-600" : "text-gray-300"}" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
`,
      ).join("");
      let div = `
  <div class="bg-white flex flex-col border rounded-2xl w-full h-full p-5">
    <img 
      class="w-full h-100 object-cover rounded-lg bg-gray-300" 
      src="${product.images[0]}" 
      alt="${product.title}"
    >
    <div class="mt-3 gap-3 flex flex-col flex-1">
      <p class="text-gray-500 text-xl">${product.brand}</p>
      <h2 class="text-3xl text-black line-clamp-1">${product.title}</h2>
            <div class="mt-2 flex items-center gap-1.5">
        <div class="flex items-center gap-0.5">
          ${starsHTML}
        </div>
        <span class="text-sm text-gray-500">(${product.rating})</span>
      </div>
      <p class="line-clamp-3 text-gray-700">${product.description}</p>
      
      <div class="flex items-center justify-between mb-4">
        <p class="font-bold text-3xl">$${product.price}</p>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            <span class="w-2 h-2 rounded-full ${product.stock > 0 ? "bg-blue-300" : "bg-red-500"}"></span>
            ${product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </span>
      </div>
      
     <button class="cursor-pointer w-full py-3 px-4 bg-[#2f7cf6] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Add to Cart
        </button>
    </div>
  </div>
`;
      grid.innerHTML += div;
    }
  });
