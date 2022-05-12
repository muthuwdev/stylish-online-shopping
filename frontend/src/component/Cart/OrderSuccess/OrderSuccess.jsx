import React from "react";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
// import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleOutlineOutlinedIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      {/* <Link to="/orders">View Orders</Link> */}
    </div>
  );
};

export default OrderSuccess;
