import React, { Fragment, useState, useEffect, useRef } from 'react';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../../layout/MetaData';
import './ConfirmOrder.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { createOrder, clearErrors } from '../../../actions/orderAction';
import { emptyCart } from '../../../actions/cartAction';

const ConfirmOrder = () => {
  const KEY =
    'pk_test_51KRxvqGWmUhrj6xaKFe7rGyfZLO6TAoB1baeqLctgClUfbqoofrx1vwPqIQAAF6Lm1RKGPAehZkUew4S0opj6Gqg00rLFMX7VF';
  const { cartItems } = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  // const { user } = useSelector((state) => state.user);
  const payBtn = useRef(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.newOrder);

  const onToken = (token) => {
    setStripeToken(token);
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  useEffect(() => {
    const makeRequest = async () => {
      console.log('Payment to Proceed');
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const { data } = await axios.post(
          '/api/v1/payment/process',
          { tokenId: stripeToken.id, amount: totalPrice },
          config
        );

        console.log('dataaa ', data);
        const { address, city, country, pinCode } = data;
        const shippingInfo = { address, city, country, pinCode };
        const orderInfo = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };

        const order = {
          shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
        };
        // payBtn.current.disabled = false;

        if (data.status === 'succeeded') {
          order.paymentInfo = {
            id: data.id,
            status: data.status,
          };

          dispatch(createOrder(order));
          dispatch(emptyCart());

          navigate('/success');
        } else {
          alert.error("There's some issue while processing payment ");
          payBtn.current.disabled = false;
        }
      } catch (error) {
        payBtn.current.disabled = false;
        alert.error(error.response.data.message);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{' '}
                    <span>
                      {item.quantity} X ${item.price} ={' '}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <StripeCheckout
              name="Stylish"
              image="/img/bg.png"
              billingAddress
              shippingAddress
              description={`Your total is $${totalPrice}`}
              amount={totalPrice * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
