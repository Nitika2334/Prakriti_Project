import React ,{ useEffect, useState} from "react"
import loginImg from "../../../assets/login.png"
import {Link, useNavigate} from "react-router-dom"
import Card from "../../../components/card/Card"
import styles from "./auth.module.scss"
import { toast } from "react-toastify"
import { validateEmail } from "../../../utils"
import {useDispatch, useSelector } from "react-redux"
import { RESET_AUTH, register  } from "../../../redux/features/auth/authSlice"
import Loader from "../../../components/loader/Loader"

const initialState ={
  name:"",
  email: "",
  password: "",
  cPassword: "",
  role:"customer",
};

const Register = () => {
    const [formData,setFormData] = useState(initialState)
    const{name,email,password,cPassword,role} = formData;
    const {isLoading,isLoggedIn,isSuccess} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  handleInputChange = (e)=>
    {
      setFormData({...formData,[e.target.name]:e.target.value });
    };

    const registerUser=async(e)=>{
      e.preventDefault();
      
      if(!name || !email || !password || !role)return toast.error("ALL feilds are required");
      if(!validateEmail(email)) return toast.error("Please enter a valid email");
      
      const userData = {
        name,
        email,
        password,
        role
      }
      dispatch(register(userData));
    } 

    useEffect (()=>{

      if(isSuccess && isLoggedIn) navigate("/");
      dispatch(RESET_AUTH());

    },[isSuccess, isLoggedIn,dispatch,navigate])
    
  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
    <Card>
    <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit = {registerUser}>
        <input 
            type = "text"
            placeholder = "Name"
            required
            name = "name"
            value={name}
            onChange={ handleInputChange }
            />
        <input 
            type = "text"
            placeholder = "Email"
            required
            name = "email"
            value={email}
            onChange={handleInputChange}
            />
        <input
          type = "password"
          placeholder='Password'  
          required 
          name = "password"
          value = {password}
          onChange={handleInputChange}
          /> 
        <input 
          type = "password"
          placeholder = "Confirm Password"
          required
          name = "cPassword"
          value={cPassword}
          onChange={handleInputChange}
          />
        <label for="userType">Choose a Role:</label>
        <select 
          required
          onChange={handleInputChange}
          name="role"
          value={role}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      <button type = "submit" className='--btn --btn-primary --btn-block'>
        Register
      </button>
      </form>
      <span className={styles.register}>
        <p>Already have an account?</p>
        <Link to="/login">login</Link>
      </span>

    </div>
    </Card>
    <div className={styles.img}>
        <img src={loginImg} alt = "Login" width ="400"/>

    </div>
  </section>
  </>
  )

 }

export default Register;