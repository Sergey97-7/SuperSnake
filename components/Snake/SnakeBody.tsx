import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SnakeBodyProps {
  position: {
    x: number;
    y: number;
  };
}

const SnakeBody: React.FC<SnakeBodyProps> = ({ position }) => {
  const { x, y } = position;

  return (
    <View style={[styles.body, { left: x, top: y }]} />
  );
};

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'green',
  },
});

export default SnakeBody;