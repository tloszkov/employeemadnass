import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [present, setPresent] = useState(employee?.present ?? false);
  const [equipment, setEquipment] = useState(employee?.equipment ?? "");
  const [equipmentList, setEquipmentList] = useState([])

  const fetchEquipments = () => {
    return fetch("/api/equipments/").then((res) =>{ 
      return res.json()});
  };

  useEffect(() => {
    fetchEquipments()
      .then((equipments) => {
        setEquipmentList(equipments);
      })
  }, [])
  

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      
      return onSave({
        ...employee,
        name,
        level,
        position,
        present,
        equipment
        
      });
    }

    return onSave({
      name,
      level,
      position,
      present,
      equipment
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Present:</label>
        <input
          checked={present}
          type="checkbox"
          onClick={(e) => {
            return setPresent(e.target.checked)}}
          name="present"
          id="present"
          />
      </div>

      <div className="control">
        
        <select>
          {equipmentList.map((equipment) => {
             	return <option id={equipment._id} onClick={(e)=>{
                    return setEquipment(e.target.id)}}>
                    {equipment.name}
                    </option>
          	})}
          </select>

        <label htmlFor="equipment">Equipment:</label>
        <input
          value={equipment}
          name="equipment"
          id="equipment"
          />
      </div>



      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
