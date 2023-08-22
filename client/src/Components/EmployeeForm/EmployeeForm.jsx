import { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [present, setPresent] = useState(employee?.present ?? false);
  const [equipment, setEquipment] = useState(employee?.equipment ?? "");
  const [favoriteBrand, setFavoriteBrand] = useState(employee?.favoriteBrand ?? "");
  const [color, setColor] = useState(employee?.color ?? "");
  const [salary, setSalary] = useState(employee?.salary ?? 0);
  const [desiredSalary, setDesiredSalary] = useState(employee?.desiredSalary ?? 0);
  const [startingDate, setStartingDate] = useState(employee?.startingDate ?? Date.now());
  const [equipmentList, setEquipmentList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [company, setCompany] = useState(null)
  
  console.log(companyList);

  const fetchEquipments = () => {
    return fetch("/api/equipments/").then((res) =>{ 
      return res.json()});
  };

  const fetchCompanies = () => {
    return fetch("/api/companies/").then((res) =>{ 
      return res.json()});
  };

  const fetchBrands = () => {
    return fetch("/api/brands/").then((res) =>{ 
      return res.json()});
  };

 useEffect(() => {
  // Define an array of Promises
  const promises = [
    fetchEquipments(),
    fetchBrands(),
    fetchCompanies()
  ];

  // Use Promise.all to wait for all Promises to resolve
  Promise.all(promises)
    .then(([equipments, brands, companies]) => {
      // Update state with the fetched data
      setEquipmentList(equipments);
      setBrandList(brands);
      setCompanyList(companies);
    })
    .catch((error) => {
      // Handle errors here if any of the Promises reject
      console.error("Error fetching data:", error);
    });
}, []);
  

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      
      return onSave({
        ...employee,
        name,
        level,
        position,
        present,
        equipment,
        favoriteBrand,
        color,
        salary,
        desiredSalary,
        startingDate,
        company
        
      });
    }

    return onSave({
      name,
      level,
      position,
      present,
      equipment,
      favoriteBrand,
      color,
      salary,
      desiredSalary,
      startingDate,
      company
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
        <label htmlFor="position">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            return setColor(e.target.value)}}
          name="color"
          id="color"
          />
      </div>

      <div className="control">
        <label htmlFor="position">Salary:</label>
        <input
          type="input"
          value={salary}
          onChange={(e) => {
            return setSalary(e.target.value)}}
          name="salary"
          id="salary"
          />
      </div>

      
      <div className="control">
         <label htmlFor="brand">Companies:</label>
         <select>
            {companyList.map((company)=><option id={company._id} onClick={(e)=> setCompany(e.target.id)}>
              {company.name}</option>)}  
         </select>
         <input
          value={company}
          name="company"
          id="company"
          />
       
      </div>

      <div className="control">
        <label htmlFor="position">Desired salary:</label>
        <input
          type="input"
          value={desiredSalary}
          onChange={(e) => {
            return setDesiredSalary(e.target.value)}}
          name="desiredSalary"
          id="desiredSalary"
          />
      </div>

      <div className="control">
        <label htmlFor="position">Starting date:</label>
        <input
          type="date"
          value={startingDate}
          onChange={(e) => {
            return setStartingDate(e.target.value)}}
          name="startingDate"
          id="startingDate"
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

      <div className="control">
        <select>
          {brandList.map((brand) => {
             	return <option id={brand._id} onClick={(e)=>{
                    return setFavoriteBrand(e.target.id)}}>
                    {brand.name}
                    </option>
          	})}
          </select>

        <label htmlFor="brand">Brand:</label>
        <input
          value={favoriteBrand}
          name="brand"
          id="brand"
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
