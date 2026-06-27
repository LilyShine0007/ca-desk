import { db } from "./firebase.js";

import {
doc,
getDoc,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");


const avatar = document.getElementById("avatar");
const clientName = document.getElementById("clientName");
const clientEmail = document.getElementById("clientEmail");

const gstCount = document.getElementById("gstCount");
const itrCount = document.getElementById("itrCount");
const tdsCount = document.getElementById("tdsCount");

const docList = document.getElementById("docList");


async function loadClient(){

const clientSnap = await getDoc(doc(db,"clients",uid));

if(clientSnap.exists()){

const data = clientSnap.data();

clientName.innerText = data.name;
clientEmail.innerText = data.email;

avatar.innerText = data.name.charAt(0).toUpperCase();

}

let gst=0;
let itr=0;
let tds=0;

const docs = await getDocs(collection(db,"clients",uid,"documents"));

docs.forEach((d)=>{

const data = d.data();

const service = data.service;

if(service==="GST") gst++;
if(service==="ITR") itr++;
if(service==="TDS") tds++;


const row=document.createElement("div");
row.className="doc-row";

row.innerHTML=`

<div>

<div class="doc-title">${data.title}</div>
<div style="font-size:12px;color:#777">${data.year} • ${data.service}</div>

</div>

<div class="doc-actions">

<a href="${data.link}" target="_blank">
<button class="view-btn">View</button>
</a>

<a href="${data.link}" download>
<button class="download-btn">Download</button>
</a>

</div>

`;

docList.appendChild(row);

});

gstCount.innerText=gst;
itrCount.innerText=itr;
tdsCount.innerText=tds;

}


loadClient();