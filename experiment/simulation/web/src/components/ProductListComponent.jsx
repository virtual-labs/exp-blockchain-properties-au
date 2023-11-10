import React from "react";
import CustomCard from "./CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { settings } from "../utilities/slick";
import { useSnackbar } from "notistack";

import {
  buyProducts,
  selectedProducts,
  updateBlockChainDetails,
  updateProductQuantity,
} from "../redux/Slice";
import { Button } from "@mui/material";
import Slider from "react-slick";

const intialState = () => {
  return {
    id: 1,
    position: [-7, 0, 0],
  };
};

const ProductListComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState(intialState());
  const { id, position } = state;
  const { products, blockChainDetails } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const activeProducts = products
    .filter((product) => !product.removed)
    .reverse();
  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, quantity: newQuantity }));
  };

  React.useEffect(() => {
    if (blockChainDetails.length > 4) {
      setState((prev) => ({
        ...prev,
        position: [prev.position[0] - 6, -4, 0],
      }));
    } else if (blockChainDetails.length === 0) {
      setState((prev) => ({
        ...prev,
        id: 1,
        position: [-7, 0, 0],
      }));
    }
  }, [blockChainDetails.length]);
  const handleBuyProduct = (productId) => {
    console.log("lenght", blockChainDetails.length);
    if (blockChainDetails.length <= 9) {
      setState((prev) => ({
        ...prev,
        id: id + 1,
        position:
          blockChainDetails.length > 4
            ? position
            : [prev.position[0] + 6, 0, 0],
      }));
      const product = products.find((p) => p.id === productId);

      const now = new Date();
      const purchaseTime = `${now.getDay()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      const productWithTimestamp = {
        ...product,
        purchasedAt: purchaseTime,
      };
      const newBlockChainData = {
        id,
        data: product,
        position,
      };
      dispatch(buyProducts(productWithTimestamp));
      dispatch(selectedProducts(product));
      dispatch(updateBlockChainDetails(newBlockChainData));
    } else {
      enqueueSnackbar("Oops! you reached the limit.Click refresh to continue", {
        variant: "warning",
      });
    }
  };
  return (
    <>
      <Slider {...settings}>
        {activeProducts.map((product) => {
          return (
            <CustomCard
              key={product.id}
              small
              Children={
                <div style={{ padding: 2 }}>
                  <h5
                    style={{
                      color: "white",
                      fontWeight: "400",
                      letterSpacing: 1,
                      paddingBlock: 2,
                      backgroundColor: "#ffffff20",
                    }}
                  >
                    {product.name}
                  </h5>
                  <div style={{ paddingTop: 8 }}>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "400",
                        letterSpacing: 1,
                        paddingTop: 2,
                        margin: 0,
                      }}
                    >
                      Price:
                      <span style={{ color: "aqua", marginLeft: 2 }}>
                        &#8377;{product.price}
                      </span>
                    </p>
                    <p
                      style={{
                        color: "white",
                        fontWeight: "400",
                        letterSpacing: 1,
                        paddingTop: 2,
                      }}
                    >
                      Total Price:
                      <span style={{ color: "aqua", marginLeft: 2 }}>
                        &#8377;{product.totalPrice}
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#ffffff", marginRight: 5 }}>
                      Qty:
                    </span>
                    <input
                      style={{ width: 120 }}
                      type="number"
                      className="form-control form-control-sm qty"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          product.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                  <div style={{ marginTop: 23 }}>
                    <Button
                      style={{
                        width: 200,
                        height: 30,
                        backgroundColor: "#22eff180",
                        padding: 5,
                        color: "black",
                        borderWidth: 1,
                        borderColor: "aqua",
                      }}
                      onClick={() => handleBuyProduct(product.id)}
                    >
                      Buy{" "}
                    </Button>
                  </div>
                </div>
              }
            />
          );
        })}
      </Slider>
    </>
  );
};

export default ProductListComponent;
