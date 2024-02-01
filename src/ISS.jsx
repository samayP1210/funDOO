import React, { useState, useEffect } from "react";
import Pending from "./Pending.jsx";
import NotFound from "./NotFound.jsx";
import satelitte from "./data/satellite.png";
import "./ISS.css";

export default function ISS() {
  const [isPending, setPending] = useState(true);
  const [count, setCount] = useState(0);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [err, setErr] = useState(false);
  const [add, setAdd] = useState();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then((res) => res.json())
      .then((data) => {
        // if(data.ok){
        //     throw Error('');
        // }
        setPending(false);
        setErr(false);
        setLat(data.iss_position.latitude);
        setLon(data.iss_position.longitude);

        fetch(
          "https://api.opencagedata.com/geocode/v1/json?q=" +
            data.iss_position.latitude +
            "%2C" +
            data.iss_position.longitude +
            "&key=ca4f47363d2d465fa01fcde8fdbc3dff"
        )
          .then((res) => res.json())
          .then((data) => {
            setPending(false);
            setAdd(data.results[0].formatted);
            setUrl(data.results[0].annotations.OSM.url);
          });
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, [count]);

  return (
    <div className="container">
      {isPending && <Pending />}
      {err && <NotFound msg={"Cannot Fetch Data"} />}
      {lat && (
        <div className="iss-container">
          <img src={satelitte} className="satellite" />
          <p>
            <label>
              <b>The International Space Station is currently at</b>
            </label>
          </p>
          <hr />
          <p>
            <label>
              <b>Latitde : </b>
            </label>
            {lat + " "}
            <br />
            <label>
              <b> Longitude : </b>
            </label>
            {lon}
          </p>
          <hr />
          {add && (
            <p>
              <label>
                <b>Address : </b>
              </label>
              {add}
            </p>
          )}
          <hr />
          <p className="buttons">
            <button onClick={() => setCount(count + 1)}>Refresh</button>{" "}
            <button>
              <a href={url} target="_blank">
                View Map
              </a>
            </button>
          </p>
          <hr />
        </div>
      )}
    </div>
  );
}
