const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]} exercise={props.exercises[0]} />
        <Part part={props.parts[1]} exercise={props.exercises[1]} />
        <Part part={props.parts[2]} exercise={props.exercises[2]} />
      </div>
    );
  };

  const Total = (props) => {
    return <p>Number of exercises {props.val1 + props.val2 + props.val3}</p>;
  };

  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} exercises={exercises} />
      <Total val1={exercises1} val2={exercises2} val3={exercises3} />
    </div>
  );
};

export default App;
