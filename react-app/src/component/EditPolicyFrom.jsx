import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./AddUserForm.module.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const unLoadBoolean = (state) => {
  if (state) {
    return "Y";
  } else {
    return "N";
  }
};

export default function EditPolicyFrom() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [policy, setPolicy] = useState({
    "fuel" :"",
    "vehicle_segment" : "",
    "premium" :0,
    "bodily_injury_liability" : 'Y',
    "personal_injury_protection":'Y',
    "property_damage_liability":'Y',
    "collision":'Y',
    "comprehensive":'Y',
    "client__client_id":"",
    "client__client_name":"",
    "date_of_purchase":""
  });
  const { policy_id } = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/policy/${policy_id}`, {
        fuel: e.target.fuel.value,
        vehicle_segment: e.target.vehicle_segment.value,
        premium: e.target.premium.value,
        bodily_injury_liability: e.target.bodily_injury_liability.value,
        personal_injury_protection: e.target.personal_injury_protection.value,
        property_damage_liability: e.target.property_damage_liability.value,
        collision: e.target.collision.value,
        comprehensive: e.target.comprehensive.value,
      });
      console.log(res);
      if (res.status === 200) {
        setError(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      const msg = `Something went wrong - ${err}`;
      setError(msg);
    }
  };

  const fetchData = async () => {
    let { data } = await axios.get(`/api/policy/${policy_id}`, config);
    data = data[0];
    console.log(data);
    let state = {
      "fuel" :data.fuel,
      "vehicle_segment" : data.vehicle_segment,
      "premium" :data.premium,
      "bodily_injury_liability" : unLoadBoolean(data.bodily_injury_liability),
      "personal_injury_protection":unLoadBoolean(data.personal_injury_protection),
      "property_damage_liability":unLoadBoolean(data.property_damage_liability),
      "collision":unLoadBoolean(data.collision),
      "comprehensive":unLoadBoolean(data.comprehensive),
      "client__client_id":data.client__client_id,
      "client__client_name":data.client__client_name,
      "date_of_purchase":data.date_of_purchase
    }
    console.log(state)
    setPolicy(state);
    // console.log(policy);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = (e)=>{
    let name = e.target.name;
    let newValue = e.target.value;
    setPolicy((old_policy)=>{
      let new_policy =  {...old_policy};
      new_policy[name] = newValue;
      console.log(new_policy);
      return new_policy;
    })
  }

  return (
    <div>
      <form action="" className={style.form} onSubmit={submitHandler}>
        <div className={style.heading}>
          Please Edit The Policy No {policy_id}
        </div>
        <div>DATE OF PURCHASE </div>
        <div>{policy.date_of_purchase}</div>
        <label htmlFor="fuel">FUEL</label>
        <select name="fuel" id="fuel" value={policy.fuel} onChange={changeHandler}>
          <option value="CNG">CNG</option>
          <option value="PETRO">PETROL</option>
          <option value="DISEL">DISEL</option>
        </select>
        <label htmlFor="vehicle_segment">VEHICLE SEGMENT</label>
        <select
          name="vehicle_segment"
          id="vehicle_segment"
          value={policy.vehicle_segment}
          onChange={changeHandler}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <label htmlFor="premium">PREMIUM</label>
        <input
          type="number"
          id="premium"
          name="premium"
          value={policy.premium}
          onChange={changeHandler}
        />
        <label htmlFor="bodily_injury_liability">BODILY INJURY LIABILITY</label>
        <select
          name="bodily_injury_liability"
          id="bodily_injury_liability"
          value={policy.bodily_injury_liability}
          onChange={changeHandler}
        >
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="personal_injury_protection">
          PERSONAL INJURY PROTECTION
        </label>
        <select
          name="personal_injury_protection"
          id="personal_injury_protection"
          value={policy.personal_injury_protection}
          onChange={changeHandler}
        >
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="property_damage_liability">
          PROPERTY DAMAGE LIABILITY
        </label>
        <select
          name="property_damage_liability"
          id="property_damage_liability"
          value={policy.property_damage_liability}
          onChange={changeHandler}
        >
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="collision">COLLISION</label>
        <select
          name="collision"
          id="collision"
          value={policy.collision}
          onChange={changeHandler}
        >
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <label htmlFor="comprehensive">COMPPREHENSIVE</label>
        <select
          name="comprehensive"
          id="comprehensive"
          value={policy.comprehensive}
          onChange={changeHandler}
        >
          <option value="Y">YES</option>
          <option value="N">NO</option>
        </select>
        <div>CUSTOMER ID</div>
        <div>{policy.client__client_id}</div>
        <div>CUSTOMER NAME</div>
        <div>{policy.client__client_name}</div>

        <button onClick={(e) => {
            e.preventDefault();
            navigate("/all_policies");
          }}>ALL POLICIES</button>
        <button type="submit">CONFIRM</button>
        <div className={style.error}>{error}</div>
      </form>
    </div>
  );
}
