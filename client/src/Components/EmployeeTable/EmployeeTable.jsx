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
          <th >Favorite brand</th>
          <th >Equipment</th>
          <th >Color</th>
          <th >Salary</th>
          <th >Desired salary</th>
          <th >Starting Date</th>

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
            <td>{employee.favoriteBrand.name}</td>
            <td>
              {employee.equipment.map((equipment,index)=>{
                return <div>
                  {equipment.name}</div>
              })}
            </td>
            <td style={{backgroundColor:employee.color}}></td>
            <td>{employee.salary}</td>
            <td>{employee.desiredSalary}</td>
            <td>{new Date(employee.startingDate).toDateString()}</td>
            <input type="checkbox" checked={employee.present}></input>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <Link to={`/equipment/delete/${employee._id}`}>
                <button id={employee._id} type="button" onDelete={onDelete}>Delete</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
