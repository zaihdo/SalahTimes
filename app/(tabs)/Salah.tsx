import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import List from '@/components/List';

export default function SalahScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.currentPrayerContainer}>
        <Text style={styles.currentPrayerText}>Dhuhr</Text>
      </View>
      <View>
      <Text style={styles.title}>Wednesday 25th July</Text>
      <List></List>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 2,
    // marginTop: '40%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
  },
  currentPrayerContainer: {
    margin: 10
  },
  currentPrayerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignItems: 'center'
  },
});
