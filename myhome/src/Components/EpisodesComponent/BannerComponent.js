import React from "react";
import "./banner_ep.css";
import { env } from "../config";

export function Banner(props) {
  // var URL =
  //   env.file_server_endpoint +
  //   ":3002/" +
  //   props.ShowPath +
  //   "/" +
  //   props.ShowName +
  //   ".jfif";
  // var URL_Usable = URL.split(" ").join("_");
  return (
    <div
      onClick={() => redirectVideo(props.FileUrl)}
      className="card movie_card_ep"
    >
      {/* <img src={URL_Usable} className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <span className="card-title">{props.FileName}</span>
      </div>
    </div>
  );
}

function redirectVideo(URL) {
  var videoUrl = env.file_server_endpoint + ":3002" + URL;
  var videoUrl_usable =
    env.web_server + "/#/video/?" + videoUrl.split(" ").join("_");
  window.location.href = videoUrl_usable;
}
