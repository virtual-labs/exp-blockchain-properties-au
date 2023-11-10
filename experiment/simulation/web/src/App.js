// App.js
import React, { Suspense } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Divider from "./components/Divider";
import AddProductsComponent from "./components/AddProductsComponent";
import ReceiptContainer from "./components/ReceiptContainer";
import ProductListComponent from "./components/ProductListComponent";
import ShowHistoryComponent from "./components/ShowHistoryComponent";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
        <SnackbarProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
            className="App"
          >
            <div
              style={{
                flex: 0.3,
                flexDirection: "row",
                paddingBlock: 20,
              }}
            >
              <Divider />
              <div
                style={{
                  display: "flex",
                  height: "80%",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    flex: 0.2,
                    color: "white",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingBlock: 20,
                    flexDirection: "column",
                  }}
                >
                  <AddProductsComponent />
                </div>
                <div
                  style={{
                    flex: 0.5,
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <ProductListComponent />
                </div>
                <div
                  style={{
                    flex: 0.3,
                    color: "white",
                    display: "flex",
                    alignItem: "center",
                  }}
                >
                  <ReceiptContainer />
                </div>
              </div>
            </div>
            <div style={{ flex: 0.7, backgroundColor: "#212529" }}>
              <ShowHistoryComponent />
            </div>
          </div>
        </SnackbarProvider>
      </Provider>
    </Suspense>
  );
}

export default App;
