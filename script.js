let isLogin = true;

// AUTH
function toggleAuth() {
  isLogin = !isLogin;
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    if (users[email] === pass) {
      localStorage.setItem("loggedInUser", email);
      showApp();
    } else {
      alert("Invalid login");
    }
  } else {
    users[email] = pass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup success");
  }
}

function showApp() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("userEmail").innerText =
    localStorage.getItem("loggedInUser");

  loadData();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// PAGE SWITCH
function loadPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// INVENTORY
function addItem() {
  let name = document.getElementById("itemName").value;
  let qty = document.getElementById("itemQty").value;

  let items = JSON.parse(localStorage.getItem("inventory")) || [];
  items.push({ name, qty });

  localStorage.setItem("inventory", JSON.stringify(items));
  loadData();
}

function loadInventory() {
  let list = document.getElementById("inventoryList");
  list.innerHTML = "";

  let items = JSON.parse(localStorage.getItem("inventory")) || [];

  items.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ${item.qty}
      <button onclick="deleteItem(${i})">X</button>`;
    list.appendChild(li);
  });

  document.getElementById("invCount").innerText =
    "Inventory: " + items.length;
}

function deleteItem(i) {
  let items = JSON.parse(localStorage.getItem("inventory"));
  items.splice(i, 1);
  localStorage.setItem("inventory", JSON.stringify(items));
  loadData();
}

// PRODUCTION
function addProduction() {
  let name = document.getElementById("prodName").value;

  let list = JSON.parse(localStorage.getItem("production")) || [];
  list.push(name);

  localStorage.setItem("production", JSON.stringify(list));
  loadData();
}

function loadProduction() {
  let ul = document.getElementById("productionList");
  ul.innerHTML = "";

  let list = JSON.parse(localStorage.getItem("production")) || [];

  list.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });

  document.getElementById("prodCount").innerText =
    "Production: " + list.length;
}

// SALES
function addSale() {
  let name = document.getElementById("salesName").value;
  let amt = document.getElementById("salesAmount").value;

  let list = JSON.parse(localStorage.getItem("sales")) || [];
  list.push({ name, amt });

  localStorage.setItem("sales", JSON.stringify(list));
  loadData();
}

function loadSales() {
  let ul = document.getElementById("salesList");
  ul.innerHTML = "";

  let list = JSON.parse(localStorage.getItem("sales")) || [];

  list.forEach(s => {
    let li = document.createElement("li");
    li.innerText = `${s.name} - ₹${s.amt}`;
    ul.appendChild(li);
  });

  document.getElementById("salesCount").innerText =
    "Sales: " + list.length;
}

// LOAD ALL
function loadData() {
  loadInventory();
  loadProduction();
  loadSales();
}

// AUTO LOGIN
window.onload = () => {
  if (localStorage.getItem("loggedInUser")) showApp();
};
