// ================= DATA =================

const products = [
  {
    name: "Luffy Figure",
    category: "Figures",
    sub: "Blokees",
    price: 250000,
    stock: "READY STOCK",
    image: "assets/img/2.png"
  },
  {
    name: "Zoro Figure",
    category: "Figures",
    sub: "Blokees",
    price: 270000,
    stock: "LIMITED STOCK",
    image: "assets/img/3.png"
  },
  {
    name: "Pokemon Card Pack",
    category: "TCG",
    sub: "Pokemon",
    price: 75000,
    stock: "READY STOCK",
    image: "assets/img/4.png"
  },
  {
    name: "One Piece Card",
    category: "TCG",
    sub: "One Piece",
    price: 90000,
    stock: "OUT OF STOCK",
    image: "assets/img/5.png"
  }
];

// ================= STATE =================
let currentCategory = "All";
let currentSub = "All";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", renderProducts);
  renderSubFilter();
  renderProducts();
});

// ================= CATEGORY =================
function setCategory(cat) {
  currentCategory = cat;
  currentSub = "All";
  renderSubFilter();
  renderProducts();
}

// ================= SUB FILTER =================
function renderSubFilter() {
  const subDiv = document.getElementById("subFilter");
  subDiv.innerHTML = "";

  let subs = [];

  if (currentCategory === "Figures") {
    subs = ["All", "Blokees"];
  } else if (currentCategory === "TCG") {
    subs = ["All", "One Piece", "Pokemon"];
  } else if (currentCategory === "Accessories") {
    subs = ["All", "Keychain", "Sticker"];
  }

  subs.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "btn btn-sm btn-outline-secondary me-2 mb-2";
    btn.innerText = s;

    btn.onclick = () => {
      currentSub = s;
      renderProducts();
    };

    subDiv.appendChild(btn);
  });
}

// ================= HELPER =================
function getStockClass(stock) {
  if (stock === "READY STOCK") return "stock-ready";
  if (stock === "LIMITED STOCK") return "stock-limited";
  return "stock-out";
}

function generateWALink(product) {
  if (product.stock === "OUT OF STOCK") return "#";
  return `https://wa.me/6289601990444?text=Halo%20saya%20ingin%20membeli%20produk%20${encodeURIComponent(product.name)}`;
}

// ================= RENDER =================
function renderProducts() {
  const list = document.getElementById("productList");
  const search = document.getElementById("searchInput").value.toLowerCase();

  list.innerHTML = "";

  const filtered = products.filter(p =>
    (currentCategory === "All" || p.category === currentCategory) &&
    (currentSub === "All" || p.sub === currentSub) &&
    p.name.toLowerCase().includes(search)
  );

  filtered.forEach(p => {
    const stockClass = getStockClass(p.stock);
    const waLink = generateWALink(p);
    const isDisabled = p.stock === "OUT OF STOCK" ? "disabled" : "";

    list.innerHTML += `
      <div class="col-lg-3 col-md-6">
        <div class="card product-card">

          <!-- CLICK AREA -->
          <div onclick='openProductModal(${JSON.stringify(p)})' style="cursor:pointer;">
            <img src="${p.image}" class="product-img">

            <div class="card-body text-center">
              <h6>${p.name}</h6>
              <p class="text-muted small">${p.sub}</p>
              <strong>Rp ${p.price.toLocaleString()}</strong>
              <p class="${stockClass} mt-2">Stock: ${p.stock}</p>
            </div>
          </div>

          <!-- BUTTON -->
          <div class="text-center pb-3">
            <a href="${waLink}" target="_blank" 
              class="btn btn-dark btn-sm ${isDisabled}">
              🛒 Beli
            </a>
          </div>

        </div>
      </div>
    `;
  });
}

// ================= MODAL =================
function openProductModal(product) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalCategory").innerText = `${product.category} - ${product.sub}`;
  document.getElementById("modalPrice").innerText = "Rp " + product.price.toLocaleString();
  document.getElementById("modalStock").innerText = "Stock: " + product.stock;

  const buyBtn = document.getElementById("modalBuyBtn");

  if (product.stock === "OUT OF STOCK") {
    buyBtn.classList.add("disabled");
    buyBtn.innerText = "Tidak Tersedia";
    buyBtn.href = "#";
  } else {
    buyBtn.classList.remove("disabled");
    buyBtn.innerHTML = "🛒 Beli Sekarang";
    buyBtn.href = generateWALink(product);
  }

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}