import React, { useState } from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { RESET_AUTH, logout } from '../../redux/features/auth/authSlice';

export const Logo = () => ( 
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        Prak<span>riti</span>
      </h2>
    </Link>
  </div>
);

const activeLink = (isActive) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage,setScrollPage] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const fixNavbar = ()=>{ 
    if(window.scrollY >50){
      setScrollPage(true)

    }
    else{
      setScrollPage(true)
    }
  }
  window.addEventListener("scroll",fixNavbar)
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  const logoutUser=async() =>{
    dispatch(logout());
    dispatch(RESET_AUTH);
    navigate("/login");
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}`:null}>
      <div className={styles.header}>
        <Logo />
        
        <nav className={ showMenu ? `${styles["show-nav"]}`: `${styles["hide-nav"]}`}>

            <div className={ showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`: `${styles["nav-wrapper"]}`} onClick={hideMenu}>

            </div>

          <ul>
            <li className={styles["logo-mobile"]}>
            <Logo />
                <FaTimes size={22} color="#fff" onClick={hideMenu} />

            </li>

            <li>
              <NavLink to="/shop" className={activeLink}>
                Shop
              </NavLink>
            </li>
          </ul>
          <div className={styles['header-right']}>
            <span className={styles.links}>
              <NavLink to={"login"} className={activeLink(true)}>
                Login
              </NavLink>
              <NavLink to={"register"} className={activeLink(true)}>
                Register 
              </NavLink>
              <NavLink to={"order-history"} className={activeLink(true)}>
                My Order
              </NavLink>
              <Link to={"/"} onClick={logoutUser}>
                Logout
              </Link>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles['menu-icon']}>
            {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
