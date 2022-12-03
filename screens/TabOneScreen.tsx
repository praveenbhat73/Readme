import { useState } from 'react';
import { StyleSheet,ActivityIndicator,FlatList, Appearance, TextInput, Button} from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// import { RootTabScreenProps } from '../types';
import { gql,useLazyQuery,useQuery } from '@apollo/client';
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

// the main problem of using usequery is it sends request for every bit change which is heavy load and not optimal 
// use -> useLazyQuery it sends only when the function changes  

export default function TabOneScreen() {
  const [serach,setSearch]=useState(" ");
  const[provider,setprovider]=useState<"googleBooksSearch"|"openLibrarySearch">("googleBooksSearch")
  const parseBook = (item:any) => {
    if (provider === "googleBooksSearch") {
      return {
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      };
    } else {
      return {
        title: item.title,
        authors: item.author_name,
        image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
        isbn: item.isbn?.[0],
      };
    }
  };
  const [ runQuery,{data,loading,error}]=useLazyQuery(query);
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
      <View style={styles.header}>
        <TextInput
        value={serach}
        onChangeText={setSearch}
        placeholder='Search.'
         placeholderTextColor={
            istheme()?"gray":"black"
         }
         style={[styles.input,
        {
          borderColor:istheme()?"gray":"black",
          color:istheme()?"white":"black"
        }]}/>
        <Button title="Search"
        color={
          istheme()?"gray":"lightlack"
        }
        
         accessibilityLabel="Please Search"
         onPress={()=>runQuery({ variables: { q: serach } })}
         />
      </View>
         <View style={styles.tabs}>
          <Text style={provider==="googleBooksSearch"?{
            fontWeight:"bold",color:"royalblue"
          }:{}}
          onPress={()=>setprovider("googleBooksSearch")}
          >Google Books</Text>
          <Text style={provider==="openLibrarySearch"?{
            fontWeight:"bold",color:"royalblue"
          }:{}}
          onPress={()=>setprovider("openLibrarySearch")}
          >Open Library</Text>
         </View>
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
   <FlatList
  data={
    provider === "googleBooksSearch"
      ? data?.googleBooksSearch?.items
      : data?.openLibrarySearch?.docs || []
  }
  renderItem={({ item }) => <BookItem book={parseBook(item)} />}
  showsVerticalScrollIndicator={false}
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
  },
  header:{
    flexDirection:"row",
    alignItems:"center"
  },
  input:{
    flex:1,
    padding:5,
    borderWidth:1,
    borderRadius:5,
    marginVertical:4,
    marginRight:3
  },
tabs:{
  flexDirection:"row",
  justifyContent:"space-around",
  alignItems:"center",
  height:50,

},
});
