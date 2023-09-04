const notificationStyles = {
  color: "green",
  fontStyle: "italic",
  fontSize: 16,
  background: "lightgrey",
  padding: "15px",
  border: "1px solid green"
};

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <p style={notificationStyles}>{message}</p>;
};

export default Notification;
