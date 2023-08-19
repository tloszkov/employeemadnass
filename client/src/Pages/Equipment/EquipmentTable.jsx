import { Link } from "react-router-dom";
import "../../Components/EmployeeTable/EmployeeTable.css";
import EquipmentFilterBar from "./Components/EquipmentFilterBar";
import EquipmentSortBar from "./Components/EquipmentSortBar";
import EquipmentPaginationBar from "./Components/EquipmentPaginationBar";

const EquipmentTable = ({ equipments, onDelete, onFilter, onPage, page, onSort }) => (
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
          <EquipmentSortBar onSort={onSort}/>
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
              <Link to={`/equipment/delete/${equipment._id}`}>
                <button type="button">Delete</button>
              </Link>
            </td>
          </tr>
        ))}
        <EquipmentPaginationBar onPage={onPage} pageAmount={page}/>
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
