import React from "react";
import "./banner_ep.css";
import { env } from "../config";

export function Banner(props) {
  var imageUrl = env.file_server_endpoint + ":3002" + props.FileUrl;
  var imageUrl_usable = imageUrl.split(" ").join("_");
  return (
    <div className="card movie_card_im">
      <div className="img-outer">
        <img className="img" src={imageUrl_usable} alt={props.FileName}></img>
      </div>

      <div className="card-body"></div>
    </div>
  );
}
