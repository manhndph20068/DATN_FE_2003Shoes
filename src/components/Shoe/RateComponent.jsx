import { useEffect } from "react";
import { callGetCommentByShoeId } from "../../services/api";
import { useState } from "react";
import { Rate } from "antd";

const RateComponent = (props) => {
  const { shoeData } = props;
  const [rateData, setRateData] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [averagedStars, setAveragedStars] = useState(5);

  const handleGetRateOfShoe = async () => {
    const data = {
      page: 0,
      size: 100,
      idShoeDetail: shoeData.id,
    };
    const res = await callGetCommentByShoeId(data);
    if (res.status === 0 && res.data.length > 0) {
      setRateData(res.data);
      setTotalRate(res.total);
    }
  };
  useEffect(() => {
    if (shoeData?.id) {
      handleGetRateOfShoe();
    }
  }, []);

  useEffect(() => {
    handleAveragedStars();
  }, [rateData]);

  const handleAveragedStars = () => {
    console.log("rateData handleAveragedStarss", rateData);
    const totalStars = rateData.reduce((total, item) => {
      return +total + item.start;
    }, 0);
    console.log("totalStars", totalStars);
    const averageStars = totalStars / rateData.length;
    console.log("averageStars", averageStars);
    setAveragedStars(averageStars);
  };

  return (
    <div>
      <div
        className="title"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <span className="rate">
          <h5>Đánh giá ({totalRate ?? 0})</h5>
        </span>
        <span className="averaged-stars">
          {" "}
          <Rate
            disabled
            value={averagedStars}
            // value={Math.floor(averagedStars * 10) / 10}
            autoFocus={false}
            style={{ marginBottom: "0.5rem" }}
          />
        </span>
        {isNaN(+averagedStars) ? (
          <></>
        ) : (
          <>
            {" "}
            <span
              style={{
                fontSize: "large",
              }}
            >
              {Math.floor(averagedStars * 10) / 10}/5
            </span>
          </>
        )}
      </div>
      {rateData?.map((item, index) => {
        return (
          <div className={`content-${index}`} style={{ marginTop: "2rem" }}>
            <div
              className="name"
              style={{
                display: "flex",
                gap: "1rem",
                // fontSize: "large",
                color: "#707072",
                textAlign: "center",
              }}
            >
              <span>
                <div className="user-name">{item?.nameAccount}</div>
              </span>
              <span>
                <div className="date">{item?.date}</div>
              </span>
            </div>

            <div className="rate">
              <span className="star">
                <Rate disabled value={item?.start} autoFocus={false} />
              </span>
            </div>
            <div className="content-rate" style={{ marginTop: "0.5rem" }}>
              <p>{item?.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default RateComponent;
