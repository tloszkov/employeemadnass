
function EquipmentSortBar({onSort}) {

    return (
      <tr>
        <th>Sort</th>
        <th>
        <button id="name" onClick={onSort}>By name:</button>
        </th>
        <th>
        <button id="type" onClick={onSort}>By type:</button>
        </th>
        <th>
        <button id="amount" onClick={onSort}>By amount:</button>
        </th>
        <th></th>
      </tr>
    );
}

export default EquipmentSortBar;