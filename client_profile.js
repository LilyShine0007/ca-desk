import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const nameBox = document.getElementById("clientName");
const emailBox = document.getElementById("clientEmail");


// CHECK LOGIN USER
onAuthStateChanged(auth, async (user) => {

if(user){

emailBox.innerText = user.email;

try{

const docRef = doc(db, "clients", user.uid);
const docSnap = await getDoc(docRef);

if(docSnap.exists()){

nameBox.innerText = docSnap.data().name;

}

}catch(e){

console.log(e);

}

}else{

window.location.href = "client-login.html";

}

});


// LOGOUT
window.logout = async function(){

let confirmLogout = confirm("Are you sure you want to logout?");

if(confirmLogout){

await signOut(auth);
window.location.href = "client-login.html";

}

};