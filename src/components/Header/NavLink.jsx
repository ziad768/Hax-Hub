import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function NavLinks() {
  const [t, i18n] = useTranslation();
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
      <li className="p-3 nav-item ">
        <NavLink to={"/"}>{t("navBarKeyWord1")}</NavLink>
      </li>
      <li className="p-3 nav-item ">
        <NavLink to={"/About"}>{t("navBarKeyWord2")}</NavLink>
      </li>
      <li className="p-3 nav-item ">
        <NavLink to={"/Services"}>{t("navBarKeyWord3")}</NavLink>
      </li>
      <li className="p-3 nav-item ">
        <NavLink to={"/blogs"}>{t("navBarKeyWord4")}</NavLink>
      </li>
      <li className="p-3 nav-item ">
        <NavLink to={"/contact"}>{t("navBarKeyWord5")}</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
