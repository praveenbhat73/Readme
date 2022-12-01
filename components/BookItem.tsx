import { View, Text, StyleSheet, Image,Appearance} from "react-native";
import React from "react";
import Colors from '../constants/Colors';
import App from "../App";


type BookItemProps = {
  book: Book;
};



const BookItem = ({ book }: BookItemProps) => {

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
    width:100,
    flex: 1,
    aspectRatio: 2.1 / 3, 
    marginRight: 10,
    borderWidth:1.5,
    // borderColor:"black",
    borderStyle:'solid',
    borderRadius:5,
    resizeMode:"contain"
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    
  },
});

export default BookItem;