import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./banner.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
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
    <div className="card movie_card">
      <img src={URL_Usable} className="card-img-top" alt="..." />
      <div className="card-body">
        <div onClick={() => getVideo(props.ShowPath)}>
          <div className="play_button">
            <span>
              <FontAwesomeIcon
                transform="down-19 grow-2.5"
                icon={faPlay}
                size="sm"
                style={{ color: "#fff" }}
              />
            </span>
          </div>
        </div>
        <div id="movie-title">
          <span className="card-title">{props.ShowName}</span>
        </div>
      </div>
    </div>
  );
}

function getVideo(ShowPath) {
  fetch(env.db_server_endpoint + ":3000/api/v1/files/show", {
    body: JSON.stringify({
      user: env.user,
      password: env.password,
      server: env.sql_server_endpoint,
      username: env.username,
      filepath: ShowPath,
    }),
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.response) {
        // console.log(data);
        var videoURL =
          env.file_server_endpoint +
          ":3002" +
          data.rows[0].FileUrl.split(" ").join("_");
        // console.log(window.location.href);
        window.location.href = window.location.href + "video/?" + videoURL;
      }
    })
    .catch((err) => console.log(err.message));
}
