import './App.css';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import store from './store';
import { loadUser } from './actions/userAction';
import Products from './component/Product/Products';
import ProductDetails from './component/Product/ProductDetails/ProductDetails';
import LoginSignUp from './component/User/LoginSignUp';
import Cart from './component/Cart/Cart';
import PrivateRoute from './component/privateRoute/PrivateRoute.jsx';
import UpdatePassword from './component/User/updatePassword/UpdatePassword.jsx';
import Profile from './component/User/Profile/Profile.jsx';
import UpdateProfile from './component/User/updateProfile/UpdateProfile';
import ForgotPassword from './component/User/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './component/User/ResetPassword/ResetPassword.jsx';
// import Shipping from './component/Cart/Shipping/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder/ConfirmOrder.jsx';
import OrderSuccess from './component/Cart/OrderSuccess/OrderSuccess.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Navbar from './component/layout/Navbar/Navbar';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/account" element={<PrivateRoute />}>
            <Route exact path="/account" element={<Profile />} />
          </Route>
          {/* <ProtectedRoute exact path="/me/update" component={UpdateProfile} /> */}
          <Route exact path="/me/update" element={<PrivateRoute />}>
            <Route exact path="/me/update" element={<UpdateProfile />} />
          </Route>
          <Route exact path="/password/update" element={<PrivateRoute />}>
            <Route exact path="/password/update" element={<UpdatePassword />} />
          </Route>
          <Route exact path="/password/forgot" element={<ForgotPassword />} />

          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route exact path="/cart" element={<Cart />} />

          {/* <Route exact path="/shipping" element={<PrivateRoute />}>
            <Route exact path="/shipping" element={<Shipping />} />
          </Route> */}

          <Route exact path="/orderconfirm" element={<PrivateRoute />}>
            <Route exact path="/orderconfirm" element={<ConfirmOrder />} />
          </Route>

          <Route exact path="/success" element={<OrderSuccess />}>
            <Route exact path="/success" element={<OrderSuccess />} />
          </Route>

          {/* <ProtectedRoute exact path="/success" component={OrderSuccess} /> */}

          {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )} */}

          {/* {stripeApiKey && (
        <Route path="/process/payment" element={<Payment/>}
      )} */}
          {/* 
      {stripeApiKey && (
          <Route exact path='/process/payment' element={<PrivateRoute/>}>
            <Route exact path='/process/payment' element={<Payment/>}/>
          </Route>
      )} */}

          {/* <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} /> */}
          {/* <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        /> */}
          {/* <Route path="users/*" element={<Users />} /> */}
          {/* <ProtectedRoute path="/account" element={<Profile/>} /> */}
        </Routes>
        {/* {isAuthenticated && <UserOptions user={user} />} */}

        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} /> */}
        {/*<Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/account" element={<PrivateRoute />}>
            <Route exact path="/account" element={<Profile />} />
          </Route>
          <Route exact path="/me/update" element={<PrivateRoute />}>
            <Route exact path="/me/update" element={<UpdateProfile />} />
          </Route>
          <Route exact path="/password/update" element={<PrivateRoute />}>
            <Route exact path="/password/update" element={<UpdatePassword />} />
          </Route>
          <Route exact path="/password/forgot" element={<ForgotPassword />} />

          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route exact path="/cart" element={<Cart />} />

          <Route exact path="/shipping" element={<PrivateRoute />}>
            <Route exact path="/shipping" element={<Shipping />} />
          </Route>

          <Route exact path="/orderconfirm" element={<PrivateRoute />}>
            <Route exact path="/orderconfirm" element={<ConfirmOrder />} />
          </Route>

          <Route exact path="/success" element={<OrderSuccess />}>
            <Route exact path="/success" element={<OrderSuccess />} />
          </Route> */}
        {/* </Routes> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
