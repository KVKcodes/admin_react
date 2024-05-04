import React, { useState } from 'react';
import WelcomePage from './components/welcome';
import ListingPage from './components/listing';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterSalary, setFilterSalary] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleModifyEmployee = (index) => {
    setEditingIndex(index);
    // Implement modify logic (e.g., prefill form with employee details for editing)
  };

  const handleSaveEmployee = (modifiedEmployee) => {
    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = modifiedEmployee;
    setEmployees(updatedEmployees);
    setEditingIndex(null); // Reset editing state
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
      {/* Render ModifyEmployee component conditionally based on editingIndex */}
      {/* <ModifyEmployee employee={employees[editingIndex]} onSave={handleSaveEmployee} /> */}
    </div>
  );
};

export default App;
