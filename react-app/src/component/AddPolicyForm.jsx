import React,{useState} from "react";
import style from './AddUserForm.module.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function AddPolicyForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submitHandler = async(e) => {
    e.preventDefault();
    try{
        const a = 'tmal';
      const res = await axios.post("/api/policy/add/",
      {
        "purchase_date":e.target.purchase_date.value,
        "fuel" :e.target.fuel.value,
        "vehicle_segment" : e.target.vehicle_segment.value,
        "premium" :e.target.premium.value,
        "bodily_injury_liability" : e.target.bodily_injury_liability.value,
        "personal_injury_protection":e.target.personal_injury_protection.value,
        "property_damage_liability":e.target.property_damage_liability.value,
        "collision":e.target.collision.value,
        "comprehensive":e.target.comprehensive.value,
        "client_id": e.target.customer_id.value
    }
      );
      console.log(res);
      if (res.status === 201) {
        setError(res.data.msg);
      }
    }
    catch(err){
      console.log(err);
      const msg = `Something went wrong - ${err}`;
      setError(msg);
    }
  };
  return (
    <div>
      <form action="" className={style.form} onSubmit={submitHandler}>
      <div className={style.heading}>Please Fill The Policy Form</div>
        <label htmlFor="purchase_date">DATE OF PURCHASE </label>
        <input id="purchase_date" type="date" name="purchase_date" />
        <label htmlFor="fuel">FUEL</label>
        <select name="fuel" id="fuel">
          <option value="CNG">CNG</option>
          <option value="PETRO">PETROL</option>
          <option value="DISEL">DISEL</option>
        </select>
        <label htmlFor="vehicle_segment">VEHICLE SEGMENT</label>
        <select name="vehicle_segment" id="vehicle_segment">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <label htmlFor="premium">PREMIUM</label>
        <input type="number" id="premium" name="premium"/>
        <label htmlFor="bodily_injury_liability">BODILY INJURY LIABILITY</label>
        <select name="bodily_injury_liability" id="bodily_injury_liability">
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="personal_injury_protection">PERSONAL INJURY PROTECTION</label>
        <select name="personal_injury_protection" id="personal_injury_protection">
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="property_damage_liability">PROPERTY DAMAGE LIABILITY</label>
        <select name="property_damage_liability" id="property_damage_liability">
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="collision">COLLISION</label>
        <select name="collision" id="collision">
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="comprehensive">COMPPREHENSIVE</label>
        <select name="comprehensive" id="comprehensive">
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="customer_id">CUSTOMER ID</label>
        <input type="number" id="customer_id" name="customer_id"/>

        <button onClick={() => {
            navigate("/add_user");
          }}>ADD USER</button>
        <button>CONFIRM</button>
        <div className={style.error}>{error}</div>
      </form>
    </div>
  );
}
