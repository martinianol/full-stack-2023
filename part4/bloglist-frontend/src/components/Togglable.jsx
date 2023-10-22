import { useState } from "react";

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
