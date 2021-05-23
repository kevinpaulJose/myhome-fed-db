import React, { Component } from "react";
import "./upload.css";
import "./spinkit.min.css";
import { env } from "../config";

class UploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaName: "",
      mediaType: "Movies",
      mediaFile: "",
      mediaBanner: "",
      language: "",
      isLoading: false,
    };
    this.uploadMedia = this.uploadMedia.bind(this);
    this.uploadBanner = this.uploadBanner.bind(this);
    this.uploadMedia_db = this.uploadMedia_db.bind(this);
    this.uploadFile_db = this.uploadFile_db.bind(this);
  }

  uploadFile_db = () => {
    console.log("Upload File Called");
    for (let i = 0; i < this.state.mediaFile.length; i++) {
      // console.log("Uploading " + i);
      fetch(env.db_server_endpoint + ":3000/api/v1/files/upload", {
        body: JSON.stringify({
          user: env.user,
          password: env.password,
          server: env.sql_server_endpoint,
          username: env.username,
          filetype: "Video",
          filename: this.state.mediaFile[i].name,
          filepath:
            "/" +
            env.username +
            "/" +
            this.state.mediaType +
            "/" +
            this.state.mediaName,
          fileurl:
            "/" +
            env.username +
            "/" +
            this.state.mediaType +
            "/" +
            this.state.mediaName +
            "/" +
            this.state.mediaFile[i].name,
          language: "English",
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
          // if (data.response) {
          //   console.log(data)
          // }
          // console.log(data);
          // console.log(
          //   "URL: " +
          //     "/" +
          //     env.username +
          //     "/" +
          //     this.state.mediaType +
          //     "/" +
          //     this.state.mediaName +
          //     "/" +
          //     this.state.mediaFile[i].name
          // );
          this.setState({ isLoading: false });
          window.location.href = env.web_server;
        })
        .catch((err) => console.log(err.message));
    }
  };

  uploadMedia_db = () => {
    console.log("Upload Media Called");
    fetch(env.db_server_endpoint + ":3000/api/v1/media", {
      body: JSON.stringify({
        user: env.user,
        password: env.password,
        server: env.sql_server_endpoint,
        username: env.username,
        showname: this.state.mediaName,
        showpath:
          "/" +
          env.username +
          "/" +
          this.state.mediaType +
          "/" +
          this.state.mediaName,
        showtype: this.state.mediaType,
        language: this.state.language,
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
        // if (data.response) {
        //   console.log(data)
        // }
        // console.log(data);
        this.uploadFile_db();
      })
      .catch((err) => console.log(err.message));
  };

  uploadBanner(e) {
    console.log("Upload Banner Called");
    e.preventDefault();
    var formData = new FormData();
    // console.log(this.state.mediaFile);
    for (let i = 0; i < this.state.mediaBanner.length; i++) {
      // return;
      //   console.log(this.state.mediaBanner[i]);
      var bannerName =
        this.state.mediaName +
        "." +
        this.state.mediaBanner[0].name.split(".")[1];
      formData.append("userFile", this.state.mediaBanner[i], bannerName);
      //   console.log("Banner Name " + bannerName);
    }
    fetch(env.file_server_endpoint + ":3001/api/v1/upload", {
      body: formData,
      method: "post",
      headers: {
        primarypath: "../public",
        filepath: "/Kevin/" + this.state.mediaType + "/" + this.state.mediaName,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.uploadMedia_db();
      });
  }

  uploadMedia(e) {
    console.log("Upload Media Called");
    this.setState({ isLoading: true });
    e.preventDefault();
    var formData = new FormData();
    // console.log(this.state.mediaFile);
    for (let i = 0; i < this.state.mediaFile.length; i++) {
      // return;
      //   console.log(this.state.mediaFile[i]);
      formData.append(
        "userFile",
        this.state.mediaFile[i],
        this.state.mediaFile[i].name
      );
    }
    fetch(env.file_server_endpoint + ":3001/api/v1/upload", {
      body: formData,
      method: "post",
      headers: {
        primarypath: "../public",
        filepath: "/Kevin/" + this.state.mediaType + "/" + this.state.mediaName,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.response);
        if (data.response === "ERROR") {
          this.setState({ isLoading: false });

          alert("Upload Failed");
        } else {
          this.uploadBanner(e);
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Upload</h1>
        <div style={{ display: "inline-block" }}>
          <form onSubmit={this.uploadMedia}>
            <div className="form-group">
              <select
                required
                style={{ opacity: "0.5" }}
                value={this.state.mediaType}
                onChange={(e) => {
                  this.setState({ mediaType: e.target.value });
                }}
                className="form-control"
                id="movieType"
              >
                <option>Movies</option>
                <option>Series</option>
                <option>Albums</option>
              </select>
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                className="form-control"
                placeholder={this.state.mediaType + " Name"}
                id="mediaName"
                value={this.state.mediaName}
                onChange={(e) => this.setState({ mediaName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="text"
                className="form-control"
                placeholder={this.state.mediaType + " Language"}
                id="language"
                value={this.state.language}
                onChange={(e) => this.setState({ language: e.target.value })}
              />
            </div>
            <label htmlFor="uploadBox">
              {"Select " + this.state.mediaType + " video"}
            </label>
            <div className="form-group">
              <input
                required
                accept="video/mp4,video/x-m4v,video/*"
                type="file"
                className="form-control"
                id="uploadBox"
                multiple
                onChange={(e) => {
                  this.setState({ mediaFile: e.target.files });
                }}
              />
            </div>
            <label htmlFor="uploadBoxBanner">
              {"Select " + this.state.mediaType + " Banner"}
            </label>
            <div className="form-group">
              <input
                required
                type="file"
                className="form-control"
                id="uploadBoxBanner"
                accept="image/*"
                onChange={(e) => {
                  this.setState({ mediaBanner: e.target.files });
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={this.state.isLoading}
            >
              {this.state.isLoading && (
                <div className="sk-wave">
                  <div className="sk-wave-rect"></div>
                  <div className="sk-wave-rect"></div>
                  <div className="sk-wave-rect"></div>
                  <div className="sk-wave-rect"></div>
                  <div className="sk-wave-rect"></div>
                </div>
              )}
              {!this.state.isLoading && <span>Upload</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadComponent;
