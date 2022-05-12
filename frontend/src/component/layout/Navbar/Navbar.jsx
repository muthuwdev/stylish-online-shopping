import { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  console.log('This is user', isAuthenticated, user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <div className="container">
      <Link className="nav-link" to={`/`}>
        <div className="brandName">Stylish</div>
      </Link>

      <ul className="nav-list">
        <li className="nav-listItem">
          <Link className="nav-link" to={`/products`}>
            Shop
          </Link>
        </li>

        <li className="nav-listItem" onClick={(e) => navigate('/cart')}>
          <ShoppingCartOutlinedIcon />
          {cartItems.length > 0 && (
            <span className="topbarIconBadge">{cartItems.length}</span>
          )}
        </li>

        {isAuthenticated ? (
          <>
            <li className="nav-listItem">
              <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                alt="Profile"
              />
            </li>
            <li className="nav-listItem" onClick={(e) => dispatch(logout())}>
              <ExitToAppOutlinedIcon />
            </li>
          </>
        ) : (
          <li className="nav-listItem" onClick={(e) => navigate('/login')}>
            <LoginIcon />
          </li>
        )}
      </ul>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <ul
        onClick={() => setOpen(false)}
        className="menu"
        style={{ right: open ? '0px' : '-50vw' }}
      >
        <li className="menuItem">
          <Link to={`/products`}>Shop</Link>
        </li>
        <li className="menuItem" onClick={(e) => navigate('/cart')}>
          Cart
        </li>
        {isAuthenticated ? (
          <li className="menuItem" onClick={(e) => dispatch(logout())}>
            Logout
          </li>
        ) : (
          <li className="menuItem" onClick={(e) => navigate('/login')}>
            Login
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
