import React, { createContext, useState, useCallback, useEffect } from 'react';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Create the context
export const StudentContext = createContext();

// Create the provider component
export const StudentProvider = ({ children, db }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students from Firestore
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "Students"));
      const studentsList = [];
      querySnapshot.forEach((docSnap) => {
        studentsList.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      setStudents(studentsList);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  }, [db]);

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Add a new student
  const addStudent = useCallback(async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, "Students"), studentData);
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error("Error adding student:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [db, fetchStudents]);

  // Delete a student
  const deleteStudent = useCallback(async (studentId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "Students", studentId));
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error("Error deleting student:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [db, fetchStudents]);

  // Update a student
  const updateStudent = useCallback(async (studentId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await updateDoc(doc(db, "Students", studentId), updatedData);
      await fetchStudents(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error("Error updating student:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [db, fetchStudents]);

  const value = {
    students,
    loading,
    error,
    addStudent,
    deleteStudent,
    updateStudent,
    fetchStudents
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the StudentContext
export const useStudents = () => {
  const context = React.useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};
