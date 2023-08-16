import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import EquipmentTable from "../Equipment/EquipmentTable";


const fetchEquipments = (url) => {
  return fetch(url).then((res) => {
    return res.json()});
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};


const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
//   const [sortDirection, setSortDirection] = useState(1);
  const [reloadEquipments, setReloadEquipments] = useState(true);
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("/api/equipments?page=0&count=10")

  const handleFilter = (event) =>{
    const filter = event.target.id.split(":");
    if(filter.length===1){
      setReloadEquipments(prevValue => !prevValue)
    }
    setFilterBy(event.target.id);
    setEquipments((equipments) => {
      return equipments.filter((equipment)=>{
        	if (equipment[filter[0]]===filter[1]){
          	return equipment
        	}
      	});
    	}
    )
  }
  
  const handleDelete = (id) => {
    deleteEquipment(id);
    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  const handlePage = (page) =>{
    setUrl(`/api/equipments?page=${page*10}&count=10`);
  }

  useEffect(() => {
    fetchEquipments(url)
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments.equipment);
        setPage(equipments.resultCount);
      })
  }, [reloadEquipments,url]);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipments={equipments} onDelete={handleDelete} onFilter={handleFilter} onPage={handlePage} page={page}/>;
};

export default EquipmentList;
