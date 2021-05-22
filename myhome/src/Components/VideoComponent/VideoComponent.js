import React, { Component } from "react";
import VideoPlayer from "./VideoPlayerComponent";
import "video.js/dist/video-js.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChromecast } from "@fortawesome/free-brands-svg-icons";
import { env } from "../config";

class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoURL: "",
    };
    this.getVideoURL = this.getVideoURL.bind(this);
    this.redirectCast = this.redirectCast.bind(this);
  }

  getVideoURL() {
    var currentURL = window.location.href;
    var videoURL = currentURL.split("?")[1];
    console.log(videoURL);
    this.setState({ videoURL: videoURL });
  }
  componentDidMount() {
    this.getVideoURL();
  }
  redirectCast() {
    window.location.href = env.cast_URL + window.location.href.split("?")[1];
  }

  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: window.location.href.split("?")[1],
          type: "video/mp4",
        },
      ],
    };

    return (
      <div>
        <div
          onClick={() => this.redirectCast()}
          style={{
            width: "70px",
            height: "70px",
            // backgroundColor: "red",
            position: "absolute",
            top: 0,
            right: "20px",
            zIndex: 20,
            opacity: 0.5,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faChromecast}
            size="2x"
            style={{ color: "#fff" }}
          />
        </div>
        <VideoPlayer {...videoJsOptions} />
      </div>
    );
  }
}

export default VideoComponent;
