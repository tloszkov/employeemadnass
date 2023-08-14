import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import EquipmentTable from "../Equipment/EquipmentTable";


const fetchEquipments = () => {
  return fetch("/api/equipments/").then((res) =>{ 
    return res.json()});
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

console.log("fetching...");
fetchEquipments();

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
//   const [sortDirection, setSortDirection] = useState(1);
  const [reloadEquipments, setReloadEquipments] = useState(true);

  const handleFilter = (event) =>{
    const filter = event.target.id.split(":");
    if(filter.length===1){
      setReloadEquipments(prevValue => !prevValue)
    }
    console.log("filter:", filter)
    setFilterBy(event.target.id);
    setEquipments((equipments)=>{
      return equipments.filter((equipment)=>{
        if (equipment[filter[0]]===filter[1]){
          return equipment
        }
      });
    })
  }
  
//   const handleSort = (event) =>{
//     setSortDirection(prevValue =>-prevValue);
//     const sortBy = event.target.id;

//     if (sortBy==="0"){
//       return employees.sort((a,b)=>{
//         const aNames = a.name.split(" ");
//         const bNames = b.name.split(" ");
//         return sortDirection*aNames[0].localeCompare(bNames[0]);
//       });
//     }

//     if (sortBy==="1"){
//       return employees.sort((a,b)=>{
//         const aNames = a.name.split(" ");
//         const bNames = b.name.split(" ");
//         if (bNames.length===3 && aNames.length===3){
//           return bNames[1]>aNames[1]?sortDirection:-sortDirection;
//         }
//         if (bNames.length===3){
//           return 1;
//         }
//         if (aNames.length===3){
//           return -1;
//         }
//         return 0;
//       });
//     }

//     if (sortBy==="2"){
//       return employees.sort((a,b)=>{
//         const aNames = a.name.split(" ");
//         const bNames = b.name.split(" ");
//         if (bNames.length===3){
//           return aNames[1]>bNames[2]?sortDirection:-sortDirection;
//         }
//         if (aNames.length===3){
//           return aNames[2]>bNames[1]?sortDirection:-sortDirection;
//         }
//         return aNames[1]>bNames[1]?sortDirection:-sortDirection;
//         });
//     }

//     setEmployees((employees)=>{
//       return employees.sort((a,b)=>{
//         return (a[sortBy]>b[sortBy]?sortDirection:-sortDirection);
//       });
//     });
//   }

  const handleDelete = (id) => {
    deleteEquipment(id);
    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments()
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments);
      })
  }, [reloadEquipments]);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipments={equipments} onDelete={handleDelete} onFilter={handleFilter}/>;
};

export default EquipmentList;
