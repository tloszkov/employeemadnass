import react, {useEffect, useState}  from "react";
import { useParams, useNavigate, } from "react-router-dom";

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).catch((error) => {
    console.error("Error:", error);
  });
};
    

function DeleteForm() {
  const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      Promise.all(
      fetchEmployee(id)
        .then((employee) => {
          console.log("employee:", employee)
          setEmployee(employee);
        })
      );
    }, [id]);

    return (
      <div className="deleteForm">
       
        <div>
          <label>Are you sure to delete the element?</label>
        </div>
        <div>
          Employee name :
            {employee.name}
        </div>
        <div>
          Employee level :
            {employee.level}
        </div>
        <div>
          Employee position :
            {employee.position}
        </div>
        <div>
            Favorite brand id :
            {employee.favoriteBrand}
        </div>
        <div>Equipment id :
            {employee.equipment}
        </div>
        <div style={{background:employee.color}}>Color
        </div>
        <div>
        </div>
        <div>
            <button id={id} onClick={()=>{
              deleteEmployee(id)
              navigate('/')}}>Yes</button>
                <button onClick={()=>navigate('/')}>Cancel</button>
        </div>
      </div>
    );

}

export default DeleteForm;