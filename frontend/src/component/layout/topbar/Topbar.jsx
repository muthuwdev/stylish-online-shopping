import "./topbar.css";
import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchProducts=()=>{
    console.log("aaa ");
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Stylish</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          {/* <SearchOutlinedIcon className="searchIcon" /> */}
          <input
            placeholder="Search for products"
            className="searchInput"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
       
        <button className="searchbarBtn" onClick={searchProducts}> <SearchOutlinedIcon  /></button>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <ShoppingCartOutlinedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <SearchOutlinedIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <SearchOutlinedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
