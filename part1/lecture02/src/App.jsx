import { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import History from "./History";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRigth = right + 1;
    setLeft(updatedRigth);
    setTotal(updatedRigth + left);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  );
};

export default App;
