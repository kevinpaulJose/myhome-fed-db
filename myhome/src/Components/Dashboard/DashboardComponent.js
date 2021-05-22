import React from "react";
import { HashRouter, NavLink, Route } from "react-router-dom";
import MoviesComponent from "../MoviesComponent/MoviesComponent";
import SeriesComponent from "../SeriesComponent/SeriesComponent";
import UploadComponent from "../Upload/UploadComponent";
import VideoComponent from "../VideoComponent/VideoComponent";
import "./dashboard.css";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Movies",
      search: "",
    };
  }

  toggleScreen = () => {
    this.state.selected === "Movies"
      ? this.setState({ selected: "Series" })
      : this.setState({ selected: "Movies" });
  };
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li onClick={this.toggleScreen}>
              <NavLink exact to="/">
                <span>Movies</span>
              </NavLink>
            </li>
            <li onClick={this.toggleScreen}>
              <NavLink to="/series">
                <span>Series</span>
              </NavLink>
            </li>
            <li>
              <div id="search" className="form-outline">
                <input
                  className="form-control"
                  placeholder={"Search " + this.state.selected}
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
            <Route path="/series" component={SeriesComponent} />
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
