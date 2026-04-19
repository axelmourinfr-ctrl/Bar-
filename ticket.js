window.printTicket = function (total) {

  let boissons = [];
  let snacks = [];

  // ===== TRI =====
  Object.values(cart).forEach(item => {
    const name = item.name.toLowerCase();

    if (
      name.includes("pils") ||
      name.includes("blanche") ||
      name.includes("kriek") ||
      name.includes("troll") ||
      name.includes("leffe") ||
      name.includes("quintine") ||
      name.includes("moinette") ||
      name.includes("saison") ||
      name.includes("vin") ||
      name.includes("rouge") ||
      name.includes("blanc") ||
      name.includes("rosé") ||
      name.includes("apéro") ||
      name.includes("coca") ||
      name.includes("fanta") ||
      name.includes("eau") ||
      name.includes("café")
    ) {
      boissons.push(item);
    } else {
      snacks.push(item);
    }
  });

  // ===== FONCTION IMPRESSION =====
  function printBlock(title, items) {

    if (items.length === 0) return;

    let content = `
      <div style="
        padding:8px;
        font-family:monospace;
        max-width:72mm;
        margin:0 auto;
      ">

        <div style="text-align:center;">
          <img src="logo.png" style="width:110px;margin-bottom:8px;">
        </div>

        <div style="text-align:center;font-weight:bold;">
          ${title}
        </div>

        <div style="text-align:center;">
          COMMANDE #${totalOrders}
        </div>

        <hr>
    `;

    items.forEach(item => {
      content += `${item.qty} x ${item.name.toUpperCase()}<br>`;
    });

    content += `
        <hr>
        <b>TOTAL: ${total.toFixed(2)}€</b>

        <br><br>
        <div style="text-align:center;">MERCI !</div>

      </div>
    `;

    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    let doc = iframe.contentWindow.document;
    doc.open();

    doc.write(`
      <html>
      <head>
        <style>
          @page { size: 80mm auto; margin: 0; }
          body {
            width: 80mm;
            margin: 0;
            font-family: monospace;
            font-size: 13px;
          }
          img {
            filter: grayscale(100%) contrast(200%);
          }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);

    doc.close();

    iframe.onload = () => {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
  }

  // ===== IMPRESSION 2 TICKETS =====
  printBlock("BOISSONS", boissons);

  setTimeout(() => {
    printBlock("SNACKS", snacks);
  }, 500);
};
