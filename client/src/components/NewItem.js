import React, { Component } from "react";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "tkfksyzh";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/wreck-ur-life/image/upload";

export default class NewItem extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ""
    };
  }

  handleInput = val => this.setState({ input: val }, () => console.log(this.state.input));

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);
    upload.end((err, response) => {
      if (err) {
        console.error("err", err);
      }
      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  uploadItem = () => {
    axios.post("/api/equipment/", { name: this.state.input, pictureURL: this.state.uploadedFileCloudinaryUrl }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <h3>New Item</h3>
        <form>
          <label>Name:</label>
          <input onChange={e => this.handleInput(e.target.value)} />
          <label>Image:</label>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
            className="fileBox"
            uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={{ border: "black 3px dotted", height: "100px", width: "150px" }}>
                <input {...getInputProps()} />
                <p>Drop files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <button onClick={this.uploadItem}>Upload</button>
        </form>
      </div>
    );
  }
}
