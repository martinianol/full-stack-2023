const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </div>
    );
  };

  const Total = (props) => {
    return <p>Number of exercises {props.val1 + props.val2 + props.val3}</p>;
  };

  const parts = [part1, part2, part3];

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total val1={part1.exercises} val2={part2.exercises} val3={part3.exercises} />
    </div>
  );
};

export default App;
