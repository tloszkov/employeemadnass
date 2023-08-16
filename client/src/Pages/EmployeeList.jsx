import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = (search) => {
  if (search===undefined){
    return fetch(`/api/employees/`).then((res) => res.json());
  }else {
    return fetch(`/api/employees/search/${search}`).then((res) => res.json());

  }

};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [reloadEmployees, setReloadEmployees] = useState(true);

 
  const { search } = useParams();
  // console.log("search:", search)

  const handleFilter = (event) =>{
    const filter = event.target.id.split(":");
    if(filter.length===1){
      setReloadEmployees(prevValue => !prevValue)
    }
    console.log("filter:", filter)
    setFilterBy(event.target.id);
    setEmployees((employees)=>{
      return employees.filter((employee)=>{
        if (employee[filter[0]]===filter[1]){
          return employee
        }
      });
    })
  }
  
  const handleSort = (event) =>{
    setSortDirection(prevValue =>-prevValue);
    const sortBy = event.target.id;

    if (sortBy==="0"){
      return employees.sort((a,b)=>{
        const aNames = a.name.split(" ");
        const bNames = b.name.split(" ");
        return sortDirection*aNames[0].localeCompare(bNames[0]);
      });
    }

    if (sortBy==="1"){
      return employees.sort((a,b)=>{
        const aNames = a.name.split(" ");
        const bNames = b.name.split(" ");
        if (bNames.length===3 && aNames.length===3){
          return bNames[1]>aNames[1]?sortDirection:-sortDirection;
        }
        if (bNames.length===3){
          return 1;
        }
        if (aNames.length===3){
          return -1;
        }
        return 0;
      });
    }

    if (sortBy==="2"){
      return employees.sort((a,b)=>{
        const aNames = a.name.split(" ");
        const bNames = b.name.split(" ");
        if (bNames.length===3){
          return aNames[1]>bNames[2]?sortDirection:-sortDirection;
        }
        if (aNames.length===3){
          return aNames[2]>bNames[1]?sortDirection:-sortDirection;
        }
        return aNames[1]>bNames[1]?sortDirection:-sortDirection;
        });
    }

    setEmployees((employees)=>{
      return employees.sort((a,b)=>{
        return (a[sortBy]>b[sortBy]?sortDirection:-sortDirection);
      });
    });
  }

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(search)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [reloadEmployees]);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} onDelete={handleDelete} onFilter={handleFilter} onSort={handleSort}/>;
};

export default EmployeeList;
