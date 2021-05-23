import React, { Component } from "react";
import { Banner } from "./BannerComponent";
import { env } from "../config";
import { LoadingBanner } from "../Dashboard/LoadingBanner";

class GalleryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      isLoading: false,
    };
    this.getAlbums = this.getAlbums.bind(this);
  }

  getAlbums = () => {
    this.setState({ isLoading: true });
    var search = this.props.search;
    if (search.length === 0) {
      fetch(env.db_server_endpoint + ":3000/api/v1/media/fetchByType", {
        body: JSON.stringify({
          user: env.user,
          password: env.password,
          server: env.sql_server_endpoint,
          username: "kevin",
          showtype: "Albums",
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
            this.setState({ albums: data.rows, isLoading: false });
            console.log(this.state.albums);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      fetch(env.db_server_endpoint + ":3000/api/v1/media/search", {
        body: JSON.stringify({
          user: env.user,
          password: env.password,
          server: env.sql_server_endpoint,
          showname: search,
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
            var albums = [];
            var temp = data.rows;
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].ShowType === "Albums") albums.push(temp[i]);
            }
            this.setState({ albums: albums, isLoading: false });
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  componentDidMount() {
    this.getAlbums();
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
      <div className="row justify-content-center">
        {this.state.albums.map((media) => {
          return (
            <Banner
              key={media.ShowID}
              ShowPath={media.ShowPath}
              ShowName={media.ShowName}
            />
          );
        })}
      </div>
    );
  }
}

export default GalleryComponent;
