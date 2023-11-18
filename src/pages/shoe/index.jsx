import { useLocation, useNavigate } from "react-router-dom";
import ViewDetail from "../../components/Shoe/ViewDetail";
import {
  callGetBookById,
  callGetShoeDetailById,
  callListShoeDetailCustom,
  callListShoeDetailHomePage,
} from "../../services/api";
import { useEffect, useState } from "react";
const ShoePage = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  // const [id, setId] = useState(null);
  const [shoeData, setShoeData] = useState({});
  const [colorOfShoe, setColorOfShoe] = useState([]);
  const [sizeOfShoe, setSizeOfShoe] = useState([]);
  const [colorSelected, setColorSelected] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);

  let param = new URLSearchParams(location.search);
  let id = +param.get("id");

  const getImage = (raw) => {
    const image = [];
    if (raw.thumbnail) {
      image.push({
        original: raw.thumbnail,
        thumbnail: raw.thumbnail,
      });
    }
    if (raw.images) {
      raw.images?.map((item) => {
        image.push({
          original: item,
          thumbnail: item,
        });
      });
    }
    return image;
  };

  const toNonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = toNonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  useEffect(() => {
    const fetchAllShoeCustom = async () => {
      let res = await callListShoeDetailCustom(
        shoeData.nameShoe,
        shoeData.color
      );
      console.log("res ViewDetail", res);
      if (res?.data && res?.status === 0) {
        console.log("step 2");
        const size = res.data.map((item) => item.size);

        const sizeUnique = size.filter(
          (item, index) => size.indexOf(item) === index
        );

        setSizeOfShoe(sizeUnique);

        setSizeSelected(shoeData.size);
      }
    };

    fetchAllShoeCustom();
  }, [shoeData.nameShoe, shoeData.color]);

  useEffect(() => {
    const getShoeById = async () => {
      const res = await callGetShoeDetailById(id);
      console.log("allGetShoeDetailById", res);
      if (res && res?.data) {
        console.log("step 2");
        let raw = res.data;
        raw.items = getImage(raw);
        console.log("res step 2", res);
        setTimeout(() => {
          setShoeData(res.data);
        }, 300);

        console.log("shoeData", shoeData);
      }
    };

    getShoeById();
  }, [id]);

  useEffect(() => {
    const fetchAllShoeCustom = async () => {
      let res = await callListShoeDetailCustom(
        shoeData.nameShoe,
        null,
        sizeSelected
      );

      console.log("step 3");
      console.log("res fetchAllShoeCustom", res);
      console.log("shoeData.nameShoe", shoeData.nameShoe);
      console.log("sizeSelected", sizeSelected);
      console.log("shoeData.id", res?.data);
      console.log("shoeData step 3", shoeData);

      const idToFind = +id;
      console.log("idToFind", idToFind);

      const matchingItem = res.data.find(
        (item) => item.id === idToFind && item.size === sizeSelected
      );
      console.log("matchingItem", matchingItem);

      if (matchingItem) {
        navigate(
          `/shoe/${convertSlug(shoeData.nameShoe)}?id=${matchingItem.id}`
        );
      } else {
        navigate(
          `/shoe/${convertSlug(shoeData.nameShoe)}?id=${res?.data[0]?.id}`
        );
      }
    };
    if (shoeData.nameShoe !== undefined && sizeSelected !== undefined) {
      fetchAllShoeCustom();
    }
  }, [sizeSelected, shoeData.nameShoe]);

  // useEffect(() => {
  //   const fetchAllShoeCustom = async () => {
  //     let res = await callListShoeDetailCustom(
  //       shoeData.nameShoe,
  //       colorSelected
  //     );

  //     // setShoeData(res.data);
  //     const size = res.data.map((item) => item.size);
  //     const sizeUnique = size.filter(
  //       (item, index) => size.indexOf(item) === index
  //     );
  //     setSizeOfShoe(sizeUnique);
  //   };

  //   if (shoeData.nameShoe !== undefined && colorSelected !== undefined) {
  //     fetchAllShoeCustom();
  //   }
  // }, [colorSelected, shoeData.nameShoe]);

  return (
    <>
      <ViewDetail
        shoeData={shoeData}
        colorOfShoe={colorOfShoe}
        sizeOfShoe={sizeOfShoe}
        setColorSelected={setColorSelected}
        colorSelected={colorSelected}
        setSizeSelected={setSizeSelected}
        sizeSelected={sizeSelected}
      />
    </>
  );
};
export default ShoePage;
