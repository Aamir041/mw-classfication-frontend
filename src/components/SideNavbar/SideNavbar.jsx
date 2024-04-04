import { Link } from "react-router-dom";
import "./SideNavbar.css";

const SideNavbar = ({ children }) => {
  const menuItems = [
    { name: "App", route: "/gemini-app" },
    { name: "Classify Image", route: "/classify-image" },
  ];

  return (
    <div className="sidenavbar-box">
      <div className="sidenavbar-nav">
        
        <div className="sidenavbar-title">
          <h3>Help+</h3>
        </div>

        <div className="sidenavbar-menu">
          {menuItems.map((ele) => {
            return <Link to={ele.route}>{ele.name}</Link>;
          })}
        </div>

      </div>

      <div className="sidenavbar-children">{children}</div>
    </div>
  );
};

export default SideNavbar;
