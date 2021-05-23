import React from "react";
import "./banner_series.css";
import { env } from "../config";

export function Banner(props) {
  var URL =
    env.file_server_endpoint +
    ":3002/" +
    props.ShowPath +
    "/" +
    props.ShowName +
    ".jfif";
  var URL_Usable = URL.split(" ").join("_");
  return (
    <div
      onClick={() => {
        EpisodeRedirect(props.ShowPath);
      }}
      className="card movie_card_se"
    >
      <img src={URL_Usable} className="card-img-top" alt="..." />
      <div className="card-body">
        <span className="card-title">{props.ShowName}</span>
      </div>
    </div>
  );
}

function EpisodeRedirect(ShowPath) {
  window.location.href = window.location.href + "/episodes/?" + ShowPath;
}
