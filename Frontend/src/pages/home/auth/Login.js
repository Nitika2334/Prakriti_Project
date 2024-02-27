import React ,{useEffect, useState} from "react"

import loginImg from "../../../assets/login.png"
import {Link} from "react-router-dom"
import Card from "../../../components/card/Card"
import styles from "./auth.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {login} from "../../../redux/features/auth/authSlice.js"
import { RESET_AUTH } from "../../../redux/features/auth/authSlice"
import {toast} from "react-toastify";
import { validateEmail } from "../../../utils"
import Loader from "../../../components/loader/Loader"

const Login = () => {
    const [email, setEmail ] = useState("")
    const[password,setPassword] = useState("")
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isLoading,isLoggedIn,isSuccess} =useSelector((state)=>state.auth);

    const loginUser=(e)=>{
      e.preventDefault();

      if(!email || !password) return toast.error("ALL feilds are required");
      if(!validateEmail(email)) return toast.error("Please enter a valid email");
      if(!validateEmail) return toast.error("Please enter a valid email");
      
      const userData = {
        email,
        password
      }
      dispatch(login(userData));
    }

    useEffect(()=>{
      if(isSuccess && isLoggedIn) navigate("/");
      dispatch(RESET_AUTH());
    },[isSuccess,isLoggedIn,dispatch,navigate]);

  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
    <div className={styles.img}>
      <img src={loginImg} alt = "Login" width ="400"/>
    </div>
    <Card>
    <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit = {loginUser}>
       <input 
          type = "text"
          placeholder = "Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <input
          type = "password"
          placeholder='Password'  
          required value = {password}
          onChange={(e)=>setPassword(e.target.value)}
          /> 
        <button type = "submit" className='--btn --btn-primary --btn-block'>
          login
        </button>
        </form>
        <span className={styles.register}>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </span>
    </div>
    </Card>
  </section>
  </>
  ) 
 }

export default Login