import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import FilterBar from "../FilterBar.jsx";
import SortBar from "../SortBar.jsx";




const EmployeeTable = ({ employees, onDelete, onSort, onFilter }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Nr</th>
          <th>Name</th>
          <th className="level-col">Level</th>
          <th className="position-col">Position</th>
          <th className="buttons-col" />
        </tr>
      </thead>
      <tbody>
          <FilterBar onFilter={onFilter}/>
          <SortBar onSort={onSort}/>
        {employees.map((employee,index) => (
          <tr key={employee._id}>
            <td>{index+1}</td>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
