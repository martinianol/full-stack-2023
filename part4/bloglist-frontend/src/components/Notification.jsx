const Notification = ({ message, isError }) => {
  return (
    <div
      style={{
        background: "lightgrey",
        color: isError ? "red" : "green",
        border: `3px solid ${isError ? "red" : "green"}`,
        padding: "8px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
