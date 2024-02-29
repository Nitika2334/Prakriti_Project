import React from 'react'
import "./PageMenu.js"

const PageMenu = () => {
  return (
    <div>
      <nav className='--bgprimary --p --mb'>
        <ul className="home-links">
            <li>
                <navlink to="/profile">
                    Profile
                </navlink>
            </li>
            <li>
                <navlink to="/wallet">
                    My Wallet
                </navlink>
            </li>
            <li>
                <navlink to="/wishlist">
                    Wishlist
                </navlink>
            </li>

        </ul>

      </nav>
    </div>
  )
}

export default PageMenu
