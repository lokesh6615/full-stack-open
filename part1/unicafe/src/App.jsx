import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = good / total;

  return (
    <div>
      <p>
        <b>Give feedback</b>
      </p>
      <button onClick={addGood}>Good</button>
      <button onClick={addNeutral}>Neutral</button>
      <button onClick={addBad}>Bad</button>
      <p>
        <b>Statistics</b>
      </p>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive}%</p>
    </div>
  );
};

export default App;
