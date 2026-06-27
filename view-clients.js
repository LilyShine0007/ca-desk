import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const container = document.getElementById("clientContainer");
const searchInput = document.getElementById("searchInput");

let clients = [];

async function loadClients(){

const snapshot = await getDocs(collection(db,"clients"));

for(const clientDoc of snapshot.docs){

const data = clientDoc.data();
const uid = clientDoc.id;

let gst=0, itr=0, tds=0;

const docs = await getDocs(collection(db,"clients",uid,"documents"));

docs.forEach(d=>{

const title=d.data().title.toLowerCase();

if(title.includes("gst")) gst++;
if(title.includes("itr")) itr++;
if(title.includes("tds")) tds++;

});

clients.push({
uid:uid,
name:data.name,
email:data.email,
gst:gst,
itr:itr,
tds:tds
});

}

render(clients);

}


function render(list){

container.innerHTML="";

list.forEach(client=>{

const row=document.createElement("div");
row.className="client-row";

const initial = client.name.charAt(0).toUpperCase();

row.innerHTML=`

<div class="client-left" onclick="openClient('${client.uid}')">

<div class="avatar">${initial}</div>

<div>
<div class="client-name">${client.name}</div>
<div class="client-email">${client.email}</div>
</div>

</div>

<div class="badges">

<span class="badge gst">GST ${client.gst}</span>
<span class="badge itr">ITR ${client.itr}</span>
<span class="badge tds">TDS ${client.tds}</span>

</div>

`;

container.appendChild(row);

});

}

window.openClient = function(uid){
window.location.href = "admin-client-docs.html?uid="+uid;
};


searchInput.addEventListener("input",()=>{

const value = searchInput.value.toLowerCase();

const filtered = clients.filter(c =>
c.name.toLowerCase().includes(value) ||
c.email.toLowerCase().includes(value)
);

render(filtered);

});


loadClients();