import React, { useState, useEffect } from 'react';
import WelcomePage from './components/welcome';
import ListingPage from './components/listing';
import ModifyEmployee from './components/modify';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch all employees from Flask backend when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/employees');
  
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
  
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      await fetchEmployees(); // Refresh employees after adding
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      await fetchEmployees(); // Refresh employees after deleting
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  const handleModifyEmployee = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEmployee = async (modifiedEmployee) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/employees/${modifiedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedEmployee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      await fetchEmployees(); // Refresh employees after updating
      setEditingIndex(null); // Reset editing state
    } catch (error) {
      console.error('Error updating employee:', error.message);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(filterName.toLowerCase()) &&
      employee.salary.toString().includes(filterSalary)
  );

  return (
    <div>
      <WelcomePage onAddEmployee={handleAddEmployee} />
      <ListingPage
        employees={filteredEmployees}
        filterName={filterName}
        filterSalary={filterSalary}
        onNameFilterChange={setFilterName}
        onSalaryFilterChange={setFilterSalary}
        onDeleteEmployee={handleDeleteEmployee}
        onModifyEmployee={handleModifyEmployee}
      />
      {editingIndex !== null && (
        <ModifyEmployee
          employee={employees[editingIndex]}
          onSave={handleSaveEmployee}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
};

export default App;
