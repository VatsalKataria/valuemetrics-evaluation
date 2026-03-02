import React from "react";
import axios from "axios";

const List = ({ students, fetchStudents }) => {

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student List</h2>

      <div className="card shadow">
        <div className="card-body">
          {students.length === 0 ? (
            <p className="text-center text-muted">No students found</p>
          ) : (
            <ul className="list-group">
              {students.map((student) => (
                <li
                  key={student._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>
                      {student.firstName} {student.lastName}
                    </strong>
                    <br />
                    <small className="text-muted">
                      Roll No: {student.rollNumber}
                    </small>
                  </div>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;