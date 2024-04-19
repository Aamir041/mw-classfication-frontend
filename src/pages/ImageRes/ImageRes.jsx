import { useLocation, useNavigate } from "react-router";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./ImageRes.css";

const ImageRes = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const image = URL.createObjectURL(location?.state?.image);
    const imageResults = location?.state?.imageResults?.result;

    console.log(image);
    console.log(imageResults);

    return (
        <SideNavbar>
            <div className="image-res">
                <div className="image-res-img">

                    <img src={image} />
                </div>
                <div className="image-res-items">
                    <h3>Results</h3>
                    {
                        imageResults?.map(ele => {
                            return (
                                <div className="images-res-data">
                                    <div> <span style={{color:"#ECB159"}}>Item</span>  : {ele.item}</div>
                                    <div> <span style={{color:"#C68484"}}>Possibility</span>  : {ele.prob}</div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </SideNavbar>
    )
}

export default ImageRes;