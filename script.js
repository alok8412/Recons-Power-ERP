let isLogin = true;

// TOGGLE LOGIN/SIGNUP
function toggleAuth() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector("button").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector(".toggle").innerText =
    isLogin ? "Don't have account? Sign up" : "Already have account? Login";
}

// SIGNUP / LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    // LOGIN
    if (users[email] && users[email] === password) {
      localStorage.setItem("loggedInUser", email);
      showApp();
    } else {
      alert("Invalid login");
    }
  } else {
    // SIGNUP
    if (users[email]) {
      alert("User already exists");
    } else {
      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Please login.");
      toggleAuth();
    }
  }
}

// SHOW APP
function showApp() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// AUTO LOGIN CHECK
window.onload = function () {
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    showApp();
  }
};
