import React from 'react';
import {Coordinate} from "../../types/types";
import {StyleSheet, View} from "react-native";
import {Colors} from "../../styles/Colors";

interface SnakeProps {
  snake: Coordinate[];
}

const Snake: React.FC<SnakeProps> = ({snake}) => {
  return (
    <>
      {snake.map((segment, i) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={i} style={[styles.snake, segmentStyle]}/>
      })}
    </>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
});

export default Snake;