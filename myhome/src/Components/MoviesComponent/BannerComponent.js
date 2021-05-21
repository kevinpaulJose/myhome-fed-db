import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./banner.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export function Banner(props) {
  return (
    <div className="row justify-content-center">
      <div className="card movie_card">
        <img
          src="https://www.joblo.com/assets/images/joblo/posters/2019/02/detective-pikachu-trailer-poster-main.jpg"
          className="card-img-top"
          alt="..."
        />
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
