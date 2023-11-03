import { Badge, Descriptions, Drawer } from "antd";
import { useEffect } from "react";

const ViewDetailVoucher = (props) => {
  const { openViewDetail, setOpenViewDetail, dataViewDetail } = props;

  const onClose = () => {
    setOpenViewDetail(false);
  };
  useEffect(() => {
    console.log(dataViewDetail);
  }, [dataViewDetail]);
  return (
    <>
      <Drawer
        title="Chi tiết voucher"
        placement="right"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="" bordered column={2}>
          <Descriptions.Item label="id">{dataViewDetail?.id}</Descriptions.Item>
          <Descriptions.Item label="Mã voucher">
            {dataViewDetail?.code}
          </Descriptions.Item>
          <Descriptions.Item label="Tên Voucher">
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Giá trị giảm">
            {dataViewDetail?.discountAmount}
          </Descriptions.Item>
          <Descriptions.Item label="Giá trị hoá đơn tối thiểu">
            {dataViewDetail?.minBillValue}
          </Descriptions.Item>
          <Descriptions.Item label="Giá trị giảm tối đa">
            {dataViewDetail?.maximumReductionValue}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">
            {dataViewDetail?.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">
            {dataViewDetail?.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {dataViewDetail?.createDate}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {dataViewDetail?.updateAt}
          </Descriptions.Item>
          <Descriptions.Item label="Hình thức giảm" span={3}>
            {dataViewDetail?.reduceForm === 0 ? (
              <p>Giảm theo %</p>
            ) : (
              <p>Giảm tiền</p>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default ViewDetailVoucher;
