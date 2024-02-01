import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipyDetail.css";
import youtube from "./data/youtube.png";

export default function RecipyDetail() {
  const { name } = useParams();
  const [category, setCategory] = useState(null);
  const [region, setRegion] = useState(null);
  const [img, setImg] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [link, setLink] = useState(null);
  const [instructions, setInstructions] = useState(null);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.meals[0].strCategory);
        setRegion(data.meals[0].strArea);
        setImg(data.meals[0].strMealThumb);
        setLink(data.meals[0].strYoutube);
        setInstructions(data.meals[0].strInstructions);
        let def = "\t";

        for (let i = 1; i < 21; i++) {
          if (data.meals[0][`strIngredient${i}`] === "") break;
          def +=
            data.meals[0][`strIngredient${i}`] +
            " (" +
            data.meals[0][`strMeasure${i}`] +
            "), ";
          // def[data.meals[0][`strIngredient${i}`]] = data.meals[0][`strMeasure${i}`]
        }
        setIngredients(def.substring(0, def.length - 2));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="recipy-detail-container ">
      <img src={img} className="recipy-detail-logo" />
      <div className="recipy-detail-innercontainer">
        <div >
          <p className="recipy-name">
            {name}{" "}
            <a href={link} target="_blank">
              <img
                style={{ width: "35px", verticalAlign: "bottom" }}
                src={youtube}
              />
            </a>
          </p>
          <p style={{color : '#0d1b2a'}}>
            {category} | {region}
          </p>
          <br />
          <p style={{color : '#0d1b2a', fontSize : 'x-large'}}>Ingerdients</p>
          <div >{ingredients}</div>
          <br />
          <p style={{color : '#0d1b2a', fontSize : 'x-large'}}>Instructions</p>
          <div>{instructions}</div>
          <br />
        </div>
      </div>
    </div>
  );
}
