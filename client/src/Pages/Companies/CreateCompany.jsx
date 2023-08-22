import React, { useState } from 'react'


export const CreateCompany = () => {
    const [name, setName] = useState("");

    const sendCompany = (event) => {
        event.preventDefault();
        console.log("Company data send!");
        console.log("Company name:",name);

        return fetch(`/api/companies/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
            }),
          }).catch((error) => console.log("error:", error));
    }

  return (
    <div style={{width:200, alignContent:"center"}}>
      <form onSubmit={(event)=>sendCompany(event)}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Add company name"
        />
        <button style={{width:150}} type="submit">Add company</button>
      </form>
      </div>

  )
}

export default CreateCompany;
