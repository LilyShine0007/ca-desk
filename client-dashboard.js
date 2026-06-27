import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const clientName = document.getElementById("clientName");
const gstCount = document.getElementById("gstCount");
const itrCount = document.getElementById("itrCount");
const tdsCount = document.getElementById("tdsCount");
const recentDocs = document.getElementById("recentDocs");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "client-login.html";
        return;
    }

    console.log("Logged in UID:", user.uid);

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
        window.location.href = "client-login.html";
        return;
    }

    const data = userDoc.data();

    if (data.role !== "client") {
        window.location.href = "index.html";
        return;
    }

    clientName.innerText = data.name || "Client";

    const docsRef = collection(db, "documents");
    const q = query(docsRef, where("clientId", "==", user.uid));
    const snapshot = await getDocs(q);

    let gst = 0, itr = 0, tds = 0;

    recentDocs.innerHTML = "";

    snapshot.forEach((docSnap) => {
        const d = docSnap.data();

        // 🔹 File type icon
        let icon = "📄";
        const link = d.fileUrl?.toLowerCase() || "";
        if(link.includes(".pdf")) icon = "📄";
        else if(link.includes(".xls") || link.includes(".xlsx")) icon = "📊";
        else if(link.includes(".doc") || link.includes(".docx")) icon = "📝";
        else if(link.includes(".jpg") || link.includes(".png")) icon = "🖼️";

        // 🔹 Update counts
        if (d.service === "GST") gst++;
        else if (d.service === "ITR") itr++;
        else if (d.service === "TDS") tds++;
        
        

        // 🔹 Convert Google Drive link for download
        let downloadLink = d.fileUrl || "#";
        if(downloadLink.includes("drive.google.com")){
            try{
                const fileId = downloadLink.split("/d/")[1].split("/")[0];
                downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
            }catch(e){
                console.log("Drive link conversion failed");
            }
        }

        // 🔹 Create document row with View & Download buttons
        const div = document.createElement("div");
        div.classList.add("doc-item");
        div.innerHTML = `
            <span>${icon} ${d.name}</span>
            <div class="doc-actions">
                <a href="${d.fileUrl}" target="_blank">
                    <button class="view-btn">View</button>
                </a>
                <a href="${downloadLink}">
                    <button class="download-btn">Download</button>
                </a>
            </div>
        `;
        recentDocs.appendChild(div);
    });

    gstCount.innerText = gst;
    itrCount.innerText = itr;
    tdsCount.innerText = tds;

    

});

window.logout = async function(){
    await signOut(auth);
    window.location.href = "client-login.html";
}