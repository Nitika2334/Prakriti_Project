import React ,{ useState} from "react"
import loginImg from "../../../assets/login.png"
import {Link} from "react-router-dom"
import Card from "../../../components/card/Card"
import styles from "./auth.module.scss"
import { toast } from "react-toastify"
import { validateEmail } from "../../../utils"
import {useDispatch, useSelector } from "react-redux"
import { register } from "../../../redux/features/auth/authSlice"
import Loader from "../../../components/loader/Loader"



const initialState ={
  name:"",
  email: "",
  password: "",
  cPassword: "",
};
const Register = () => {
    const [formData,setFormData] = useState(initialState)
    const{name,email,password,cPassword} = formData;
    const {isLoading,isLoggedIn,isSuccess} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const  handleInputChange = (e)=>
    {
      const{name,value}=e.target
      setFormData({...formData,[name]:value })

    }
    const registerUser=async(e)=>{
      e.preventDefault();
    if(!email || !password)
    {
      return toast.error("ALL feilds are required");
    }
    if(password.length<6)
    {
      return toast.error("Password must be  upto 6 characters");
    }
    if(!validateEmail(email))
    {
      return toast.error("Please enter a valid email");
    }
    if(password !== cPassword)
    {
      return toast.error("passwords do not match ")
    }
    if(!validateEmail)
    {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      name,
      email,
      password
    }
    await dispatch (register(userData));
  

    } 
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
              name = {"password"}
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