import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { callListNameShoe } from "../../../services/api";
import { PlusCircleTwoTone } from "@ant-design/icons";
import ModalCreateShoeName from "./ModalCreateShoeName";
import ModalCreateShoeProperties from "./ModalCreateShoeProperties";

const CreateShoeDetail = () => {
  const [nameShoeOptions, setNameShoeOptions] = useState([]);
  const [openModalCreateNameShoe, setOpenModalCreateNameShoe] = useState(false);
  const [shoeNameSelected, setShoeNameSelected] = useState(null);

  const [valuesProperties, setValuesProperties] = useState(null);
  const [colorSelected, setColorSelected] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);

  const [categorySelected, setCategorySelected] = useState(null);
  const [brandSelected, setBrandSelected] = useState(null);
  const [soleSelected, setSoleSelected] = useState(null);

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const [dataCreateShoeDetail, setDataCreateShoeDetail] = useState([]);

  const fetchNameShoe = async () => {
    const res = await callListNameShoe();
    if (res?.data) {
      const newOption = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setNameShoeOptions(newOption);
    }
  };

  useEffect(() => {
    fetchNameShoe();
    console.log("valuesProperties", valuesProperties);
  }, [valuesProperties]);

  const handleOnchangeNameShoe = (values) => {
    setShoeNameSelected(values);
    console.log("shoeNameSelected", shoeNameSelected);
  };

  const handleAddNameShoe = () => {
    setOpenModalCreateNameShoe(true);
  };

  useEffect(() => {
    if (
      colorSelected &&
      colorSelected.length > 0 &&
      sizeSelected &&
      sizeSelected.length > 0
    ) {
      const newItem = [];
      colorSelected.forEach((colorItem, colorIndex) => {
        sizeSelected.forEach((sizeItem, sizeIndex) => {
          const matchingThumbnails = dataThumbnail.filter(
            (thumb) => thumb.idColor === colorItem
          );

          const thumbnails = matchingThumbnails.map((thumb) => ({
            imgName: thumb.name,
          }));

          const matchingSlider = dataSlider.filter(
            (slider) => slider.idColor === colorItem
          );

          const sliders = matchingSlider.map((slider) => ({
            imgName: slider.name,
          }));

          const matchingPrice = price.filter(
            (price) => price.idColor === colorItem && price.idSize === sizeItem
          );

          const priceItem = matchingPrice.map((price) => ({
            price: price.price,
          }));

          const matchingQuantity = quantity.filter(
            (quantity) =>
              quantity.idColor === colorItem && quantity.idSize === sizeItem
          );

          const qtyItem = matchingQuantity.map((quantity) => ({
            quantity: quantity.quantity,
          }));

          newItem.push({
            key: colorIndex * sizeSelected.length + sizeIndex,
            shoe: {
              id: shoeNameSelected,
            },
            priceInput: priceItem[0]?.price ?? 100000,
            quantity: qtyItem[0]?.quantity ?? 100,
            createdAt: null,
            updatedAt: null,
            status: 1,
            color: { id: colorItem },
            size: { id: sizeItem },
            category: { id: categorySelected },
            brand: { id: brandSelected },
            sole: { id: soleSelected },
            thumbnails: thumbnails,
            images: sliders,
          });
        });
      });

      setDataCreateShoeDetail(newItem);
    }
  }, [
    colorSelected,
    sizeSelected,
    dataThumbnail,
    dataSlider,
    shoeNameSelected,
  ]);

  const onFinish = (values) => {
    console.log("values", values);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Select
          showSearch
          style={{ width: 500 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          virtual={true}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={nameShoeOptions}
          showArrow={false}
          allowClear={true}
          onChange={(value) => handleOnchangeNameShoe(value)}
        />
        <PlusCircleTwoTone
          style={{ fontSize: "1.5rem" }}
          onClick={() => handleAddNameShoe()}
        />
      </div>
      <div className="properties">
        <div className="properties-item">Thuoc tinh</div>
        {shoeNameSelected && (
          <div className="properties-item">
            <ModalCreateShoeProperties
              valuesProperties={valuesProperties}
              setValuesProperties={setValuesProperties}
              colorSelected={colorSelected}
              setColorSelected={setColorSelected}
              sizeSelected={sizeSelected}
              setSizeSelected={setSizeSelected}
              setCategorySelected={setCategorySelected}
              setBrandSelected={setBrandSelected}
              setSoleSelected={setSoleSelected}
              dataCreateShoeDetail={dataCreateShoeDetail}
              setDataCreateShoeDetail={setDataCreateShoeDetail}
              dataThumbnail={dataThumbnail}
              setDataThumbnail={setDataThumbnail}
              dataSlider={dataSlider}
              setDataSlider={setDataSlider}
              price={price}
              setPrice={setPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              setShoeNameSelected={setShoeNameSelected}
              shoeNameSelected={shoeNameSelected}
            />
          </div>
        )}
      </div>

      <ModalCreateShoeName
        openModalCreateNameShoe={openModalCreateNameShoe}
        setOpenModalCreateNameShoe={setOpenModalCreateNameShoe}
        fetchNameShoe={fetchNameShoe}
        shoeNameSelected={shoeNameSelected}
      />
    </div>
  );
};
export default CreateShoeDetail;
