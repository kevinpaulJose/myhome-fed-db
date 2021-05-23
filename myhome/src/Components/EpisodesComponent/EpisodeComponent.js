import React from "react";
import { NavLink } from "react-router-dom";
import { env } from "../config";
import { LoadingBanner } from "../Dashboard/LoadingBanner";
import { Banner } from "./BannerComponent";

class EpisodesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ShowPath: "",
      episodes: [],
      isLoading: false,
    };
    this.getEpisodes = this.getEpisodes.bind(this);
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
        <NavLink id="NavLink" to="/series">
          <span id="breadNav">{"< Series"}</span>
        </NavLink>
        <h3>{this.state.ShowPath.split("/")[3]}</h3>
        <div className="row justify-content-center">
          {this.state.episodes.map((episode) => {
            return (
              <Banner
                key={episode.FileID}
                FileUrl={episode.FileUrl}
                FileName={episode.FileName}
              />
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
export default EpisodesComponent;
