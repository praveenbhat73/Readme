import { StyleSheet } from 'react-native';
import { useMyBooks } from '../context/MyBooksProvider';

import {View } from '../components/Themed';

export default function TabTwoScreen() {
  const context=useMyBooks()
  console.log(context)
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
