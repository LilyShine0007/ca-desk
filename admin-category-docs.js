import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const service = params.get("service");

const pageTitle = document.getElementById("pageTitle");
const docList = document.getElementById("docList");

pageTitle.innerText = service + " Documents";


async function loadDocuments(){

const clients = await getDocs(collection(db,"clients"));

for(const clientDoc of clients.docs){

const clientData = clientDoc.data();
const clientId = clientDoc.id;

const docs = await getDocs(collection(db,"clients",clientId,"documents"));

docs.forEach(d=>{

const data = d.data();

if(data.service !== service) return;

const row = document.createElement("tr");

row.innerHTML = `

<td>${clientData.name}</td>

<td>${data.title}</td>

<td>${data.year}</td>

<td>

<a href="${data.link}" target="_blank">
<button class="view-btn">View</button>
</a>

<a href="${data.link}" download>
<button class="download-btn">Download</button>
</a>

</td>

`;

docList.appendChild(row);

});

}

}

loadDocuments();