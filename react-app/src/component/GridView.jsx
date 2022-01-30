import React, { useEffect, useState, useRef } from "react";
import style from "./GridView.module.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default function GridView() {
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data } = await axios.post("/api/policy/all", config);
    // console.log(data);
    setPolicies(data);
    setFilteredPolicies(data);
  };

  const inputChangeHandler = (e) => {
    console.log(e.target);
    const cust_id = custRef.current.value;
    const policy_id = policyRef.current.value;
    let temp_arr = policies;
    if (cust_id) {
      temp_arr = temp_arr.filter(
        (policy) => policy.client__client_id == cust_id
      );
    }
    if (policy_id) {
      temp_arr = temp_arr.filter((policy) => policy.policy_id == policy_id);
    }
    setFilteredPolicies(temp_arr);
  };

  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const custRef = useRef();
  const policyRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.input_group_container}>
        <input
          type="text"
          placeholder="search by customer id"
          ref={custRef}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          placeholder="search by policy id"
          ref={policyRef}
          onChange={inputChangeHandler}
        />
        <button
          className={style.button}
          onClick={() => {
            navigate("/add_user");
          }}
        >
          Add New Customer
        </button>
        <button
          className={style.button}
          onClick={() => {
            navigate("/add_policy");
          }}
        >
          Add New Policy
        </button>
      </div>
      <br />
      <table className={style.table}>
        <thead>
          <tr className={style.tr}>
            <th className={style.th}>Policy Id</th>
            <th className={style.th}>Date of purchase</th>
            <th className={style.th}>Fuel</th>
            <th className={style.th}>Vehicle Catagory</th>
            <th className={style.th}>Premium</th>
            <th className={style.th}>Bodily Injury Liability</th>
            <th className={style.th}>Personal Injury Protection</th>
            <th className={style.th}>Property Damage Liability</th>
            <th className={style.th}>Collision</th>
            <th className={style.th}>Customer Id</th>
            <th className={style.th}>Customer</th>
            <th className={style.th}>Customer Income</th>
            <th className={style.th}>Customer Gender</th>
            <th className={style.th}>Customer Region</th>
            <th className={style.th}>Customer Marital Status</th>
            <th className={style.th}>Action</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {filteredPolicies.map((item) => {
            return (
              <tr id={item.policy_id} className={style.tr}>
                <td>{item.policy_id}</td>
                <td>{item.date_of_purchase}</td>
                <td>{item.fuel}</td>
                <td>{item.vehicle_segment}</td>
                <td>
                  <span>&#36;</span>
                  {item.premium}
                </td>
                <td>{item.bodily_injury_liability ? "Yes" : "No"}</td>
                <td>{item.personal_injury_protection ? "Yes" : "No"}</td>
                <td>{item.property_damage_liability ? "Yes" : "No"}</td>
                <td>{item.collision ? "Yes" : "No"}</td>
                <td>{item.client__client_id}</td>
                <td>{item.client__client_name}</td>
                <td>
                  <span>&#36;</span>
                  {item.client__income}
                </td>
                <td>{item.client__gender}</td>
                <td>{item.client__region}</td>
                <td>{item.client__marialtal_status ? "Yes" : "No"}</td>
                <td>
                  <Link to={'/policy/' +item.policy_id}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
