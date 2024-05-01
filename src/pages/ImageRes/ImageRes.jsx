import { useLocation, useNavigate } from "react-router";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./ImageRes.css";

const ImageRes = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const image = URL.createObjectURL(location?.state?.image);
    const imageResults = location?.state?.imageResults?.result;

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
                                    <div className="image-res-data-item" >
                                        {ele.item}
                                    </div>
                                    <div className="image-res-progress-bar">
                                        <span>{ele.prob*100}%</span>
                                        <div className="image-res-progress-bar-parent">
                                            <div className="image-res-progress-bar-child" style={{ width: `${ele.prob * 100}%` }}>
                                            </div>
                                        </div>
                                    </div>
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