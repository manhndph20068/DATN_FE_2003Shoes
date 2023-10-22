import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ScaleLoader color="#0066b2" />
    </div>
  );
};
export default Loading;
