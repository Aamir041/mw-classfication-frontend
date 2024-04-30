import { Link } from "react-router-dom";
import "./SideNavbar.css";
import { useState } from "react";


const SideNavbar = ({ children }) => {

  const pathname = window.location.pathname;

  console.log(pathname);

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

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
          {menuItems.map((ele, idx) => {
            return (
              <Link
                key={`menu-items-${idx}`}
                to={ele.route}
                style={{
                  backgroundColor: `${ (pathname == ele.route) ? "#00C9AF" : "#201925"}`,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {ele.name}
              </Link>)
          })}
        </div>

      </div>

      <div className="sidenavbar-children">{children}</div>
    </div>
  );
};

// backgroundColor: `${ (pathname == ele.route) ? "#00C9AF" : "#201925"}`,


export default SideNavbar;
