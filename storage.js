function saveData(){
  localStorage.setItem("barData",JSON.stringify({
    totalDay,totalOrders,productStats,totalCash,totalCard
  }));
}

function loadData(){
  let d=localStorage.getItem("barData");
  if(!d)return;
  d=JSON.parse(d);

  totalDay=d.totalDay||0;
  totalOrders=d.totalOrders||0;
  productStats=d.productStats||{};
  totalCash=d.totalCash||0;
  totalCard=d.totalCard||0;
}
