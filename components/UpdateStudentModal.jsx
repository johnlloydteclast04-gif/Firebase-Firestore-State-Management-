import React, { useState, useEffect } from 'react';
import { useStudents } from '../StudentContext.js';

export const UpdateStudentModal = ({ studentId, student, onClose }) => {
  const { updateStudent, loading } = useStudents();
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    'E-mail': '',
    Address: ''
  });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (student) {
      setFormData({
        Name: student.Name || '',
        Age: student.Age || '',
        Gender: student.Gender || '',
        'E-mail': student['E-mail'] || '',
        Address: student.Address || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'updateAge' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.Name || !formData.Age || !formData.Gender || !formData['E-mail'] || !formData.Address) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await updateStudent(studentId, formData);
      onClose();
    } catch (err) {
      setFormError('Failed to update student: ' + err.message);
    }
  };

  return (
    <div id="updateModal" className="modal">
      <div className="modal-content">
        <h2>Update Student Info</h2>
        {formError && <div className="error-message">{formError}</div>}
        
        <form id="updateForm" onSubmit={handleSubmit}>
          <label>Name</label>
          <input 
            type="text" 
            id="Name" 
            placeholder="Name" 
            value={formData.Name}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          
          <input 
            type="number" 
            id="updateAge" 
            placeholder="Age" 
            value={formData.Age}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          
          <input 
            type="text" 
            id="Gender" 
            placeholder="Gender" 
            value={formData.Gender}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          
          <input 
            type="email" 
            id="E-mail" 
            placeholder="Email" 
            value={formData['E-mail']}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          
          <input 
            type="text" 
            id="Address" 
            placeholder="Address" 
            value={formData.Address}
            onChange={handleChange}
            required 
            disabled={loading}
          />
          
          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button type="button" id="cancelUpdate" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
