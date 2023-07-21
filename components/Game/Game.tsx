import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Colors} from "../../styles/Colors";
import {PanGestureHandler} from "react-native-gesture-handler";
import type {Coordinate, GestureEventType} from "../../types/types";
import {Direction} from "../../types/types";
import {
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SCORE_INCREMENT,
  SNAKE_INITIAL_POSITION
} from '../../contstants/constants'
import Snake from "../Snake/Snake";
import {checkGameOver} from "../../utils/checkGameOver";
import Food from '../Food/Food';
import {checkEatsFood} from "../../utils/checkEatsFood";
import {randomFoodPosition} from "../../utils/randomFoodPosition";
import Header from "../Header/Header";


const Game: FC = () => {

  const [direction, setDirectiotn] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    console.log(isGameOver)
    if (!isGameOver) {
      intervalId = setInterval(() => {
        if (!isPaused) moveSnake();
      }, MOVE_INTERVAL)
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [snake, isGameOver, isPaused]);


  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead};

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prevState => !prevState));
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore((prevScore) => prevScore + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  }

  const pauseGame = () => {
    setIsPaused(prevState => !prevState)
  }

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirectiotn(Direction.Right);
    setIsPaused(false);
  }

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirectiotn(Direction.Right);
      } else {
        setDirectiotn(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirectiotn(Direction.Down);
      } else {
        setDirectiotn(Direction.Up);
      }
    }
  }
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
          <Text style={styles.text}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake}/>
          <Food x={food.x} y={food.y}/>
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  }
});

export default Game;