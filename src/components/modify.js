import React, { useState } from 'react';

const ModifyEmployee = ({ employee, onSave, onCancel }) => {
  const [name, setName] = useState(employee.name);
  const [salary, setSalary] = useState(employee.salary);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...employee, name, salary });
  };

  return (
    <div>
      <h2>Modify Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Salary:
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ModifyEmployee;
