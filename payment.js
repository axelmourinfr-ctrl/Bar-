function pay() {
  if (Object.keys(cart).length === 0) return alert("Panier vide");
  document.getElementById("paymentBox").style.display = "block";
}

function choosePayment(mode) {

  let total = getTotal();

  if (mode === "cash") {
    document.getElementById("paymentBox").style.display = "none";
    document.getElementById("cashBox").style.display = "block";
    document.getElementById("amountDue").innerText = total.toFixed(2);
  } else {
    totalCard += total;
    finalizeSale(total);
  }
}

function validateCash() {

  let total = getTotal();
  let received = parseFloat(document.getElementById("cashInput").value);

  if (received < total) return alert("Montant insuffisant");

  alert("Rendu: " + (received - total).toFixed(2));

  totalCash += total;

  document.getElementById("cashBox").style.display = "none";

  finalizeSale(total);
}
