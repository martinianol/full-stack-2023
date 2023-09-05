const Total = ({ parts }) => {
  return (
    <p>
      {`Number of exercises `}
      {parts.reduce((acc, current) => acc + current.exercises, 0)}
    </p>
  );
};

export default Total;