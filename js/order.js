const services = {
  HTML: 400,
  WordPress: 500,
  Verkkotyökalut: 500,
  Somemarkkinointi: 300,
  Lisäsivu: 100
};

const rows = document.getElementById("serviceRows");
const addButton = document.getElementById("addService");
const summaryItems = document.getElementById("summaryItems");
const totalPrice = document.getElementById("totalPrice");
const form = document.getElementById("orderForm");

function formatPrice(value) {
  return new Intl.NumberFormat("fi-FI").format(value) + " €";
}

function createServiceOptions() {
  return Object.entries(services)
    .map(([name, price]) => `<option value="${name}">${name} — ${formatPrice(price)}</option>`)
    .join("");
}

function addServiceRow() {
  const row = document.createElement("div");
  row.className = "service-row";
  row.innerHTML = `
    <label>Palvelu<select class="service-select">${createServiceOptions()}</select></label>
    <output class="service-price">${formatPrice(services.HTML)}</output>
    <button type="button" class="remove-service" aria-label="Poista palvelu">×</button>
  `;
  rows.appendChild(row);
  row.querySelector(".service-select").addEventListener("change", updateOrder);
  row.querySelector(".remove-service").addEventListener("click", () => { row.remove(); updateOrder(); });
  updateOrder();
}

function updateOrder() {
  const selected = [...document.querySelectorAll(".service-row")].map(row => {
    const select = row.querySelector(".service-select");
    const price = services[select.value];
    row.querySelector(".service-price").textContent = formatPrice(price);
    return { name: select.value, price };
  });

  const total = selected.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = formatPrice(total);

  summaryItems.innerHTML = selected.length
    ? selected.map(item => `<div class="summary-item"><span>${item.name}</span><strong>${formatPrice(item.price)}</strong></div>`).join("")
    : '<p class="summary-empty">Ei valittuja palveluita.</p>';
}

addButton.addEventListener("click", addServiceRow);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!document.querySelectorAll(".service-row").length) {
    alert("Valitse vähintään yksi palvelu.");
    return;
  }
  alert("Tilauspyyntölomake on valmis. Yhdistetään lähetys sähköpostiin seuraavassa vaiheessa.");
});

addServiceRow();
