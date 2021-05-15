import React from "react";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "kevin",
    };
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.state.username}</h1>
      </div>
    );
  }
}

export default DashboardComponent;
