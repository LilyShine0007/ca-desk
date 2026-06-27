import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { collection, getDocs }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const list = document.getElementById("docs");

const params = new URLSearchParams(window.location.search);
const type = params.get("type");


onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href="client-login.html";
return;
}

const snapshot = await getDocs(
collection(db,"clients",user.uid,"documents")
);

let found = false;

snapshot.forEach((docSnap)=>{

const data = docSnap.data();

if(data.service !== "GST") return;

if(type !== "both" && data.category !== type) return;

found = true;

const row = document.createElement("div");

row.className="doc-row";

row.innerHTML = `

<div>${data.title}</div>

<a href="${data.fileURL}" target="_blank">
<button class="download-btn">Download</button>
</a>

`;

list.appendChild(row);

});

if(!found){
list.innerHTML = "Documents are not uploaded yet";
}

});