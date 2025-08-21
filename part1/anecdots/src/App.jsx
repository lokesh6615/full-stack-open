import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  const [maxIndex, setMaxIndex] = useState(0);

  const getRandom = (max) => {
    console.log("inside random");
    return Math.floor(Math.random() * max);
  };
  const getAnecdotes = () => {
    console.log("inside anecdotes");
    const randomIndex = getRandom(anecdotes.length);
    console.log("randomIndex----->", randomIndex);
    setSelected(randomIndex);
  };
  const increaseVotes = () => {
    const votesCopy = { ...votes };
    votesCopy[selected] += 1;
    setVotes(votesCopy);
    const newMaxIndex = getMaxIndex(votesCopy);
    setMaxIndex(newMaxIndex);
  };
  const getMaxIndex = (votesCopy) => {
    let maxIdx = 0;
    Object.keys(votesCopy).forEach((element) => {
      if (votesCopy[element] > votesCopy[maxIdx]) maxIdx = Number(element);
    });
    return maxIdx;
  };
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  return (
    <div>
      <p>
        <b>Anecdote of the day</b>
      </p>
      <p>
        {anecdotes[selected]} has {votes[selected]} votes
      </p>
      <p>
        <b>Anecdote with most votes</b>
      </p>
      <p>
        {anecdotes[maxIndex]} has {votes[maxIndex]} votes
      </p>
      <button onClick={increaseVotes}>vote</button>
      <button onClick={getAnecdotes}>next anecdotes</button>
    </div>
  );
};

export default App;
