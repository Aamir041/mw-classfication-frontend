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
      <div className="napp">
        <input
          type="file"
          name=""
          id=""
          onChange={(event) => setImage(event)}
        />
        <button type="submit" onClick={uploadImage}>
          Submit
        </button>
      </div>
    </SideNavbar>
  );
};

export default Classify;
