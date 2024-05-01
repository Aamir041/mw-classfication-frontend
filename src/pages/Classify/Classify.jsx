import "./Classify.css";
import axios from "axios";
import { useState } from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import Notification from "../../components/Notification/Notification";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router";

const backendUrl = "http://localhost:8080/classify/image";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [notImageFile, setNotImageFile] = useState(false);
  const [cantUpload, setCantUpload] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [loadingRes,setLoadingRes] = useState(false);
  const navigate =useNavigate();


  const setImage = (event) => {
    setSelectedImage(null);
    if (
      event?.target?.files[0].type !== "image/webp" &&
      event?.target?.files[0].type !== "image/png" &&
      event?.target?.files[0].type !== "image/jpeg" &&
      event?.target?.files[0].type !== "image/svg+xml"
    ) {
      console.log("This is not desired file.");
      setSelectedImage(null);
      setNotImageFile(true);
      setTimeout(() => {
        setNotImageFile(false);
      }, 3000);
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
      }, 3000);
      return ;
    }
    else {
      setLoadingRes(true)
      try {
        
        const formData = new FormData();
        formData.append("file", selectedImage);
        const sendImageResponse = await axios.post(backendUrl, formData);
        
        // console.log(sendImageResponse.data);
        
        if (sendImageResponse.status == 200) {
          
          setLoadingRes(false)
          
          console.log("redirecting to results page");

          navigate("/image-res",
            {
              state:
              {
                image: selectedImage,
                imageResults: sendImageResponse?.data
              }
            }
          );

        }
      } 
      catch (err) {
        setLoadingRes(false)
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

          <input type="file" id="classify-file-input" onChange={(event) => setImage(event)}/>
          
          <label htmlFor="classify-file-input" className="classify-file-input-lable" >
            
            {selectedImage
              ? (selectedImage.name)
              : (
                <>
                  <span className="material-symbols-outlined"> add_photo_alternate</span>
                  {" "} Click here to upload image
                </>
              )
            }
          </label>
        </div>

        <div className="classify-upload" onClick={uploadImage}>
          <span className="material-symbols-outlined upload-icon">upload</span> Classify
        </div>

        
        {
          /* Not an image notification */
          notImageFile 
          &&
          <Notification msg="Not an Image File" errorColor="red" />
        }

        
        {
          /* Image not selected notification*/
          cantUpload
          &&
          <Notification msg="Please select a file to classify" errorColor="red" />
        }

        {
          /* backend error notification */
          backendError
          &&
          <Notification msg="Error occured from backend" errorColor="red" />
        }
        
        {
          /* loading result screen */
          loadingRes 
          &&
          <div className="classify-loading-result">
            <Loader dimension={5} />
            <p>Loading Results</p>
          </div>
        }

      </div>
    </SideNavbar>
  );
};

export default Classify;
