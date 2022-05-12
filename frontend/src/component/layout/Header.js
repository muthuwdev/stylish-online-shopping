import React from 'react'
import "./Header.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Header = () => {
  return (
  <>

    <div className="container">
      <div className="item">
        <div className="callButton">
        </div>
        <div className="texts">
          <div className="texts">ORDER NOW!</div>
          <div className="texts">012 345 678</div>
        </div>
      </div>
      <div className="item">
        <ul className="list">
           <li className="listItem">
           <div className="SearchContainer">
            <input className="searchInput" placeholder="Search" />
            <SearchOutlinedIcon  />
          </div>
          </li>
          <li className="listItem">Home</li>
          <li className="listItem">Product</li>
          <li className="listItem">Contact</li>
          <li className="listItem">
              
        <div className="cart">
            <img src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className="counter">{3}</div>
          </div>
      </li>
        
        </ul>
      </div>
     <div className="item">
     
      </div>
  
    </div>
    </>
  )
}

export default Header