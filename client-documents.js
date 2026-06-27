import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const docList = document.getElementById("docList");

const params = new URLSearchParams(window.location.search);

const service = params.get("service");
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

const currentYear = new Date().getFullYear();

snapshot.forEach((docSnap)=>{

const data = docSnap.data();


// FILTER SERVICE (GST / ITR / TDS)
if(data.service !== service) return;


// GET YEAR
let year = data.year;


// LAST 1 YEAR
if(type === "1year"){
if(year < currentYear - 1) return;
}


// LAST 2 YEARS
if(type === "2year"){
if(year < currentYear - 2) return;
}


// BOTH YEARS
if(type === "both"){
// show all documents
}


// 🔹 AUTO CONVERT GOOGLE DRIVE LINK FOR DOWNLOAD
let downloadLink = data.link;

if(downloadLink.includes("drive.google.com")){
try{
const fileId = downloadLink.split("/d/")[1].split("/")[0];
downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
}catch(e){
console.log("Drive link conversion failed");
}
}


found = true;

const row = document.createElement("div");

row.className = "doc-row";

row.innerHTML = `

<div>
<b>${data.title}</b><br>
Year : ${year}
</div>

<div class="doc-actions">

<a href="${data.link}" target="_blank">
<button class="download-btn">View & Download</button>
</a>

</div>

`;

docList.appendChild(row);

});


if(!found){
docList.innerHTML = `
<div class="no-docs">

<div class="no-doc-icon">📂</div>

<h3>No Documents Uploaded Yet</h3>

<p>Your CA will upload documents here soon.</p>

</div>
`;
}

});