import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{ width: "100%", minHeight: "265px", backgroundColor: "#0062ff" }}
    >
      <div className="footer-content">
        <div className="footer-title">TAX HUB</div>
        <div className="line1"></div>
        <div className="links">
          <ul
            className="d-flex justify-content-evenly gap-1 align-items-center flex-wrap"
            style={{ padding: 0, margin: 0 }}
          >
            <li className="">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="">
              <NavLink to={"/About"}>About</NavLink>
            </li>
            <li className="">
              <NavLink to={"/Services"}>Services</NavLink>
            </li>
            <li className="">
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
            <li className="">
              <NavLink to={"/contact"}>Contact Us</NavLink>
            </li>
          </ul>
        </div>
        <div className="line2"></div>
        <div className="icons">
          <ul className="d-flex justify-content-between">
            <li>
              <a href="/">
                <i className="fab fa-facebook-square text-light fs-4"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fab fa-twitter-square text-light fs-4"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fab fa-linkedin text-light fs-4"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
