function showStats() {

  let html = `
    <h3>Total: ${totalDay.toFixed(2)}€</h3>
    <p>Commandes: ${totalOrders}</p>
    <p>Cash: ${totalCash.toFixed(2)}€</p>
    <p>Carte: ${totalCard.toFixed(2)}€</p>
    <hr>
  `;

  let sorted = Object.entries(productStats)
    .sort((a, b) => b[1] - a[1]);

  sorted.forEach(([n, q]) => {
    html += `${n}: ${q}<br>`;
  });

  document.getElementById("statsContent").innerHTML = html;
  document.getElementById("statsBox").style.display = "block";
}

function closeStats() {
  document.getElementById("statsBox").style.display = "none";
}

function resetStats() {
  localStorage.clear();
  location.reload();
}

function copyStats() {
  navigator.clipboard.writeText(
    document.getElementById("statsContent").innerText
  );
}

function exportStats() {
  let text = document.getElementById("statsContent").innerText;
  let blob = new Blob([text], { type: "text/plain" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "stats.txt";
  a.click();
}
