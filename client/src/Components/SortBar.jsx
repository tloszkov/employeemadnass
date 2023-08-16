
function SortBar({onSort}) {

    return (
      <tr>
        <th>Sort</th>
        <th>
            By name:
            <button id="0"onClick={onSort}
            >1st</button>
            <button id="1"onClick={onSort}
            >Middle</button>
            <button id="2"onClick={onSort}
            >2nd</button>
        </th>
        <th>
            By level:
              <button id="level" onClick={onSort}
              >Level</button>
        </th>
        <th>
                By position:
              <button id="position"onClick={onSort}
              >Position</button>
        </th>
        <th></th>
        <th>
            {/* <button id="" onClick={onSort}
            >Clear Sort</button> */}
        </th>
      </tr>
    );
    
}

export default SortBar;