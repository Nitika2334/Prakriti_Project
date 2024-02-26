import React ,{useState} from "react"

import loginImg from "../../../assets/login.png"
import {Link} from "react-router-dom"
import Card from "../../../components/card/Card"
import styles from "./auth.module.scss"

const Login = () => {
    const [email, setEmail ] = useState("")
    const[password,setPassword] = useState("")
    const loginUser=(e)=>{} 
  return (
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
  )

    
  
 }

export default Login