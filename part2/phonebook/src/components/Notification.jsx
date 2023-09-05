const notificationStyles = {
  color: "green",
  fontStyle: "italic",
  fontSize: 16,
  background: "lightgrey",
  padding: "15px",
  border: "1px solid green",
};
const notificationStylesError = {
  color: "red",
  fontStyle: "italic",
  fontSize: 16,
  background: "lightgrey",
  padding: "15px",
  border: "1px solid red",
};

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  return (
    <p style={isError ? notificationStylesError : notificationStyles}>
      {message}
    </p>
  );
};

export default Notification;
