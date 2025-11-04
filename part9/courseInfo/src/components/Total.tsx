interface TotalProps {
  totalCount: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <h2>Total: {props.totalCount}</h2>
    </div>
  );
};

export default Total;
