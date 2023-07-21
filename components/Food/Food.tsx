import {StyleSheet, Text} from "react-native";
import {Coordinate} from "../../types/types";
import {useEffect, useState} from "react";

const FOOD_TYPES = ['🍎', '🍏', '🍒', '🍑', '🍈', '🍓', '🍌', '🍋', '🥑', '🍊', '🥭', '🍉', '🥒', '🥦', '🦎', '🍐', '🥝'];

function getRandomFruitEmoji() {
  return FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
}

export default function Food({x, y}: Coordinate) {
  const [foodType, setFoodType] = useState<string>(getRandomFruitEmoji());

  useEffect(() => {
    setFoodType(getRandomFruitEmoji());
  }, [x, y]);


  return <Text style={[{top: y * 10, left: x * 10}, styles.food]}>{foodType}</Text>
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 7,
    position: 'absolute',
  }
})