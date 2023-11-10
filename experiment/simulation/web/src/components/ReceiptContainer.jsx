import React from "react";
import CustomCard from "./CustomCard";
import { IconButton, Tooltip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { onClose, onShowHistory } from "../redux/Slice";
const ReceiptContainer = () => {
  const { selectedProduct, showReceipt } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const onHandleClick = (type) => {
    console.log(type);
    switch (type) {
      case "close":
        dispatch(onClose());
        break;
      case "history":
        dispatch(onShowHistory());
        break;
      default:
        break;
    }
  };

  return (
    <>
      {showReceipt && (
        <CustomCard
          large
          Children={
            <div>
              <div
                style={{ display: "flex", padding: 5, alignItems: "center" }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    color: "white",
                    flex: 0.55,
                    textAlign: "end",
                  }}
                >
                  Receipt
                </h2>
                <div
                  style={{
                    display: "flex",
                    flex: 0.45,
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton>
                    <Tooltip
                      title={"history"}
                      onClick={() => onHandleClick("history")}
                    >
                      <HistoryIcon style={{ fill: "aqua" }} />
                    </Tooltip>
                  </IconButton>
                  <IconButton onClick={() => onHandleClick("close")}>
                    <Tooltip title={"Close"}>
                      <CloseIcon style={{ fill: "aqua" }} />
                    </Tooltip>
                  </IconButton>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {showReceipt && selectedProduct && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <table style={{ height: 100, width: 380 }}>
                      <thead>
                        <tr style={{ backgroundColor: "#ffffff" }}>
                          <th
                            style={{
                              color: "black",
                              letterSpacing: 0.2,
                              fontSize: 12,
                            }}
                          >
                            Product Name
                          </th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: "#ffffff" }}>
                          <td>{selectedProduct.name}</td>
                          <td>&#8377;{selectedProduct.price}</td>
                          <td>{selectedProduct.quantity}</td>
                          <td>&#8377;{selectedProduct.totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style={{
                        color: "white",
                        marginTop: 85,
                        backgroundColor: "#ffffff40",
                      }}
                    >
                      Thank you for your purchase!{" "}
                      <span
                        style={{
                          fontSize: 13,
                          textDecoration: "underline",
                          color: "#1CF9FF",
                          cursor: "pointer",
                        }}
                        onClick={() => onHandleClick("history")}
                      >
                        transcation history
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default ReceiptContainer;
