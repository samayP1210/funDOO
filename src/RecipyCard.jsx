import { React, useEffect, useState } from "react";
import blank_star from "./data/blank-star.png";
import filled_star from "./data/filled-star.png";
import { useNavigate } from "react-router-dom";

export default function RecipyCard(props) {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [region, setRegion] = useState(null);
  const [img, setImg] = useState(null);
  const stars = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  const rating = [];
  const nav = useNavigate();
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      rating.push(<img key = {i} src={filled_star} style={{ width: "15px" }} />);
    } else {
      rating.push(<img key = {i} src={blank_star} style={{ width: "15px" }} />);
    }
  }

  useEffect(() => {
    // if (name === undefined) {
    const url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + props.search;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log('--> ' + data);
        setName(data.meals[0].strMeal);
        setCategory(data.meals[0].strCategory);
        setRegion(data.meals[0].strArea);
        setImg(data.meals[0].strMealThumb);
      })
      .catch((err) => {
        // console.log('-->' + err.message);
        console.log(err.message);
      });
    // }
  }, []);

  return (
    name && (
      <div className="recipy-card-container">
        <img src={img} className="recipy-logo" />
        <div className="recipy-details">
          <h3>{name}</h3>
          {category} | {region}
          <br />
          {rating}
          <br />
          <br />
          <button
            className="recipy-button"
            onClick={() => {
              nav("/recipies/view/" + name);
            }}
          >
            {" "}
            View Recipy
          </button>
        </div>
      </div>
    )
  );
}
