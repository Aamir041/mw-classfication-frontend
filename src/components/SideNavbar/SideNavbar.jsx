import "./SideNavbar.css"
const SideNavbar = ({children}) => {
    return(
        <div className="sidenavbar-box">
            
            <div className="sidenavbar-nav">
                <h1>Side Nav</h1>
            </div>

            <div className="sidenavbar-children">
                {children}
            </div>

        </div>
    )
}

export default SideNavbar;
