import { useState } from "react";

const StatisticLine = ({ text, value }: { text: string; value: number }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({
  good,
  neutral,
  bad,
}: {
  good: number;
  neutral: number;
  bad: number;
}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <div>
          <p>No feedback given</p>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={good + neutral + bad} />
          <StatisticLine
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="Positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
