import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && <div>{props.children}</div>}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Cancel" : props.buttonLabel}
      </button>
    </>
  );
};

export default Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

