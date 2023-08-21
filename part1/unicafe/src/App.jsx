import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {!isNaN(average) ? average : "no data yet"}</p>
      <p>postitive {!isNaN(positive) ? `${positive * 100}%` : "no data yet"}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(good + neutral + bad);
  const [average, setAverage] = useState(
    (good * 1 + neutral * 0 + bad * -1) / all
  );
  const [positive, setPositive] = useState(good / all);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage((good + 1 - bad) / (all + 1));
    setPositive((good + 1) / (all + 1));
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage((good - bad) / (all + 1));
    setPositive(good / (all + 1));
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage((good - bad - 1) / (all + 1));
    setPositive(good / (all + 1));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <Statistics
        all={all}
        average={average}
        bad={bad}
        good={good}
        neutral={neutral}
        positive={positive}
      />
    </div>
  );
};

export default App;
