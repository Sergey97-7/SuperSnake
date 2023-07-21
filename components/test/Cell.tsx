interface CellProps {
  x: number;
  y: number;
  size: number;
}

const Cell = ({ x, y, size }: CellProps) => {
  return (
    <View
      style={[
        styles.cell,
        { left: x * size, top: y * size, width: size, height: size },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
    backgroundColor: SNAKE_COLOR,
  },
});