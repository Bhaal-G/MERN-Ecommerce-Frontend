import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/slider";
import { Typography } from "@material-ui/core";

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  // const [price, setPrice] = useState([0, 25000]);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  // const priceHandler = (event, newPrice) => {
  //   setPrice(newPrice);
  // };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  // let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}

      {/* <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />
      </div> */}

      {resultPerPage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;

//how does filter works like how we are able to get all products based on a particular string
