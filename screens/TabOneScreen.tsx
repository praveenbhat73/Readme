import { StyleSheet,ActivityIndicator,FlatList, Appearance } from 'react-native';

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

  // data error and loading is used to get data and its status -> useQuery(queryhave to pass variables bcz we are passing string to stepzen api as search query)
//   Whenever this component renders, the useQuery hook automatically executes our query and returns a result object containing loading, error, and data properties:

// Apollo Client automatically tracks a query's loading and error states, which are reflected in the loading and error properties.
// When the result of your query comes back, it's attached to the data property.
const istheme=()=>{
  const colorScheme=Appearance.getColorScheme();
  if(colorScheme==="dark")
  {

    return true;
  }
  else
  {
    return false;
  }
}

  return (
    <View style={styles.container}>
      {
        loading && <ActivityIndicator size="large" color={
          istheme()?"white":"blue"
        }style={styles.indicator}
           />
      }
      {/* above shows if its loading show activityindicator -> loading circle  */}
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
  indicator:{
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center"
  }
});
