import React from 'react';

const ListingPage = ({ employees, filterName, filterSalary, onNameFilterChange, onSalaryFilterChange, onDeleteEmployee, onModifyEmployee }) => {
  const handleDelete = (index) => {
    onDeleteEmployee(index);
  };

  const handleModify = (index) => {
    onModifyEmployee(index);
  };

  return (
    <div>
      <h2>Employee Listing</h2>
      <div>
        Filter by Name: <input type="text" value={filterName} onChange={(e) => onNameFilterChange(e.target.value)} />
      </div>
      <div>
        Filter by Salary: <input type="text" value={filterSalary} onChange={(e) => onSalaryFilterChange(e.target.value)} />
      </div>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.name} - {employee.salary}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleModify(index)}>Modify</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;
