import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  return (
    <>
      <Total parts={parts} />
      <ul>
        {parts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </ul>
    </>
  );
};

export default Content;
