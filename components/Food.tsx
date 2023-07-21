interface FoodProps {
  food: Point;
  cellSize: number;
}

const Food = ({ food, cellSize }: FoodProps) => {
  return <Cell x={food.x} y={food.y} size={cellSize} />;
};