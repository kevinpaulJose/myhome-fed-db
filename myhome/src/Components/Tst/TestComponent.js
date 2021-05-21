import React from "react";
import FormData from "form-data";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userFile: "",
      sample: "Sample",
    };
    this.uploadForm = this.uploadForm.bind(this);
  }
  uploadForm(e) {
    e.preventDefault();
    var formData = new FormData();
    console.log(this.state.userFile);
    for (let i = 0; i < this.state.userFile.length; i++) {
      // return;
      console.log(this.state.userFile[i]);
      formData.append(
        "userFile",
        this.state.userFile[i],
        this.state.userFile[i].name
      );
    }
    fetch("http://localhost:3001/api/v1/upload", {
      body: formData,
      method: "post",
      headers: {
        primarypath: "../public",
        filepath: "/Kevin/Series/Timon",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.response));
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        <form onSubmit={this.uploadForm}>
          <input
            type="file"
            name="userFile"
            multiple
            id="userFile"
            onChange={(e) => {
              this.setState({ userFile: e.target.files });
              // console.log(this.state);
            }}
          />
          <button type="submit">Submit </button>
        </form>
      </div>
    );
  }
}

export default Test;
