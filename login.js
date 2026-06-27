import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

document.getElementById("loginBtn").addEventListener("click", async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("errorMessage");

    errorBox.style.display = "none";
    errorBox.textContent = "";

  

    if (!email || !password) {
    errorBox.style.display = "block";
    errorBox.textContent = "Please enter email and password";
    return;
}

// ✅ email format check (.com + @)
if (!email.includes("@") || !email.includes(".com")) {
    errorBox.style.display = "block";
    errorBox.textContent = "Invalid email format";
    return;
}

loginBtn.innerText = "Logging in...";
loginBtn.disabled = true;

    try {

    await new Promise(resolve => setTimeout(resolve, 400));

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // check in users collection (admin / employee)
let userDoc = await getDoc(doc(db, "users", user.uid));

let role = null;
let name = null;

// if not found in users, check clients
if (!userDoc.exists()) {

    const clientDoc = await getDoc(doc(db, "clients", user.uid));

    if (clientDoc.exists()) {
        role = "client";
        name = clientDoc.data().name;
    } else {
        errorBox.style.display = "block";
        errorBox.textContent = "User not found. Please check your role.";
loginBtn.innerText = "Login";
loginBtn.disabled = false;
return;
    }

} else {

    role = userDoc.data().role;
    name = userDoc.data().name;

}

        if (role === "admin") {
            window.location.href = "admin-dashboard.html";
        } 
        else if (role === "client") {
            window.location.href = "client-dashboard.html";
        } 
        else if (role === "employee") {
            window.location.href = "employee-dashboard.html";
        } 
        else {
            errorBox.style.display = "block";
            errorBox.textContent = "Invalid role assigned";
        }

    } catch (error) {

loginBtn.innerText = "Login";
loginBtn.disabled = false;

    errorBox.style.display = "block";
    errorBox.style.color = "red";

    if (error.code === "auth/invalid-email") {
        errorBox.textContent = "Invalid email format";
    }

    else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
    ) {
        errorBox.textContent = "Invalid email or password";
    }

    else {
        errorBox.textContent = error.message;
    }

}

});

// ENTER KEY LOGIN
[emailInput, passwordInput].forEach(input => {

    input.addEventListener("keypress", function(event){

        if(event.key === "Enter"){

            event.preventDefault();
            loginBtn.click();

        }

    });

});