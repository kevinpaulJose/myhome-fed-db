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
  console.log(URL_Usable);
  return (
    <div className="row justify-content-center">
      <div className="card movie_card">
        <img src={URL_Usable} className="card-img-top" alt="..." />
        <div className="card-body">
          <a href={props.URL}>
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
          </a>

          <span className="card-title">POKEMON Detective Pikachu</span>
        </div>
      </div>
    </div>
  );
}
