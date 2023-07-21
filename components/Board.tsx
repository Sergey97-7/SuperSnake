import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameEngine, GameLoop, Sprite } from 'react-native-game-engine';
import { Swipeable } from 'react-native-gesture-handler';

type Dot = [number, number];

const initialSnake: Dot[] = [
  [0, 0],
  [10, 0],
];

const getRandomCoordinate = (max: number) => Math.floor(Math.random() * max / 10) * 10;

const SnakeGame: React.FC = () => {
  const [position, setPosition] = useState<Dot>([0, 0]);
  const [speed, setSpeed] = useState<Dot>([10, 0]);
  const [snakeDots, setSnakeDots] = useState<Dot[]>(initialSnake);
  const [food, setFood] = useState<Dot>([getRandomCoordinate(300), getRandomCoordinate(300)]);

  useEffect(() => {
    const moveSnake = setInterval(() => {
      move();
    }, 100);

    return () => {
      clearInterval(moveSnake);
    };
  });

  const move = () => {
    const dots = [...snakeDots];
    const head = dots[dots.length - 1];

    head[0] += speed[0];
    head[1] += speed[1];

    dots.push(head);
    dots.shift();
    setSnakeDots(dots);

    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
  };

  const checkIfOutOfBorders = () => {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 300 || head[1] >= 300 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  };

  const checkIfCollapsed = () => {
    const snake = [...snakeDots];
    const head = snake.pop();
    snake.forEach((dot) => {
      if (head && head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  const checkIfEat = () => {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([getRandomCoordinate(300), getRandomCoordinate(300)]);
      growSnake();
    }
  };

  const growSnake = () => {
    const newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const gameOver = () => {
    setPosition([0, 0]);
    setSpeed([10, 0]);
    setSnakeDots(initialSnake);
  };

  const handleSwipe = (direction: string) => {
    switch (direction) {
      case 'LEFT':
        setSpeed([-10, 0]);
        break;
      case 'RIGHT':
        setSpeed([10, 0]);
        break;
      case 'UP':
        setSpeed([0, -10]);
        break;
      case 'DOWN':
        setSpeed([0, 10]);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Swipeable

        // onSwipeableLeft={() => handleSwipe('LEFT')}
        onSwipeableRight={() => handleSwipe('RIGHT')}
        // onSwipeableUp={() => handleSwipe('UP')}
        // onSwipeableDown={() => handleSwipe('DOWN')}
      >
        <GameEngine style={styles.gameContainer} systems={[]}>
          <Sprite
            source={require('./snake-body.png')}
            position={position}
          />

          {snakeDots.map((dot, i) => (
            <Sprite
              key={i}
              source={require('./snake-body.png')}
              position={dot}
            />
          ))}

          <Sprite
            source={require('./snake-food.png')}
            position={food}
          />

        </GameEngine>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    width: 300,
    height: 300,
    backgroundColor: 'black',
  },
});

export default SnakeGame;