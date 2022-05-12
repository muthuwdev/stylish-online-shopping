import React, { Fragment, useEffect, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import './ProductDetails.css';
import ReactImageMagnify from 'react-image-magnify';
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from '@material-ui/lab';
import {
  clearErrors,
  getProductDetails,
  newReview,
} from '../../../actions/productAction';
import ReviewCard from './../ReviewCard/ReviewCard.jsx';
import Loader from '../../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../../layout/MetaData';
import { addItemsToCart } from '../../../actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
// import { Rating } from '@material-ui/lab';
import ReactStars from 'react-rating-stars-component';
import { NEW_REVIEW_RESET } from '../../../constants/productConstants';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [imageDisplay, setImageDisplay] = useState({
    imageS:
      'https://res.cloudinary.com/dcser7ye4/image/upload/v1651478016/Eshopping/images_pjy9s3.jpg',
    imageL:
      'https://res.cloudinary.com/dcser7ye4/image/upload/v1651477890/Eshopping/imagel_jzh8s2.jpg',
  });
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  // console.log(loading ? 'Still Loading' : 'Loaded now ', product.images[0]);
  // console.log('This is products ....', product.images[0]);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const increaseQuantity = () => {
    console.log('This is quantity', product);
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
    console.log('This set quantity', quantity);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success('Item Added To Cart');
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const switchImage = (tab) => {
    console.log('this triggurde', tab);
    setImageDisplay({ imageS: '/brown-large.jpg', imageL: '/brown-small.jpg' });
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- Stylish`} />
          <div className="ProductDetails">
            <div className="corousel-image">
              <div className="corousel-image-right">
                {product.images ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: product.images[0].url,
                      },
                      largeImage: {
                        src: product.images[1].url,
                        width: 1200,
                        height: 1800,
                      },
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="details-right">
              <div className="detailsBlock-1">
                <h1 className="product-name">{product.name}</h1>
                <h2>{`$${product.price}`}</h2>

                {/* <p>Product # {product._id}</p> */}
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                {/* <ReactStars
                  count={5}
                  value={3.5}
                  isHalf={true}
                  size={24}
                  activeColor="#ffd700"
                /> */}
                <span className="detailsBlock-2-span">
                  {' '}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <RemoveOutlinedIcon onClick={decreaseQuantity} />
                    {/* <button onClick={decreaseQuantity}>-</button> */}
                    {/* <input readOnly type="number" value={quantity} /> */}
                    <div className="quantity-box">{quantity}</div>
                    <AddOutlinedIcon onClick={increaseQuantity} />
                    {/* <button onClick={increaseQuantity}>+</button> */}
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description :<p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
