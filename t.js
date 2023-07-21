import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text } from 'react-native-elements';
import { Stage, Graphics } from '@inlet/react-pixi';
import { CELL_SIZE, GAME_SIZE } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GameScreen = () => {
  const [isReady, setIsReady] = useState(false);

  const handleFontLoad = useCallback(async () => {
    await Font.loadAsync({
      'FiraMono-Regular': require('./assets/fonts/FiraMono-Regular.ttf'),
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    handleFontLoad();
  }, []);

  const renderSnake = useCallback((snake) => {
    return snake.map((cell, index) => {
      const x = cell.x * CELL_SIZE;
      const y = cell.y * CELL_SIZE;
      const rect = new Graphics();
      rect.beginFill(0x000000);
      rect.drawRect(x, y, CELL_SIZE, CELL_SIZE);
      rect.endFill();
      return <Graphics key={index} {...rect}/>;
    });
  }, []);

  const renderFood = useCallback((food) => {
    const x = food.x * CELL_SIZE;
    const y = food.y * CELL_SIZE;
    const circle = new Graphics();
    circle.beginFill(0xff0000);
    circle.drawCircle(x + CELL_SIZE / 2, y + CELL_SIZE / 2, CELL_SIZE / 2);
    circle.endFill();
    return <Graphics {...circle} />;
  }, []);

  const renderGame = useCallback((snake, food) => {
    return (
      <View style={styles.container}>
        <Stage width={GAME_SIZE} height={GAME_SIZE}>
          <Graphics>
            <Graphics
              lineStyle={1}
              drawRect={[-1, -1, GAME_SIZE + 2, GAME_SIZE + 2]}
            />
            {renderSnake(snake)}
            {renderFood(food)}
          </Graphics>
        </Stage>
      </View>
    );
  }, [renderSnake, renderFood]);

  return isReady ? renderGame(snake, food) : <AppLoading />;
};

export default GameScreen;
