import React, { Fragment, useEffect } from 'react';
import './Home.css';
import ProductCard from './ProductCard/ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Stylish" />

          <div className="banner">
            <p>Welcome to Stylish</p>
            <h1>EXPERIENCE OUR NEW FASHIONS</h1>

            <a href="#p-container">
              <button>Shop Now</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Styles</h2>

          <div className="p-container" id="p-container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
