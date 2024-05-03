import "./Classify.css";
import axios from "axios";
import { useState } from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import Notification from "../../components/Notification/Notification";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const backendUrl = "http://localhost:8080/classify/image";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingRes,setLoadingRes] = useState(false);
  const [cookie, setCookie] = useCookies(['token']);
  const [error,setError] = useState(null);

  const navigate =useNavigate();


  const setImage = (event) => {
    setSelectedImage(null);
    if (
      event?.target?.files[0].type !== "image/webp" &&
      event?.target?.files[0].type !== "image/png" &&
      event?.target?.files[0].type !== "image/jpeg" &&
      event?.target?.files[0].type !== "image/svg+xml"
    ) {
      setSelectedImage(null);
      showError("Not an Image File");
    } else {
      setSelectedImage(event?.target?.files[0]);
    }
  };

  const uploadImage = async () => {

    if (!selectedImage) {
      showError("Please select a file to classify");
      return ;
    }
    else {
      setLoadingRes(true)
      try {
        
        // sets header for axios that has jwt token in Authorization header
        const config = {
          headers: {
            'Authorization': `Bearer ${cookie.token}`,
          }
        };

        const formData = new FormData();
        formData.append("file", selectedImage);
        
        const sendImageResponse = await axios.post(backendUrl,formData,config);

        if (sendImageResponse.status == 200) {
          setLoadingRes(false)
          navigate("/image-res",{state:{image: selectedImage,imageResults: sendImageResponse?.data}});
        }

      } 
      catch (err) {
        setLoadingRes(false)
        showError("Error occured from backend");
      }
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3500);
  }

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
          /** Show error notification */
          error
          &&
          <Notification msg={error} errorColor="red" /> 
        }
        
        {
          /** Loading result screen */
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
