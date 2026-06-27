import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  collectionGroup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function loadDashboardData() {

  // TOTAL CLIENTS
  const clientsSnapshot = await getDocs(collection(db,"clients"));
  document.getElementById("totalClients").innerText = clientsSnapshot.size;


  // TOTAL DOCUMENTS
  const docsSnapshot = await getDocs(collectionGroup(db,"documents"));
  document.getElementById("totalDocuments").innerText = docsSnapshot.size;


  // CATEGORY COUNTS
  let gst = 0;
  let itr = 0;
  let tds = 0;

  docsSnapshot.forEach((docSnap)=>{

    const data = docSnap.data();

    if(!data.title) return;

    const title = data.title.toLowerCase();

    if(title.includes("gst")) gst++;
    if(title.includes("itr")) itr++;
    if(title.includes("tds")) tds++;

  });

  document.getElementById("gstCount").innerText = gst + " >";
  document.getElementById("itrCount").innerText = itr + " >";
  document.getElementById("tdsCount").innerText = tds + " >";

}

window.onload = loadDashboardData;

function addClient(){
  window.location.href = "add-client.html";
}

function addEmployee(){
  window.location.href = "add-employee.html";
}


function goUpload(){
  window.location.href = "upload.html";
}

function goClients(){
  window.location.href = "clients.html";
}

window.openGST = function(){
  window.location.href = "admin-category-docs.html?service=GST";
}

window.openITR = function(){
  window.location.href = "admin-category-docs.html?service=ITR";
}

window.openTDS = function(){
  window.location.href = "admin-category-docs.html?service=TDS";
}

function goProfile(){
  window.location.href = "admin-profile.html";
}
//to disable new employee button
// Wait until DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  // Select the "New Employee" button (second button with class top-btn)
  const employeeBtn = document.querySelectorAll('.top-btn')[1];

  // Make it look slightly faded
  employeeBtn.style.opacity = '0.6';  // slightly transparent
  employeeBtn.style.pointerEvents = 'auto'; // ensure it can still detect clicks
  employeeBtn.style.cursor = 'not-allowed'; // cursor shows not-allowed

  // Override click to show popup instead of navigating
  employeeBtn.onclick = function(event) {
    event.preventDefault(); // prevent navigation
    alert("Adding employees is for future scope!");
  };
});