const menu = {
  softs: [{ name:"Coca", price:2 }, { name:"Fanta", price:2 }],
  snacks: [{ name:"Croque", price:3 }, { name:"Chips", price:1 }]
};

let current = "softs";
let cart = {};

let totalDay=0,totalOrders=0,productStats={},totalCash=0,totalCard=0;

loadData();

function setCategory(cat){
  current=cat;
  renderMenu();
}

function renderMenu(){
  const container=document.getElementById("items");
  container.innerHTML="";

  menu[current].forEach(item=>{
    const div=document.createElement("div");

    div.innerHTML=`
      <button onclick="addItemMulti('${item.name}',1)">1x ${item.name}</button>
      <button onclick="addItemMulti('${item.name}',2)">2x</button>
      <button onclick="addItemMulti('${item.name}',3)">3x</button>
    `;

    container.appendChild(div);
  });
}

function addItemMulti(name,qty){
  let item;

  for(let cat in menu){
    let found=menu[cat].find(i=>i.name===name);
    if(found){ item=found; break; }
  }

  if(!cart[name]) cart[name]={...item,qty:0};

  cart[name].qty+=qty;

  renderCart();
}

function renderCart(){
  const container=document.getElementById("cart");
  container.innerHTML="";

  let total=0;

  Object.values(cart).forEach(item=>{
    total+=item.price*item.qty;

    container.innerHTML+=`${item.name} x${item.qty}<br>`;
  });

  document.getElementById("total").innerText="Total: "+total+"€";
}

function getTotal(){
  return Object.values(cart).reduce((s,i)=>s+i.price*i.qty,0);
}

function finalizeSale(total){

  Object.values(cart).forEach(i=>{
    productStats[i.name]=(productStats[i.name]||0)+i.qty;
  });

  totalDay+=total;
  totalOrders++;

  saveData();

  printTicket(total);

  cart={};
  renderCart();
}

renderMenu();
