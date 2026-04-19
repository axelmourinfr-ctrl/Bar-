function saveData() {
  localStorage.setItem("barData", JSON.stringify({
    totalDay,
    totalOrders,
    productStats,
    totalCash,
    totalCard
  }));
}

function loadData() {
  let saved = localStorage.getItem("barData");
  if (!saved) return;

  let data = JSON.parse(saved);

  totalDay = data.totalDay || 0;
  totalOrders = data.totalOrders || 0;
  productStats = data.productStats || {};
  totalCash = data.totalCash || 0;
  totalCard = data.totalCard || 0;
}
