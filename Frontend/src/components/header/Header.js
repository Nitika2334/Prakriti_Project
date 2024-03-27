import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { RESET_AUTH, logout, getUser } from '../../redux/features/auth/authSlice';
import { ShowOnLogout,ShowOnLogin,ShowAdminOnly,ShowCustomerOnly } from '../hiddenLink/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
import Cookies from 'js-cookie'
import Loader from '../loader/Loader';
import styles from "./Header.module.scss";



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
  const {isLoading} = useSelector((state)=>state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage,setScrollPage] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    if(Cookies.get('token')){
      dispatch(getUser());
    }
  },[dispatch])

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
      <>
      {isLoading && <Loader/>}
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
                  <NavLink to={"shop"} className={activeLink}>
                    Shop
                  </NavLink>
                </li>
              </ul>
              <div className={styles['header-right']}>
                <span className={styles.links}>
                <ShowOnLogin>
                  <NavLink to={"profile"} className={activeLink}>
                    <FaUserCircle size={18} color="#ff7722"/>
                    <UserName/>
                  </NavLink>
                  </ShowOnLogin>
                  <ShowOnLogout>
                    <NavLink to={"login"} className={activeLink(true)}>
                      Login
                    </NavLink>
                  </ShowOnLogout>
                  <ShowOnLogout>
                    <NavLink to={"register"} className={activeLink(true)}>
                      Register 
                    </NavLink>
                  </ShowOnLogout>
                  <ShowOnLogin>
                    <ShowCustomerOnly>
                      <NavLink to={"order-history"} className={activeLink(true)}>
                        My Order
                      </NavLink>
                    </ShowCustomerOnly>
                  </ShowOnLogin>
                  <ShowOnLogin>
                    <ShowAdminOnly>
                      <NavLink to={"add-product"} className={activeLink(true)}>
                        Add Product
                      </NavLink>
                    </ShowAdminOnly>
                  </ShowOnLogin>
                  <ShowOnLogin>
                    <ShowAdminOnly>
                      <NavLink to={"show-products"} className={activeLink(true)}>
                        Products
                      </NavLink>
                    </ShowAdminOnly>
                  </ShowOnLogin>
                  <ShowOnLogin>
                  <Link to={"/"} onClick={logoutUser}>
                    Logout
                  </Link>
                  </ShowOnLogin>
                </span>
                <ShowOnLogin>
                  <ShowCustomerOnly>
                    {cart}
                  </ShowCustomerOnly>
                </ShowOnLogin>
              </div>
            </nav>
            <div className={styles['menu-icon']}>
                {cart}
              <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
            </div>
          </div>
        </header>
      </>
  );
};


export default Header;
