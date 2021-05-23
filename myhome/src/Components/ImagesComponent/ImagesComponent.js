import React from "react";
import { NavLink } from "react-router-dom";
import { env } from "../config";
import { LoadingBanner } from "../Dashboard/LoadingBanner";
import { Banner } from "./BannerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./full_screen.css";

class ImagesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ShowPath: "",
      episodes: [],
      isLoading: false,
      selected: false,
      selectedUrl: "",
    };
    this.getEpisodes = this.getEpisodes.bind(this);
    this.ImgFullScreen = this.ImgFullScreen.bind(this);
  }

  ImgFullScreen(props) {
    return (
      <div
        className="fullScreen"
        style={{ display: this.state.selected ? "block" : "none" }}
      >
        <img
          className="full_screen_img"
          src={this.state.selectedUrl}
          alt="custom_image"
        ></img>
        <div
          className="close"
          onClick={() => {
            this.setState({ selected: false, selectedUrl: "" });
          }}
        >
          <span style={{ opacity: "0.7" }}>
            <FontAwesomeIcon
              icon={faTimes}
              size="3x"
              style={{ color: "#fff" }}
            />
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    var ShowPath = window.location.href.split("?")[1].split("%20").join(" ");
    this.setState({ ShowPath: ShowPath });
    this.getEpisodes(ShowPath);
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <LoadingBanner />
        </div>
      );
    }
    return (
      <div>
        <this.ImgFullScreen />
        <NavLink id="NavLink" to="/gallery">
          <span id="breadNav">{"< Gallery"}</span>
        </NavLink>
        <h3>{this.state.ShowPath.split("/")[3]}</h3>
        <div className="row">
          {this.state.episodes.map((episode) => {
            return (
              <div
                key={episode.FileID}
                className="outer-div"
                onClick={() => {
                  var temp =
                    env.file_server_endpoint + ":3002" + episode.FileUrl;
                  var usableUrl = temp.split(" ").join("_");
                  this.setState({
                    selected: true,
                    selectedUrl: usableUrl,
                  });
                  console.log(usableUrl);
                }}
              >
                <Banner FileUrl={episode.FileUrl} FileName={episode.FileName} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  getEpisodes(ShowPath) {
    this.setState({ isLoading: true });
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
          //   console.log(data);
          this.setState({ episodes: data.rows, isLoading: false });
          // console.log(window.location.href);
        }
      })
      .catch((err) => console.log(err.message));
  }
}
export default ImagesComponent;
