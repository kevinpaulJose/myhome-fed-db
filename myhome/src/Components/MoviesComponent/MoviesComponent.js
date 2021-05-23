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
            console.log(this.state.movies);
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
      <div className="row">
        {this.state.movies.map((movie) => {
          return (
            <Banner
              key={movie.ShowID}
              ShowPath={movie.ShowPath}
              ShowName={movie.ShowName}
            />
          );
        })}
      </div>
    );
  }
}

export default MoviesComponent;
