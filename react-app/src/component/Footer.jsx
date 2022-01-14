import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer_container}>
      <div className={style.footer_inner_container}>
        <div>All Rights Reserved</div>
        <div>&copy;2022 Copyright : Global Insurance</div>
      </div>
    </div>
  );
}
