import "./Classify.css";
import axios from "axios";
import { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";

const backendUrl = "http://localhost:8080/classify/image";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const setImage = (event) => {
    console.log(event?.target?.files[0]);
    setSelectedImage(event?.target?.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    const sendImageRes = await axios.post(backendUrl, formData);
    console.log(sendImageRes.data);
  };

  return (
    <SideNavbar>
      <div className="classify">
        <div className="classify-form">
          <input
            type="file"
            name=""
            id="classify-file-input"
            onChange={(event) => setImage(event)}
          />
          <label
            htmlFor="classify-file-input"
            className="classify-file-input-lable"
          >
            <span class="material-symbols-outlined">add_photo_alternate</span>
            Click here to upload image
          </label>
        </div>

        <div className="classify-upload" onClick={uploadImage}>
          <span class="material-symbols-outlined upload-icon">upload</span>
            Upload
        </div>

      </div>
    </SideNavbar>
  );
};

export default Classify;
