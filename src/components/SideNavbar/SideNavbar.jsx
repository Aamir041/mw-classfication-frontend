import { Link } from "react-router-dom";
import "./SideNavbar.css";

const SideNavbar = ({ children }) => {
  const menuItems = [
    { name: "App", route: "/gemini-app" },
    { name: "Classify Image", route: "/" },
  ];

  return (
    <div className="sidenavbar-box">
      <div className="sidenavbar-nav">
        
        <div className="sidenavbar-title">
          <h3>Elclassico</h3>
        </div>

        <div className="sidenavbar-menu">
          {menuItems.map((ele,idx) => {
            return <Link key={`menu-items-${idx}`} to={ele.route}>{ele.name}</Link>
          })}
        </div>

      </div>

      <div className="sidenavbar-children">{children}</div>
    </div>
  );
};

export default SideNavbar;
