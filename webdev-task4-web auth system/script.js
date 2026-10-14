const registerForm = document.getElementById("registerForm");
const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");
const registerError = document.getElementById("registerError");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = registerUsername.value.trim();
    const password = registerPassword.value;

    if (username === "" || password === "") {
      registerError.textContent = "Please fill in all fields.";
      return;
    }

    if (password.length < 8) {
      registerError.textContent =
        "Password must be at least 8 characters long.";
      return;
    }
    if (!/[0-9]/.test(password)) {
      registerError.textContent = "Password must contain at least one number.";
      return;
    }
    // LOADING THE ALREADY REGISTERED VALUES
    ////////////////////////////////
    const users = JSON.parse(localStorage.getItem("users")) || [];
    ////////////////////////////////

    // CHECKING IF USER HAS THE SAME NAME AS THE REGISTERED VALUE
    //////////////////////////////////////////
    const userExists = users.some(function (user) {
      return user.username.toLowerCase() === username.toLowerCase();
    });
    //////////////////////////////////////////

    // IF USERNAME REALLY MATCHES THE ALREADY REGISTERED VALUES THEN THROW THIS ERROR
    //////////////////////////////////////////////
    if (userExists) {
      registerError.textContent = "this username or email already exists";
      return;
    }
    //////////////////////////////////////////////

    // HASHING THE PASSWORD BEFORE CREATING
    /////////////////////////////
    const hashedPassword = await hashPassword(password);
    /////////////////////////////

    // FINALLY CREATING NEW USER
    ////////////////////////////
    const newUser = {
      username: username,
      password: hashedPassword,
    };
    ////////////////////////////

    // ADDING THE NEW USER TO EXISTING USERS ARRAY
    ///////////////////////////////
    users.push(newUser);
    ///////////////////////////////

    // SAVING THE NEW USER
    ////////////////
    localStorage.setItem("users", JSON.stringify(users));
    ////////////////
    // NOW MOVING TO NEW PAGE AFTER ALL THESE CONDITIONS ARE SATISFIED
    ///////////////////////////////////
    window.location.href = "login.html";
    ///////////////////////////////////
  });
}

// CONVERTING THE PASSWORD TO SHA-256 HASH
//////////////////////////////
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordData);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hash = hashArray
    .map(function (byte) {
      return byte.toString(16).padStart(2, "0");
    })
    .join("");

  return hash;
}
///////////////////////////////////

////////////////////////////
// FOR LOGIN PAGE NOW
////////////////////////

const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = loginUsername.value.trim();

    const password = loginPassword.value;

    if (username === "" || password === "") {
      loginError.textContent = "Please fill in all fields.";

      return;
    }

    // GET THE REGISTERED USERS
    ///////////////////////////
    const users = JSON.parse(localStorage.getItem("users")) || [];
    ///////////////////////////

    // FIND THE USER
    ////////////////
    const user = users.find(function (user) {
      return user.username.toLowerCase() === username.toLowerCase();
    });
    ////////////////

    // HASH THE PASSWORD ENTERED DURING LOGIN
    ////////////////////////////////////
    const hashedPassword = await hashPassword(password);
    ////////////////////////////////////

    // CHECK USERNAME AND PASSWORD TOGETHER
    /////////////////////////////////////////
    if (!user || user.password !== hashedPassword) {
      loginError.textContent = "Invalid username/email or password.";

      return;
    }
    /////////////////////////////////////////
    // CREATE A LOGIN SESSION
    ///////////////////////
    localStorage.setItem("loggedInUser", user.username);
    ///////////////////////

    // OPEN THE PROTECTED DASHBOARD
    //////////////////////////
    window.location.href = "dashboard.html";
    //////////////////////////
  });
}

/////////////////////////
// ENF OF LOGIN PAGE
///////////////////////

/////////////////////////
// DASHBOARD CODE
///////////////////////

const welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");

//CHECKING IF WE ARE ON  DASHBOARD THEN GET USERNAME FROM SESSION
////////////////////////
if (welcomeMessage && logoutButton) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  ////////////////////////

  // IF LOGGED IN THEN WELCOME TO THE USER IS PRINTED
  /////////////////////////
  if (!loggedInUser) {
    window.location.href = "login.html";
  } else {
    welcomeMessage.textContent = `welcome ${loggedInUser} !`;
  }
  /////////////////////////

  // CREATING A LOGOUT BUTTON
  ////////////////////
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
  });
}
////////////////////

/////////////////////////
// ENF OF DASHBOARD CODE
///////////////////////
