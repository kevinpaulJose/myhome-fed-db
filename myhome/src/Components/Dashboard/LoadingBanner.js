import React from "react";
import "./bannerloading.css";

export function LoadingBanner(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="card movie_card_loading">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        {/* <img src={URL_Usable} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <div></div>

          <span className="card-title">{props.ShowName}</span>
        </div>
      </div>
    </div>
  );
}
