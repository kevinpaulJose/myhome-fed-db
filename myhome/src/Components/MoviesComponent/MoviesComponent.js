import React, { Component } from "react";
import { Banner } from "./BannerComponent";

class MoviesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getMovies = () => {
    fetch("http://myhome.com:3000/api/v1/media/fetchByType", {
      body: {
        user: "kevin",
        password: "kevin",
        server: "myhome.com",
        username: "kevin",
        showtype: "Movies",
      },
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((err) => console.log(err.message));
  };

  render() {
    this.getMovies();
    return (
      <div>
        <Banner URL="http://uat.myhome.com:3002/Kevin/Movies/Marvel_Chronology/Cancelling_CC_profile_showing_Admin_page.mp4" />
      </div>
    );
  }
}

export default MoviesComponent;
