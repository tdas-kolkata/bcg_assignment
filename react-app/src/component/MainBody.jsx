import React from "react";
import GridView from "./GridView";
import { Routes, Route } from "react-router-dom";
import AddUserForm from './AddUserForm'
import AddPolicyForm from './AddPolicyForm'
import EditPolicyFrom from "./EditPolicyFrom";
import SalesChart from "./SalesChart";

export default function MainBody() {
  return (
    <div>
      {/* <GridView/> */}
      <Routes>
        <Route path="/add_policy" element={<AddPolicyForm/>}/>
        <Route path="/add_user" element={<AddUserForm/>}/>
        <Route path="/all_policies" element={<GridView/>}/>
        <Route path="/policy/:policy_id" element={<EditPolicyFrom/>}/>
        <Route path="/sales_view" element={<SalesChart/>}/>
      </Routes>
    </div>
  );
}
