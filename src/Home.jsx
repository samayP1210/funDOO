import React from "react";
import "./Home.css";
import {useNavigate} from 'react-router-dom';
import logo from "./data/fun.png";

export default function Home() {
    const nav = useNavigate();
    function handleClick(e){
        nav('/' + e);
    }

  return (
    <div className="home-container">
      <img src={logo} className="home-logo" />
      <h2 className="recipies-heading">
        <span style={{ color: "#c1121f" }}>Bored? </span>{" "}
        <span style={{ color: "#3a5a40" }}>Worry Not. </span>
        <span style={{ color: "#14213d" }}>We're here for ya.</span>{" "}
      </h2>
      <br />
      <div className="option-container">
        <div className="row">
          <div className="option op1" onClick={()=> handleClick('iss')}>
            ISS
          </div>
          <div className="option op2" onClick={()=> handleClick('aopd')}>
            AOPD
          </div>
        </div>
        <div className="row">
          <div className="option op3" onClick={()=> handleClick('recipies')}>
            Recipies
          </div>
          <div className="option op4" onClick={()=> handleClick('trans')}>
            Translation
          </div>
        </div>
        <div className="row">
          <div className="option random op5" onClick={()=> {
            const op = ['iss', 'recipies', 'aopd', 'trans'];
            handleClick(op[Math.floor(Math.random() * op.length)]);
          }}>Random</div>
        </div>
      </div>
    </div>
  );
}
