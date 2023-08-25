import { FC } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/logo.jpg";

import styles from "./Header.module.scss";

const Header:FC = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__imgWrapper}>
        <NavLink to="/">
          <img
            className={styles.navigation__imgWrapper__img}
            src={logo}
            alt=""
          />
        </NavLink>
      </div>
      <ul className={styles.navigation__ul}>
        <li className={styles.navigation__ul__li}>
          <NavLink
            className={styles.navigation__ul__li__a}
            style={({ isActive }) => ({
              borderBottom: isActive ? "3.5px solid red" : "",
            })}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navigation__ul__li}>
          <NavLink
            className={styles.navigation__ul__li__a}
            style={({ isActive }) => ({
              borderBottom: isActive ? "3.5px solid red" : "",
            })}
            to="/movies"
          >
            Movies
          </NavLink>
        </li>
        <li className={styles.navigation__ul__li}>
          <NavLink
            className={styles.navigation__ul__li__a}
            style={({ isActive }) => ({
              borderBottom: isActive ? "3.5px solid red" : "",
            })}
            to="/tvs"
          >
            TV
          </NavLink>
        </li>
        <li className={styles.navigation__ul__li}>
          <NavLink
            className={styles.navigation__ul__li__a}
            style={({ isActive }) => ({
              borderBottom: isActive ? "3.5px solid red" : "",
            })}
            to="/persons"
          >
            Persons
          </NavLink>
        </li>
        <li className={styles.navigation__ul__li}>
          <NavLink
            className={styles.navigation__ul__li__a}
            style={({ isActive }) => ({
              borderBottom: isActive ? "3.5px solid red" : "",
            })}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
