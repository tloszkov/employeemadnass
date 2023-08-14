const types = require("../Components/Filter options/equipmentTypeOptions.json");

function EquipmentFilterBar({onFilter}) {

    return (
      <tr>
        <th>Filter</th>
        <th></th>
        <th>
            {types.map((type) => (
              <button id={"type:"+type} onClick={onFilter}
              >{type}</button>
            ))}
        </th>
        <th>
            
        </th>
        <th>
            <button id ="" onClick={onFilter}>Clear Filter</button>
        </th>
      </tr>
    );
    
}

export default EquipmentFilterBar;
