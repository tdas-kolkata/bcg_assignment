import React, { useState } from "react";
import style from "./AddUserForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUserForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    try {
      const res = await axios.post("/api/customer/add/", {
        client_name: e.target.client_name.value,
        income: e.target.income.value,
        marital_status: e.target.marital_status.value,
        gender: e.target.gender.value,
        region: e.target.region.value,
      });
      console.log(res);
      if (res.status === 201) {
        setError(res.data.msg);
      }
    } catch(err){
      console.log(err);
      const msg = `Something went wrong - ${err}`;
      setError(msg);
    }
  };
  return (
    <div>
      <form
        action=""
        className={style.form}
        method="POST"
        onSubmit={submitHandler}
      >
        <div className={style.heading}>Please Fill The User Form</div>
        <label htmlFor="client_name">CUTOMER NAME </label>
        <input id="client_name" type="text" name="client_name" />
        <label htmlFor="income">INCOME</label>
        <input id="income" type="number" name="income" />
        <label htmlFor="gender">GENDER</label>
        <select name="gender" id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="marialtal_status">MARITAL STATUS </label>
        <select name="marital_status" id="marital_status">
          <option value="Y">Married</option>
          <option value="N">Single</option>
        </select>
        <label htmlFor="region">REGION</label>
        <select name="region" id="region">
          <option value="APAC">APAC</option>
          <option value="EMEA">EMEA</option>
          <option value="NAM">NAM</option>
        </select>
        <button
          onClick={() => {
            navigate("/add_policy");
          }}
        >
          ADD POLICY
        </button>
        <button type="submit">ADD USER</button>
        <div className={style.error}>{error}</div>
      </form>
    </div>
  );
}
