import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  prodPaidNow: {},
  cart: [],
  tempData: {},
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doAddToCartAction: (state, action) => {
      let cart = state.cart;
      console.log("cart", state.cart);
      const item = action.payload;
      console.log("item doAddToCartAction", item);
      let isExistIndex = cart.findIndex((c) => c.id === item.id);
      if (isExistIndex === -1) {
        cart.push({
          quantity: item.quantity,
          detail: item.detail,
          id: item.id,
          status: item.status,
        });
        message.success("Thêm sản phẩm vào giỏ hàng thành công!");
      } else {
        if (cart[isExistIndex].quantity + item.quantity <= item.detail.qty) {
          cart[isExistIndex].quantity += +item.quantity;
          message.success("Thêm sản phẩm vào giỏ hàng thành công!");
        } else if (
          cart[isExistIndex].quantity + item.quantity >
          item.detail.qty
        ) {
          cart[isExistIndex].quantity = item.detail.qty;
          message.error(
            `Bạn đã có ${cart[isExistIndex].quantity} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng!`
          );
        }
      }
      state.cart = cart;
    },
    doUpdateCartAction: (state, action) => {
      let cart = state.cart;
      const item = action.payload;
      let isExistIndex = cart.findIndex((c) => c.id === item.id);
      console.log("item doUpdateCartAction", item);
      console.log("cart", cart);
      if (isExistIndex === -1) {
        cart.push({
          quantity: item.quantity,
          detail: item.detail,
          id: item.id,
          status: item.status,
        });
      } else {
        console.log("udpate");
        cart[isExistIndex].quantity = +item.quantity;
        cart[isExistIndex].status = +item.status;
        // console.log("cart[isExistIndex].quantity", cart[isExistIndex].quantity);
        // console.log("item", +item.detail.detail.qty);
        if (cart[isExistIndex].quantity > +item.detail.detail.qty) {
          console.log("ko them trung");
          cart[isExistIndex].quantity = +item.detail.detail.qty;
        }
      }
      state.cart = cart;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    doDeleteItemCartAction: (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
    },
    doInitalCartWithAccount: (state, action) => {
      state.cart = action.payload;
    },
    doDeleteItemCartAfterDoOrder: (state, action) => {
      state.cart = state.cart.filter((c) => c.status !== 1);
    },
    doInitalTempData: (state, action) => {
      state.tempData = action.payload;
    },
    doUpdateTempData: (state, action) => {
      return {
        ...state,
        tempData: {
          ...state.tempData,
          note: action.payload,
        },
      };
    },
    doClearTempData: (state, action) => {
      state.tempData = {};
    },
    doAddToTempCart: (state, action) => {
      state.prodPaidNow = action.payload;
    },
    doClearTempCart: (state, action) => {
      state.prodPaidNow = {};
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const {
  doAddToCartAction,
  doUpdateCartAction,
  clearCart,
  doDeleteItemCartAction,
  doInitalCartWithAccount,
  doDeleteItemCartAfterDoOrder,
  doInitalTempData,
  doUpdateTempData,
  doClearTempData,
  doAddToTempCart,
  doClearTempCart,
} = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default orderSlice.reducer;
