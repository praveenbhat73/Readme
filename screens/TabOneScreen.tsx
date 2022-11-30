import { StyleSheet,ActivityIndicator,FlatList } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// import { RootTabScreenProps } from '../types';
import { gql,useQuery } from '@apollo/client';
import BookItem from '../components/BookItem';
//  useQuery is used get data The useQuery hook is a React hook that shares GraphQL data with your UI.
 

// the query is defined with using gql eg below 
const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }


    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;
//q:$q the string is accepted by stepzen 

// flatlist is used to render the array of elements  its like map function 
export default function TabOneScreen() {
  const {data,loading,error}=useQuery(query,{variables:{q:"React Native"},});
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  return (
    <View style={styles.container}>
      {
        loading && <ActivityIndicator/>
      }
      {
        error &&
        <>
          <Text>Error in fetching try searching.....</Text>
          <Text>{error.message}</Text>
        </>
      }
      <FlatList data={data?.googleBooksSearch?.items || []}
      renderItem={({item})=>(<BookItem book={{
        image: item.volumeInfo.imageLinks?.thumbnail,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        isbn:item.volumeInfo.industryIdentifiers[0].identifier,}}/>)}
      
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding:10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
