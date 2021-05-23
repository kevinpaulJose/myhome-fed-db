import React from "react";
import { HashRouter, NavLink, Route } from "react-router-dom";
import EpisodesComponent from "../EpisodesComponent/EpisodeComponent";
import GalleryComponent from "../GalleryComponent/GalleryComponent";
import ImagesComponent from "../ImagesComponent/ImagesComponent";
import MoviesComponent from "../MoviesComponent/MoviesComponent";
import SeriesComponent from "../SeriesComponent/SeriesComponent";
import UploadComponent from "../Upload/UploadComponent";
import VideoComponent from "../VideoComponent/VideoComponent";
import "./dashboard.css";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li>
              <NavLink exact to="/">
                <span>Movies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/series">
                <span>Series</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery">
                <span>Gallery</span>
              </NavLink>
            </li>
            <li>
              <div id="search" className="form-outline">
                <input
                  className="form-control"
                  placeholder={"Search"}
                  value={this.state.search}
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </div>
            </li>
          </ul>
          <div className="content">
            <Route
              exact
              path="/"
              component={() => <MoviesComponent search={this.state.search} />}
            />
            <Route
              exact
              path="/series"
              component={() => <SeriesComponent search={this.state.search} />}
            />
            <Route
              exact
              path="/gallery"
              component={() => <GalleryComponent search={this.state.search} />}
            />
            <Route path="/series/episodes" component={EpisodesComponent} />
            <Route path="/gallery/images" component={ImagesComponent} />
            <Route path="/upload" component={UploadComponent} />
            <Route path="/video" component={VideoComponent} />
          </div>
        </div>
        {/* <div id="footer">Current user: Kevin</div> */}
      </HashRouter>
    );
  }
}

export default DashboardComponent;
