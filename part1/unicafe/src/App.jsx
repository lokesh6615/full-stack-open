import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  if (text == "Positive")
    return (
      <p>
        {text} {value}%
      </p>
    );
  return (
    <p>
      {text} {value}
    </p>
  );
};

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
      <StatisticLine text={"Good"} value={good} />
      <StatisticLine text={"Neutral"} value={neutral} />
      <StatisticLine text={"Bad"} value={bad} />
      <StatisticLine text={"Total"} value={total} />
      <StatisticLine text={"Average"} value={average} />
      <StatisticLine text={"Positive"} value={positive} />
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
      <Button onClick={addGood} text={"Good"} />
      <Button onClick={addNeutral} text={"Neutral"} />
      <Button onClick={addBad} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
