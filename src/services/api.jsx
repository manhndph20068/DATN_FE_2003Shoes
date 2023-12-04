import { doClearTempCart } from "../redux/order/orderSlice";
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

const callListShoeDetailHomePage = (
  current,
  page,
  category,
  color,
  minPrice,
  maxPrice
) => {
  const data = {
    page: current,
    pageSize: page,
    categoryList: category,
    colorList: color,
    minPrice: minPrice ?? null,
    maxPrice: maxPrice ?? null,
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
  return axios.post("/api/v1/admin/shoe/addNewShoeName", data);
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

const callGetShoeByName = (name) => {
  return axios.get(`/api/v1/admin/shoe/getShoeByName/${name}`);
};

const callGetListSizeOfShoeById = (data) => {
  return axios.post(`/api/v1/shoe-detail/getListSizeOfShoeById`, data);
};

const callGetColorByName = (name) => {
  return axios.get(`/api/v1/color/getColorByName/${name}`);
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

const callSubmitOrderVNPay = (orderTotal, orderInfo) => {
  const data = {
    orderTotal: orderTotal,
    orderInfo: orderInfo,
  };
  return axios.post("/submitOrder", data);
};

const callListShoeImages = () => {
  return axios.get(`/api/v1/images/getAllImages`);
};

const callListShoeThumbnail = () => {
  return axios.get(`/api/v1/thumbnail/getAllThumbnail`);
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

const callUpdateShoeDetail = (
  id,
  shoe,
  priceInput,
  quantity,
  createdAt,
  color,
  category,
  brand,
  size,
  sole,
  qrCode,
  createdBy,
  updatedBy,
  thumbnails,
  images
) => {
  const data = {
    id: id,
    shoe: { id: shoe },
    priceInput: priceInput,
    quantity: quantity,
    createdAt: createdAt,
    updatedAt: null,
    status: 1,
    color: { id: color },
    category: { id: category },
    brand: { id: brand },
    size: { id: size },
    sole: { id: sole },
    qrCode: qrCode,
    createdBy: createdBy,
    updatedBy: updatedBy,
    thumbnails: thumbnails,
    images: images,
  };
  console.log("data", data);
  return axios.post("/api/v1/shoe-detail/updateShoeDetail", data);
};

const callGetListOrderAtCounter = () => {
  return axios.post(`/api/v1/admin/order/get-order-by-status`);
};

const callGetOrderDetailAtCounterById = (id) => {
  return axios.get(`/api/v1/admin/order-detail/list-order-detail/${id}`);
};

const callListShoeDetailAtCounter = () => {
  const data = {
    status: 1,
  };
  return axios.post(`/api/v1/shoe-detail/getAllCustom`, data);
};

const callAddOrderDetailAtCounter = (data) => {
  return axios.post(`/api/v1/admin/order-detail/add`, data);
};

const callDeleteOrderDetailAtCounter = (data) => {
  return axios.post(`/api/v1/admin/order-detail/delete`, data);
};

const callUpdateOrderDetailAtCounter = (data) => {
  return axios.post(`/api/v1/admin/order-detail/update`, data);
};
const callAddNewOrderAtCounter = (data) => {
  return axios.post(`/api/v1/admin/order/add`, data);
};

const callUpdateNewOrderAtCounter = (data) => {
  return axios.post(`/api/v1/admin/order/update`, data);
};

const callGetListVoucher = (data) => {
  return axios.post(`/api/v1/admin/voucher-order/get-all`, data);
};

const callDoExportOrder = (data) => {
  return axios.post(`/api/v1/admin/order/export-order`, data);
};

const callGetDataUserById = (id) => {
  return axios.get(`/api/v1/account/get-one-account/${id}`);
};

const callImportFileVoucher = (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  bodyFormData.append("type", 0);
  return axios({
    method: "post",
    url: "http://localhost:8080/api/v1/admin/voucher-order/import",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const callAddVoucher = (data) => {
  return axios.post(`/api/v1/admin/voucher-order/addNewVoucherOrder`, data);
};

const callGetVouchersByTotalMoney = (data) => {
  return axios.post(
    `/api/v1/admin/voucher-order/searchTotalMoneyMyOrder`,
    data
  );
};

const callGetListOrder = (data) => {
  return axios.post(`/api/v1/admin/order/get-all`, data);
};

const callGetListOrderHistoryById = (id) => {
  return axios.get(`/api/v1/admin/order-history/get-one/${id}`);
};

const callGetOrderByCode = (id) => {
  return axios.get(`/api/v1/admin/order/get-one/${id}`);
};

const callAddMethodPayment = (data) => {
  return axios.post("/api/v1/admin/payment-method/add", data);
};

const callListMethodPayment = (code) => {
  const data = {
    orderCode: code,
    page: 0,
    size: 10,
  };
  return axios.post(`/api/v1/admin/payment-method/get-all`, data);
};

const callUpdateCartDetailStatus = (idCart, idShoeDetail, status) => {
  const data = {
    idCart: idCart,
    idShoeDetail: idShoeDetail,
    status: status,
  };
  return axios.post("/api/v1/cart-detail/updateStatusCartDetail", data);
};

const callDoOrderByCustomer = (data) => {
  return axios.post("/api/v1/customer/order/save", data);
};

const callDoOrderBuyNow = async (data) => {
  return axios.post("/api/v1/customer/order/save-by-now", data);
  // const dispatch = useDispatch();
  // const response = await axios.post("/api/v1/customer/order/save-by-now", data);
  // dispatch(doClearTempCart());
  // return response;
};

const callDoOrderByGuest = (data) => {
  return axios.post("/api/v1/customer-no-login/order/save", data);
};

const callBestSaleProdByYear = (nam) => {
  return axios.get(
    `/api/v1/statistical/so-luong-hang-hoa-ban-theo-nam?nam=${nam}`
  );
};

const callGetRevalueCurrent = (type) => {
  return axios.get(
    `/api/v1/statistical/so-luong-hoa-don-theo-ngay?typeBanHang=${type}`
  );
};

const callGetRevalueByYear = (year, type) => {
  return axios.get(
    `/api/v1/statistical/doanhthutheothang?nam=${year}&typeBanHang=${type}`
  );
};

const callGetTop5Prod = (startYear, endYear) => {
  return axios.get(
    `/api/v1/statistical/top5SanPhamBanChay?ngayBatDau=${startYear}&ngayKetThuc=${endYear}`
  );
};

const callGetOrderStatistical = (startYear, endYear) => {
  return axios.get(
    `/api/v1/statistical/hoadoncho?ngayBatDau=${startYear}&ngayKetThuc=${endYear}`
  );
};

const callGenerateOrderBill = (id) => {
  return axios.get(`/api/v1/admin/order/generate-hoa-don-report/${id}`);
};

const callGetListAccount = (data) => {
  return axios.post("/api/v1/account/get-all", data);
};

const callDeleteOrder = (data) => {
  return axios.post(`/api/v1/admin/order/delete`, data);
};

const callDoChangePassword = (data) => {
  return axios.post(`/api/v1/account/change-password-account`, data);
};

const callGetHistoryOrderCustomerById = (data) => {
  return axios.post("/api/v1/customer/order/get-all/customer", data);
};

const callUpdateVoucher = (data) => {
  return axios.post("/api/v1/admin/voucher-order/updateVoucherOrder", data);
};

const callAddNewAcc = (data) => {
  return axios.post("/api/v1/account/new-account", data);
};

const callInActiveAccount = (data) => {
  return axios.post("/api/v1/account/huy-account", data);
};

const callGetCommentByOrderIdAndShoeDetailId = (data) => {
  return axios.post("/api/v1/comment/get-one", data);
};

const callDoActiveAccount = (data) => {
  return axios.post("/api/v1/account/kich-hoat-account", data);
};

const callDoAddComment = (data) => {
  return axios.post("/api/v1/comment/save", data);
};

const callGetCommentByShoeId = (data) => {
  return axios.post("/api/v1/comment/get-all", data);
};

const callGetHistoryComment = (data) => {
  return axios.post("/api/v1/comment/get-one", data);
};

const callDoUpdateUser = (data) => {
  return axios.post("/api/v1/account/update-account", data);
};

const callGetAddressByID = (id) => {
  return axios.get(`/api/v1/address/addressbyaccountid/${id}`);
};

const callGetTop4BestSale = (id) => {
  return axios.get(`/api/v1/shoe-detail/getListTop4BestSales`);
};

const callGetTop4News = (id) => {
  return axios.get(`/api/v1/shoe-detail/getListTop4News`);
};

const callGetMonthlyRevenue = (type) => {
  return axios.get(
    `/api/v1/statistical/so-luong-hoa-don-theo-thang?typeBanHang=${type}`
  );
};

const callGetYearlyRevenue = (type) => {
  return axios.get(
    `/api/v1/statistical/so-luong-hoa-don-theo-nam?typeBanHang=${type}`
  );
};

const callGetTop3Comment = (id) => {
  return axios.get(`/api/v1/comment/top-3`);
};

const callDeletetUser = (_id) => {
  return axios.delete(`/api/v1/user/${_id}`);
};

const callDoInActiveVoucher = (data) => {
  return axios.post("/api/v1/admin/voucher-order/deleteVoucherOrder", data);
};

const callDoInActiveCategory = (data) => {
  return axios.post("/api/v1/category/deleteCategory", data);
};

const callDoInActiveBrand = (data) => {
  return axios.post("/api/v1/brand/deleteBrand", data);
};

const callDoInActiveSole = (data) => {
  return axios.post("/api/v1/sole/deleteSole", data);
};

const callDoInActiveSize = (data) => {
  return axios.post("/api/v1/size/deleteSize", data);
};

const callDoInActiveColor = (data) => {
  return axios.post("/api/v1/color/deleteColor", data);
};

const callDoActiveCategory = (data) => {
  return axios.post("/api/v1/category/activeCategory", data);
};

const callDoActiveBrand = (data) => {
  return axios.post("/api/v1/brand/activeBrand", data);
};

const callDoActiveSole = (data) => {
  return axios.post("/api/v1/sole/activeSole", data);
};

const callDoActiveSize = (data) => {
  return axios.post("/api/v1/size/activeSize", data);
};

const callDoActiveColor = (data) => {
  return axios.post("/api/v1/color/activeColor", data);
};

const callDoUpdateCategory = (data) => {
  return axios.post("/api/v1/category/updateCategory", data);
};

const callDoUpdateBrand = (data) => {
  return axios.post("/api/v1/brand/updateBrand", data);
};

const callDoUpdateSole = (data) => {
  return axios.post("/api/v1/sole/updateSole", data);
};

const callDoUpdateSize = (data) => {
  return axios.post("/api/v1/size/updateSize", data);
};

const callDoUpdateColor = (data) => {
  return axios.post("/api/v1/color/updateColor", data);
};

const callDoActiveShoeDetail = (data) => {
  return axios.post("/api/v1/shoe-detail/activeShoeDetail", data);
};

const callDoInActiveShoeDetail = (data) => {
  return axios.post("/api/v1/shoe-detail/inActiveShoeDetail", data);
};

const callDoActiveVoucher = (data) => {
  return axios.post(
    "/api/v1/admin/voucher-order/updateStatusVoucherOrderCancelFromWait",
    data
  );
};

const callUpdateInforAccount = (data) => {
  return axios.post(`/api/v1/account/update-account`, data);
};

const callGetListVersionOfShoeById = (id) => {
  return axios.get(`/api/v1/shoe-detail/getListVersionOfShoe/${id}`);
};

const callGetListAddressById = (id) => {
  return axios.get(`/api/v1/address/address-by-account-id/${id}`);
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
  callSubmitOrderVNPay,
  callListShoeImages,
  callListShoeThumbnail,
  callUpdateShoeDetail,
  callGetListOrderAtCounter,
  callUpdateNewOrderAtCounter,
  callGetOrderDetailAtCounterById,
  callListShoeDetailAtCounter,
  callAddOrderDetailAtCounter,
  callDeleteOrderDetailAtCounter,
  callUpdateOrderDetailAtCounter,
  callAddNewOrderAtCounter,
  callGetListVoucher,
  callImportFileVoucher,
  callAddVoucher,
  callGetListOrder,
  callGetListOrderHistoryById,
  callGetOrderByCode,
  callAddMethodPayment,
  callListMethodPayment,
  callGetVouchersByTotalMoney,
  callUpdateCartDetailStatus,
  callDoOrderByCustomer,
  callDoOrderByGuest,
  callDoExportOrder,
  callGetListAccount,
  callBestSaleProdByYear,
  callDeleteOrder,
  callUpdateVoucher,
  callGetTop5Prod,
  callGetOrderStatistical,
  callGenerateOrderBill,
  callGetHistoryOrderCustomerById,
  callDoOrderBuyNow,
  callGetRevalueByYear,
  callAddNewAcc,
  callInActiveAccount,
  callDoChangePassword,
  callGetAddressByID,
  callGetCommentByOrderIdAndShoeDetailId,
  callDoAddComment,
  callGetCommentByShoeId,
  callGetHistoryComment,
  callGetRevalueCurrent,
  callDoUpdateUser,
  callDoInActiveVoucher,
  callDoActiveVoucher,
  callGetDataUserById,
  callDoActiveAccount,
  callGetShoeByName,
  callGetListSizeOfShoeById,
  callGetColorByName,
  callGetTop4BestSale,
  callGetTop4News,
  callGetTop3Comment,
  callDoInActiveCategory,
  callDoInActiveBrand,
  callDoInActiveColor,
  callDoInActiveSize,
  callDoInActiveSole,
  callDoActiveCategory,
  callDoActiveBrand,
  callDoActiveColor,
  callDoActiveSize,
  callDoActiveSole,
  callDoUpdateCategory,
  callDoUpdateBrand,
  callDoUpdateColor,
  callDoUpdateSize,
  callDoUpdateSole,
  callDoActiveShoeDetail,
  callDoInActiveShoeDetail,
  callGetMonthlyRevenue,
  callGetYearlyRevenue,
  callGetListVersionOfShoeById,
  callUpdateInforAccount,
  callGetListAddressById,
};
