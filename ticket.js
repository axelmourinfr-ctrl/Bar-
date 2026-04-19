function printTicket(total) {

  let content = "<h3>Commande #" + totalOrders + "</h3>";

  Object.values(cart).forEach(i => {
    content += `${i.qty} x ${i.name}<br>`;
  });

  content += `<hr>Total: ${total}€<br>Merci !`;

  let w = window.open("", "", "width=300");
  w.document.write(content);
  w.print();
}
