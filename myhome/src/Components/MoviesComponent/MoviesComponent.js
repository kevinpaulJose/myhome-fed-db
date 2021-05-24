import React, { Component } from "react";
import { Banner } from "./BannerComponent";
import { env } from "../config";
import { LoadingBanner } from "../Dashboard/LoadingBanner";

class MoviesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: false,
      language: "Tamil",
    };
    this.getMovies = this.getMovies.bind(this);
  }

  getMovies = () => {
    this.setState({ isLoading: true });
    var search = this.props.search;
    if (search.length === 0) {
      fetch(env.db_server_endpoint + ":3000/api/v1/media/fetchByType", {
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
            this.setState({ movies: data.rows, isLoading: false });
            // console.log(this.state.movies);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      this.setState({ language: "All" });
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
          if (data.response) {
            var movies = [];
            var temp = data.rows;
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].ShowType === "Movies") movies.push(temp[i]);
            }
            this.setState({ movies: movies, isLoading: false });
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  componentDidMount() {
    this.getMovies();
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
        <div className="language-filter">
          <span
            onClick={() => this.setState({ language: "All" })}
            style={{
              color: this.state.language === "All" ? "#96c685" : "#fff",
              border:
                this.state.language === "All" ? "solid #96c685 1px" : "none",
            }}
          >
            All
          </span>
          <span
            onClick={() => this.setState({ language: "Tamil" })}
            style={{
              color: this.state.language === "Tamil" ? "#96c685" : "#fff",
              border:
                this.state.language === "Tamil" ? "solid #96c685 1px" : "none",
            }}
          >
            Tamil
          </span>
          <span
            onClick={() => this.setState({ language: "English" })}
            style={{
              color: this.state.language === "English" ? "#96c685" : "#fff",
              border:
                this.state.language === "English"
                  ? "solid #96c685 1px"
                  : "none",
            }}
          >
            English
          </span>
        </div>
        <div className="row">
          {this.state.movies.map((movie) => {
            if (this.state.language === "All") {
              return (
                <Banner
                  key={movie.ShowID}
                  ShowPath={movie.ShowPath}
                  ShowName={movie.ShowName}
                />
              );
            } else if (this.state.language === "Tamil") {
              if (movie.ShowLanguage === "Tamil") {
                return (
                  <Banner
                    key={movie.ShowID}
                    ShowPath={movie.ShowPath}
                    ShowName={movie.ShowName}
                  />
                );
              }
            } else {
              if (movie.ShowLanguage === "English") {
                return (
                  <Banner
                    key={movie.ShowID}
                    ShowPath={movie.ShowPath}
                    ShowName={movie.ShowName}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    );
  }
}

export default MoviesComponent;
