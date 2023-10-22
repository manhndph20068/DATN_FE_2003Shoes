import { Col, Row, Skeleton } from "antd";

const ShoeLoader = () => {
  return (
    <div style={{ background: "#f2f2f2", padding: "20px 0" }}>
      <div
        className="view-detail-book"
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <div
          style={{
            padding: "20px",
            background: "#FFFFFF",
            borderRadius: "6px",
          }}
        >
          <Row gutter={[25, 20]}>
            <Col md={10} sm={0} xs={0}>
              <Skeleton.Input
                active={true}
                block={true}
                style={{ height: "19rem" }}
              />
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  overflow: "hidden",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Skeleton.Image active={true} />
                <Skeleton.Image active={true} />
                <Skeleton.Image active={true} />
              </div>
            </Col>
            <Col md={14} sm={24} xs={24}>
              <Col md={0} sm={24} xs={24}>
                <Skeleton.Input
                  active={true}
                  block={true}
                  style={{ height: "19rem" }}
                />
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    overflow: "hidden",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Skeleton.Image active={true} />
                  <Skeleton.Image active={true} />
                  <Skeleton.Image active={true} />
                </div>
              </Col>
              <Col span={24}>
                <div className="right-content">
                  <div className="author">
                    <Skeleton.Input
                      active={true}
                      size={"default"}
                      style={{
                        marginTop: "1rem",
                      }}
                    />
                  </div>
                  <div className="title">
                    <Skeleton.Input active={true} block={true} />
                  </div>
                  <div className="rating">
                    <Skeleton.Input active={true} size={"default"} />
                  </div>
                  <div className="">
                    <Skeleton.Input active={true} block={true} />
                  </div>
                  <div className="delivery">
                    <Skeleton.Input active={true} size={"default"} />
                  </div>
                  <div className="quantity">
                    <Skeleton.Input active={true} size={"small"} />
                  </div>
                  <div className="add-to-cart">
                    <Skeleton.Button active={true} size={"default"} />
                    <Skeleton.Button active={true} size={"default"} />
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default ShoeLoader;
