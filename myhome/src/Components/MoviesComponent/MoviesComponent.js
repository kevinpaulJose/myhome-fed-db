import React, { Component } from "react";
import { Banner } from "./BannerComponent";
import { env } from "../config";

class MoviesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  getMovies = () => {
    fetch("http://myhome.com:3000/api/v1/media/fetchByType", {
      body: JSON.stringify({
        user: env.user,
        password: env.password,
        server: env.sql_server_endpoint,
        username: "kevin",
        showtype: "Movies",
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
          this.setState({ movies: data.rows });
          console.log(this.state.movies);
        }
      })
      .catch((err) => console.log(err.message));
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div>
        <Banner URL="http://uat.myhome.com:3002/Kevin/Movies/Marvel_Chronology/Cancelling_CC_profile_showing_Admin_page.mp4" />
      </div>
    );
  }
}

export default MoviesComponent;
