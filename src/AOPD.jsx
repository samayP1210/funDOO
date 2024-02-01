import React from "react";
import { useState, useEffect } from "react";
import "./AOPD.css";
import Pending from "./Pending.jsx";
import NotFound from "./NotFound.jsx";

export default function AOPD() {
  const [isPending, setPending] = useState(true);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [url, setUrl] = useState(null);
  const [desc, setDesc] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=Vwu0bzUM4UhFbjpvNRWf2shyU5zQU0bHdrelCx2m"
    )
      .then((res) => res.json())
      .then((data) => {
        setErr(false);
        setPending(false);
        setDate(data.date);
        setTitle(data.title);
        setDesc(data.explanation);
        setUrl(data.hdurl);
      })
      .catch((err) => {
        setDate(null);
        setPending(false);
        setErr(true);
      });
  }, []);

  return (
    <div className="container">
      {isPending && <Pending />}
      {date && (
        <div className="aopd-container">
          <br />
          <h2 className="recipies-heading">Astronomy Picture of the Day</h2>
          <br />
          <a href={url}>
            <img src={url} className="aopd-img"></img>
          </a>
          <div>
            <p>
              <label>
                <b>Title</b>
              </label>{" "}
              : {title}
            </p>
            <hr />
            <p>
              <label>
                <b>Date</b>
              </label>{" "}
              : {date}
            </p>
            <hr />
            <p>
              <label>
                <b>Description</b>
              </label>{" "}
              : {desc}
            </p>
            <hr />
          </div>
        </div>
      )}
      {err && <NotFound msg={"Error Fetching data"} />}
    </div>
  );
}
