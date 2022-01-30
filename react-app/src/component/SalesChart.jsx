import React, { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

export default function SalesChart() {
  const [sales, setSales] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [error, setError] = useState();

  const changeHandler = (e) => {
    setError("Loading the data.....");
    let region = e.target.value;
    axios
      .get(`/api/sales/${region}`)
      .then((res) => {
        console.log(res);
        setSales(res.data.sales_arr);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError('Something went wrong');
      });
  };

  useEffect(()=>{
    axios
      .get(`/api/sales/all`)
      .then((res) => {
        console.log(res);
        setSales(res.data.sales_arr);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError('Something went wrong');
      });
  },[]);

  return (
    <div style={{ width: "70%", margin: "15%", marginTop: "0px" }}>
      <div>
        <label htmlFor="region">Selected Region : </label>
        <select name="region" id="region" onChange={changeHandler}>
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          <option value="APAC">APAC</option>
          <option value="EMEA">EMEA</option>
          <option value="NAM">NAM</option>
        </select>
      </div>
      <Bar
        // height={60}
        data={{
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          datasets: [
            {
              data: [...sales],
              label: "Policy Count",
              backgroundColor: "rgba(77, 245, 184, 0.8)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            yAxes: {
              grid: {
                drawBorder: true,
                color: "rgba(255,255,255,0.3)",
              },
              ticks: {
                beginAtZero: true,
                color: "white",
                fontSize: 5,
              },
            },
            xAxes: {
              grid: {
                drawBorder: true,
                color: "rgba(255,255,255,0.3)",
              },
              ticks: {
                beginAtZero: true,
                color: "white",
                fontSize: 5,
              },
            },
          },
        }}
      />
      <center>
        <div>{error}</div>
      </center>
    </div>
  );
}
