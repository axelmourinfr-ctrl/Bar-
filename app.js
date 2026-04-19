// ===== MENU =====
const menu = {
  softs: [
    { name: "Eau plate", price: 1.5 },
    { name: "Eau pétillante", price: 1.5 },
    { name: "Coca", price: 2 },
    { name: "Coca zéro", price: 2 },
    { name: "Fanta", price: 2 },
    { name: "Café", price: 2 },
  ],
  apero: [{ name: "Apéro", price: 3.5 }],
  bieres: [
    { name: "Pils", price: 2 },
    { name: "Pils NA", price: 2 },
    { name: "Blanche", price: 2.5 },
    { name: "Blanche rosé", price: 2.5 },
    { name: "Kriek", price: 2.5 },
    { name: "Trolls", price: 3 },
    { name: "Leffe", price: 3 },
    { name: "Quintine", price: 4 },
    { name: "Moinette verre", price: 3.5 },
    { name: "Moinette bouteille", price: 9 },
    { name: "Saison bio verre", price: 3 },
    { name: "Saison bio bouteille", price: 8 },
  ],
  vins: [
    { name: "Rouge (verre)", price: 2.5 },
    { name: "Blanc (verre)", price: 2.5 },
    { name: "Rosé (verre)", price: 2.5 },
    { name: "Rouge (bouteille)", price: 14 },
    { name: "Blanc (bouteille)", price: 14 },
    { name: "Rosé (bouteille)", price: 14 },
  ],
  snacks: [
    { name: "Pain saucisse", price: 4 },
    { name: "Hamburger", price: 3 },
    { name: "Croque", price: 3 },
    { name: "Chips", price: 1 },
    { name: "Cornet de glace", price: 2 },
  ],
};

// ===== ÉTAT =====
let current = "softs";
let cart = {};

let totalDay = 0;
let totalOrders = 0;
let productStats = {};
let totalCash = 0;
let totalCard = 0;

// ===== LOAD =====
loadData();

// ===== MENU =====
function setCategory(cat) {
  current = cat;
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById("items");
  container.innerHTML = "";

  menu[current].forEach(item => {
    const btn = document.createElement("button");

    btn.innerText = `${item.name}\n${item.price}€`;

    btn.onclick = () => {
      addItem(item);
      btn.style.background = "#00c853"; // visuel sélection
    };

    container.appendChild(btn);
  });
}

// ===== PANIER =====
function addItem(item) {
  if (!cart[item.name]) {
    cart[item.name] = { ...item, qty: 1 };
  } else {
    cart[item.name].qty++;
  }

  renderCart();
}

function addItemByName(name) {
  for (let cat in menu) {
    let found = menu[cat].find(i => i.name === name);
    if (found) return addItem(found);
  }
}

function removeItem(name) {
  if (cart[name].qty > 1) {
    cart[name].qty--;
  } else {
    delete cart[name];
  }

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");

    div.innerHTML = `
      ${item.name} x${item.qty}
      <div>
        <button onclick="addItemByName('${item.name}')">+</button>
        <button onclick="removeItem('${item.name}')">-</button>
      </div>
    `;

    container.appendChild(div);
  });

  document.getElementById("total").innerText =
    `Total: ${total.toFixed(2)}€`;
}

// ===== TOTAL =====
function getTotal() {
  return Object.values(cart)
    .reduce((s, i) => s + i.price * i.qty, 0);
}

// ===== FINAL =====
function finalizeSale(total) {

  Object.values(cart).forEach(i => {
    productStats[i.name] = (productStats[i.name] || 0) + i.qty;
  });

  totalDay += total;
  totalOrders++;

  saveData();

  printTicket(total);

  cart = {};
  renderCart();
}

// ===== START =====
renderMenu();
