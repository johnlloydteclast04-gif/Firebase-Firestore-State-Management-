import React, { useState } from 'react';
import { useStudents } from '../StudentContext.js';

export const StudentList = () => {
  const { students, loading, error, deleteStudent } = useStudents();

  const handleDelete = async (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      try {
        await deleteStudent(studentId);
      } catch (err) {
        console.error('Failed to delete student:', err);
      }
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="student-list-container">
        <h2>Student Records</h2>
        <div className="loading-message">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <h2>Student Records</h2>
      {error && <div className="error-message">{error}</div>}
      
      {students.length === 0 ? (
        <p className="no-students">No students found. Add one to get started!</p>
      ) : (
        <ul id="studentsList" className="students-list">
          {students.map(student => (
            <li key={student.id} className="student-item">
              <div className="student-card">
                <h3>{student.Name}</h3>
                <p><strong>Age:</strong> {student.Age}</p>
                <p><strong>Gender:</strong> {student.Gender}</p>
                <p><strong>Email:</strong> {student['E-mail']}</p>
                <p><strong>Address:</strong> {student.Address}</p>
                <div className="button-group">
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(student.id, student.Name)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
