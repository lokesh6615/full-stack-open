import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = (good / total) * 100;
  if (good == 0 && neutral == 0 && bad == 0)
    return (
      <div>
        <p>
          <b>Statistics</b>
        </p>
        <p>No feedback given</p>
      </div>
    );
  return (
    <div>
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

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <p>
        <b>Give feedback</b>
      </p>
      <button onClick={addGood}>Good</button>
      <button onClick={addNeutral}>Neutral</button>
      <button onClick={addBad}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
