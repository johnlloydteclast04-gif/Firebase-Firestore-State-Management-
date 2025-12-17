import React, { useState } from 'react';
import { useStudents } from '../StudentContext.js';

export const StudentForm = () => {
  const { addStudent, loading, error } = useStudents();
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    'E-mail': '',
    Address: ''
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'Age' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.Name || !formData.Age || !formData.Gender || !formData['E-mail'] || !formData.Address) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await addStudent(formData);
      // Reset form
      setFormData({
        Name: '',
        Age: '',
        Gender: '',
        'E-mail': '',
        Address: ''
      });
    } catch (err) {
      setFormError('Failed to add student: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      {formError && <div className="error-message">{formError}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form id="studentForm" onSubmit={handleSubmit}>
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
          id="Age" 
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
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};
