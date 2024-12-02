import React, { useEffect } from "react";
import "./Hamburger.css";
import DropDownMenu from "./DropDownMenu";

export default function Hamburger() {
  const [navOpen, setNavOpen] = React.useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navOpen]);

  return (
    <>
      {navOpen && <DropDownMenu />}
      <div className="hamburger z-10" onClick={toggleNav}>
        <span
          className={`menu-toggle-bar  ${
            navOpen ? "menu-toggle-bar--top-active" : "menu-toggle-bar--top"
          }`}
        ></span>
        <span
          className={`menu-toggle-bar menu-toggle-bar--middle ${
            navOpen ? "menu-toggle-bar--middle-active" : ""
          } `}
        ></span>
        <span
          className={`menu-toggle-bar menu-toggle-bar--bottom ${
            navOpen
              ? "menu-toggle-bar--bottom-active"
              : "menu-toggle-bar--bottom"
          } `}
        ></span>
      </div>
    </>
  );
}
