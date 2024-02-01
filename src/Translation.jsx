import React, { useState, useEffect } from "react";
import "./Translation.css";
import Pending from "./Pending.jsx";
import NotFound from "./NotFound.jsx";
import yoda from "./data/jedi.png";
import toast, { Toaster } from "react-hot-toast";

export default function Translation() {
  const langs = [
    "yoda",
    "pirate",
    "valspeak",
    "minion",
    "dothraki",
    "valyrian",
    "hodor",
    "sindarin",
    "sith",
    "cheunh",
    "mandalorian",
    "chef",
    "shakespeare",
    "klingon",
    "thuum",
    "groot",
    "doge",
    "navi",
    "ubbi-dubbi",
    "russian-accent",
    "irish",
    "draconic",
    "wheel-of-time-old-tongue",
  ];
  const [isPending, setPending] = useState(true);
  const [err, setErr] = useState(false);
  const [data, setData] = useState(null);
  const [text, setText] = useState('Translated Text');
  const [opt, setOpt] = useState("yoda");
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("Cannot fetch data");

  const options = langs.map((lang) => {
    return <option value={lang}>{lang}</option>;
  });

  useEffect(() => {
    fetch(
      "https://api.funtranslations.com/translate/" + opt + ".json?text=" + text
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPending(false);
        setErr(false);
        setData(data.contents.translated);
      })
      .catch((err) => {
        setMsg("Request limit exceeded for hour");
        setPending(false);
        setErr(true);
      });
  }, [count]);

  function handleClick(e) {
    toast.success("Copied.");
    navigator.clipboard.writeText(data);
  }

  return (
    <div className="container">
      {isPending && <Pending />}
      {err && <NotFound msg={msg} />}
      {!isPending && !err && (
        <div className="trans-container">
          <img src={yoda} className="trans-logo" />
          <form
            className="trans-form"
            onSubmit={(e) => {
              e.preventDefault();
              setCount(count + 1);
            }}
          >
            <input
              type="text"
              placeholder="Translation Text"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <select
              name="lang"
              onChange={(e) => {
                setOpt(e.target.value);
              }}
            >
              {options}
            </select>
            <button type="submit"> Translate</button>
          </form>
          <p className="trans-text">
            <label>
              <b>Translations: </b>
            </label>
            <Toaster position="top-right" />
            {data && 
              <span class="trans-data" onClick={handleClick}>
                {data}
              </span>
            }
          </p>
        </div>
      )}
    </div>
  );
}
