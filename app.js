import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDe6zOvbqv_mO1cKvZMnfvcrCizfGAVY0Y",
  authDomain: "schooldatabase-1c974.firebaseapp.com",
  projectId: "schooldatabase-1c974",
  storageBucket: "schooldatabase-1c974.firebasestorage.app",
  messagingSenderId: "505137548202",
  appId: "1:505137548202:web:04e37dba1613774d4839d3",
  measurementId: "G-1JC0BJMBEQ"
};

const app = initializeApp(firebaseConfig);
        console.log("-----------------------------------------");
        console.log(" SUCCESS! Firebase App Initialized.");
        console.log("Project ID:", firebaseConfig.projectId);
        console.log("App ID:", firebaseConfig.appId);
        console.log("-----------------------------------------");
const db = getFirestore(app);


const studentsList = document.getElementById('studentsList');
const form = document.getElementById('studentForm');
const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');
const cancelUpdate = document.getElementById('cancelUpdate');
let currentDocId = null;

async function displayStudents() {
  studentsList.innerHTML = ""; 

  const querySnapshot = await getDocs(collection(db, "Students"));

  querySnapshot.forEach((docSnap) => {
    const student = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="student-card" style="border:1px solid #ccc; padding:10px; margin:10px; border-radius:5px;">
        <h3>${student.Name}</h3>
        <p><strong>Age:</strong> ${student.Age}</p>
        <p><strong>Gender:</strong> ${student.Gender}</p>
        <p><strong>Email:</strong> ${student["E-mail"]}</p>
        <p><strong>Address:</strong> ${student.Address}</p>
        <button class="update-btn">Update Info</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    
    li.querySelector('.delete-btn').onclick = async () => {
      if (confirm(`Are you sure you want to delete ${student.Name}?`)) {
        await deleteDoc(doc(db, "Students", docSnap.id));
        displayStudents();
      }
    };

    
    li.querySelector('.update-btn').onclick = () => {
      currentDocId = docSnap.id;
      document.getElementById('updateName').value = student.Name;
      document.getElementById('updateAge').value = student.Age;
      document.getElementById('updateGender').value = student.Gender;
      document.getElementById('updateEmail').value = student["E-mail"];
      document.getElementById('updateAddress').value = student.Address;
      updateModal.style.display = "flex";
    };

    studentsList.appendChild(li);
  });
}


displayStudents();


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "Students"), {
    Name: document.getElementById('Name').value,
    Age: Number(document.getElementById('Age').value),
    Gender: document.getElementById('Gender').value,
    "E-mail": document.getElementById('E-mail').value,
    Address: document.getElementById('Address').value
  });

  form.reset();
  displayStudents();
});


updateForm.onsubmit = async (e) => {
  e.preventDefault();
  if (!currentDocId) return;

  await updateDoc(doc(db, "Students", currentDocId), {
    Name: document.getElementById('updateName').value,
    Age: Number(document.getElementById('updateAge').value),
    Gender: document.getElementById('updateGender').value,
    "E-mail": document.getElementById('updateEmail').value,
    Address: document.getElementById('updateAddress').value
  });

  updateModal.style.display = "none";
  currentDocId = null;
  displayStudents();
};

 
cancelUpdate.onclick = () => {
  updateModal.style.display = "none";
};
