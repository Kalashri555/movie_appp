import React from 'react'

import "./Navbar.css";
import Fire from '../../assests/fire.png'
import Star from '../../assests/start1.png'
import Party from '../../assests/hero.png'


const Navbar = () => {
  return <nav className='navbar'>
    <h1>Let's Watch Movie</h1>

    <div className="navbar_links">
      
      <a href="#popular">Popular <img src={Fire} alt="fire emoji"
      className='navbar_emoji' /> </a>

      <a href="#top_rated">Top Rated <img src={Star} alt="star emoji"
      className='navbar_emoji' /> </a>

      <a href="#upcoming">Upcoming <img src={Party} alt="party face emoji"
      className='navbar_emoji' /> </a>

    </div>
    </nav>

};

export default Navbar;
