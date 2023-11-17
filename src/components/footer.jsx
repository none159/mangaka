import React from "react";
import logo from '../images/x2y3dnmile071.jpeg'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-links">
                    <Link to="/mangaka" style={{ textDecoration: 'none' }} ><h2>Home</h2></Link>
                    <Link to="/groupchat" style={{ textDecoration: 'none' }}><h2>GroupChat</h2></Link>
                    <Link to="/trending" style={{ textDecoration: 'none' }}><h2>Trending</h2></Link>
                </div>
                <div className="logo">
                    <img src={logo}></img>
                </div>
            </div>
            <h2 className="copyright">Copyright 2022-2023</h2>
        </footer>
    )
}
export default Footer;