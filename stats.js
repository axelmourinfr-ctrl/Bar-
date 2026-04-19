window.showStats=function(){

  let html=`Total: ${totalDay}€<br>Commandes: ${totalOrders}<hr>`;

  Object.entries(productStats).forEach(([n,q])=>{
    html+=`${n}: ${q}<br>`;
  });

  document.getElementById("statsContent").innerHTML=html;
  document.getElementById("statsBox").style.display="block";
};

window.closeStats=function(){
  document.getElementById("statsBox").style.display="none";
};
