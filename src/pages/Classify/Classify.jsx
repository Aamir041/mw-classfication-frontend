import "./Classify.css";
import axios from "axios";
import { useState } from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import Notification from "../../components/Notification/Notification";

const backendUrl = "http://localhost:8080/classify/image";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [notImageFile, setNotImageFile] = useState(false);
  const [cantUpload, setCantUpload] = useState(false);
  const [backendError, setBackendError] = useState(false);

  const setImage = (event) => {
    console.log(event?.target?.files[0]);

    if (
      event?.target?.files[0].type !== "image/webp" &&
      event?.target?.files[0].type !== "image/png" &&
      event?.target?.files[0].type !== "image/jpeg"
    ) {
      console.log("This is not desired file.");
      setSelectedImage(null);
      setNotImageFile(true);
      setTimeout(() => {
        setNotImageFile(false);
      }, 2000);
    } else {
      setSelectedImage(event?.target?.files[0]);
      setNotImageFile(false);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      setCantUpload(true);
      setTimeout(() => {
        setCantUpload(false);
      }, 2000);
    }
    else {
      try {
        const formData = new FormData();
        formData.append("file", selectedImage);
        const sendImageRes = await axios.post(backendUrl, formData);
        console.log(sendImageRes.data);
      } 
      catch (err) {
        setBackendError(true);
        setTimeout(() => {
          setBackendError(false);
        }, 3000);
      }
    }
  };

  return (
    <SideNavbar>
      <div className="classify">
        <div className="classify-form">
          <input
            type="file"
            id="classify-file-input"
            onChange={(event) => setImage(event)}
          />
          <label
            htmlFor="classify-file-input"
            className="classify-file-input-lable"
          >
            {selectedImage ? (
              selectedImage.name
            ) : (
              <>
                <span class="material-symbols-outlined">
                  add_photo_alternate
                </span>{" "}
                Click here to upload image
              </>
            )}
          </label>
        </div>

        <div className="classify-upload" onClick={uploadImage}>
          <span class="material-symbols-outlined upload-icon">upload</span>
          Classify
        </div>

        {notImageFile && (
          <Notification msg="Not an Image File" errorColor="red" />
        )}
        {cantUpload && (
          <Notification
            msg="Please select a file to classify"
            errorColor="red"
          />
        )}
        {backendError && (
          <Notification msg="Error occured from backend" errorColor="red" />
        )}
      </div>
    </SideNavbar>
  );
};

export default Classify;
