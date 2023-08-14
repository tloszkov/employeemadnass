import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Equipment/EquipmentForm";

const createEquipment = (equipment) => {
  return fetch("/api/equipments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (employee) => {
    setLoading(true);

    createEquipment(employee)
      .then(() => {
        setLoading(false);
        navigate("/equipment");
      })
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/equipment")}
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreator;
