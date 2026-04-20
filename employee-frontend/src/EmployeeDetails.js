import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`)
      .then(res => setEmployee(res.data))
      .catch(() => setEmployee(null));
  }, [id]);

  if (!employee) return <p>Employee not found.</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default EmployeeDetails;
