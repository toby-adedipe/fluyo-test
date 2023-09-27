import { StyleSheet, View } from 'react-native';
import { ExerciseScreen } from './app/modules/Exercise';
import { colors } from './app/utils/colors';

export default function App() {
  return (
    <View style={styles.container} >
      <ExerciseScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    backgroundColor: colors.lightGreen,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
