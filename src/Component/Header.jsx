import React from 'react'
import Logo from '../assets/Nigeria_Police_logo.jpg'

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg  navbar-white bg-white shadow-sm p-0'>
        <div className="container-fluid">
            <a href="#" className="navbar-brand d-flex justify-content-center align-items-center">
                <img src={Logo} width={50}/>
                <h6 className=''> Area 'P' <br/>Command HQ</h6>
            </a>
            <div className="navbar-brand"></div>
        </div>
    </nav>
  )
}

export default Header