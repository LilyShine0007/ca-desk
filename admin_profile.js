import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


const nameBox = document.getElementById("adminName");
const emailBox = document.getElementById("adminEmail");
const roleBox = document.getElementById("adminRole");


// Check login
onAuthStateChanged(auth, (user) => {

    if (user) {

        nameBox.innerText = "CA Admin";
        emailBox.innerText = user.email;
        roleBox.innerText = "Administrator";

    } else {

        window.location.href = "admin-login.html";

    }

});


// Logout
window.logout = async function () {

    let ok = confirm("Are you sure you want to logout?");

    if (ok) {

        await signOut(auth);
        window.location.href = "admin-login.html";

    }

};