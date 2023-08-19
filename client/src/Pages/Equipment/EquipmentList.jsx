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
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [url, setUrl] = useState("/api/equipments?page=0&count=10&sortBy=name&sortDirection=1");
  const [sortDirection, setSortDirection] = useState(1)
  const [sortBy, setSortBy] = useState("name")

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

  const handlePage = (page) => {
    setPage(page);
    setUrl(`/api/equipments?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&count=10`);
  }
  
  const handleSort = (id) => {
    setSortBy(id.target.id);
    setSortDirection(prevValue =>-prevValue);
    setUrl(`/api/equipments?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&count=10`);
  }

  useEffect(() => {
    fetchEquipments(url)
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments.equipment);
        setMaxPage(equipments.resultCount);
      })
  }, [reloadEquipments,url,sortDirection,sortBy,page]);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipments={equipments} onDelete={handleDelete} onFilter={handleFilter} onPage={handlePage} page={maxPage} onSort={handleSort}/>;
};

export default EquipmentList;
