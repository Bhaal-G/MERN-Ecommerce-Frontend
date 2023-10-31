import React, { Fragment, useEffect } from "react";

import { FaMouse } from "react-icons/fa";

import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// https://i.ibb.co/DRST11n/1.webp

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
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
          <div className="banner">
            <MetaData title="ECOMMERCE" />
            <p>Welcome to Ecommerce</p>
            <h1>Find AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <FaMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

//proxy value is set from your frontend network to backend host port
