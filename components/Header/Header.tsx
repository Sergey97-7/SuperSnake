import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../../styles/Colors";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}
const ICON_SIZE = 30;

function Header({
                  children,
                  reloadGame,
                  pauseGame,
                  isPaused
                }: HeaderProps) {

  return <View style={styles.container}>
    <TouchableOpacity onPress={reloadGame}>
      <Ionicons name={"reload-circle"} size={ICON_SIZE} color={Colors.primary}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={pauseGame}>
      <Ionicons name={isPaused ? "play-circle" : 'pause-circle'} size={ICON_SIZE} color={Colors.primary}/>
    </TouchableOpacity>
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
})

export default Header;