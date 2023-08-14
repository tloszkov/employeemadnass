import { Link } from "react-router-dom";
import "../../Components/EmployeeTable/EmployeeTable.css";
import EquipmentFilterBar from "./Components/EquipmentFilterBar";

const EquipmentTable = ({ equipments, onDelete, onFilter }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Nr</th>
          <th>Name</th>
          <th className="type-col">Type</th>
          <th className="amount-col">Amount</th>
          <th className="buttons-col" />
        </tr>
      </thead>
      <tbody>
          <EquipmentFilterBar onFilter={onFilter}/>
          {/* <SortBar onSort={onSort}/> */}
        {equipments.map((equipment,index) => (
          <tr key={equipment._id}>
            <td>{index+1}</td>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/equipment/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
