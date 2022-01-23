import React from "react";
import style from "./WelcomePage.module.css";
import {Link} from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className={style.container}>
      <h1 className={style.headline}>Welcome to the Policy Management Portal</h1>
      <button>
          <Link to="/all_policies">ALL POLICIES</Link>
      </button>
      <button>
          <Link to="/sales_view">SALES REPORT</Link>
      </button>
      <button>
          <Link to="/add_user">ADD CUSTOMER</Link>
      </button>
      <button>
          <Link to="/add_policy">ADD POLICY</Link>
      </button>
    </div>
  );
}
