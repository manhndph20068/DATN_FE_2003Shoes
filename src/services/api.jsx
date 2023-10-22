import axios from "../utils/axiosCustomize";

const callRegister = (fullName, email, password) => {
  const data = {
    name: fullName,
    email: email,
    password: password,
    idRole: 2,
  };
  return axios.post("/api/v1/auth/signUp", data);
};

const callLogin = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios.post("/api/v1/auth/login", data);
};

const callFetchAccount = () => {
  return axios.get("/api/v1/auth/fetchAccount");
};

const callRefreshToken = () => {
  return axios.get("/api/v1/auth/refreshToken");
};

const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

const callGetAllUserWithPaginate = (query) => {
  return axios.get(`/api/v1/user?${query}`);
};

const callCreateUser = (fullName, password, email, phone) => {
  return axios.post(`/api/v1/user`, {
    fullName,
    password,
    email,
    phone,
  });
};

const callListBookAdmin = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

const callListShoeDetailAdmin = (query) => {
  return axios.get(`/api/v1/shoe-detail/getAllShoeDetailWithPaginate?${query}`);
};

const callListShoeDetailHomePage = (current, page, category, color) => {
  const data = {
    page: current,
    pageSize: page,
    categoryList: category,
    colorList: color,
  };
  console.log(data);
  return axios.post(`/api/v1/shoe-detail/getAllHomePage`, data);
};

const callListShoeDetailCustom = (shoeName, color, size) => {
  const data = {
    shoe: shoeName,
    color: color,
    size: size,
  };
  console.log("data", data);
  return axios.post(`/api/v1/shoe-detail/getAllCustom`, data);
};

const callCreateNewShoeName = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/shoe/addNewShoeName", data);
};

const callListNameShoe = () => {
  return axios.get(`/api/v1/admin/shoe/getAllShoeName`);
};

const callListShoeCategory = () => {
  return axios.get(`/api/v1/category/getAllCategory`);
};

const callCreateNewCategory = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/category/addNewCategory", data);
};

const callListShoeBrand = () => {
  return axios.get(`/api/v1/brand/getAllBrand`);
};

const callCreateNewBrand = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/brand/addNewBrand", data);
};

const callListShoeSole = () => {
  return axios.get(`/api/v1/sole/getAllSole`);
};

const callCreateNewSole = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/sole/addNewSole", data);
};

const callListShoeColor = () => {
  return axios.get(`/api/v1/color/getAllColor`);
};

const callCreateNewColor = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/color/addNewColor", data);
};

const callListShoeSize = () => {
  return axios.get(`/api/v1/size/getAllSize`);
};

const callCreateNewSize = (name) => {
  const data = {
    name: name,
  };
  return axios.post("/api/v1/size/addNewSize", data);
};

const callCreateNewShoeDetail = (listShoeDetail) => {
  const data = {
    shoeDetailList: listShoeDetail,
  };
  return axios.post("/api/v1/shoe-detail/addNewShoeDetail", data);
};

const callGetShoeDetailById = (id) => {
  return axios.get(`/api/v1/shoe-detail/getShoeDetailById/${id}`);
};

const callGetCartByAccountId = (id) => {
  return axios.get(`/api/v1/cart/find-cart/${id}`);
};

const callGetListCartDetailById = (id) => {
  const data = {
    idCart: id,
  };
  return axios.post("/api/v1/cart-detail/getListCartDetail", data);
};

const callAddToCartAtCartPageWithAccount = (idCart, idShoeDetail, qty) => {
  const data = {
    idCart: idCart,
    idShoeDetail: idShoeDetail,
    qty: qty,
  };
  return axios.post("/api/v1/cart-detail/addCartDetailAtCart", data);
};

const callAddToCartAtViewPageItemWithAccount = (idCart, idShoeDetail, qty) => {
  const data = {
    idCart: idCart,
    idShoeDetail: idShoeDetail,
    qty: qty,
  };
  return axios.post("/api/v1/cart-detail/addCartDetailAtViewPageItem", data);
};

const callDeleteCartDetail = (idCart, idShoeDetail) => {
  const data = {
    idCart: idCart,
    idShoeDetail: idShoeDetail,
  };
  return axios.post("/api/v1/cart-detail/deleteCartDetail", data);
};

const callImportUser = (data) => {
  return axios.post(`/api/v1/user/bulk-create`, data);
};

const callUpdateUser = (_id, fullName, phone) => {
  return axios.put(`/api/v1/user`, {
    _id,
    fullName,
    phone,
  });
};

const callGetListCategory = () => {
  return axios.get(`/api/v1/category/getAllCategory`);
};

const callDeletetUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

const callCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post(`/api/v1/book`, {
    thumbnail: thumbnail,
    slider: slider,
    mainText: mainText,
    author: author,
    price: price,
    sold: sold,
    quantity: quantity,
    category: category,
  });
};

const callUpdateBook = (
  id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${id}`, {
    thumbnail: thumbnail,
    slider: slider,
    mainText: mainText,
    author: author,
    price: price,
    sold: sold,
    quantity: quantity,
    category: category,
  });
};

const callDeletetBook = (_id) => {
  return axios.delete(`/api/v1/book/${_id}`);
};

const callGetBookById = (_id) => {
  return axios.get(`/api/v1/book/${_id}`);
};

export {
  callRegister,
  callLogin,
  callFetchAccount,
  callLogout,
  callGetAllUserWithPaginate,
  callCreateUser,
  callImportUser,
  callUpdateUser,
  callDeletetUser,
  callListBookAdmin,
  callGetListCategory,
  callUploadBookImg,
  callCreateBook,
  callUpdateBook,
  callDeletetBook,
  callGetBookById,
  callRefreshToken,
  callListShoeDetailAdmin,
  callListNameShoe,
  callCreateNewShoeName,
  callListShoeCategory,
  callCreateNewCategory,
  callListShoeBrand,
  callCreateNewBrand,
  callListShoeSole,
  callCreateNewSole,
  callListShoeColor,
  callCreateNewColor,
  callListShoeSize,
  callCreateNewSize,
  callCreateNewShoeDetail,
  callListShoeDetailHomePage,
  callGetShoeDetailById,
  callListShoeDetailCustom,
  callGetCartByAccountId,
  callGetListCartDetailById,
  callAddToCartAtCartPageWithAccount,
  callAddToCartAtViewPageItemWithAccount,
  callDeleteCartDetail,
};
