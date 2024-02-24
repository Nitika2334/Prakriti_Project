import React from 'react'
import "./FooterLinks.scss"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const FooterLinks = () => {
  return <>
  <section className='contact-section'>
    <div className=' container contact'>
        <div className='contact-icon'>
            <FaFacebookF className="i"/>
            <FaTwitter className="i"/>
            <FaInstagram className="i"/>
            <FaYoutube className="i"/>
        </div>
        <h2>Let's Talk?</h2>
        <a href="#home"  className='btn btn-dark'>Make an enquiry!</a>
    </div>
  </section>
  </>
   
  
}

export default FooterLinks