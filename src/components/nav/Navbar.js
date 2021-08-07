import { useState } from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./nav.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useVideosContext } from "../../context/VideosContext";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { BiShoppingBag } from "react-icons/bi";
import { ImHome } from "react-icons/im";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { isUserLoggedIn, logout } = useAuthContext();
  const {
    state: { liked, history, watchLater, playlist },
  } = useVideosContext();
  return (
    <nav className={navStyle.navbar}>
      <div className={navStyle.brandTitle}>Vintage-Mart</div>
      <button
        className={navStyle.toggleButton}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <span className={navStyle.bar}></span>
        <span className={navStyle.bar}></span>
        <span className={navStyle.bar}></span>
      </button>
      <div
        className={`${
          isActive
            ? `${navStyle.navbarLinks} ${navStyle.active}`
            : navStyle.navbarLinks
        }`}
      >
        <ul>
          <li>
            <NavLink
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              end
              onClick={() => setIsActive((prev) => !prev)}
            >
              <ImHome style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <BiShoppingBag style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              style={{ position: "relative" }}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <FaShoppingCart style={{ fontSize: "1.1rem" }} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              activeStyle={{
                fontWeight: "bold",
                color: "#333",
                backgroundColor: "rgb(220,152,20)",
                height: "100%",
              }}
              className={navStyle.navLinks}
              style={{ position: "relative" }}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <HiOutlineHeart style={{ fontSize: "1.25rem" }} />
            </NavLink>
          </li>
          <li className={`${isUserLoggedIn ? `${navStyle.logout}` : ""} `}>
            {isUserLoggedIn ? (
              <button
                className={navStyle.last}
                onClick={() => {
                  logout();
                  setIsActive((prev) => !prev);
                }}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#333",
                  backgroundColor: "rgb(220,152,20)",
                  height: "100%",
                }}
                className={navStyle.navLinks}
                onClick={() => setIsActive((prev) => !prev)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
