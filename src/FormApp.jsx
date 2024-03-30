import axios from "axios";
import { useState } from "react";
const backendUrl = "http://localhost:8080/classify/upload";

const FormApp = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    const setImage = (event) => {
        console.log(event?.target?.files[0]);
        setSelectedImage(event?.target?.files[0]);
    }

    const uploadImage = async () => {
        console.log("uploaded")
        const formData = new FormData(); 
        formData.append("file",selectedImage);
        const sendImageRes = await axios.post(backendUrl,formData);
        console.log(sendImageRes.data);
    } 

    return <div className="napp">
        <input type="file" name="" id="" onChange={(event) => setImage(event) }/>
        <button type="submit" onClick={uploadImage}>Submit</button>
    </div>
}

export default FormApp;