import { createSlice } from "@reduxjs/toolkit";
const data = [
  { id: 1, name: "Shirt", price: 1000, totalPrice: 1000, quantity: 1 },
  { id: 2, name: "Watch", price: 2000, totalPrice: 2000, quantity: 1 },
  { id: 3, name: "Bag", price: 3000, totalPrice: 3000, quantity: 1 },
];

const initialState = {
  products: [...data],
  buyed_products: [],
  selectedProduct: null,
  blockChainDetails: [],
  id: 0,
  position: [-7, 0, 0],
  showReceipt: false,
  showHistory: false,
  showAddProducts: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    buyProducts: (state, action) => {
      state.buyed_products = [...state.buyed_products, action.payload];
      state.showReceipt = true;
    },
    selectedProducts: (state, action) => {
      state.selectedProduct = action.payload;
    },
    onClear: (state, action) => {
      state.selectedProduct = null;
    },
    onClose: (state, action) => {
      state.showReceipt = false;
    },
    onShowAddProducts: (state, action) => {
      state.showAddProducts = !state.showAddProducts;
    },
    onShowHistory: (state, action) => {
      state.showHistory = !state.showHistory;
      state.showAddProducts = false;
    },
    onRefreshClick: (state, action) => {
      state.products = [...data];
      state.buyed_products = [];
      state.selectedProduct = null;
      state.blockChainDetails = [];
      state.id = 0;
      state.position = [-7, 0, 0];
      state.showReceipt = false;
      state.showHistory = false;
      state.showAddProducts = false;
    },
    updateProductQuantity: (state, action) => {
      // Update the quantity of a product in the state
      const { productId, quantity } = action.payload;
      const productToUpdate = state.products.find(
        (product) => product.id === productId
      );
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        productToUpdate.totalPrice = productToUpdate.price * quantity; // Update the total price
      }
    },

    //store the blockChain details whenever clicks Buy button
    updateBlockChainDetails: (state, action) => {
      state.blockChainDetails = [...state.blockChainDetails, action.payload];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProductQuantity,
  purchaseProduct,
  buyProducts,
  selectedProducts,
  onClear,
  updateBlockChainDetails,
  onClose,
  onShowHistory,
  onShowAddProducts,
  onRefreshClick,
} = productSlice.actions;

export default productSlice.reducer;
