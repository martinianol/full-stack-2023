import { useState } from "react";

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getHighestAnecdote = (arrayOfAndecdotes) => {
  return arrayOfAndecdotes.reduce((actual, currentValue) => {
    return actual.votes > currentValue.votes ? actual : currentValue;
  }, arrayOfAndecdotes[0]);
};

const originalAnecdotes = [
  { text: "If it hurts, do it more often.", votes: 0 },
  {
    text: "Adding manpower to a late software project makes it later!",
    votes: 2,
  },
  {
    text: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 3,
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0,
  },
  { text: "Premature optimization is the root of all evil.", votes: 1 },
  {
    text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 4,
  },
  {
    text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    votes: 3,
  },
  { text: "The only way to go fast, is to go well.", votes: 2 },
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(originalAnecdotes);

  const handleNextAnecdote = () => {
    const rnd = randomIntFromInterval(0, anecdotes.length - 1);
    setSelected(rnd);
  };

  const handleVote = () => {
    const updatedAnecdotes = [...anecdotes];
    updatedAnecdotes[selected].votes += 1;

    setAnecdotes(updatedAnecdotes);
  };

  const highestVotedAnecodote = getHighestAnecdote(anecdotes);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected].text}</div>
      <div>has {anecdotes[selected].votes} votes</div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{highestVotedAnecodote.text}</div>
      <div>has {highestVotedAnecodote.votes} votes</div>
    </>
  );
};

export default App;
