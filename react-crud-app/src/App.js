import React, { useState } from 'react';
import './App.css';

// Sample data for demonstration
const initialData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
];

function App() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ id: null, name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new record
  const handleAdd = () => {
    const newData = { id: Date.now(), ...form };
    setData([...data, newData]);
    setForm({ id: null, name: '', email: '' });
  };

  // Edit existing record
  const handleEdit = (record) => {
    setForm(record);
    setIsEditing(true);
  };

  // Update record
  const handleUpdate = () => {
    const updatedData = data.map(item => item.id === form.id ? form : item);
    setData(updatedData);
    setForm({ id: null, name: '', email: '' });
    setIsEditing(false);
  };

  // Delete record
  const handleDelete = (id) => {
    const filteredData = data.filter(item => item.id !== id);
    setData(filteredData);
  };

  return (
    <div className="App">
      <h1>React CRUD App</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <ul>
        {data.map(record => (
          <li key={record.id}>
            {record.name} ({record.email})
            <button onClick={() => handleEdit(record)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
