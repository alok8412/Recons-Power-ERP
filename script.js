const API = "PASTE_YOUR_API_URL";

// LOGIN
function login() {
  let email = emailInput.value;
  let password = passwordInput.value;

  fetch(`${API}?action=login&email=${email}&password=${password}`)
    .then(r => r.json())
    .then(d => {
      if (d.status === "success") {
        localStorage.setItem("user", email);
        localStorage.setItem("role", d.role);
        start();
      } else alert("Invalid");
    });
}

function start() {
  authBox.style.display = "none";
  app.style.display = "block";
  user.innerText = localStorage.getItem("user");
  loadAll();
}

// LOAD DATA
function loadAll() {
  load("Inventory", "invList");
  load("Sales", "salesList");
  load("Production", "prodList");
}

function load(sheet, element) {
  fetch(`${API}?sheet=${sheet}`)
    .then(r => r.json())
    .then(data => {
      let ul = document.getElementById(element);
      ul.innerHTML = "";
      data.slice(1).forEach(r => {
        let li = document.createElement("li");
        li.innerText = r.join(" | ");
        ul.appendChild(li);
      });
    });
}

// ADD FUNCTIONS
function addInventory() {
  save("Inventory", [Date.now(), itemName.value, itemQty.value, new Date()]);
}

function addProduction() {
  save("Production", [Date.now(), pname.value, "Pending", new Date()]);
}

function addSale() {
  let total = qty.value * rate.value;
  save("Sales", [Date.now(), cust.value, gst.value, prod.value, qty.value, rate.value, total, new Date()]);
}

function save(sheet, row) {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({ sheet, row })
  }).then(() => loadAll());
}

// GST INVOICE
function invoice() {
  let html = `
    <h2>GST Invoice</h2>
    <p>${cust.value}</p>
    <p>${prod.value} - ₹${rate.value}</p>
  `;
  let w = window.open();
  w.document.write(html);
  w.print();
}

// NAV
function loadPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.reload();
}

// AUTO LOGIN
window.onload = () => {
  if (localStorage.getItem("user")) start();
};
