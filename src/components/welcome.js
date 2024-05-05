import React, { useState } from 'react';

const WelcomePage = ({ onAddEmployee }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee({ id, name, salary });
    setName('');
    setSalary('');
  };

  return (
    <div>
      <h2>Welcome to Admin Panel</h2>
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
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default WelcomePage;
