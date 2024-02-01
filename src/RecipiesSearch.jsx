import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pending from "./Pending.jsx";
import RecipyCard from "./RecipyCard.jsx";

export default function RecipiesSearch() {
  const { query } = useParams();
  console.log(query);
  const [isPending, setPending] = useState(true);
  let recipiesResult = [];

  useEffect(() => {
    fetch('https://themealdb.com/api/json/v1/1/search.php?s=' + query)
    .then(res => res.json())
    .then(data => {
      setPending(false);
      const meals = data.meals;
      for(let i = meals.length - 1; i >=0 ; i--){
        // recipiesResult.push(<RecipyCard key = {i} search={data.meals[i].strMeal}/>);
        recipiesResult.push(<img className="recipy-logo" src={meals[i].strMealThumb}/>);
      }
      console.log(recipiesResult);
    }).catch(err => {
      setPending(false);
    })
  }, [])
  
  return (
    <div className="container">
      {isPending && <Pending />}
      { !isPending &&
        <div className="recipies-container">
          <h1
            style={{ color: "#6a040f", marginTop: "15px", marginBottom: "5px" }}
          >
            Results
          </h1>
          <div
            style={{ border: "solid 1px #6a040f", marginBottom: "20px" }}
          ></div>
          <div className="recipies-list">
            {recipiesResult}
            <RecipyCard search = 'Bread'/>
            <RecipyCard search = 'Burger'/>
          </div>
        </div>
      }
    </div>
  );
}
