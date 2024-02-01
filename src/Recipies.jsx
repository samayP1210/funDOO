import React, { useState } from "react";
import "./Recipies.css";
import food from "./data/food.png";
import RecipyCard from "./RecipyCard.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function Recipies() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(query === '')
      return;
    nav('/recipies/' + query)
  }
  {
    /* 
  Search meal by name
  www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

  Lookup full meal details by id
www.themealdb.com/api/json/v1/1/lookup.php?i=52772

Lookup a single random meal
www.themealdb.com/api/json/v1/1/random.php

Filter by main ingredient
www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

List all meal categories
www.themealdb.com/api/json/v1/1/categories.php
Filter by Category
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood


*/
  }

  return (
    <div className="container">
      <div className="recipies-container">
        <img src={food} className="food-logo" />
        <h2 className="recipies-heading">Fresh Recipies each day.</h2>
        <br />
        <br />

        <form className="query-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Recipy"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button>Search</button>
        </form>

        <br />
        <h1
          style={{ color: "#6a040f", marginTop: "15px", marginBottom: "5px" }}
        >
          Top Popular Recipies
        </h1>
        <div
          style={{ border: "solid 1px #6a040f", marginBottom: "20px" }}
        ></div>
        <div className="recipies-list">
          <RecipyCard search="Peach & Blueberry Grunt" />
          <RecipyCard search="burger" />
          <RecipyCard search="bread" />
          <RecipyCard search="Pizza" />
          <RecipyCard search="Steak" />
          <RecipyCard search="Paneer" />
          <RecipyCard search="Kumpir" />
        </div>
        <br />
      </div>
    </div>
  );
}
