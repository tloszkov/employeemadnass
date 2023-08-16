const levels = require("../Filter options/levels.json");
const positons = require("../Filter options/positions.json");

function FilterBar({onFilter}) {

    return (
      <tr>
        <th>Filter</th>
        <th></th>
        <th>
            {levels.map((level) => (
              <button id={"level:"+level} onClick={onFilter}
              >{level}</button>
            ))}
        </th>
        <th>
            {positons.map((position) => (
              <button id={"position:"+position} onClick={onFilter}
              >{position}</button>
            ))}
        </th>
        <th></th>
        <th>
            <button id ="" onClick={onFilter}>Clear Filter</button>
        </th>
      </tr>
    );
    
}

export default FilterBar;
