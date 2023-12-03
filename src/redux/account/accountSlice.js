import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    role: {
      id: null,
      name: "",
    },
  },
  isAuthenticated: false,
  isLoading: true,
  idCart: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLogin: (state, action) => {
      console.log("action.payload.data", action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    doLogout: (state, action) => {
      (state.user = {
        id: "",
        name: "",
        email: "",
        avatar: "",
        role: {
          id: null,
          name: "",
        },
      }),
        (state.isAuthenticated = false),
        (state.idCart = null),
        localStorage.removeItem("access_token");
    },
    doAddIdCart: (state, action) => {
      state.idCart = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { doLogin, doLogout, doAddIdCart } = accountSlice.actions;

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

export default accountSlice.reducer;
