import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.nav_container}>
      <div className={style.nav_logo}>Global Insurance</div>
      <ul className={style.nav_links_container}>
        <li>
          <Link to="/all_policies">POLICIES</Link>
        </li>
        <li>
          <Link to="/sales_view">SALES</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
