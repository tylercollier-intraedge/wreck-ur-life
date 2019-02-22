import React, { Component } from "react";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

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
        this.setState(
          {
            uploadedFileCloudinaryUrl: response.body.secure_url
          },
          () => console.log(this.state.uploadedFileCloudinaryUrl)
        );
      }
    });
  }

  uploadItem = () => {
    axios.post("/api/equipments/", { name: this.state.input, pictureURL: this.state.uploadedFileCloudinaryUrl }).then(res => {
      this.setState({
        input: "",
        uploadedFile: null,
        uploadedFileCloudinaryUrl: ""
      });
      alert("Successfully added new item to inventory :)");
    });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h3>New Item</h3>
        <Form style={{ width: "50%" }}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control onChange={e => this.handleInput(e.target.value)} placeholder="Item Name" type="text" value={this.state.input} />
          </Form.Group>
          <Form.Group>
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}
              className="fileBox"
              uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl}
            >
              {({ getRootProps, getInputProps }) => (
                <Button {...getRootProps()} variant="secondary">
                  Select Photo
                  <input {...getInputProps()} />
                </Button>
              )}
            </Dropzone>
            {this.state.uploadedFile ? <p style={{ height: "20px" }}>{this.state.uploadedFile.name}</p> : <p style={{ height: "20px" }} />}
          </Form.Group>
          <Button onClick={this.uploadItem}>Upload</Button>
        </Form>
      </div>
    );
  }
}
