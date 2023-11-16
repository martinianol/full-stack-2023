const Notification = ({ message, isError }) => {
  return <div className={`notification ${isError && "error"}`}>{message}</div>;
};

export default Notification;
