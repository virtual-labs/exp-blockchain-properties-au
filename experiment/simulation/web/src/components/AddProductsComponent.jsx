import { Button, TextField } from "@mui/material";
import React from "react";
import CustomCard from "./CustomCard";
import StyledButton from "./StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, onRefreshClick, onShowAddProducts } from "../redux/Slice";
import RefreshIcon from "@mui/icons-material/Refresh";
const intialState = () => {
  return {
    openAddModal: false,
    productName: "",
    price: "",
    errors: {
      productError: "",
      quantityError: "",
      isQuantityError: false,
      isProductError: false,
    },
  };
};

const AddProductsComponent = () => {
  const [state, setState] = React.useState(intialState());
  const { price, productName, errors } = state;
  const { productError, quantityError, isProductError, isQuantityError } =
    errors;
  const { showAddProducts } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  let currentID = 4;

  const getNextSequentialID = () => {
    const nextID = currentID;
    currentID += 1;
    return nextID;
  };

  const onHandleOpenCard = () => {
    dispatch(onShowAddProducts());
  };
  const onHanldeChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        productError: "",
        isError: false,
      },
    }));
  };
  const handleAddProduct = () => {
    if (productName.trim() === "" || price.trim() === "") {
      if (productName.trim() === "") {
        console.log("hello");
        setState((prev) => ({
          ...prev,
          errors: {
            productError: "Please enter Product Name.",
            isProductError: true,
          },
        }));
      } else if (price.trim() === "") {
        setState((prev) => ({
          ...prev,
          errors: {
            quantityError: "Please enter the quantity.",
            isQuantityError: true,
          },
        }));
      }
    } else {
      const newID = getNextSequentialID();

      const newProduct = {
        id: newID,
        name: productName,
        price: parseFloat(price),
        totalPrice: parseFloat(price),
        quantity: 1,
      };
      console.log(newProduct);
      dispatch(addProduct(newProduct));
      setState((prev) => ({
        ...prev,
        price: "",
        productName: "",
      }));
    }
  };
  const onHanldeRefresh = () => {
    dispatch(onRefreshClick());
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <StyledButton
          small
          children={<RefreshIcon />}
          onClick={onHanldeRefresh}
        />
        <StyledButton children={"Add Products"} onClick={onHandleOpenCard} />
      </div>

      {showAddProducts && (
        <CustomCard
          Children={
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div style={{ paddingTop: 20 }}>
                <TextField
                  sx={{
                    color: "white",
                    width: 180,
                    paddingTop: 1,
                    fieldset: { borderColor: "#89c0ee", borderWidth: 0.1 },
                    input: { color: "white" },
                  }}
                  placeholder="Product Name"
                  type="text"
                  value={productName}
                  onChange={onHanldeChange}
                  name="productName"
                  helperText={productError}
                  error={isProductError}
                />
                <TextField
                  sx={{
                    color: "white",
                    width: 180,
                    paddingTop: 1,
                    fieldset: { borderColor: "#89c0ee" },
                    input: { color: "white" },
                  }}
                  placeholder="Price"
                  type="number"
                  name="price"
                  value={price}
                  onChange={onHanldeChange}
                  helperText={quantityError}
                  error={isQuantityError}
                />
                <Button
                  style={{
                    color: "black",
                    width: 150,
                    backgroundColor: "aqua",
                    marginTop: 15,
                    fontWeight: "500",
                  }}
                  onClick={handleAddProduct}
                >
                  Add Items
                </Button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default AddProductsComponent;
