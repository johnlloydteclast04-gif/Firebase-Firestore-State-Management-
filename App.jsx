import React, { useState } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { StudentProvider } from './StudentContext.js';
import { StudentForm } from './components/StudentForm.jsx';
import { StudentList } from './components/StudentList.jsx';
import { UpdateStudentModal } from './components/UpdateStudentModal.jsx';
import './style.css';

// Initialize Firebase
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

// Main App Component
function App() {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenUpdateModal = (student) => {
    setSelectedStudent(student);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <StudentProvider db={db}>
      <div className="app-container">
        <header>
          <h1>Student Database</h1>
        </header>
        
        <main>
          <section className="form-section">
            <StudentForm />
          </section>

          <section className="list-section">
            <StudentList onEdit={handleOpenUpdateModal} />
          </section>
        </main>

        {updateModalOpen && selectedStudent && (
          <UpdateStudentModal 
            studentId={selectedStudent.id}
            student={selectedStudent}
            onClose={handleCloseUpdateModal}
          />
        )}
      </div>
    </StudentProvider>
  );
}

export default App;
