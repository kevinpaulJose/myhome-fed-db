import React, { Component } from "react";
import { Banner } from "./BannerComponent";
import { env } from "../config";

class MoviesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
    this.getMovies = this.getMovies.bind(this);
  }

  getMovies = () => {
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
            this.setState({ movies: data.rows });
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
          // console.log(data);
          if (data.response) {
            this.setState({ movies: data.rows });
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div className="row justify-content-center">
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
