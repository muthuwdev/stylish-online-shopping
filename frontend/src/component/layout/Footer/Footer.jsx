import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet libero
          sunt corporis natus! Perspiciatis suscipit itaque totam odit earum
          rerum!
        </p>
      </div>

      <div className="midFooter">
        <h1>Stylish</h1>
        <p>Go Beyond With Your Fashion</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/meabhisingh">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
