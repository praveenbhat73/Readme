import { StyleSheet,FlatList } from 'react-native';
import { useMyBooks } from '../context/MyBooksProvider';
import BookItem from '../components/BookItem';
import {View } from '../components/Themed';

export default function TabTwoScreen() {
  const {savedBooks}=useMyBooks()
  
  return (
    <View style={styles.container}>
       <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    justifyContent: 'center',
    padding:9,
  },
 
});
