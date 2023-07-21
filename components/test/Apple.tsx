import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AppleProps {
  position: {
    x: number;
    y: number;
  };
}

const Apple: React.FC<AppleProps> = ({ position }) => {
  const { x, y } = position;

  return (
    <View style={[styles.apple, { left: x, top: y }]} />
  );
};

const styles = StyleSheet.create({
  apple: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
  },
});

export default Apple;