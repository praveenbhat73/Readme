import { View, Text, StyleSheet, Image,Appearance,Pressable} from "react-native";
import React from "react";
import Colors from '../constants/Colors';
import App from "../App";
import {useMyBooks} from "../context/MyBooksProvider"

type BookItemProps = {
  book: Book;
};



const BookItem = ({ book }: BookItemProps) => {
  const { onToggleSaved, isBookSaved } = useMyBooks();
  const saved = isBookSaved(book);
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
    
      <Image source={{ uri: book.image }} style={[styles.image,
    {
    borderColor:istheme()?"white":"black"
    }]} />
      <View style={styles.contentContainer}>
        <Text style={[styles.title,
        {
          color:istheme() ? "white" : "black"
        }]
        } 
        
        >{book.title}</Text>
        <Text style={{color:"gray",fontWeight:"bold",fontStyle:"italic"}}>by {book.authors?.join(", ")}</Text>
        <Pressable
        style={[styles.button, saved ? { backgroundColor: 'lightgray' } : {}]}
       onPress={() => onToggleSaved(book)}

        >
      <Text style={[styles.buttonText,
      saved ? {color:"black"}:{color:"white"}]
        
      }>{saved ? 'Remove' : 'Want to Read'}</Text>
    </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical:9,
  },
  image: {
    height:100,
    width:"100%",
    flex: 1,
    aspectRatio: 2.1 / 3, 
    marginRight: 10,
    borderWidth:1.9,
    // borderColor:"black",
    borderStyle:'solid',
    borderRadius:5,
    resizeMode:"contain",
  },
  contentContainer: {
    flex: 4,
    borderColor: "gray",
    borderBottomWidth: 0.9,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
  button:{
    backgroundColor:"#0c7ee9",
   width:"40%",
   padding:5,
   marginTop:15,
   marginBottom:3,
   borderWidth:1,
   borderColor:"white",
   borderRadius:5
  },
  buttonText:{
    fontSize:15,
    // color:"white"
    // fontWeight:"bold"
  },
});

export default BookItem;