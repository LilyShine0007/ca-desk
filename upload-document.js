import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const clientSelect = document.getElementById("clientSelect");
const uploadBtn = document.getElementById("uploadBtn");


// LOAD CLIENTS
async function loadClients(){

const snapshot = await getDocs(collection(db,"clients"));

snapshot.forEach((doc)=>{

const data = doc.data();

const option = document.createElement("option");

option.value = doc.id;
option.textContent = data.name;

clientSelect.appendChild(option);

});

}

loadClients();


// UPLOAD DOCUMENT
uploadBtn.addEventListener("click", async ()=>{

const clientId = clientSelect.value;
const service = document.getElementById("service").value;
const title = document.getElementById("docTitle").value;
const year = document.getElementById("year").value;
const link = document.getElementById("driveLink").value;


if(!clientId || !service || !title || !year || !link){

alert("Please fill all fields");
return;

}


try{

await addDoc(collection(db,"clients",clientId,"documents"),{
title:title,
service:service,
year:year,
link:link,
clientId: clientId,   // ⭐ VERY IMPORTANT
createdAt: new Date()
});

alert("Document uploaded successfully");

}catch(error){

console.log(error);

}

});