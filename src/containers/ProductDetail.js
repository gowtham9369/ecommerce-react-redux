import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeselectedProduct } from "../redux/actions/productActions";

function ProductDetail() {
  const product = useSelector((state) => state.product);
  const { title, image, price, description, category } = product;
  const { productId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && productId !== "") {
      async function fetchProductDetail() {
        const response = await axios
          .get(`https://fakestoreapi.com/products/${productId}`)
          .catch((err) => {
            console.log("Err: ", err);
          });
        dispatch(selectedProduct(response.data));
      }
      fetchProductDetail();
      return () =>{
          dispatch(removeselectedProduct());
      }
    }
  }, [productId, dispatch]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholer segment">
          <div className="ui two colum stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column rp">
                <img className="ui fluid image" src={image} alt={title} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a href="/#" className="ui teal tag label">
                    ${price}
                  </a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
