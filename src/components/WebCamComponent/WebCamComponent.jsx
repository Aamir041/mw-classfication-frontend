import React, { useCallback, useRef } from 'react';
import "./WebCamComponent.css";
import Webcam from 'react-webcam';
import SideNavbar from '../SideNavbar/SideNavbar';

function WebCamComponent() {
  const webCamRef = useRef();

  const capture = useCallback(
    () => {
      const imageSrc = webCamRef.current.getScreenshot();
      console.log(imageSrc);
    },[webCamRef])

  return (
    <SideNavbar>
      <div
        style=
        {
          { display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", alignItems: "center" }
        }>
        <Webcam
          ref={webCamRef}
          screenshotFormat='image/jpeg'
          style={{ width: "70%" }} />
        <button onClick={capture}>
          Screenshot
        </button>
      </div>
    </SideNavbar>
  )
}

export default WebCamComponent