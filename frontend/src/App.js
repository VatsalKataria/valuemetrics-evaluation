import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EntryScreen from './components/EntryScreen';
import List from './components/List';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Router>
      <div>
        <h1>Student Management</h1>

        {/* Navigation Links */}
        <nav>
          <Link to="/">Add Student</Link> |{" "}
          <Link to="/students">View Students</Link>
        </nav>

        <Routes>
          <Route 
            path="/" 
            element={<EntryScreen fetchStudents={fetchStudents} />} 
          />
          <Route 
            path="/students" 
            element={
              <List 
                students={students} 
                fetchStudents={fetchStudents} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;