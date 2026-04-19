let cart = {};
let totalDay = 0;
let totalOrders = 0;
let productStats = {};
let totalCash = 0;
let totalCard = 0;

loadData();

function getTotal() {
  return Object.values(cart)
    .reduce((s, i) => s + i.price * i.qty, 0);
}

function finalizeSale(total) {

  Object.values(cart).forEach(i => {
    productStats[i.name] = (productStats[i.name] || 0) + i.qty;
  });

  totalDay += total;
  totalOrders++;

  saveData();

  printTicket(total);

  cart = {};
}
