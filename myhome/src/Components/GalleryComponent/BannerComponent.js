import React from "react";
import "./banner_series.css";
// import { env } from "../config";

export function Banner(props) {
  return (
    <div
      onClick={() => {
        EpisodeRedirect(props.ShowPath);
      }}
      className="card movie_card_ga"
    >
      {/* <img src={URL_Usable} className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <span className="card-title">{props.ShowName}</span>
      </div>
    </div>
  );
}

function EpisodeRedirect(ShowPath) {
  window.location.href = window.location.href + "/images/?" + ShowPath;
}
