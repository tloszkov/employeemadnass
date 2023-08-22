import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function KittensForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const { employeeId } = useParams();
  const [kittensData, setKittensData] = useState([]);
  const [refetch, setRefetch] = useState(true);

  const fetchKittens = () => {
    fetch(`/api/kittens/${employeeId}`)
      .then((resp) => resp.json())
      .then((data) => setKittensData(data.kittens))
  }

  useEffect(() => {
      fetchKittens()
  }, [employeeId,refetch]);

  const sendKittensData = () => {
    setRefetch((preValue) => !preValue);
    return fetch(`/api/kittens/${employeeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        weight: weight,
      }),
    }).catch((error) => console.log("error:", error));
  };

  return (
    <div style={{width:200, alignContent:"center"}}>
      <form onSubmit={sendKittensData}>
        <input
          type="text"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Add kittens name"
        />
        <input
          type="text"
          value={weight} 
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Add kittens weight"
        />
        <button style={{width:150}} type="submit">Add Kittens</button>
      </form>

      {kittensData.map((data, index) => (
        <div key={index} id={data._id}>
          <div>index({index+1})</div>
          <div>id({data._id})</div>
          <div>Kitten name : {data.name}</div>
          <div>Kitten weight : {data.weight}</div>
          <div>---------------------------</div>
        </div>
      ))}
    </div>
  );
}

export default KittensForm;
