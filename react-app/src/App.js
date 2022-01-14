import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./component/NavBar";
import MainBody from "./component/MainBody";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <MainBody />

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
