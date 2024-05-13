import { Link, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import { useState } from "react";
import { useCookies } from "react-cookie";

const SideNavbar = ({ children }) => {
  const pathname = window.location.pathname;

  const menuItems = [
    { name: "Classify Image", route: "/" },
    { name: "Chat AI", route: "/chatai" },
    { name: "Report", route: "/report" },

  ];

  const[cookie,setCookie,removeCookie] = useCookies(['token'])
  const [displayLogoutText, setDisplayLogoutText] = useState(false)


  const logout = () => {
    removeCookie(['token']);
  }

  return (
    <div className="sidenavbar-box">
      <div className="sidenavbar-nav">
        
        <div>
          <div className="sidenavbar-title">
            <h1>Elclassico.</h1>
          </div>

          <div className="sidenavbar-menu">
            {menuItems.map((ele, idx) => {
              return (
                <Link
                  key={`menu-items-${idx}`}
                  to={ele.route}
                  style={{
                    backgroundColor: `${pathname == ele.route ? "#00C9AF" : "#1e293b"
                      }`,
                  }}
                >
                  {ele.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="logout-bttn" onClick={logout}>
          <div className="logout-bttn-symbol" onMouseEnter={() => setDisplayLogoutText(true)} onMouseLeave={() => setDisplayLogoutText(false)}>
            <span className="material-symbols-outlined" style={{ transform: "rotate(180deg)", fontSize: "2rem" }}>
              logout
            </span>
          </div>

          <div className="logout-bttn-label">
            <div className="logout-bttn-label-text" style={{display:`${displayLogoutText ? "block" : "none"}`}}>
            Logout
            </div>
          </div>
        </div>

      </div>

      <div className="sidenavbar-children">{children}</div>
    </div>
  );
};

export default SideNavbar;
