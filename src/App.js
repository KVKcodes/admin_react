import React, { useState } from 'react';
import WelcomePage from './components/welcome';
import ListingPage from './components/listing';
import ModifyEmployee from './components/modify'

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
